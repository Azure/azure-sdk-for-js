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

| **File Name**                                                                                       | **Description**                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [sample_analyze_conversation_app.ts][sample_analyze_conversation_app]                               | Conversational query analysis for intents and entities extraction               |
| [sample_analyze_orchestration_app_conv_response.ts][sample_analyze_orchestration_app_conv_response] | Orchestration project with conversational response                              |
| [sample_analyze_orchestration_app_luis_response.ts][sample_analyze_orchestration_app_luis_response] | Orchestration project with LUIS response                                        |
| [sample_analyze_orchestration_app_qna_response.ts][sample_analyze_orchestration_app_qna_response]   | Orchestration project with QnA response                                         |
| [sample_analyze_orchestration_direct_target.ts][sample_analyze_orchestration_direct_target]         | Orchestration project with direct target                                        |
| [sample_conv_pii_transcript_input.ts][sample_conv_pii_transcript_input]                             | PII conversational analysis                                                     |
| [sample_conv_summarization.ts][sample_conv_summarization]                                           | Conversation Summarization                                                      |
| [sample_authentication.ts][sample_authentication]                                                   | authenticates a service client using both Azure Active Directory and an API key |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/sample_analyze_conversation_app.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_CONVERSATIONS_ENDPOINT="<azure conversations endpoint>" AZURE_CONVERSATIONS_KEY="<azure conversations key>" AZURE_CONVERSATIONS_PROJECT_NAME="<azure conversations project name>" AZURE_CONVERSATIONS_DEPLOYMENT_NAME="<azure conversations deployment name>" node dist/sample_analyze_conversation_app.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sample_analyze_conversation_app]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_analyze_conversation_app.ts
[sample_analyze_orchestration_app_conv_response]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_analyze_orchestration_app_conv_response.ts
[sample_analyze_orchestration_app_luis_response]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_analyze_orchestration_app_luis_response.ts
[sample_analyze_orchestration_app_qna_response]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_analyze_orchestration_app_qna_response.ts
[sample_analyze_orchestration_direct_target]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_analyze_orchestration_direct_target.ts
[sample_conv_pii_transcript_input]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_conv_pii_transcript_input.ts
[sample_conv_summarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_conv_summarization.ts
[sample_authentication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1-beta/typescript/src/sample_authentication.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-language-conversations
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
