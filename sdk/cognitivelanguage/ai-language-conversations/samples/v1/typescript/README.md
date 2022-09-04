---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - language-service
urlFragment: ai-language-conversations-typescript
---

# Samples for Azure Conversational Language Understanding client library for TypeScript

These code samples show common scenario operations with the Azure Conversational Language Understanding client library.

You can authenticate your client with a Conversational Language Understanding API key:

- See [sample_authentication.ts][sample_authentication] for how to authenticate in the above cases.

These sample programs show common scenarios for the Conversational Language Understanding client's offerings.

| **File Name**| **Description**|
|-|-|
|[sample_analyze_conversation_app.ts][sample_analyze_conversation_app]| Analyze intents and entities in your utterance using a conversation project. |
| [sample_analyze_orchestration_app_conv_response.ts][sample_analyze_orchestration_app_conv_response]| Analyze user utterance using an orchestration project, which selects the best candidate from one of your different apps to analyze user query (ex: Qna, Conversation, and Luis). In this case, it uses a conversation project. |
| [sample_analyze_orchestration_app_luis_response.ts][sample_analyze_orchestration_app_luis_response]| Analyze user utterance using an orchestration project, which selects the best candidate from one of your different apps to analyze user query (ex: Qna, Conversation, and Luis). In this case, it uses a Luis project. |
| [sample_analyze_orchestration_app_qna_response.ts][sample_analyze_orchestration_app_qna_response]| Analyze user utterance using an orchestration project, which selects the best candidate from one of your different apps to analyze user query (ex: Qna, Conversation, and Luis). In this case, it uses a Qna project. |
| [sample_conv_summarization.ts][sample_conv_summarization]| Summarize conversation in the form of issues and resolutions (ex: tech support conversation) |
| [sample_conv_pii_transcript_input.ts][sample_conv_pii_transcript_input]| Extract and redact personally-identifiable info from/in conversations |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][azure_subscription] and the following Azure resources to run these sample programs:

- [Azure Conversational Language Understanding instance][azure_clu_account]

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
node dist/sample_analyze_conv_app.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env API_KEY="<api key>" ENDPOINT="<endpoint>" node dist/sample_analyze_conv_app.js
```



## Next Steps

Check out the [API reference documentation][api_reference_documentation] to learn more about
what you can do with the Azure Conversational Language Understanding client library.

[azure_subscription]: https://azure.microsoft.com/free/
[azure_clu_account]: https://language.azure.com/clu/projects

[sample_authentication]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_authentication.ts

[sample_analyze_conversation_app]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_analyze_conversation_app.ts

[sample_analyze_orchestration_app_conv_response]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_analyze_orchestration_app_conv_response.ts

[sample_analyze_orchestration_app_luis_response]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_analyze_orchestration_app_luis_response.ts

[sample_analyze_orchestration_app_qna_response]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_analyze_orchestration_app_qna_response.ts

[sample_conv_summarization]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_conv_summarization.ts

[sample_conv_pii_transcript_input]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples/v1/typescript/src/sample_conv_pii_transcript_input.ts

[api_reference_documentation]: https://docs.microsoft.com/rest/api/language/conversation-analysis-runtime