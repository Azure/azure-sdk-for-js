# @azure/arm-confluent client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-confluent in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessCreateRoleBindingSample.ts][accesscreaterolebindingsample]                                   | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_CreateRoleBinding_MaximumSet_Gen.json                                                                |
| [accessDeleteRoleBindingSample.ts][accessdeleterolebindingsample]                                   | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_DeleteRoleBinding_MaximumSet_Gen.json                                                                |
| [accessInviteUserSample.ts][accessinviteusersample]                                                 | invite user to the organization x-ms-original-file: 2025-08-18-preview/Access_InviteUser_MaximumSet_Gen.json                                                                  |
| [accessListClustersSample.ts][accesslistclusterssample]                                             | cluster details x-ms-original-file: 2025-08-18-preview/Access_ListClusters_MaximumSet_Gen.json                                                                                |
| [accessListEnvironmentsSample.ts][accesslistenvironmentssample]                                     | environment list of an organization x-ms-original-file: 2025-08-18-preview/Access_ListEnvironments_MaximumSet_Gen.json                                                        |
| [accessListInvitationsSample.ts][accesslistinvitationssample]                                       | organization accounts invitation details x-ms-original-file: 2025-08-18-preview/Access_ListInvitations_MaximumSet_Gen.json                                                    |
| [accessListRoleBindingNameListSample.ts][accesslistrolebindingnamelistsample]                       | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindingNameList_MaximumSet_Gen.json                                                          |
| [accessListRoleBindingsSample.ts][accesslistrolebindingssample]                                     | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindings_MaximumSet_Gen.json                                                                 |
| [accessListServiceAccountsSample.ts][accesslistserviceaccountssample]                               | organization service accounts details x-ms-original-file: 2025-08-18-preview/Access_ListServiceAccounts_MaximumSet_Gen.json                                                   |
| [accessListUsersSample.ts][accesslistuserssample]                                                   | organization users details x-ms-original-file: 2025-08-18-preview/Access_ListUsers_MaximumSet_Gen.json                                                                        |
| [clusterCreateOrUpdateSample.ts][clustercreateorupdatesample]                                       | create confluent clusters x-ms-original-file: 2025-08-18-preview/Cluster_CreateOrUpdate_MaximumSet_Gen.json                                                                   |
| [clusterDeleteSample.ts][clusterdeletesample]                                                       | delete confluent cluster by id x-ms-original-file: 2025-08-18-preview/Cluster_Delete_MaximumSet_Gen.json                                                                      |
| [connectorCreateOrUpdateSample.ts][connectorcreateorupdatesample]                                   | create confluent connector by Name x-ms-original-file: 2025-08-18-preview/Connector_CreateOrUpdate_MaximumSet_Gen.json                                                        |
| [connectorDeleteSample.ts][connectordeletesample]                                                   | delete confluent connector by name x-ms-original-file: 2025-08-18-preview/Connector_Delete_MaximumSet_Gen.json                                                                |
| [connectorGetSample.ts][connectorgetsample]                                                         | get confluent connector by Name x-ms-original-file: 2025-08-18-preview/Connector_Get_MaximumSet_Gen.json                                                                      |
| [connectorListSample.ts][connectorlistsample]                                                       | lists all the connectors in a cluster x-ms-original-file: 2025-08-18-preview/Connector_List_MaximumSet_Gen.json                                                               |
| [environmentCreateOrUpdateSample.ts][environmentcreateorupdatesample]                               | create confluent environment x-ms-original-file: 2025-08-18-preview/Environment_CreateOrUpdate_MaximumSet_Gen.json                                                            |
| [environmentDeleteSample.ts][environmentdeletesample]                                               | delete confluent environment by id x-ms-original-file: 2025-08-18-preview/Environment_Delete_MaximumSet_Gen.json                                                              |
| [marketplaceAgreementsCreateSample.ts][marketplaceagreementscreatesample]                           | create Confluent Marketplace agreement in the subscription. x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_Create_MaximumSet_Gen.json                           |
| [marketplaceAgreementsListSample.ts][marketplaceagreementslistsample]                               | list Confluent marketplace agreements in the subscription. x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_List_MaximumSet_Gen.json                              |
| [organizationCreateAPIKeySample.ts][organizationcreateapikeysample]                                 | creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment x-ms-original-file: 2025-08-18-preview/Organization_CreateAPIKey_MaximumSet_Gen.json |
| [organizationCreateSample.ts][organizationcreatesample]                                             | create Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Create_MaximumSet_Gen.json                                                                   |
| [organizationDeleteClusterAPIKeySample.ts][organizationdeleteclusterapikeysample]                   | deletes API key of a kafka or schema registry cluster x-ms-original-file: 2025-08-18-preview/Organization_DeleteClusterAPIKey_MaximumSet_Gen.json                             |
| [organizationDeleteSample.ts][organizationdeletesample]                                             | delete Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Delete_MaximumSet_Gen.json                                                                   |
| [organizationGetClusterAPIKeySample.ts][organizationgetclusterapikeysample]                         | get API key details of a kafka or schema registry cluster x-ms-original-file: 2025-08-18-preview/Organization_GetClusterAPIKey_MaximumSet_Gen.json                            |
| [organizationGetClusterByIdSample.ts][organizationgetclusterbyidsample]                             | get cluster by Id x-ms-original-file: 2025-08-18-preview/Organization_GetClusterById_MaximumSet_Gen.json                                                                      |
| [organizationGetEnvironmentByIdSample.ts][organizationgetenvironmentbyidsample]                     | get Environment details by environment Id x-ms-original-file: 2025-08-18-preview/Organization_GetEnvironmentById_MaximumSet_Gen.json                                          |
| [organizationGetSample.ts][organizationgetsample]                                                   | get the properties of a specific Organization resource. x-ms-original-file: 2025-08-18-preview/Organization_Get_MaximumSet_Gen.json                                           |
| [organizationGetSchemaRegistryClusterByIdSample.ts][organizationgetschemaregistryclusterbyidsample] | get schema registry cluster by Id x-ms-original-file: 2025-08-18-preview/Organization_GetSchemaRegistryClusterById_MaximumSet_Gen.json                                        |
| [organizationListByResourceGroupSample.ts][organizationlistbyresourcegroupsample]                   | list all Organizations under the specified resource group. x-ms-original-file: 2025-08-18-preview/Organization_ListByResourceGroup_MaximumSet_Gen.json                        |
| [organizationListBySubscriptionSample.ts][organizationlistbysubscriptionsample]                     | list all organizations under the specified subscription. x-ms-original-file: 2025-08-18-preview/Organization_ListBySubscription_MaximumSet_Gen.json                           |
| [organizationListClustersSample.ts][organizationlistclusterssample]                                 | lists of all the clusters in a environment x-ms-original-file: 2025-08-18-preview/Organization_ListClusters_MaximumSet_Gen.json                                               |
| [organizationListEnvironmentsSample.ts][organizationlistenvironmentssample]                         | lists of all the environments in a organization x-ms-original-file: 2025-08-18-preview/Organization_ListEnvironments_MaximumSet_Gen.json                                      |
| [organizationListRegionsSample.ts][organizationlistregionssample]                                   | cloud provider regions available for creating Schema Registry clusters. x-ms-original-file: 2025-08-18-preview/Organization_ListRegions_MaximumSet_Gen.json                   |
| [organizationListSchemaRegistryClustersSample.ts][organizationlistschemaregistryclusterssample]     | get schema registry clusters x-ms-original-file: 2025-08-18-preview/Organization_ListSchemaRegistryClusters_MaximumSet_Gen.json                                               |
| [organizationOperationsListSample.ts][organizationoperationslistsample]                             | list the operations for the provider x-ms-original-file: 2025-08-18-preview/OrganizationOperations_List_MaximumSet_Gen.json                                                   |
| [organizationUpdateSample.ts][organizationupdatesample]                                             | update Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Update_MaximumSet_Gen.json                                                                   |
| [topicsCreateSample.ts][topicscreatesample]                                                         | create confluent topics by Name x-ms-original-file: 2025-08-18-preview/Topics_Create_MaximumSet_Gen.json                                                                      |
| [topicsDeleteSample.ts][topicsdeletesample]                                                         | delete confluent topic by name x-ms-original-file: 2025-08-18-preview/Topics_Delete_MaximumSet_Gen.json                                                                       |
| [topicsGetSample.ts][topicsgetsample]                                                               | get confluent topic by Name x-ms-original-file: 2025-08-18-preview/Topics_Get_MaximumSet_Gen.json                                                                             |
| [topicsListSample.ts][topicslistsample]                                                             | lists of all the topics in a clusters x-ms-original-file: 2025-08-18-preview/Topics_List_MaximumSet_Gen.json                                                                  |
| [validationsValidateOrganizationSample.ts][validationsvalidateorganizationsample]                   | organization Validate proxy resource x-ms-original-file: 2025-08-18-preview/Validations_ValidateOrganization_MaximumSet_Gen.json                                              |
| [validationsValidateOrganizationV2Sample.ts][validationsvalidateorganizationv2sample]               | organization Validate proxy resource x-ms-original-file: 2025-08-18-preview/Validations_ValidateOrganizationV2_MaximumSet_Gen.json                                            |

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
node dist/accessCreateRoleBindingSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accessCreateRoleBindingSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesscreaterolebindingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessCreateRoleBindingSample.ts
[accessdeleterolebindingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessDeleteRoleBindingSample.ts
[accessinviteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessInviteUserSample.ts
[accesslistclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListClustersSample.ts
[accesslistenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListEnvironmentsSample.ts
[accesslistinvitationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListInvitationsSample.ts
[accesslistrolebindingnamelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListRoleBindingNameListSample.ts
[accesslistrolebindingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListRoleBindingsSample.ts
[accesslistserviceaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListServiceAccountsSample.ts
[accesslistuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/accessListUsersSample.ts
[clustercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/clusterCreateOrUpdateSample.ts
[clusterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/clusterDeleteSample.ts
[connectorcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/connectorCreateOrUpdateSample.ts
[connectordeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/connectorDeleteSample.ts
[connectorgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/connectorGetSample.ts
[connectorlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/connectorListSample.ts
[environmentcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/environmentCreateOrUpdateSample.ts
[environmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/environmentDeleteSample.ts
[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/marketplaceAgreementsCreateSample.ts
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/marketplaceAgreementsListSample.ts
[organizationcreateapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationCreateAPIKeySample.ts
[organizationcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationCreateSample.ts
[organizationdeleteclusterapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationDeleteClusterAPIKeySample.ts
[organizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationDeleteSample.ts
[organizationgetclusterapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationGetClusterAPIKeySample.ts
[organizationgetclusterbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationGetClusterByIdSample.ts
[organizationgetenvironmentbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationGetEnvironmentByIdSample.ts
[organizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationGetSample.ts
[organizationgetschemaregistryclusterbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationGetSchemaRegistryClusterByIdSample.ts
[organizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListByResourceGroupSample.ts
[organizationlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListBySubscriptionSample.ts
[organizationlistclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListClustersSample.ts
[organizationlistenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListEnvironmentsSample.ts
[organizationlistregionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListRegionsSample.ts
[organizationlistschemaregistryclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationListSchemaRegistryClustersSample.ts
[organizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationOperationsListSample.ts
[organizationupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationUpdateSample.ts
[topicscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/topicsCreateSample.ts
[topicsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/topicsDeleteSample.ts
[topicsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/topicsGetSample.ts
[topicslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/topicsListSample.ts
[validationsvalidateorganizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/validationsValidateOrganizationSample.ts
[validationsvalidateorganizationv2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/validationsValidateOrganizationV2Sample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-confluent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confluent/arm-confluent/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
