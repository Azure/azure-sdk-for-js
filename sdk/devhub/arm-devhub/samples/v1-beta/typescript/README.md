# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [generatePreviewArtifactsSample.ts][generatepreviewartifactssample]       | Generate preview dockerfile and manifests. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GeneratePreviewArtifacts.json                                                   |
| [gitHubOAuthCallbackSample.ts][githuboauthcallbacksample]                 | Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuthCallback.json |
| [gitHubOAuthSample.ts][githuboauthsample]                                 | Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth.json                       |
| [listGitHubOAuthSample.ts][listgithuboauthsample]                         | Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth_List.json    |
| [operationsListSample.ts][operationslistsample]                           | Returns list of operations. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Operation_List.json                                                                            |
| [workflowCreateOrUpdateSample.ts][workflowcreateorupdatesample]           | Creates or updates a workflow x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_CreateOrUpdate.json                                                                 |
| [workflowDeleteSample.ts][workflowdeletesample]                           | Deletes a workflow x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_Delete.json                                                                                    |
| [workflowGetSample.ts][workflowgetsample]                                 | Gets a workflow. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_Get.json                                                                                         |
| [workflowListByResourceGroupSample.ts][workflowlistbyresourcegroupsample] | Gets a list of workflows within a resource group. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_ListByResourceGroup.json                                        |
| [workflowListSample.ts][workflowlistsample]                               | Gets a list of workflows associated with the specified subscription. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_List.json                                    |
| [workflowUpdateTagsSample.ts][workflowupdatetagssample]                   | Updates tags on a workflow. x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_UpdateTags.json                                                                       |

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
node dist/generatePreviewArtifactsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env DEVHUB_SUBSCRIPTION_ID="<devhub subscription id>" node dist/generatePreviewArtifactsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[generatepreviewartifactssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/generatePreviewArtifactsSample.ts
[githuboauthcallbacksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/gitHubOAuthCallbackSample.ts
[githuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/gitHubOAuthSample.ts
[listgithuboauthsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/listGitHubOAuthSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/operationsListSample.ts
[workflowcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowCreateOrUpdateSample.ts
[workflowdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowDeleteSample.ts
[workflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowGetSample.ts
[workflowlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowListByResourceGroupSample.ts
[workflowlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowListSample.ts
[workflowupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devhub/arm-devhub/samples/v1-beta/typescript/src/workflowUpdateTagsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devhub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devhub/arm-devhub/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
