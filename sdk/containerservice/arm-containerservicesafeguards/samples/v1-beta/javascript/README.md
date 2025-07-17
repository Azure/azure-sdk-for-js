# @azure/arm-containerservicesafeguards client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerservicesafeguards in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [deploymentSafeguardsCreateSample.js][deploymentsafeguardscreatesample] | creates or updates a deploymentSafeguard x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Create.json   |
| [deploymentSafeguardsDeleteSample.js][deploymentsafeguardsdeletesample] | delete DeploymentSafeguards x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Delete.json                |
| [deploymentSafeguardsGetSample.js][deploymentsafeguardsgetsample]       | fetch a deployment safeguard by name x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Get.json          |
| [deploymentSafeguardsListSample.js][deploymentsafeguardslistsample]     | list DeploymentSafeguards by parent resource x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_List.json |
| [operationsListSample.js][operationslistsample]                         | list the operations for the provider x-ms-original-file: 2025-05-02-preview/Operations_List.json                   |

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
node deploymentSafeguardsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node deploymentSafeguardsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentsafeguardscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicesafeguards/samples/v1-beta/javascript/deploymentSafeguardsCreateSample.js
[deploymentsafeguardsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicesafeguards/samples/v1-beta/javascript/deploymentSafeguardsDeleteSample.js
[deploymentsafeguardsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicesafeguards/samples/v1-beta/javascript/deploymentSafeguardsGetSample.js
[deploymentsafeguardslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicesafeguards/samples/v1-beta/javascript/deploymentSafeguardsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicesafeguards/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicesafeguards?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicesafeguards/README.md
