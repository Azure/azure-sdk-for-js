# @azure/arm-saas client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-saas in some common scenarios.

| **File Name**                                                                                                                         | **Description**                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                       | list the operations for the provider x-ms-original-file: 2026-04-01/SaasGetOperations.json                                                                                                              |
| [saasOperationStatusesGetSubscriptionOperationStatusSample.js][saasoperationstatusesgetsubscriptionoperationstatussample]             | gets the status of a long-running SaaS operation at the subscription scope. x-ms-original-file: 2026-04-01/SaasGetSubscriptionOperationStatus.json                                                      |
| [saasOperationStatusesGetTenantOperationStatusSample.js][saasoperationstatusesgettenantoperationstatussample]                         | gets the status of a long-running SaaS operation at the tenant scope. x-ms-original-file: 2026-04-01/SaasGetTenantOperationStatus.json                                                                  |
| [saasSubscriptionLevelCreateOrUpdateSample.js][saassubscriptionlevelcreateorupdatesample]                                             | creates or updates a SaaS resource. x-ms-original-file: 2026-04-01/SaasPut.json                                                                                                                         |
| [saasSubscriptionLevelDeleteSample.js][saassubscriptionleveldeletesample]                                                             | deletes a SaaS resource. x-ms-original-file: 2026-04-01/SaasDelete.json                                                                                                                                 |
| [saasSubscriptionLevelGetSample.js][saassubscriptionlevelgetsample]                                                                   | gets a SaaS resource by its name. x-ms-original-file: 2026-04-01/SaasGet.json                                                                                                                           |
| [saasSubscriptionLevelGlobalCheckNameAvailabilitySample.js][saassubscriptionlevelglobalchecknameavailabilitysample]                   | checks whether a proposed SaaS resource name is available. x-ms-original-file: 2026-04-01/SaasCheckNameAvailability.json                                                                                |
| [saasSubscriptionLevelGlobalListByAzureSubscriptionSample.js][saassubscriptionlevelgloballistbyazuresubscriptionsample]               | lists all SaaS resources within an Azure subscription. x-ms-original-file: 2026-04-01/SaasListBySubscription.json                                                                                       |
| [saasSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.js][saassubscriptionlevelglobalvalidatepurchasebysubscriptionsample] | validates a proposed SaaS purchase at subscription scope before a resource group is selected. x-ms-original-file: 2026-04-01/SaasValidatePurchaseBySubscription.json                                    |
| [saasSubscriptionLevelGlobalValidatePurchaseSample.js][saassubscriptionlevelglobalvalidatepurchasesample]                             | validates a proposed SaaS purchase within a resource group without creating the resource. x-ms-original-file: 2026-04-01/SaasValidatePurchaseByResourceGroup.json                                       |
| [saasSubscriptionLevelListAccessTokenSample.js][saassubscriptionlevellistaccesstokensample]                                           | generates a publisher access token for a SaaS resource. x-ms-original-file: 2026-04-01/SaasListAccessToken.json                                                                                         |
| [saasSubscriptionLevelListByResourceGroupSample.js][saassubscriptionlevellistbyresourcegroupsample]                                   | lists all SaaS resources within a resource group. x-ms-original-file: 2026-04-01/SaasListByResourceGroup.json                                                                                           |
| [saasSubscriptionLevelUnsubscribeSample.js][saassubscriptionlevelunsubscribesample]                                                   | unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. x-ms-original-file: 2026-04-01/SaasUnsubscribe.json |
| [saasSubscriptionLevelUpdateSample.js][saassubscriptionlevelupdatesample]                                                             | updates mutable properties or tags on an existing SaaS resource. x-ms-original-file: 2026-04-01/SaasPatch.json                                                                                          |
| [saasSubscriptionLevelValidateUpdateSample.js][saassubscriptionlevelvalidateupdatesample]                                             | validates a proposed update to an existing SaaS resource without modifying the resource. x-ms-original-file: 2026-04-01/SaasValidateUpdate.json                                                         |
| [saasTenantLevelDeleteResourceSample.js][saastenantleveldeleteresourcesample]                                                         | deletes a tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantDelete.json                                                                                                              |
| [saasTenantLevelGetResourceSample.js][saastenantlevelgetresourcesample]                                                               | gets a tenant-level SaaS resource by its identifier. x-ms-original-file: 2026-04-01/SaasTenantGet.json                                                                                                  |
| [saasTenantLevelListAccessTokenSample.js][saastenantlevellistaccesstokensample]                                                       | generates a publisher access token for a tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantListAccessToken.json                                                                      |
| [saasTenantLevelListSample.js][saastenantlevellistsample]                                                                             | lists all tenant-level SaaS resources accessible to the caller. x-ms-original-file: 2026-04-01/SaasTenantList.json                                                                                      |
| [saasTenantLevelUpdateResourceSample.js][saastenantlevelupdateresourcesample]                                                         | updates mutable properties or tags on an existing tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantPatch.json                                                                       |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/operationsListSample.js
[saasoperationstatusesgetsubscriptionoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasOperationStatusesGetSubscriptionOperationStatusSample.js
[saasoperationstatusesgettenantoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasOperationStatusesGetTenantOperationStatusSample.js
[saassubscriptionlevelcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelCreateOrUpdateSample.js
[saassubscriptionleveldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelDeleteSample.js
[saassubscriptionlevelgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelGetSample.js
[saassubscriptionlevelglobalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelGlobalCheckNameAvailabilitySample.js
[saassubscriptionlevelgloballistbyazuresubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelGlobalListByAzureSubscriptionSample.js
[saassubscriptionlevelglobalvalidatepurchasebysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.js
[saassubscriptionlevelglobalvalidatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelGlobalValidatePurchaseSample.js
[saassubscriptionlevellistaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelListAccessTokenSample.js
[saassubscriptionlevellistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelListByResourceGroupSample.js
[saassubscriptionlevelunsubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelUnsubscribeSample.js
[saassubscriptionlevelupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelUpdateSample.js
[saassubscriptionlevelvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasSubscriptionLevelValidateUpdateSample.js
[saastenantleveldeleteresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasTenantLevelDeleteResourceSample.js
[saastenantlevelgetresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasTenantLevelGetResourceSample.js
[saastenantlevellistaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasTenantLevelListAccessTokenSample.js
[saastenantlevellistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasTenantLevelListSample.js
[saastenantlevelupdateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/javascript/saasTenantLevelUpdateResourceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-saas?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/saas/arm-saas/README.md
