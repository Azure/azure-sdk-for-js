# @azure/arm-koreaiartemis client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-koreaiartemis in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2026-07-01-preview/Operations_List.json                                                                                                                                                                                                                                                                                            |
| [organizationsCreateSample.js][organizationscreatesample]                               | create or update an Organization (long-running). x-ms-original-file: 2026-07-01-preview/Organizations_Create.json                                                                                                                                                                                                                                                                           |
| [organizationsDeleteSample.js][organizationsdeletesample]                               | delete an Organization (long-running). Permanently removes the Organization and cascades the deletion to all child Workspaces at the partner. This operation is irreversible. x-ms-original-file: 2026-07-01-preview/Organizations_Delete.json                                                                                                                                              |
| [organizationsGetSample.js][organizationsgetsample]                                     | get an Organization. x-ms-original-file: 2026-07-01-preview/Organizations_Get.json                                                                                                                                                                                                                                                                                                          |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample]     | list Organizations in a Resource Group. x-ms-original-file: 2026-07-01-preview/Organizations_ListByResourceGroup.json                                                                                                                                                                                                                                                                       |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]       | list Organizations in a Subscription. x-ms-original-file: 2026-07-01-preview/Organizations_ListBySubscription.json                                                                                                                                                                                                                                                                          |
| [organizationsListWorkspacesSample.js][organizationslistworkspacessample]               | lists all Workspaces in the Kore Organization, including Workspaces not managed through Liftr. This discovery operation uses POST because its response combines ARM-tracked Workspaces with Kore-only Workspaces that have no ARM resource ID and cannot be represented by the standard Workspaces collection GET. x-ms-original-file: 2026-07-01-preview/Organizations_ListWorkspaces.json |
| [organizationsUpdateSample.js][organizationsupdatesample]                               | update mutable properties of an Organization (long-running). x-ms-original-file: 2026-07-01-preview/Organizations_Update.json                                                                                                                                                                                                                                                               |
| [saaSOperationGroupActivateResourceSample.js][saasoperationgroupactivateresourcesample] | resolve the token to get the SaaS resource ID and activate the SaaS resource. x-ms-original-file: 2026-07-01-preview/SaaSOperationGroup_ActivateResource.json                                                                                                                                                                                                                               |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                     | create or update a Workspace under an Organization (long-running). x-ms-original-file: 2026-07-01-preview/Workspaces_CreateOrUpdate.json                                                                                                                                                                                                                                                    |
| [workspacesDeleteSample.js][workspacesdeletesample]                                     | delete a Workspace under an Organization (long-running). x-ms-original-file: 2026-07-01-preview/Workspaces_Delete.json                                                                                                                                                                                                                                                                      |
| [workspacesGetDetailsSample.js][workspacesgetdetailssample]                             | returns the complete Workspace details reported by Kore, including its projects. x-ms-original-file: 2026-07-01-preview/Workspaces_GetDetails.json                                                                                                                                                                                                                                          |
| [workspacesGetSample.js][workspacesgetsample]                                           | get a Workspace under an Organization. x-ms-original-file: 2026-07-01-preview/Workspaces_Get.json                                                                                                                                                                                                                                                                                           |
| [workspacesLinkSaaSSample.js][workspaceslinksaassample]                                 | links SaaS resources to the workspace. Accepts the full list of SaaS assets to be linked. x-ms-original-file: 2026-07-01-preview/Workspaces_LinkSaaS.json                                                                                                                                                                                                                                   |
| [workspacesListByOrganizationSample.js][workspaceslistbyorganizationsample]             | list Workspaces under an Organization. x-ms-original-file: 2026-07-01-preview/Workspaces_ListByOrganization.json                                                                                                                                                                                                                                                                            |
| [workspacesListLinkedSaaSSample.js][workspaceslistlinkedsaassample]                     | returns the list of SaaS resources linked to the workspace. x-ms-original-file: 2026-07-01-preview/Workspaces_ListLinkedSaaS.json                                                                                                                                                                                                                                                           |

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
node operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/operationsListSample.js
[organizationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsCreateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsDeleteSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsGetSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsListBySubscriptionSample.js
[organizationslistworkspacessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsListWorkspacesSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/organizationsUpdateSample.js
[saasoperationgroupactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/saaSOperationGroupActivateResourceSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesDeleteSample.js
[workspacesgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesGetDetailsSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesGetSample.js
[workspaceslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesLinkSaaSSample.js
[workspaceslistbyorganizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesListByOrganizationSample.js
[workspaceslistlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/koreaiartemis/arm-koreaiartemis/samples/v1-beta/javascript/workspacesListLinkedSaaSSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-koreaiartemis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/koreaiartemis/arm-koreaiartemis/README.md
