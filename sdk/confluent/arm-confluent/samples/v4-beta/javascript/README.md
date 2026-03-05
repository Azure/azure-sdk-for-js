# @azure/arm-confluent client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-confluent in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessCreateRoleBindingSample.js][accesscreaterolebindingsample]                                   | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_CreateRoleBinding_MaximumSet_Gen.json                                                                |
| [accessDeleteRoleBindingSample.js][accessdeleterolebindingsample]                                   | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_DeleteRoleBinding_MaximumSet_Gen.json                                                                |
| [accessInviteUserSample.js][accessinviteusersample]                                                 | invite user to the organization x-ms-original-file: 2025-08-18-preview/Access_InviteUser_MaximumSet_Gen.json                                                                  |
| [accessListClustersSample.js][accesslistclusterssample]                                             | cluster details x-ms-original-file: 2025-08-18-preview/Access_ListClusters_MaximumSet_Gen.json                                                                                |
| [accessListEnvironmentsSample.js][accesslistenvironmentssample]                                     | environment list of an organization x-ms-original-file: 2025-08-18-preview/Access_ListEnvironments_MaximumSet_Gen.json                                                        |
| [accessListInvitationsSample.js][accesslistinvitationssample]                                       | organization accounts invitation details x-ms-original-file: 2025-08-18-preview/Access_ListInvitations_MaximumSet_Gen.json                                                    |
| [accessListRoleBindingNameListSample.js][accesslistrolebindingnamelistsample]                       | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindingNameList_MaximumSet_Gen.json                                                          |
| [accessListRoleBindingsSample.js][accesslistrolebindingssample]                                     | organization role bindings x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindings_MaximumSet_Gen.json                                                                 |
| [accessListServiceAccountsSample.js][accesslistserviceaccountssample]                               | organization service accounts details x-ms-original-file: 2025-08-18-preview/Access_ListServiceAccounts_MaximumSet_Gen.json                                                   |
| [accessListUsersSample.js][accesslistuserssample]                                                   | organization users details x-ms-original-file: 2025-08-18-preview/Access_ListUsers_MaximumSet_Gen.json                                                                        |
| [clusterCreateOrUpdateSample.js][clustercreateorupdatesample]                                       | create confluent clusters x-ms-original-file: 2025-08-18-preview/Cluster_CreateOrUpdate_MaximumSet_Gen.json                                                                   |
| [clusterDeleteSample.js][clusterdeletesample]                                                       | delete confluent cluster by id x-ms-original-file: 2025-08-18-preview/Cluster_Delete_MaximumSet_Gen.json                                                                      |
| [connectorCreateOrUpdateSample.js][connectorcreateorupdatesample]                                   | create confluent connector by Name x-ms-original-file: 2025-08-18-preview/Connector_CreateOrUpdate_MaximumSet_Gen.json                                                        |
| [connectorDeleteSample.js][connectordeletesample]                                                   | delete confluent connector by name x-ms-original-file: 2025-08-18-preview/Connector_Delete_MaximumSet_Gen.json                                                                |
| [connectorGetSample.js][connectorgetsample]                                                         | get confluent connector by Name x-ms-original-file: 2025-08-18-preview/Connector_Get_MaximumSet_Gen.json                                                                      |
| [connectorListSample.js][connectorlistsample]                                                       | lists all the connectors in a cluster x-ms-original-file: 2025-08-18-preview/Connector_List_MaximumSet_Gen.json                                                               |
| [environmentCreateOrUpdateSample.js][environmentcreateorupdatesample]                               | create confluent environment x-ms-original-file: 2025-08-18-preview/Environment_CreateOrUpdate_MaximumSet_Gen.json                                                            |
| [environmentDeleteSample.js][environmentdeletesample]                                               | delete confluent environment by id x-ms-original-file: 2025-08-18-preview/Environment_Delete_MaximumSet_Gen.json                                                              |
| [marketplaceAgreementsCreateSample.js][marketplaceagreementscreatesample]                           | create Confluent Marketplace agreement in the subscription. x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_Create_MaximumSet_Gen.json                           |
| [marketplaceAgreementsListSample.js][marketplaceagreementslistsample]                               | list Confluent marketplace agreements in the subscription. x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_List_MaximumSet_Gen.json                              |
| [organizationCreateSample.js][organizationcreatesample]                                             | create Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Create_MaximumSet_Gen.json                                                                   |
| [organizationDONOTNormalizeCreateAPIKeySample.js][organizationdonotnormalizecreateapikeysample]     | creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment x-ms-original-file: 2025-08-18-preview/Organization_CreateAPIKey_MaximumSet_Gen.json |
| [organizationDeleteClusterAPIKeySample.js][organizationdeleteclusterapikeysample]                   | deletes API key of a kafka or schema registry cluster x-ms-original-file: 2025-08-18-preview/Organization_DeleteClusterAPIKey_MaximumSet_Gen.json                             |
| [organizationDeleteSample.js][organizationdeletesample]                                             | delete Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Delete_MaximumSet_Gen.json                                                                   |
| [organizationGetClusterAPIKeySample.js][organizationgetclusterapikeysample]                         | get API key details of a kafka or schema registry cluster x-ms-original-file: 2025-08-18-preview/Organization_GetClusterAPIKey_MaximumSet_Gen.json                            |
| [organizationGetClusterByIdSample.js][organizationgetclusterbyidsample]                             | get cluster by Id x-ms-original-file: 2025-08-18-preview/Organization_GetClusterById_MaximumSet_Gen.json                                                                      |
| [organizationGetEnvironmentByIdSample.js][organizationgetenvironmentbyidsample]                     | get Environment details by environment Id x-ms-original-file: 2025-08-18-preview/Organization_GetEnvironmentById_MaximumSet_Gen.json                                          |
| [organizationGetSample.js][organizationgetsample]                                                   | get the properties of a specific Organization resource. x-ms-original-file: 2025-08-18-preview/Organization_Get_MaximumSet_Gen.json                                           |
| [organizationGetSchemaRegistryClusterByIdSample.js][organizationgetschemaregistryclusterbyidsample] | get schema registry cluster by Id x-ms-original-file: 2025-08-18-preview/Organization_GetSchemaRegistryClusterById_MaximumSet_Gen.json                                        |
| [organizationListByResourceGroupSample.js][organizationlistbyresourcegroupsample]                   | list all Organizations under the specified resource group. x-ms-original-file: 2025-08-18-preview/Organization_ListByResourceGroup_MaximumSet_Gen.json                        |
| [organizationListBySubscriptionSample.js][organizationlistbysubscriptionsample]                     | list all organizations under the specified subscription. x-ms-original-file: 2025-08-18-preview/Organization_ListBySubscription_MaximumSet_Gen.json                           |
| [organizationListClustersSample.js][organizationlistclusterssample]                                 | lists of all the clusters in a environment x-ms-original-file: 2025-08-18-preview/Organization_ListClusters_MaximumSet_Gen.json                                               |
| [organizationListEnvironmentsSample.js][organizationlistenvironmentssample]                         | lists of all the environments in a organization x-ms-original-file: 2025-08-18-preview/Organization_ListEnvironments_MaximumSet_Gen.json                                      |
| [organizationListRegionsSample.js][organizationlistregionssample]                                   | cloud provider regions available for creating Schema Registry clusters. x-ms-original-file: 2025-08-18-preview/Organization_ListRegions_MaximumSet_Gen.json                   |
| [organizationListSchemaRegistryClustersSample.js][organizationlistschemaregistryclusterssample]     | get schema registry clusters x-ms-original-file: 2025-08-18-preview/Organization_ListSchemaRegistryClusters_MaximumSet_Gen.json                                               |
| [organizationOperationsListSample.js][organizationoperationslistsample]                             | list the operations for the provider x-ms-original-file: 2025-08-18-preview/OrganizationOperations_List_MaximumSet_Gen.json                                                   |
| [organizationUpdateSample.js][organizationupdatesample]                                             | update Organization resource x-ms-original-file: 2025-08-18-preview/Organization_Update_MaximumSet_Gen.json                                                                   |
| [topicsCreateSample.js][topicscreatesample]                                                         | create confluent topics by Name x-ms-original-file: 2025-08-18-preview/Topics_Create_MaximumSet_Gen.json                                                                      |
| [topicsDeleteSample.js][topicsdeletesample]                                                         | delete confluent topic by name x-ms-original-file: 2025-08-18-preview/Topics_Delete_MaximumSet_Gen.json                                                                       |
| [topicsGetSample.js][topicsgetsample]                                                               | get confluent topic by Name x-ms-original-file: 2025-08-18-preview/Topics_Get_MaximumSet_Gen.json                                                                             |
| [topicsListSample.js][topicslistsample]                                                             | lists of all the topics in a clusters x-ms-original-file: 2025-08-18-preview/Topics_List_MaximumSet_Gen.json                                                                  |
| [validationsValidateOrganizationSample.js][validationsvalidateorganizationsample]                   | organization Validate proxy resource x-ms-original-file: 2025-08-18-preview/Validations_ValidateOrganization_MaximumSet_Gen.json                                              |
| [validationsValidateOrganizationV2Sample.js][validationsvalidateorganizationv2sample]               | organization Validate proxy resource x-ms-original-file: 2025-08-18-preview/Validations_ValidateOrganizationV2_MaximumSet_Gen.json                                            |

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
node accessCreateRoleBindingSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node accessCreateRoleBindingSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesscreaterolebindingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessCreateRoleBindingSample.js
[accessdeleterolebindingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessDeleteRoleBindingSample.js
[accessinviteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessInviteUserSample.js
[accesslistclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListClustersSample.js
[accesslistenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListEnvironmentsSample.js
[accesslistinvitationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListInvitationsSample.js
[accesslistrolebindingnamelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListRoleBindingNameListSample.js
[accesslistrolebindingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListRoleBindingsSample.js
[accesslistserviceaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListServiceAccountsSample.js
[accesslistuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/accessListUsersSample.js
[clustercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/clusterCreateOrUpdateSample.js
[clusterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/clusterDeleteSample.js
[connectorcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/connectorCreateOrUpdateSample.js
[connectordeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/connectorDeleteSample.js
[connectorgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/connectorGetSample.js
[connectorlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/connectorListSample.js
[environmentcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/environmentCreateOrUpdateSample.js
[environmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/environmentDeleteSample.js
[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/marketplaceAgreementsCreateSample.js
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/marketplaceAgreementsListSample.js
[organizationcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationCreateSample.js
[organizationdonotnormalizecreateapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationDONOTNormalizeCreateAPIKeySample.js
[organizationdeleteclusterapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationDeleteClusterAPIKeySample.js
[organizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationDeleteSample.js
[organizationgetclusterapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationGetClusterAPIKeySample.js
[organizationgetclusterbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationGetClusterByIdSample.js
[organizationgetenvironmentbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationGetEnvironmentByIdSample.js
[organizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationGetSample.js
[organizationgetschemaregistryclusterbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationGetSchemaRegistryClusterByIdSample.js
[organizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListByResourceGroupSample.js
[organizationlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListBySubscriptionSample.js
[organizationlistclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListClustersSample.js
[organizationlistenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListEnvironmentsSample.js
[organizationlistregionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListRegionsSample.js
[organizationlistschemaregistryclusterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationListSchemaRegistryClustersSample.js
[organizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationOperationsListSample.js
[organizationupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/organizationUpdateSample.js
[topicscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/topicsCreateSample.js
[topicsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/topicsDeleteSample.js
[topicsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/topicsGetSample.js
[topicslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/topicsListSample.js
[validationsvalidateorganizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/validationsValidateOrganizationSample.js
[validationsvalidateorganizationv2sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v4-beta/javascript/validationsValidateOrganizationV2Sample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-confluent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confluent/arm-confluent/README.md
