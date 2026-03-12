---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: ai-projects-typescript-beta
---

# Azure AI Projects client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure AI Projects in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agents/agentsBasics.ts][agents_agentsbasics]                     | Create and delete an agent.                                                                                                                                                                            |
| [connections/connectionsBasics.ts][connections_connectionsbasics] | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. |
| [datasets/datasetsBasics.ts][datasets_datasetsbasics]             | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of datasets, upload files/folders, create datasets, manage dataset versions, and delete datasets.                   |
| [deployments/deploymentsBasics.ts][deployments_deploymentsbasics] | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all deployments, get the properties of a deployment by its name, and delete a deployment.                        |
| [evaluations/agentEvaluation.ts][evaluations_agentevaluation]     | This sample demonstrates how to create an agent evaluation using the Azure AI Projects SDK.                                                                                                            |
| [evaluations/evaluationBasics.ts][evaluations_evaluationbasics]   | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations, and perform various operations on them.                                                         |
| [indexes/indexesBasics.ts][indexes_indexesbasics]                 | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes, get the properties of an index by its name, and delete an index.                                    |
| [inference/azureOpenAIChat.ts][inference_azureopenaichat]         | Given an AIProjectClient, this sample demonstrates how to get an Azure OpenAI client and create a chat completion.                                                                                     |
| [inference/chatCompletion.ts][inference_chatcompletion]           | Given an AIProjectClient, this sample demonstrates how to get a response from a chat model. Get the chat completions for the provided chat messages.                                                   |
| [inference/imageEmbedding.ts][inference_imageembedding]           | Given an AIProjectClient, this sample demonstrates how to get the image embeddings for a given image. Get the image embeddings for a given image.                                                      |
| [inference/textEmbeddings.ts][inference_textembeddings]           | Given an AIProjectClient, this sample demonstrates how to get the text embeddings for a given text. Get the text embeddings for arrays of given texts.                                                 |
| [telemetry/inferenceTelemetry.ts][telemetry_inferencetelemetry]   | This sample demonstrates how to enable telemetry for inference operations using AIProjectClient.                                                                                                       |
| [telemetry/telemetryBasics.ts][telemetry_telemetrybasics]         | Given the AIProjectClient, this sample shows how to get the connection string for telemetry.                                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/agents\agentsBasics.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_AI_PROJECT_ENDPOINT_STRING="<azure ai project endpoint string>" node dist/agents\agentsBasics.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsBasics.ts
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/connections/connectionsBasics.ts
[datasets_datasetsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/datasets/datasetsBasics.ts
[deployments_deploymentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/deployments/deploymentsBasics.ts
[evaluations_agentevaluation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/evaluations/agentEvaluation.ts
[evaluations_evaluationbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/evaluations/evaluationBasics.ts
[indexes_indexesbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/indexes/indexesBasics.ts
[inference_azureopenaichat]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/inference/azureOpenAIChat.ts
[inference_chatcompletion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/inference/chatCompletion.ts
[inference_imageembedding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/inference/imageEmbedding.ts
[inference_textembeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/inference/textEmbeddings.ts
[telemetry_inferencetelemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/telemetry/inferenceTelemetry.ts
[telemetry_telemetrybasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/telemetry/telemetryBasics.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
