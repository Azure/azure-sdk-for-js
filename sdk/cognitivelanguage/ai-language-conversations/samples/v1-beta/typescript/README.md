---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - language-service
urlFragment: ai-language-conversations-typescript-beta
---

# Azure Cognitive Language Service client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Language Service in some common scenarios.

| **File Name**                                                                 | **Description**                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [analyzeConversationApp.ts][analyzeconversationapp]                           | Conversational query analysis for intents and entities extraction |
| [analyzeOrchestrationAppConvResponse.ts][analyzeorchestrationappconvresponse] | Orchestration project with conversational response                |
| [analyzeOrchestrationAppLuisResponse.ts][analyzeorchestrationappluisresponse] | Orchestration project with LUIS response                          |
| [analyzeOrchestrationAppQnaResponse.ts][analyzeorchestrationappqnaresponse]   | Orchestration project with QnA response                           |
| [analyzeOrchestrationDirectTarget.ts][analyzeorchestrationdirecttarget]       | Orchestration project with direct target                          |
| [convPiiTranscriptInput.ts][convpiitranscriptinput]                           | PII conversational analysis                                       |
| [convSummarization.ts][convsummarization]                                     | Conversation Summarization                                        |
| [authentication.ts][authentication]                                           | authenticates a service client using an API key                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services instance][createinstance_azurecognitiveservicesinstance]

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
node dist/analyzeConversationApp.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_CONVERSATIONS_ENDPOINT="<azure conversations endpoint>" AZURE_CONVERSATIONS_KEY="<azure conversations key>" AZURE_CONVERSATIONS_PROJECT_NAME="<azure conversations project name>" AZURE_CONVERSATIONS_DEPLOYMENT_NAME="<azure conversations deployment name>" node dist/analyzeConversationApp.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[analyzeconversationapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/analyzeConversationApp.ts
[analyzeorchestrationappconvresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/analyzeOrchestrationAppConvResponse.ts
[analyzeorchestrationappluisresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/analyzeOrchestrationAppLuisResponse.ts
[analyzeorchestrationappqnaresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/analyzeOrchestrationAppQnaResponse.ts
[analyzeorchestrationdirecttarget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/analyzeOrchestrationDirectTarget.ts
[convpiitranscriptinput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/convPiiTranscriptInput.ts
[convsummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/convSummarization.ts
[authentication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/authentication.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-language-conversations
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
