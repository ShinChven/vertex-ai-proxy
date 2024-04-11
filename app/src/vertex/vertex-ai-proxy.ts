import { VertexAI } from '@google-cloud/vertexai';
import express from 'express';
import path from "path";

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('config/vertex-ai.json');

const safetySettings: any = [
  {
    'category': 'HARM_CATEGORY_HATE_SPEECH',
    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    'category': 'HARM_CATEGORY_HARASSMENT',
    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
  }
];

async function vertexAPIProxy(req: express.Request, res: express.Response) {
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Verify the user's secret, please configure user and secret in /config/default.json
    const users = req.app.get('users') as Array<{ username: string, secret: string }>;
    const secrets = users.map(user => user.secret);

    // verify Authorization bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send('Authorization header required');
      return;
    }
    const token = authHeader.split(' ')[1];
    if (!secrets.includes(token)) {
      res.status(401).send('Invalid token');
      return;
    }
    if (!secrets.includes(token)) {
      res.status(401).send('Invalid token');
      return;
    }

    // Configure location and project_id in /config/default.json
    const vertexConfig = req.app.get('vertex');

    const vertex_ai = new VertexAI({
      ...vertexConfig,
    });

    const DEFAULT_MODEL = 'gemini-pro';
    // Please pass the model name as a path parameter
    const model = req.params.model || DEFAULT_MODEL;

    const reqBody = req.body;

    // Instantiate the models
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        'maxOutputTokens': 8192,
        'temperature': 1,
        'topP': 0.95,
      },
      safetySettings,
    });

    const streamingResp = await generativeModel.generateContentStream(reqBody);

    res.write('[');
    let index = 0;
    for await (const item of streamingResp.stream) {
      if (index > 0) {
        res.write(',');
      }
      res.write(JSON.stringify(item));
      index++;
    }
    res.end(']');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}

export default vertexAPIProxy;
