---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - language-service
urlFragment: ai-language-conversations-javascript-beta
---

# Azure Cognitive Language Service client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Language Service in some common scenarios.

| **File Name**                                                                 | **Description**                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [analyzeConversationApp.js][analyzeconversationapp]                           | Conversational query analysis for intents and entities extraction |
| [analyzeOrchestrationAppConvResponse.js][analyzeorchestrationappconvresponse] | Orchestration project with conversational response                |
| [analyzeOrchestrationAppLuisResponse.js][analyzeorchestrationappluisresponse] | Orchestration project with LUIS response                          |
| [analyzeOrchestrationAppQnaResponse.js][analyzeorchestrationappqnaresponse]   | Orchestration project with QnA response                           |
| [analyzeOrchestrationDirectTarget.js][analyzeorchestrationdirecttarget]       | Orchestration project with direct target                          |
| [convPiiTranscriptInput.js][convpiitranscriptinput]                           | PII conversational analysis                                       |
| [convSummarization.js][convsummarization]                                     | Conversation Summarization                                        |
| [authentication.js][authentication]                                           | authenticates a service client using an API key                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node analyzeConversationApp.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_CONVERSATIONS_ENDPOINT="<azure conversations endpoint>" AZURE_CONVERSATIONS_KEY="<azure conversations key>" AZURE_CONVERSATIONS_PROJECT_NAME="<azure conversations project name>" AZURE_CONVERSATIONS_DEPLOYMENT_NAME="<azure conversations deployment name>" node analyzeConversationApp.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[analyzeconversationapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/analyzeConversationApp.js
[analyzeorchestrationappconvresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/analyzeOrchestrationAppConvResponse.js
[analyzeorchestrationappluisresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/analyzeOrchestrationAppLuisResponse.js
[analyzeorchestrationappqnaresponse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/analyzeOrchestrationAppQnaResponse.js
[analyzeorchestrationdirecttarget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/analyzeOrchestrationDirectTarget.js
[convpiitranscriptinput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/convPiiTranscriptInput.js
[convsummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/convSummarization.js
[authentication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/javascript/authentication.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-language-conversations
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/README.md
