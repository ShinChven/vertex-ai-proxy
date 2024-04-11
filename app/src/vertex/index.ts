import { Application } from "../declarations";
import vertexAPIProxy from "./vertex-ai-proxy";

export const setupVertexProxy = (app: Application) => {
  app.use('/v1/:model', vertexAPIProxy)
};