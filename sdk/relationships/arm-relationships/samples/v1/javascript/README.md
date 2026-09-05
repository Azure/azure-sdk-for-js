# @azure/arm-relationships client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-relationships in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [containsRelationshipsListByResourceGroupSample.js][containsrelationshipslistbyresourcegroupsample]                           | list ContainsRelationship resources by resource group x-ms-original-file: 2026-08-01/ContainsRelationships_ListByResourceGroup.json      |
| [containsRelationshipsListBySubscriptionSample.js][containsrelationshipslistbysubscriptionsample]                             | list ContainsRelationship resources by subscription ID x-ms-original-file: 2026-08-01/ContainsRelationships_ListBySubscription.json      |
| [dependencyOfRelationshipsByServiceGroupCreateOrUpdateSample.js][dependencyofrelationshipsbyservicegroupcreateorupdatesample] | create a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_CreateOrUpdate.json             |
| [dependencyOfRelationshipsByServiceGroupDeleteSample.js][dependencyofrelationshipsbyservicegroupdeletesample]                 | delete a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Delete.json                     |
| [dependencyOfRelationshipsByServiceGroupGetSample.js][dependencyofrelationshipsbyservicegroupgetsample]                       | get a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Get.json                           |
| [dependencyOfRelationshipsByServiceGroupListSample.js][dependencyofrelationshipsbyservicegrouplistsample]                     | list DependencyOfRelationship resources by scope x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_List.json        |
| [dependencyOfRelationshipsCreateOrUpdateSample.js][dependencyofrelationshipscreateorupdatesample]                             | create a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationships_CreateOrUpdate.json                           |
| [dependencyOfRelationshipsDeleteSample.js][dependencyofrelationshipsdeletesample]                                             | delete a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationships_Delete.json                                   |
| [dependencyOfRelationshipsGetSample.js][dependencyofrelationshipsgetsample]                                                   | get a DependencyOfRelationship x-ms-original-file: 2026-08-01/DependencyOfRelationships_Get.json                                         |
| [dependencyOfRelationshipsListByParentSample.js][dependencyofrelationshipslistbyparentsample]                                 | list DependencyOfRelationship resources by parent x-ms-original-file: 2026-08-01/DependencyOfRelationships_ListByParent.json             |
| [operationsListSample.js][operationslistsample]                                                                               | list the operations for the provider x-ms-original-file: 2026-08-01/Operations_List_MaximumSet_Gen.json                                  |
| [serviceGroupMemberRelationshipsCreateOrUpdateSample.js][servicegroupmemberrelationshipscreateorupdatesample]                 | create a ServiceGroupMemberRelationship x-ms-original-file: 2026-08-01/ServiceGroupMemberRelationships_CreateOrUpdate.json               |
| [serviceGroupMemberRelationshipsDeleteSample.js][servicegroupmemberrelationshipsdeletesample]                                 | delete a ServiceGroupMemberRelationship x-ms-original-file: 2026-08-01/ServiceGroupMemberRelationships_Delete.json                       |
| [serviceGroupMemberRelationshipsGetSample.js][servicegroupmemberrelationshipsgetsample]                                       | get a ServiceGroupMemberRelationship x-ms-original-file: 2026-08-01/ServiceGroupMemberRelationships_Get.json                             |
| [serviceGroupMemberRelationshipsListByParentSample.js][servicegroupmemberrelationshipslistbyparentsample]                     | list ServiceGroupMemberRelationship resources by parent x-ms-original-file: 2026-08-01/ServiceGroupMemberRelationships_ListByParent.json |

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
node containsRelationshipsListByResourceGroupSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node containsRelationshipsListByResourceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containsrelationshipslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/containsRelationshipsListByResourceGroupSample.js
[containsrelationshipslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/containsRelationshipsListBySubscriptionSample.js
[dependencyofrelationshipsbyservicegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsByServiceGroupCreateOrUpdateSample.js
[dependencyofrelationshipsbyservicegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsByServiceGroupDeleteSample.js
[dependencyofrelationshipsbyservicegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsByServiceGroupGetSample.js
[dependencyofrelationshipsbyservicegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsByServiceGroupListSample.js
[dependencyofrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsCreateOrUpdateSample.js
[dependencyofrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsDeleteSample.js
[dependencyofrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsGetSample.js
[dependencyofrelationshipslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/dependencyOfRelationshipsListByParentSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/operationsListSample.js
[servicegroupmemberrelationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/serviceGroupMemberRelationshipsCreateOrUpdateSample.js
[servicegroupmemberrelationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/serviceGroupMemberRelationshipsDeleteSample.js
[servicegroupmemberrelationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/serviceGroupMemberRelationshipsGetSample.js
[servicegroupmemberrelationshipslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relationships/arm-relationships/samples/v1/javascript/serviceGroupMemberRelationshipsListByParentSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relationships
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relationships/arm-relationships/README.md
