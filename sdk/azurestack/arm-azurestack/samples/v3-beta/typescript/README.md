# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                   | **Description**                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudManifestFileGetSample.ts][cloudmanifestfilegetsample]                                     | Returns a cloud specific manifest JSON file. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CloudManifestFile/Get.json                                           |
| [cloudManifestFileListSample.ts][cloudmanifestfilelistsample]                                   | Returns a cloud specific manifest JSON file with latest version. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CloudManifestFile/List.json                      |
| [customerSubscriptionsCreateSample.ts][customersubscriptionscreatesample]                       | Creates a new customer subscription under a registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CustomerSubscription/Put.json                           |
| [customerSubscriptionsDeleteSample.ts][customersubscriptionsdeletesample]                       | Deletes a customer subscription under a registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CustomerSubscription/Delete.json                            |
| [customerSubscriptionsGetSample.ts][customersubscriptionsgetsample]                             | Returns the specified product. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CustomerSubscription/Get.json                                                      |
| [customerSubscriptionsListSample.ts][customersubscriptionslistsample]                           | Returns a list of products. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/CustomerSubscription/List.json                                                        |
| [linkedSubscriptionsCreateOrUpdateSample.ts][linkedsubscriptionscreateorupdatesample]           | Create or update a linked subscription resource. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/Put.json                                      |
| [linkedSubscriptionsDeleteSample.ts][linkedsubscriptionsdeletesample]                           | Delete the requested Linked Subscription resource. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/Delete.json                                 |
| [linkedSubscriptionsGetSample.ts][linkedsubscriptionsgetsample]                                 | Returns the properties of a Linked Subscription resource. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/Get.json                             |
| [linkedSubscriptionsListByResourceGroupSample.ts][linkedsubscriptionslistbyresourcegroupsample] | Returns a list of all linked subscriptions under current resource group. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/List.json             |
| [linkedSubscriptionsListBySubscriptionSample.ts][linkedsubscriptionslistbysubscriptionsample]   | Returns a list of all linked subscriptions under current subscription. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/ListBySubscription.json |
| [linkedSubscriptionsUpdateSample.ts][linkedsubscriptionsupdatesample]                           | Patch a Linked Subscription resource. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/Patch.json                                               |
| [operationsListSample.ts][operationslistsample]                                                 | Returns the list of supported REST operations. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Operation/List.json                                                |
| [productsGetProductSample.ts][productsgetproductsample]                                         | Returns the specified product. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/GetPost.json                                                               |
| [productsGetProductsSample.ts][productsgetproductssample]                                       | Returns a list of products. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/ListPost.json                                                                 |
| [productsGetSample.ts][productsgetsample]                                                       | Returns the specified product. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/Get.json                                                                   |
| [productsListDetailsSample.ts][productslistdetailssample]                                       | Returns the extended properties of a product. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/Post.json                                                   |
| [productsListSample.ts][productslistsample]                                                     | Returns a list of products. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/List.json                                                                     |
| [productsUploadLogSample.ts][productsuploadlogsample]                                           | Returns the specified product. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/UploadLog.json                                                             |
| [registrationsCreateOrUpdateSample.ts][registrationscreateorupdatesample]                       | Create or update an Azure Stack registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Put.json                                               |
| [registrationsDeleteSample.ts][registrationsdeletesample]                                       | Delete the requested Azure Stack registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Delete.json                                           |
| [registrationsEnableRemoteManagementSample.ts][registrationsenableremotemanagementsample]       | Enables remote management for device under the Azure Stack registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/RemoteManagement/Post.json               |
| [registrationsGetActivationKeySample.ts][registrationsgetactivationkeysample]                   | Returns Azure Stack Activation Key. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Post.json                                                        |
| [registrationsGetSample.ts][registrationsgetsample]                                             | Returns the properties of an Azure Stack registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Get.json                                      |
| [registrationsListBySubscriptionSample.ts][registrationslistbysubscriptionsample]               | Returns a list of all registrations under current subscription. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/ListBySubscription.json              |
| [registrationsListSample.ts][registrationslistsample]                                           | Returns a list of all registrations. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/List.json                                                       |
| [registrationsUpdateSample.ts][registrationsupdatesample]                                       | Patch an Azure Stack registration. x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Patch.json                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/cloudManifestFileGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/cloudManifestFileGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudmanifestfilegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/cloudManifestFileGetSample.ts
[cloudmanifestfilelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/cloudManifestFileListSample.ts
[customersubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/customerSubscriptionsCreateSample.ts
[customersubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/customerSubscriptionsDeleteSample.ts
[customersubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/customerSubscriptionsGetSample.ts
[customersubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/customerSubscriptionsListSample.ts
[linkedsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsCreateOrUpdateSample.ts
[linkedsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsDeleteSample.ts
[linkedsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsGetSample.ts
[linkedsubscriptionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsListByResourceGroupSample.ts
[linkedsubscriptionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsListBySubscriptionSample.ts
[linkedsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/linkedSubscriptionsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/operationsListSample.ts
[productsgetproductsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsGetProductSample.ts
[productsgetproductssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsGetProductsSample.ts
[productsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsGetSample.ts
[productslistdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsListDetailsSample.ts
[productslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsListSample.ts
[productsuploadlogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/productsUploadLogSample.ts
[registrationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsCreateOrUpdateSample.ts
[registrationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsDeleteSample.ts
[registrationsenableremotemanagementsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsEnableRemoteManagementSample.ts
[registrationsgetactivationkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsGetActivationKeySample.ts
[registrationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsGetSample.ts
[registrationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsListBySubscriptionSample.ts
[registrationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsListSample.ts
[registrationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestack/arm-azurestack/samples/v3-beta/typescript/src/registrationsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-azurestack?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestack/arm-azurestack/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
