# Azure ImageAnalysis REST client library for TypeScript

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Package (NPM)](https://www.npmjs.com/package/@azure/imageAnalysis)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/imageAnalysis?view=azure-node-preview)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- You must have a Cognitive Services resource with the Image Analysis service. You can create one from the [Azure portal](https://portal.azure.com/).

### Install the `@azure/imageAnalysis` package

Install the Azure ImageAnalysis REST client REST client library for TypeScript with `npm`:

```bash
npm install @azure/imageAnalysis
```

### Create and authenticate a `ImageAnalysisClient`

To use a Cognitive Services key to authenticate the `ImageAnalysisClient`, you can obtain the key from your Cognitive Services resource in the [Azure portal](https://portal.azure.com/).

```typescript Snippet:ImageAnalysisCreateClient
import { ImageAnalysisClient, VisualFeatures } from "@azure/imageAnalysis";
import { AzureKeyCredential } from "@azure/core-auth";

// Set the service endpoint and authentication information as environment variables
const endpoint = process.env["IMAGE_ANALYSIS_ENDPOINT"] || "";
const apiKey = process.env["IMAGE_ANALYSIS_API_KEY"] || "";

// Create and authenticate a `ImageAnalysisClient`
const credential = new AzureKeyCredential(apiKey);
const client = new ImageAnalysisClient(endpoint, credential);
```

## Examples

### Analyze an image from a URL

```typescript Snippet:ImageAnalysisAnalyzeFromUrl
// Analyze an image from a URL
const imageUrl = "<image_url>";
const visualFeatures = [
    VisualFeatures.Tags,
    VisualFeatures.Objects,
    VisualFeatures.Caption,
    VisualFeatures.People
];
const analyzeResult = await client.analyze(imageUrl, visualFeatures);

console.log("Analyzed image results:", analyzeResult);
```

### Analyze an image from a local file

```typescript Snippet:ImageAnalysisAnalyzeFromFile
import { createReadStream } from "fs";
import { BinaryData } from "@azure/core-util";

// Read the image file into a stream
const imagePath = "<local_image_path>";
const imageStream = createReadStream(imagePath);

// Convert the stream to binary data
const binaryData = await BinaryData.fromStream(imageStream);

// Analyze the image using the binary data
const visualFeatures = [
    VisualFeatures.Tags,
    VisualFeatures.Objects,
    VisualFeatures.Caption,
    VisualFeatures.People
];
const analyzeResult = await client.analyze(binaryData, visualFeatures);

console.log("Analyzed image results:", analyzeResult);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
```