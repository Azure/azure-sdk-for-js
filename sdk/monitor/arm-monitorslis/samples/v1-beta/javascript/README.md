# @azure/arm-monitorslis client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-monitorslis in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [slisCreateOrUpdateSample.js][sliscreateorupdatesample]           | creates or updates an SLI resource. x-ms-original-file: 2025-03-01-preview/Slis_CreateOrUpdate.json            |
| [slisDeleteSample.js][slisdeletesample]                           | deletes an SLI resource. x-ms-original-file: 2025-03-01-preview/Slis_Delete.json                               |
| [slisGetSample.js][slisgetsample]                                 | gets an SLI resource. x-ms-original-file: 2025-03-01-preview/Slis_Get.json                                     |
| [slisListByParentSample.js][slislistbyparentsample]               | lists all SLI resources under a parent resource. x-ms-original-file: 2025-03-01-preview/Slis_ListByParent.json |
| [sloViewSliSignalPreviewSample.js][sloviewslisignalpreviewsample] | returns preview data for the signal. x-ms-original-file: 2025-03-01-preview/SloView_SliSignalPreview.json      |

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
node slisCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node slisCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sliscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitorslis/samples/v1-beta/javascript/slisCreateOrUpdateSample.js
[slisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitorslis/samples/v1-beta/javascript/slisDeleteSample.js
[slisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitorslis/samples/v1-beta/javascript/slisGetSample.js
[slislistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitorslis/samples/v1-beta/javascript/slisListByParentSample.js
[sloviewslisignalpreviewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitorslis/samples/v1-beta/javascript/sloViewSliSignalPreviewSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-monitorslis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/arm-monitorslis/README.md
