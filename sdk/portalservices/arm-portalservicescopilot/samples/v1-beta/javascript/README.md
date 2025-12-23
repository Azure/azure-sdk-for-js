# @azure/arm-portalservicescopilot client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-portalservicescopilot in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                             |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [copilotSettingsCreateOrUpdateSample.js][copilotsettingscreateorupdatesample] | create a CopilotSettingsResource x-ms-original-file: 2024-04-01-preview/CopilotSettings_CreateOrUpdate.json |
| [copilotSettingsDeleteSample.js][copilotsettingsdeletesample]                 | delete a CopilotSettingsResource x-ms-original-file: 2024-04-01-preview/CopilotSettings_Delete.json         |
| [copilotSettingsGetSample.js][copilotsettingsgetsample]                       | get a CopilotSettingsResource x-ms-original-file: 2024-04-01-preview/CopilotSettings_Get.json               |
| [copilotSettingsUpdateSample.js][copilotsettingsupdatesample]                 | update a CopilotSettingsResource x-ms-original-file: 2024-04-01-preview/CopilotSettings_Update.json         |
| [operationsListSample.js][operationslistsample]                               | list the operations for the provider x-ms-original-file: 2024-04-01-preview/Operations_List.json            |

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
node copilotSettingsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node copilotSettingsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[copilotsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portalservices/arm-portalservicescopilot/samples/v1-beta/javascript/copilotSettingsCreateOrUpdateSample.js
[copilotsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portalservices/arm-portalservicescopilot/samples/v1-beta/javascript/copilotSettingsDeleteSample.js
[copilotsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portalservices/arm-portalservicescopilot/samples/v1-beta/javascript/copilotSettingsGetSample.js
[copilotsettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portalservices/arm-portalservicescopilot/samples/v1-beta/javascript/copilotSettingsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portalservices/arm-portalservicescopilot/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-portalservicescopilot?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/portalservices/arm-portalservicescopilot/README.md
