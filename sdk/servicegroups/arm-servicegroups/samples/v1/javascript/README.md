# @azure/arm-servicegroups client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-servicegroups in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                             |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [createOrUpdateServiceGroupSample.js][createorupdateservicegroupsample] | create or Update a serviceGroup x-ms-original-file: 2026-08-01/ServiceGroup_Put.json                                                        |
| [deleteServiceGroupSample.js][deleteservicegroupsample]                 | delete a ServiceGroup x-ms-original-file: 2026-08-01/ServiceGroup_Delete.json                                                               |
| [operationsListSample.js][operationslistsample]                         | lists all available REST API operations for the Microsoft.Management resource provider. x-ms-original-file: 2026-08-01/Operations_List.json |
| [serviceGroupsGetSample.js][servicegroupsgetsample]                     | get the details of the serviceGroup x-ms-original-file: 2026-08-01/ServiceGroup_Get.json                                                    |
| [updateServiceGroupSample.js][updateservicegroupsample]                 | update a serviceGroup x-ms-original-file: 2026-08-01/ServiceGroup_Patch.json                                                                |

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
node createOrUpdateServiceGroupSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node createOrUpdateServiceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorupdateservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1/javascript/createOrUpdateServiceGroupSample.js
[deleteservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1/javascript/deleteServiceGroupSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1/javascript/operationsListSample.js
[servicegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1/javascript/serviceGroupsGetSample.js
[updateservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1/javascript/updateServiceGroupSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicegroups
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicegroups/arm-servicegroups/README.md
