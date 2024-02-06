---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-openai
urlFragment: openai-assistants-javascript-beta
---

# Azure OpenAI client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure OpenAI in some common scenarios.

| **File Name**                               | **Description**  |
| ------------------------------------------- | ---------------- |
| [codeAssistant.js][codeassistant]           | assistants code. |
| [functionAssistant.js][functionassistant]   | assistants code. |
| [retrievalAssistant.js][retrievalassistant] | assistants code. |

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
node codeAssistant.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env OPENAI_API_KEY="<openai api key>" node codeAssistant.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[codeassistant]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai-assistants/samples/v1-beta/javascript/codeAssistant.js
[functionassistant]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai-assistants/samples/v1-beta/javascript/functionAssistant.js
[retrievalassistant]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai-assistants/samples/v1-beta/javascript/retrievalAssistant.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/openai
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai-assistants/README.md
