# @azure/arm-relationships client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-relationships in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [dependencyOfRelationshipsCreateOrUpdateSample.ts][dependencyofrelationshipscreateorupdatesample]             | create a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_CreateOrUpdate.json             |
| [dependencyOfRelationshipsDeleteSample.ts][dependencyofrelationshipsdeletesample]                             | delete a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Delete.json                     |
| [dependencyOfRelationshipsGetSample.ts][dependencyofrelationshipsgetsample]                                   | get a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Get.json                           |
| [operationsListSample.ts][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2023-09-01-preview/Operations_List_MaximumSet_Gen.json                    |
| [serviceGroupMemberRelationshipsCreateOrUpdateSample.ts][servicegroupmemberrelationshipscreateorupdatesample] | create a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_CreateOrUpdate.json |
| [serviceGroupMemberRelationshipsDeleteSample.ts][servicegroupmemberrelationshipsdeletesample]                 | delete a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Delete.json         |
| [serviceGroupMemberRelationshipsGetSample.ts][servicegroupmemberrelationshipsgetsample]                       | get a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Get.json               |

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
node dist/dependencyOfRelationshipsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/dependencyOfRelationshipsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dependencyofrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/dependencyOfRelationshipsCreateOrUpdateSample.ts
[dependencyofrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/dependencyOfRelationshipsDeleteSample.ts
[dependencyofrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/dependencyOfRelationshipsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/operationsListSample.ts
[servicegroupmemberrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/serviceGroupMemberRelationshipsCreateOrUpdateSample.ts
[servicegroupmemberrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/serviceGroupMemberRelationshipsDeleteSample.ts
[servicegroupmemberrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/typescript/src/serviceGroupMemberRelationshipsGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relationships?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relationships/arm-relationships/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
