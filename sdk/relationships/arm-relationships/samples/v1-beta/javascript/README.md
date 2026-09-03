# @azure/arm-relationships client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-relationships in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [dependencyOfRelationshipsCreateOrUpdateSample.js][dependencyofrelationshipscreateorupdatesample]             | create a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_CreateOrUpdate.json             |
| [dependencyOfRelationshipsDeleteSample.js][dependencyofrelationshipsdeletesample]                             | delete a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Delete.json                     |
| [dependencyOfRelationshipsGetSample.js][dependencyofrelationshipsgetsample]                                   | get a DependencyOfRelationship x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Get.json                           |
| [operationsListSample.js][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2023-09-01-preview/Operations_List_MaximumSet_Gen.json                    |
| [serviceGroupMemberRelationshipsCreateOrUpdateSample.js][servicegroupmemberrelationshipscreateorupdatesample] | create a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_CreateOrUpdate.json |
| [serviceGroupMemberRelationshipsDeleteSample.js][servicegroupmemberrelationshipsdeletesample]                 | delete a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Delete.json         |
| [serviceGroupMemberRelationshipsGetSample.js][servicegroupmemberrelationshipsgetsample]                       | get a ServiceGroupMemberRelationship x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Get.json               |

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
node dependencyOfRelationshipsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dependencyOfRelationshipsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dependencyofrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/dependencyOfRelationshipsCreateOrUpdateSample.js
[dependencyofrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/dependencyOfRelationshipsDeleteSample.js
[dependencyofrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/dependencyOfRelationshipsGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/operationsListSample.js
[servicegroupmemberrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/serviceGroupMemberRelationshipsCreateOrUpdateSample.js
[servicegroupmemberrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/serviceGroupMemberRelationshipsDeleteSample.js
[servicegroupmemberrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1-beta/javascript/serviceGroupMemberRelationshipsGetSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relationships?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relationships/arm-relationships/README.md
