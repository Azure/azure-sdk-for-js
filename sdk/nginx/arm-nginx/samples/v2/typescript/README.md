# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificatesCreateOrUpdateSample.ts][certificatescreateorupdatesample]         | Create or update the Nginx certificates for given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Certificates_CreateOrUpdate.json    |
| [certificatesDeleteSample.ts][certificatesdeletesample]                         | Deletes a certificate from the nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Certificates_Delete.json                               |
| [certificatesGetSample.ts][certificatesgetsample]                               | Get a certificate of given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Certificates_Get.json                                      |
| [certificatesListSample.ts][certificateslistsample]                             | List all certificates of given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Certificates_List.json                                 |
| [configurationsCreateOrUpdateSample.ts][configurationscreateorupdatesample]     | Create or update the Nginx configuration for given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Configurations_CreateOrUpdate.json |
| [configurationsDeleteSample.ts][configurationsdeletesample]                     | Reset the Nginx configuration of given Nginx deployment to default x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Configurations_Delete.json          |
| [configurationsGetSample.ts][configurationsgetsample]                           | Get the Nginx configuration of given Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Configurations_Get.json                          |
| [configurationsListSample.ts][configurationslistsample]                         | List the Nginx configuration of given Nginx deployment. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Configurations_List.json                       |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]           | Create or update the Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_Create.json                                          |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                           | Delete the Nginx deployment resource x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_Delete.json                                           |
| [deploymentsGetSample.ts][deploymentsgetsample]                                 | Get the Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_Get.json                                                          |
| [deploymentsListByResourceGroupSample.ts][deploymentslistbyresourcegroupsample] | List all Nginx deployments under the specified resource group. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_ListByResourceGroup.json    |
| [deploymentsListSample.ts][deploymentslistsample]                               | List the Nginx deployments resources x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_List.json                                             |
| [deploymentsUpdateSample.ts][deploymentsupdatesample]                           | Update the Nginx deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Deployments_Update.json                                                    |
| [operationsListSample.ts][operationslistsample]                                 | List all operations provided by Nginx.NginxPlus for the 2022-08-01 api version. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2022-08-01/examples/Operations_List.json   |

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
node dist/certificatesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env NGINX_SUBSCRIPTION_ID="<nginx subscription id>" NGINX_RESOURCE_GROUP="<nginx resource group>" node dist/certificatesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/certificatesCreateOrUpdateSample.ts
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/certificatesDeleteSample.ts
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/certificatesGetSample.ts
[certificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/certificatesListSample.ts
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/configurationsCreateOrUpdateSample.ts
[configurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/configurationsDeleteSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/configurationsGetSample.ts
[configurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/configurationsListSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsGetSample.ts
[deploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsListByResourceGroupSample.ts
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsListSample.ts
[deploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/deploymentsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v2/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-nginx?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/nginx/arm-nginx/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
