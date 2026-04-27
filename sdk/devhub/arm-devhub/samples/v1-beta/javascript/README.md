# @azure/arm-devhub client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-devhub in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                   |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [adooAuthGetSample.js][adooauthgetsample]                                           | callback URL to hit once authenticated with Entra ID to have the service store the OAuth token. x-ms-original-file: 2025-03-01-preview/ADOOAuthDefault.json       |
| [adooAuthListSample.js][adooauthlistsample]                                         | callback URL to hit once authenticated with ADO to have the service store the OAuth token. x-ms-original-file: 2025-03-01-preview/ADOOAuthList.json               |
| [adooAuthResponsesGetAdooAuthInfoSample.js][adooauthresponsesgetadooauthinfosample] | gets ADOOAuth info used to authenticate users with ADO. x-ms-original-file: 2025-03-01-preview/ADOOAuthInfo.json                                                  |
| [generatePreviewArtifactsSample.js][generatepreviewartifactssample]                 | generate preview dockerfile and manifests. x-ms-original-file: 2025-03-01-preview/GeneratePreviewArtifacts.json                                                   |
| [gitHubOAuthCallbackSample.js][githuboauthcallbacksample]                           | callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: 2025-03-01-preview/GitHubOAuthCallback.json |
| [gitHubOAuthSample.js][githuboauthsample]                                           | gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App. x-ms-original-file: 2025-03-01-preview/GitHubOAuth.json                       |
| [iacProfilesCreateOrUpdateSample.js][iacprofilescreateorupdatesample]               | creates or updates a IacProfile x-ms-original-file: 2025-03-01-preview/IacProfile_CreateOrUpdate.json                                                             |
| [iacProfilesDeleteSample.js][iacprofilesdeletesample]                               | deletes a IacProfile x-ms-original-file: 2025-03-01-preview/IacProfile_Delete.json                                                                                |
| [iacProfilesExportSample.js][iacprofilesexportsample]                               | export a template x-ms-original-file: 2025-03-01-preview/IacProfile_ExportTemplate.json                                                                           |
| [iacProfilesGetSample.js][iacprofilesgetsample]                                     | gets a IacProfile. x-ms-original-file: 2025-03-01-preview/IacProfile_Get.json                                                                                     |
| [iacProfilesListByResourceGroupSample.js][iacprofileslistbyresourcegroupsample]     | gets a list of iacProfiles within a resource group. x-ms-original-file: 2025-03-01-preview/IacProfile_ListByResourceGroup.json                                    |
| [iacProfilesListSample.js][iacprofileslistsample]                                   | gets a list of IacProfiles associated with the specified subscription. x-ms-original-file: 2025-03-01-preview/IacProfile_List.json                                |
| [iacProfilesScaleSample.js][iacprofilesscalesample]                                 | scale by template x-ms-original-file: 2025-03-01-preview/IacProfile_ScaleTemplate.json                                                                            |
| [iacProfilesSyncSample.js][iacprofilessyncsample]                                   | sync template x-ms-original-file: 2025-03-01-preview/IacProfile_SyncTemplate.json                                                                                 |
| [iacProfilesUpdateTagsSample.js][iacprofilesupdatetagssample]                       | updates tags on a IacProfile. x-ms-original-file: 2025-03-01-preview/IacProfile_UpdateTags.json                                                                   |
| [listGitHubOAuthSample.js][listgithuboauthsample]                                   | callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: 2025-03-01-preview/GitHubOAuth_List.json    |
| [operationsListSample.js][operationslistsample]                                     | returns list of operations. x-ms-original-file: 2025-03-01-preview/Operation_List.json                                                                            |
| [templateGetSample.js][templategetsample]                                           | gets a list of supported templates. x-ms-original-file: 2025-03-01-preview/Template_Get.json                                                                      |
| [templateListSample.js][templatelistsample]                                         | gets a list of supported templates. x-ms-original-file: 2025-03-01-preview/Template_List.json                                                                     |
| [versionedTemplateGenerateSample.js][versionedtemplategeneratesample]               | generates a VersionedTemplate. x-ms-original-file: 2025-03-01-preview/VersionedTemplate_Generate.json                                                             |
| [versionedTemplateGetSample.js][versionedtemplategetsample]                         | gets a VersionedTemplate. x-ms-original-file: 2025-03-01-preview/VersionedTemplate_Get.json                                                                       |
| [versionedTemplateListSample.js][versionedtemplatelistsample]                       | gets a list of VersionedTemplate. x-ms-original-file: 2025-03-01-preview/VersionedTemplate_List.json                                                              |
| [workflowCreateOrUpdateSample.js][workflowcreateorupdatesample]                     | creates or updates a workflow x-ms-original-file: 2025-03-01-preview/Workflow_CreateOrUpdate.json                                                                 |
| [workflowDeleteSample.js][workflowdeletesample]                                     | deletes a workflow x-ms-original-file: 2025-03-01-preview/Workflow_Delete.json                                                                                    |
| [workflowGetSample.js][workflowgetsample]                                           | gets a workflow. x-ms-original-file: 2025-03-01-preview/Workflow_Get.json                                                                                         |
| [workflowListByResourceGroupSample.js][workflowlistbyresourcegroupsample]           | gets a list of workflows within a resource group. x-ms-original-file: 2025-03-01-preview/Workflow_ListByResourceGroup.json                                        |
| [workflowListSample.js][workflowlistsample]                                         | gets a list of workflows associated with the specified subscription. x-ms-original-file: 2025-03-01-preview/Workflow_List.json                                    |
| [workflowUpdateTagsSample.js][workflowupdatetagssample]                             | updates tags on a workflow. x-ms-original-file: 2025-03-01-preview/Workflow_UpdateTags.json                                                                       |

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
node adooAuthGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node adooAuthGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[adooauthgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/adooAuthGetSample.js
[adooauthlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/adooAuthListSample.js
[adooauthresponsesgetadooauthinfosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/adooAuthResponsesGetAdooAuthInfoSample.js
[generatepreviewartifactssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/generatePreviewArtifactsSample.js
[githuboauthcallbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/gitHubOAuthCallbackSample.js
[githuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/gitHubOAuthSample.js
[iacprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesCreateOrUpdateSample.js
[iacprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesDeleteSample.js
[iacprofilesexportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesExportSample.js
[iacprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesGetSample.js
[iacprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesListByResourceGroupSample.js
[iacprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesListSample.js
[iacprofilesscalesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesScaleSample.js
[iacprofilessyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesSyncSample.js
[iacprofilesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/iacProfilesUpdateTagsSample.js
[listgithuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/listGitHubOAuthSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/operationsListSample.js
[templategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/templateGetSample.js
[templatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/templateListSample.js
[versionedtemplategeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/versionedTemplateGenerateSample.js
[versionedtemplategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/versionedTemplateGetSample.js
[versionedtemplatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/versionedTemplateListSample.js
[workflowcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowCreateOrUpdateSample.js
[workflowdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowDeleteSample.js
[workflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowGetSample.js
[workflowlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowListByResourceGroupSample.js
[workflowlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowListSample.js
[workflowupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowUpdateTagsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devhub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devhub/arm-devhub/README.md
