# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [b2CTenantsCheckNameAvailabilitySample.js][b2ctenantschecknameavailabilitysample] | Checks the availability and validity of a domain name for the tenant. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/checkNameAvailability-available.json                                                                                                                    |
| [b2CTenantsCreateSample.js][b2ctenantscreatesample]                               | Initiates an async request to create both the Azure AD B2C tenant and the corresponding Azure resource linked to a subscription. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/createTenant.json                                                                            |
| [b2CTenantsDeleteSample.js][b2ctenantsdeletesample]                               | Initiates an async operation to delete the Azure AD B2C tenant and Azure resource. The resource deletion can only happen as the last step in [the tenant deletion process](https://aka.ms/deleteB2Ctenant). x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/deleteTenant.json |
| [b2CTenantsGetSample.js][b2ctenantsgetsample]                                     | Get the Azure AD B2C tenant resource. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/getTenant.json                                                                                                                                                                          |
| [b2CTenantsListByResourceGroupSample.js][b2ctenantslistbyresourcegroupsample]     | Get all the Azure AD B2C tenant resources in a resource group. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/listTenantsByResourceGroup.json                                                                                                                                |
| [b2CTenantsListBySubscriptionSample.js][b2ctenantslistbysubscriptionsample]       | Get all the Azure AD B2C tenant resources in a subscription. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/listTenantsBySubscription.json                                                                                                                                   |
| [b2CTenantsUpdateSample.js][b2ctenantsupdatesample]                               | Update the Azure AD B2C tenant resource. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/updateTenant.json                                                                                                                                                                    |
| [guestUsagesCreateSample.js][guestusagescreatesample]                             | Creates a Guest Usages resource, which is used to linking a subscription to an instance of Azure AD External Identities. [Learn more](https://aka.ms/extidbilling). x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesCreate.json                                    |
| [guestUsagesDeleteSample.js][guestusagesdeletesample]                             | Deletes a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesDelete.json                                                                                                               |
| [guestUsagesGetSample.js][guestusagesgetsample]                                   | Gets a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesGet.json                                                                                                                     |
| [guestUsagesListByResourceGroupSample.js][guestusageslistbyresourcegroupsample]   | Gets Guest Usages resources under a resource group for the Microsoft.AzureActiveDirectory resource provider x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesResourceGroupGet.json                                                                                  |
| [guestUsagesListBySubscriptionSample.js][guestusageslistbysubscriptionsample]     | Gets Guest Usages resources under a subscription for the Microsoft.AzureActiveDirectory resource provider x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesSubscriptionGet.json                                                                                     |
| [guestUsagesUpdateSample.js][guestusagesupdatesample]                             | Updates a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesUpdate.json                                                                                                               |
| [operationsListSample.js][operationslistsample]                                   | Lists the operations available from this provider. x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/OperationsList.json                                                                                                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node b2CTenantsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node b2CTenantsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[b2ctenantschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsCheckNameAvailabilitySample.js
[b2ctenantscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsCreateSample.js
[b2ctenantsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsDeleteSample.js
[b2ctenantsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsGetSample.js
[b2ctenantslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsListByResourceGroupSample.js
[b2ctenantslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsListBySubscriptionSample.js
[b2ctenantsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/b2CTenantsUpdateSample.js
[guestusagescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesCreateSample.js
[guestusagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesDeleteSample.js
[guestusagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesGetSample.js
[guestusageslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesListByResourceGroupSample.js
[guestusageslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesListBySubscriptionSample.js
[guestusagesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/guestUsagesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/samples/v1/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-azureadexternalidentities?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azureadexternalidentities/arm-azureadexternalidentities/README.md
