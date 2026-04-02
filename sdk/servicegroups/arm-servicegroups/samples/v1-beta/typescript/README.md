# @azure/arm-servicegroups client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-servicegroups in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                        |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [createOrUpdateServiceGroupSample.ts][createorupdateservicegroupsample] | create or Update a serviceGroup x-ms-original-file: 2024-02-01-preview/ServiceGroup_Put.json                           |
| [deleteServiceGroupSample.ts][deleteservicegroupsample]                 | delete a ServiceGroup x-ms-original-file: 2024-02-01-preview/ServiceGroup_Delete.json                                  |
| [serviceGroupsGetSample.ts][servicegroupsgetsample]                     | get the details of the serviceGroup x-ms-original-file: 2024-02-01-preview/ServiceGroup_Get.json                       |
| [serviceGroupsListAncestorsSample.ts][servicegroupslistancestorssample] | get the details of the serviceGroup's ancestors x-ms-original-file: 2024-02-01-preview/ServiceGroup_ListAncestors.json |
| [updateServiceGroupSample.ts][updateservicegroupsample]                 | update a serviceGroup x-ms-original-file: 2024-02-01-preview/ServiceGroup_Patch.json                                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/createOrUpdateServiceGroupSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/createOrUpdateServiceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorupdateservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1-beta/typescript/src/createOrUpdateServiceGroupSample.ts
[deleteservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1-beta/typescript/src/deleteServiceGroupSample.ts
[servicegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1-beta/typescript/src/serviceGroupsGetSample.ts
[servicegroupslistancestorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1-beta/typescript/src/serviceGroupsListAncestorsSample.ts
[updateservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicegroups/arm-servicegroups/samples/v1-beta/typescript/src/updateServiceGroupSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicegroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicegroups/arm-servicegroups/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
