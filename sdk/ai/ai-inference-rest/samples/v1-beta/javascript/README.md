---
page_type: sample
languages:
  - javascript
products:
  - azure
  - ai
urlFragment: ai-inference-javascript-beta
---

# Azure OpenAI client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure OpenAI in some common scenarios.

| **File Name**                                     | **Description**                      |
| ------------------------------------------------- | ------------------------------------ |
| [chatCompletions.js][chatcompletions]             | get chat completions.                |
| [getModelInfo.js][getmodelinfo]                   | get model info.                      |
| [streamChatCompletions.js][streamchatcompletions] | list chat completions.               |
| [toolCall.js][toolcall]                           | get chat completions with functions. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node chatCompletions.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" node chatCompletions.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/chatCompletions.js
[getmodelinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/getModelInfo.js
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/streamChatCompletions.js
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/toolCall.js
[apiref]: https://docs.microsoft.com/javascript
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest/README.md
