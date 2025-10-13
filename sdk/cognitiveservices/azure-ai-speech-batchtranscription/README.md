# Azure AI Speech Batch Transcription client library for JavaScript

The Azure AI Speech Batch Transcription client library provides asynchronous transcription capabilities for long-form audio files. Use this library to submit batch transcription jobs, monitor their status, and retrieve transcription results.

**Please note** that this version of the client library defaults to the `2025-10-15` version of the service.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription)
- [Package (NPM)](https://www.npmjs.com/package/@azure/azure-ai-speech-batchtranscription)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/azure-ai-speech-batchtranscription?view=azure-node-preview)
- [Product documentation](https://learn.microsoft.com/azure/ai-services/speech-service/batch-transcription)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule) (Node.js >=20.0.0)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub]
- An [Azure AI Speech resource](https://learn.microsoft.com/azure/ai-services/speech-service/overview#find-a-resource) or [Azure AI multi-service resource](https://learn.microsoft.com/azure/ai-services/multi-service-resource)
- Audio files accessible via HTTPS URLs or SAS URLs for batch transcription

### Install the package

Install the Azure AI Speech Batch Transcription client library for JavaScript with `npm`:

```bash
npm install @azure/azure-ai-speech-batchtranscription
```

### Configure TypeScript

If you are using TypeScript, you need to install `@types/node` because this library depends on Node.js types.

```bash
npm install --save-dev @types/node
```

Additionally, you need to enable `compilerOptions.allowSyntheticDefaultImports` in your `tsconfig.json`. Note that if you extend `@tsconfig/node18/tsconfig.json` or `@tsconfig/node20/tsconfig.json`, this will already be enabled by default.

Here's a recommended `tsconfig.json` configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true
  }
}
```

### Create and authenticate a `BatchTranscriptionClient`

To create a client object to access the Azure AI Speech Batch Transcription API, you will need the endpoint of your Azure AI Speech resource and an API key credential.

You can find the endpoint for your Azure AI Speech resource in the [Azure Portal][azure_portal] under "Keys and Endpoint" in your Speech resource.

#### Using an API Key

The batch transcription client uses an API key credential for authentication. You can get the API key from your Speech resource in the Azure Portal.

```ts snippet:ReadmeSampleCreateClient_ApiKey
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);
```

### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### BatchTranscriptionClient

`BatchTranscriptionClient` is the primary interface for developers using the Azure AI Speech Batch Transcription client library. It provides methods to:

- **Start transcription jobs**: Submit audio files for asynchronous batch transcription
- **Monitor job status**: Check the progress and status of transcription jobs
- **Retrieve results**: Get transcription files and outputs when jobs complete
- **List transcriptions**: View all transcriptions for your subscription
- **Delete transcriptions**: Clean up completed or failed transcription jobs

### Batch Transcription Workflow

1. **Create a transcription job**: Submit audio file URLs with transcription settings (locale, model, etc.)
2. **Poll for status**: Monitor the job status until it reaches a terminal state (Succeeded, Failed, or Cancelled)
3. **Retrieve results**: Once succeeded, download transcription files containing the recognized text
4. **Clean up**: Delete the transcription job when results are no longer needed

## Examples

### Create a batch transcription job

Submit audio files for batch transcription:

```ts snippet:ReadmeSampleBasicBatchTranscription
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

const transcriptionJob = await client.startTranscription({
  contentUrls: ["https://example.com/audio-file.wav"],
  locale: "en-US",
  displayName: "My Batch Transcription"
});

console.log(`Started transcription job: ${transcriptionJob.self}`);
console.log(`Status: ${transcriptionJob.status}`);
```

### Monitor transcription job status

Check the status of a transcription job and wait for completion:

```ts snippet:ReadmeSampleMonitorBatchJob
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

const transcriptionId = "<transcription-id>";

// Poll until the transcription completes
let transcription = await client.getTranscription(transcriptionId);
while (transcription.status === "Running" || transcription.status === "NotStarted") {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  transcription = await client.getTranscription(transcriptionId);
  console.log(`Status: ${transcription.status}`);
}

console.log(`Final status: ${transcription.status}`);
```

### Retrieve transcription results

Get the transcription files once the job succeeds:

```ts snippet:ReadmeSampleRetrieveResults
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

const transcriptionId = "<transcription-id>";

// Get transcription files
for await (const file of client.listTranscriptionFiles(transcriptionId)) {
  console.log(`File: ${file.name}`);
  console.log(`Content URL: ${file.links?.contentUrl}`);
  
  // Download the transcription result from file.links.contentUrl
}
```

### Use a custom speech model

Transcribe audio using a custom trained model:

```ts snippet:ReadmeSampleCustomModel
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

const transcriptionJob = await client.startTranscription({
  contentUrls: ["https://example.com/audio-file.wav"],
  locale: "en-US",
  displayName: "Transcription with Custom Model",
  model: {
    self: "https://<region>.api.cognitive.microsoft.com/speechtotext/v3.2/models/<model-id>"
  }
});

console.log(`Started transcription with custom model: ${transcriptionJob.self}`);
```

### List all transcriptions

View all transcription jobs in your subscription:

```ts snippet:ReadmeSampleListTranscriptions
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

console.log("Listing all transcriptions:");
for await (const transcription of client.listTranscriptions()) {
  console.log(`- ${transcription.displayName}: ${transcription.status}`);
}
```

### Delete a transcription

Clean up a completed transcription job:

```ts snippet:ReadmeSampleDeleteTranscription
import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

const client = new BatchTranscriptionClient(
  "<endpoint>",
  new AzureKeyCredential("<api-key>")
);

const transcriptionId = "<transcription-id>";
await client.deleteTranscription(transcriptionId);

console.log(`Deleted transcription: ${transcriptionId}`);
```

### Additional Examples

More examples can be found in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1) folder.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

- Review the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1) for practical examples
- Learn more about [Azure AI Speech Batch Transcription](https://learn.microsoft.com/azure/ai-services/speech-service/batch-transcription)
- Explore the [Speech service documentation](https://learn.microsoft.com/azure/ai-services/speech-service/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
