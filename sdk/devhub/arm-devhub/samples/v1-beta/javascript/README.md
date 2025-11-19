# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [generatePreviewArtifactsSample.js][generatepreviewartifactssample]       | Generate preview dockerfile and manifests. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GeneratePreviewArtifacts.json                                                   |
| [gitHubOAuthCallbackSample.js][githuboauthcallbacksample]                 | Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuthCallback.json |
| [gitHubOAuthSample.js][githuboauthsample]                                 | Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth.json                       |
| [listGitHubOAuthSample.js][listgithuboauthsample]                         | Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth_List.json    |
| [operationsListSample.js][operationslistsample]                           | Returns list of operations. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Operation_List.json                                                                            |
| [workflowCreateOrUpdateSample.js][workflowcreateorupdatesample]           | Creates or updates a workflow x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_CreateOrUpdate.json                                                                 |
| [workflowDeleteSample.js][workflowdeletesample]                           | Deletes a workflow x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_Delete.json                                                                                    |
| [workflowGetSample.js][workflowgetsample]                                 | Gets a workflow. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_Get.json                                                                                         |
| [workflowListByResourceGroupSample.js][workflowlistbyresourcegroupsample] | Gets a list of workflows within a resource group. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_ListByResourceGroup.json                                        |
| [workflowListSample.js][workflowlistsample]                               | Gets a list of workflows associated with the specified subscription. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_List.json                                    |
| [workflowUpdateTagsSample.js][workflowupdatetagssample]                   | Updates tags on a workflow. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_UpdateTags.json                                                                       |

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
node generatePreviewArtifactsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env DEVHUB_SUBSCRIPTION_ID="<devhub subscription id>" node generatePreviewArtifactsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[generatepreviewartifactssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/generatePreviewArtifactsSample.js
[githuboauthcallbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/gitHubOAuthCallbackSample.js
[githuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/gitHubOAuthSample.js
[listgithuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/listGitHubOAuthSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/operationsListSample.js
[workflowcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowCreateOrUpdateSample.js
[workflowdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowDeleteSample.js
[workflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowGetSample.js
[workflowlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowListByResourceGroupSample.js
[workflowlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowListSample.js
[workflowupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/javascript/workflowUpdateTagsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devhub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devhub/arm-devhub/README.md
