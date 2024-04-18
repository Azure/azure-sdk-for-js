# ContentSafety client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for ContentSafety in some common scenarios.

| **File Name**                                     | **Description**                       |
| ------------------------------------------------- | ------------------------------------- |
| [sampleAnalyzeImage.js][sampleanalyzeimage]       | Demonstrates how to analyze image.    |
| [sampleAnalyzeText.js][sampleanalyzetext]         | Demonstrates how to analyze text.     |
| [sampleManageBlocklist.js][samplemanageblocklist] | Demonstrates how to manage blocklist. |

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
node sampleAnalyzeImage.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CONTENT_SAFETY_ENDPOINT="<content safety endpoint>" CONTENT_SAFETY_API_KEY="<content safety api key>" node sampleAnalyzeImage.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sampleanalyzeimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentsafety/ai-content-safety-rest/samples/v1/javascript/sampleAnalyzeImage.js
[sampleanalyzetext]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentsafety/ai-content-safety-rest/samples/v1/javascript/sampleAnalyzeText.js
[samplemanageblocklist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentsafety/ai-content-safety-rest/samples/v1/javascript/sampleManageBlocklist.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/ai-content-safety?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety-rest/README.md
