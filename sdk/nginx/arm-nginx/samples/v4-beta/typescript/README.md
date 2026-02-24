# @azure/arm-nginx client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-nginx in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                       |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [apiKeysCreateOrUpdateSample.ts][apikeyscreateorupdatesample]                   | create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint x-ms-original-file: 2025-03-01-preview/ApiKeys_CreateOrUpdate.json |
| [apiKeysDeleteSample.ts][apikeysdeletesample]                                   | delete API key for Nginx deployment x-ms-original-file: 2025-03-01-preview/ApiKeys_Delete.json                                                                        |
| [apiKeysGetSample.ts][apikeysgetsample]                                         | get the specified API Key of the given Nginx deployment x-ms-original-file: 2025-03-01-preview/ApiKeys_Get.json                                                       |
| [apiKeysListSample.ts][apikeyslistsample]                                       | list all API Keys of the given Nginx deployment x-ms-original-file: 2025-03-01-preview/ApiKeys_List.json                                                              |
| [certificatesCreateOrUpdateSample.ts][certificatescreateorupdatesample]         | create or update the NGINX certificates for given NGINX deployment x-ms-original-file: 2025-03-01-preview/Certificates_CreateOrUpdate.json                            |
| [certificatesDeleteSample.ts][certificatesdeletesample]                         | deletes a certificate from the NGINX deployment x-ms-original-file: 2025-03-01-preview/Certificates_Delete.json                                                       |
| [certificatesGetSample.ts][certificatesgetsample]                               | get a certificate of given NGINX deployment x-ms-original-file: 2025-03-01-preview/Certificates_Get.json                                                              |
| [certificatesListSample.ts][certificateslistsample]                             | list all certificates of given NGINX deployment x-ms-original-file: 2025-03-01-preview/Certificates_List.json                                                         |
| [configurationsAnalysisSample.ts][configurationsanalysissample]                 | analyze an NGINX configuration without applying it to the NGINXaaS deployment x-ms-original-file: 2025-03-01-preview/Configurations_Analysis.json                     |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]     | create or update the NGINX configuration for given NGINX deployment x-ms-original-file: 2025-03-01-preview/Configurations_CreateOrUpdate.json                         |
| [configurationsDeleteSample.ts][configurationsdeletesample]                     | reset the NGINX configuration of given NGINX deployment to default x-ms-original-file: 2025-03-01-preview/Configurations_Delete.json                                  |
| [configurationsGetSample.ts][configurationsgetsample]                           | get the NGINX configuration of given NGINX deployment x-ms-original-file: 2025-03-01-preview/Configurations_Get.json                                                  |
| [configurationsListSample.ts][configurationslistsample]                         | list the NGINX configuration of given NGINX deployment. x-ms-original-file: 2025-03-01-preview/Configurations_List.json                                               |
| [defaultWafPolicyListSample.ts][defaultwafpolicylistsample]                     | get the Nginx Waf Policy of given Nginx deployment x-ms-original-file: 2025-03-01-preview/DefaultWafPolicy_List.json                                                  |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]           | create or update the NGINX deployment x-ms-original-file: 2025-03-01-preview/Deployments_Create.json                                                                  |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                           | delete the NGINX deployment resource x-ms-original-file: 2025-03-01-preview/Deployments_Delete.json                                                                   |
| [deploymentsGetSample.ts][deploymentsgetsample]                                 | get the NGINX deployment x-ms-original-file: 2025-03-01-preview/Deployments_Get.json                                                                                  |
| [deploymentsListByResourceGroupSample.ts][deploymentslistbyresourcegroupsample] | list all NGINX deployments under the specified resource group. x-ms-original-file: 2025-03-01-preview/Deployments_ListByResourceGroup.json                            |
| [deploymentsListSample.ts][deploymentslistsample]                               | list the NGINX deployments resources x-ms-original-file: 2025-03-01-preview/Deployments_List.json                                                                     |
| [deploymentsUpdateSample.ts][deploymentsupdatesample]                           | update the NGINX deployment x-ms-original-file: 2025-03-01-preview/Deployments_Update.json                                                                            |
| [operationsListSample.ts][operationslistsample]                                 | list the operations for the provider x-ms-original-file: 2025-03-01-preview/Operations_List.json                                                                      |
| [wafPolicyCreateSample.ts][wafpolicycreatesample]                               | create or update the Nginx Waf Policy for given Nginx deployment x-ms-original-file: 2025-03-01-preview/WafPolicy_Create.json                                         |
| [wafPolicyDeleteSample.ts][wafpolicydeletesample]                               | reset the Nginx Waf Policy of given Nginx deployment to default x-ms-original-file: 2025-03-01-preview/WafPolicy_Delete.json                                          |
| [wafPolicyGetSample.ts][wafpolicygetsample]                                     | get the Nginx Waf Policy of given Nginx deployment x-ms-original-file: 2025-03-01-preview/WafPolicy_Get.json                                                          |
| [wafPolicyListSample.ts][wafpolicylistsample]                                   | list Waf Policies of given Nginx deployment x-ms-original-file: 2025-03-01-preview/WafPolicy_List.json                                                                |

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
node dist/apiKeysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/apiKeysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[apikeyscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/apiKeysCreateOrUpdateSample.ts
[apikeysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/apiKeysDeleteSample.ts
[apikeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/apiKeysGetSample.ts
[apikeyslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/apiKeysListSample.ts
[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/certificatesCreateOrUpdateSample.ts
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/certificatesDeleteSample.ts
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/certificatesGetSample.ts
[certificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/certificatesListSample.ts
[configurationsanalysissample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/configurationsAnalysisSample.ts
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/configurationsCreateOrUpdateSample.ts
[configurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/configurationsDeleteSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/configurationsGetSample.ts
[configurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/configurationsListSample.ts
[defaultwafpolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/defaultWafPolicyListSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsGetSample.ts
[deploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsListByResourceGroupSample.ts
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsListSample.ts
[deploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/operationsListSample.ts
[wafpolicycreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/wafPolicyCreateSample.ts
[wafpolicydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/wafPolicyDeleteSample.ts
[wafpolicygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/wafPolicyGetSample.ts
[wafpolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/wafPolicyListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-nginx?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/nginx/arm-nginx/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
