## Vertex AI Proxy

This project provides a simplified API proxy for accessing Google Cloud Vertex AI, specifically for interacting with large language models like Gemini. 

### Background

Interacting with Google's Gemini models through Vertex AI requires complex authentication involving JSON API keys and short-lived access tokens. This proxy aims to streamline the process by offering a permanent user secret for authentication.

### Features

* **Simplified Authentication:** Replaces complex Vertex AI authentication with a single, permanent user secret.
* **Model Flexibility:** Supports accessing various models, with a default setting of `gemini-pro` (v1.0). Users can switch to `gemini-1.5-pro-preview-0409` for the latest version.
* **API Proxying:** Acts as a middleman for Vertex AI API requests, handling authentication and communication seamlessly.

###  Configuration

1. **Vertex AI Credentials:**: Place your Vertex AI JSON API key within the `config/vertex-ai.json` file.
2. **User Secret:**: Define the user secret within the `users` array of the `config/default.json` file.
3. **Project & Location:**: Specify your Google Cloud Project ID and location in the `vertex` field of `config/default.json`.

### Usage

1. Start the proxy server.
2. Make requests to the following endpoint:
    - `${host}/v1/{model}` 
    - Replace "{model}" with the desired model name. The default model is `gemini-pro`.
3. Include the user secret in the `Authorization` header as a Bearer token.
4. Request body stays the same as the Vertex AI API.

### Recommended Chatbot Client

- [NextChat](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)

### Development

1. **Install Dependencies**: Run `npm install` to install the required dependencies.
2. **Start the Server**: Run `npm start` to start the server.

This project simply implement Google Vertex AI inside a [FeathersJS](https://feathersjs.com/) server. If you want to add more features, you can refer to the FeathersJS documentation. Or you can use the [proxy middleware](./app/src/vertex/vertex-ai-proxy.ts) in your own project.

### Security Considerations

This is a basic implementation and does not address all potential security concerns. Developers should implement additional security measures such as:

* **HTTPS/TLS encryption** for secure communication.
* **Rate limiting** to prevent abuse.
* **Input validation and sanitization** to avoid malicious input.

### Disclaimer

This project is not an official Google product and is provided as-is. Use at your own risk.

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
