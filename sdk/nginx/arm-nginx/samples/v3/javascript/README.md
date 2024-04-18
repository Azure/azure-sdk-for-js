# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificatesCreateOrUpdateSample.js][certificatescreateorupdatesample]         | Create or update the NGINX certificates for given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Certificates_CreateOrUpdate.json    |
| [certificatesDeleteSample.js][certificatesdeletesample]                         | Deletes a certificate from the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Certificates_Delete.json                               |
| [certificatesGetSample.js][certificatesgetsample]                               | Get a certificate of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Certificates_Get.json                                      |
| [certificatesListSample.js][certificateslistsample]                             | List all certificates of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Certificates_List.json                                 |
| [configurationsCreateOrUpdateSample.js][configurationscreateorupdatesample]     | Create or update the NGINX configuration for given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Configurations_CreateOrUpdate.json |
| [configurationsDeleteSample.js][configurationsdeletesample]                     | Reset the NGINX configuration of given NGINX deployment to default x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Configurations_Delete.json          |
| [configurationsGetSample.js][configurationsgetsample]                           | Get the NGINX configuration of given NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Configurations_Get.json                          |
| [configurationsListSample.js][configurationslistsample]                         | List the NGINX configuration of given NGINX deployment. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Configurations_List.json                       |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]           | Create or update the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_Create.json                                          |
| [deploymentsDeleteSample.js][deploymentsdeletesample]                           | Delete the NGINX deployment resource x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_Delete.json                                           |
| [deploymentsGetSample.js][deploymentsgetsample]                                 | Get the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_Get.json                                                          |
| [deploymentsListByResourceGroupSample.js][deploymentslistbyresourcegroupsample] | List all NGINX deployments under the specified resource group. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_ListByResourceGroup.json    |
| [deploymentsListSample.js][deploymentslistsample]                               | List the NGINX deployments resources x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_List.json                                             |
| [deploymentsUpdateSample.js][deploymentsupdatesample]                           | Update the NGINX deployment x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Deployments_Update.json                                                    |
| [operationsListSample.js][operationslistsample]                                 | List all operations provided by Nginx.NginxPlus for the 2023-04-01 api version. x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/stable/2023-04-01/examples/Operations_List.json   |

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
node certificatesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env NGINX_SUBSCRIPTION_ID="<nginx subscription id>" NGINX_RESOURCE_GROUP="<nginx resource group>" node certificatesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/certificatesCreateOrUpdateSample.js
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/certificatesDeleteSample.js
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/certificatesGetSample.js
[certificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/certificatesListSample.js
[configurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/configurationsCreateOrUpdateSample.js
[configurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/configurationsDeleteSample.js
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/configurationsGetSample.js
[configurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/configurationsListSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsCreateOrUpdateSample.js
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsDeleteSample.js
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsGetSample.js
[deploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsListByResourceGroupSample.js
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsListSample.js
[deploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/deploymentsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/nginx/arm-nginx/samples/v3/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-nginx?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/nginx/arm-nginx/README.md
