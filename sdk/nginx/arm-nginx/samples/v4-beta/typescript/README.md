# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [apiKeysCreateOrUpdateSample.ts][apikeyscreateorupdatesample]                   | Create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/ApiKeys_CreateOrUpdate.json |
| [apiKeysDeleteSample.ts][apikeysdeletesample]                                   | Delete API key for Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/ApiKeys_Delete.json                                                                        |
| [apiKeysGetSample.ts][apikeysgetsample]                                         | Get the specified API Key of the given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/ApiKeys_Get.json                                                       |
| [apiKeysListSample.ts][apikeyslistsample]                                       | List all API Keys of the given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/ApiKeys_List.json                                                              |
| [certificatesCreateOrUpdateSample.ts][certificatescreateorupdatesample]         | Create or update the NGINX certificates for given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Certificates_CreateOrUpdate.json                            |
| [certificatesDeleteSample.ts][certificatesdeletesample]                         | Deletes a certificate from the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Certificates_Delete.json                                                       |
| [certificatesGetSample.ts][certificatesgetsample]                               | Get a certificate of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Certificates_Get.json                                                              |
| [certificatesListSample.ts][certificateslistsample]                             | List all certificates of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Certificates_List.json                                                         |
| [configurationsAnalysisSample.ts][configurationsanalysissample]                 | Analyze an NGINX configuration without applying it to the NGINXaaS deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Configurations_Analysis.json                     |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]     | Create or update the NGINX configuration for given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Configurations_CreateOrUpdate.json                         |
| [configurationsDeleteSample.ts][configurationsdeletesample]                     | Reset the NGINX configuration of given NGINX deployment to default x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Configurations_Delete.json                                  |
| [configurationsGetSample.ts][configurationsgetsample]                           | Get the NGINX configuration of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Configurations_Get.json                                                  |
| [configurationsListSample.ts][configurationslistsample]                         | List the NGINX configuration of given NGINX deployment. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Configurations_List.json                                               |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]           | Create or update the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_Create.json                                                                  |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                           | Delete the NGINX deployment resource x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_Delete.json                                                                   |
| [deploymentsGetSample.ts][deploymentsgetsample]                                 | Get the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_Get.json                                                                                  |
| [deploymentsListByResourceGroupSample.ts][deploymentslistbyresourcegroupsample] | List all NGINX deployments under the specified resource group. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_ListByResourceGroup.json                            |
| [deploymentsListSample.ts][deploymentslistsample]                               | List the NGINX deployments resources x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_List.json                                                                     |
| [deploymentsUpdateSample.ts][deploymentsupdatesample]                           | Update the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Deployments_Update.json                                                                            |
| [operationsListSample.ts][operationslistsample]                                 | List all operations provided by Nginx.NginxPlus for the 2024-11-01-preview api version. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Operations_List.json                   |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env NGINX_SUBSCRIPTION_ID="<nginx subscription id>" NGINX_RESOURCE_GROUP="<nginx resource group>" node dist/apiKeysCreateOrUpdateSample.js
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
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsGetSample.ts
[deploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsListByResourceGroupSample.ts
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsListSample.ts
[deploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/deploymentsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v4-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-nginx?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/nginx/arm-nginx/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
