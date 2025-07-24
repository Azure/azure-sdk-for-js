# @azure/arm-confluent client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-confluent in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessCreateRoleBindingSample.ts][accesscreaterolebindingsample]                                   | organization role bindings x-ms-original-file: 2024-07-01/Access_CreateRoleBinding.json                                                                       |
| [accessDeleteRoleBindingSample.ts][accessdeleterolebindingsample]                                   | organization role bindings x-ms-original-file: 2024-07-01/Access_DeleteRoleBinding.json                                                                       |
| [accessInviteUserSample.ts][accessinviteusersample]                                                 | invite user to the organization x-ms-original-file: 2024-07-01/Access_InviteUser.json                                                                         |
| [accessListClustersSample.ts][accesslistclusterssample]                                             | cluster details x-ms-original-file: 2024-07-01/Access_ClusterList.json                                                                                        |
| [accessListEnvironmentsSample.ts][accesslistenvironmentssample]                                     | environment list of an organization x-ms-original-file: 2024-07-01/Access_EnvironmentList.json                                                                |
| [accessListInvitationsSample.ts][accesslistinvitationssample]                                       | organization accounts invitation details x-ms-original-file: 2024-07-01/Access_InvitationsList.json                                                           |
| [accessListRoleBindingNameListSample.ts][accesslistrolebindingnamelistsample]                       | organization role bindings x-ms-original-file: 2024-07-01/Access_RoleBindingNameList.json                                                                     |
| [accessListRoleBindingsSample.ts][accesslistrolebindingssample]                                     | organization role bindings x-ms-original-file: 2024-07-01/Access_RoleBindingList.json                                                                         |
| [accessListServiceAccountsSample.ts][accesslistserviceaccountssample]                               | organization service accounts details x-ms-original-file: 2024-07-01/Access_ServiceAccountsList.json                                                          |
| [accessListUsersSample.ts][accesslistuserssample]                                                   | organization users details x-ms-original-file: 2024-07-01/Access_UsersList.json                                                                               |
| [clusterCreateOrUpdateSample.ts][clustercreateorupdatesample]                                       | create confluent clusters x-ms-original-file: 2024-07-01/Cluster_Create.json                                                                                  |
| [clusterDeleteSample.ts][clusterdeletesample]                                                       | delete confluent cluster by id x-ms-original-file: 2024-07-01/Cluster_Delete.json                                                                             |
| [connectorCreateOrUpdateSample.ts][connectorcreateorupdatesample]                                   | create confluent connector by Name x-ms-original-file: 2024-07-01/Organization_CreateConnectorByName.json                                                     |
| [connectorDeleteSample.ts][connectordeletesample]                                                   | delete confluent connector by name x-ms-original-file: 2024-07-01/Organization_DeleteConnectorByName.json                                                     |
| [connectorGetSample.ts][connectorgetsample]                                                         | get confluent connector by Name x-ms-original-file: 2024-07-01/Organization_GetConnectorByName.json                                                           |
| [connectorListSample.ts][connectorlistsample]                                                       | lists all the connectors in a cluster x-ms-original-file: 2024-07-01/Organization_ConnectorList.json                                                          |
| [environmentCreateOrUpdateSample.ts][environmentcreateorupdatesample]                               | create confluent environment x-ms-original-file: 2024-07-01/Environment_Create.json                                                                           |
| [environmentDeleteSample.ts][environmentdeletesample]                                               | delete confluent environment by id x-ms-original-file: 2024-07-01/Environment_Delete.json                                                                     |
| [marketplaceAgreementsCreateSample.ts][marketplaceagreementscreatesample]                           | create Confluent Marketplace agreement in the subscription. x-ms-original-file: 2024-07-01/MarketplaceAgreements_Create.json                                  |
| [marketplaceAgreementsListSample.ts][marketplaceagreementslistsample]                               | list Confluent marketplace agreements in the subscription. x-ms-original-file: 2024-07-01/MarketplaceAgreements_List.json                                     |
| [organizationCreateApiKeySample.ts][organizationcreateapikeysample]                                 | creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment x-ms-original-file: 2024-07-01/Organization_CreateClusterAPIKey.json |
| [organizationCreateSample.ts][organizationcreatesample]                                             | create Organization resource x-ms-original-file: 2024-07-01/Organization_Create.json                                                                          |
| [organizationDeleteClusterAPIKeySample.ts][organizationdeleteclusterapikeysample]                   | deletes API key of a kafka or schema registry cluster x-ms-original-file: 2024-07-01/Organization_DeleteClusterAPIKey.json                                    |
| [organizationDeleteSample.ts][organizationdeletesample]                                             | delete Organization resource x-ms-original-file: 2024-07-01/Organization_Delete.json                                                                          |
| [organizationGetClusterAPIKeySample.ts][organizationgetclusterapikeysample]                         | get API key details of a kafka or schema registry cluster x-ms-original-file: 2024-07-01/Organization_GetClusterAPIKey.json                                   |
| [organizationGetClusterByIdSample.ts][organizationgetclusterbyidsample]                             | get cluster by Id x-ms-original-file: 2024-07-01/Organization_GetClusterById.json                                                                             |
| [organizationGetEnvironmentByIdSample.ts][organizationgetenvironmentbyidsample]                     | get Environment details by environment Id x-ms-original-file: 2024-07-01/Organization_GetEnvironmentById.json                                                 |
| [organizationGetSample.ts][organizationgetsample]                                                   | get the properties of a specific Organization resource. x-ms-original-file: 2024-07-01/Organization_Get.json                                                  |
| [organizationGetSchemaRegistryClusterByIdSample.ts][organizationgetschemaregistryclusterbyidsample] | get schema registry cluster by Id x-ms-original-file: 2024-07-01/Organization_GetSchemaRegistryClusterById.json                                               |
| [organizationListByResourceGroupSample.ts][organizationlistbyresourcegroupsample]                   | list all Organizations under the specified resource group. x-ms-original-file: 2024-07-01/Organization_ListByResourceGroup.json                               |
| [organizationListBySubscriptionSample.ts][organizationlistbysubscriptionsample]                     | list all organizations under the specified subscription. x-ms-original-file: 2024-07-01/Organization_ListBySubscription.json                                  |
| [organizationListClustersSample.ts][organizationlistclusterssample]                                 | lists of all the clusters in a environment x-ms-original-file: 2024-07-01/Organization_ClusterList.json                                                       |
| [organizationListEnvironmentsSample.ts][organizationlistenvironmentssample]                         | lists of all the environments in a organization x-ms-original-file: 2024-07-01/Organization_EnvironmentList.json                                              |
| [organizationListRegionsSample.ts][organizationlistregionssample]                                   | cloud provider regions available for creating Schema Registry clusters. x-ms-original-file: 2024-07-01/Organization_ListRegions.json                          |
| [organizationListSchemaRegistryClustersSample.ts][organizationlistschemaregistryclusterssample]     | get schema registry clusters x-ms-original-file: 2024-07-01/Organization_ListSchemaRegistryClusters.json                                                      |
| [organizationOperationsListSample.ts][organizationoperationslistsample]                             | list the operations for the provider x-ms-original-file: 2024-07-01/OrganizationOperations_List.json                                                          |
| [organizationUpdateSample.ts][organizationupdatesample]                                             | update Organization resource x-ms-original-file: 2024-07-01/Organization_Update.json                                                                          |
| [topicsCreateSample.ts][topicscreatesample]                                                         | create confluent topics by Name x-ms-original-file: 2024-07-01/Topics_Create.json                                                                             |
| [topicsDeleteSample.ts][topicsdeletesample]                                                         | delete confluent topic by name x-ms-original-file: 2024-07-01/Topics_Delete.json                                                                              |
| [topicsGetSample.ts][topicsgetsample]                                                               | get confluent topic by Name x-ms-original-file: 2024-07-01/Topics_Get.json                                                                                    |
| [topicsListSample.ts][topicslistsample]                                                             | lists of all the topics in a clusters x-ms-original-file: 2024-07-01/Organization_TopicList.json                                                              |
| [validationsValidateOrganizationSample.ts][validationsvalidateorganizationsample]                   | organization Validate proxy resource x-ms-original-file: 2024-07-01/Validations_ValidateOrganizations.json                                                    |
| [validationsValidateOrganizationV2Sample.ts][validationsvalidateorganizationv2sample]               | organization Validate proxy resource x-ms-original-file: 2024-07-01/Validations_ValidateOrganizationsV2.json                                                  |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/accessCreateRoleBindingSample.js
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
[organizationcreateapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/typescript/src/organizationCreateApiKeySample.ts
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
