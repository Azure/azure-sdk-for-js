# @azure/arm-saas client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-saas in some common scenarios.

| **File Name**                                                                                                                         | **Description**                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                       | list the operations for the provider x-ms-original-file: 2026-04-01/SaasGetOperations.json                                                                                                              |
| [saasOperationStatusesGetSubscriptionOperationStatusSample.ts][saasoperationstatusesgetsubscriptionoperationstatussample]             | gets the status of a long-running SaaS operation at the subscription scope. x-ms-original-file: 2026-04-01/SaasGetSubscriptionOperationStatus.json                                                      |
| [saasOperationStatusesGetTenantOperationStatusSample.ts][saasoperationstatusesgettenantoperationstatussample]                         | gets the status of a long-running SaaS operation at the tenant scope. x-ms-original-file: 2026-04-01/SaasGetTenantOperationStatus.json                                                                  |
| [saasSubscriptionLevelCreateOrUpdateSample.ts][saassubscriptionlevelcreateorupdatesample]                                             | creates or updates a SaaS resource. x-ms-original-file: 2026-04-01/SaasPut.json                                                                                                                         |
| [saasSubscriptionLevelDeleteSample.ts][saassubscriptionleveldeletesample]                                                             | deletes a SaaS resource. x-ms-original-file: 2026-04-01/SaasDelete.json                                                                                                                                 |
| [saasSubscriptionLevelGetSample.ts][saassubscriptionlevelgetsample]                                                                   | gets a SaaS resource by its name. x-ms-original-file: 2026-04-01/SaasGet.json                                                                                                                           |
| [saasSubscriptionLevelGlobalCheckNameAvailabilitySample.ts][saassubscriptionlevelglobalchecknameavailabilitysample]                   | checks whether a proposed SaaS resource name is available. x-ms-original-file: 2026-04-01/SaasCheckNameAvailability.json                                                                                |
| [saasSubscriptionLevelGlobalListByAzureSubscriptionSample.ts][saassubscriptionlevelgloballistbyazuresubscriptionsample]               | lists all SaaS resources within an Azure subscription. x-ms-original-file: 2026-04-01/SaasListBySubscription.json                                                                                       |
| [saasSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.ts][saassubscriptionlevelglobalvalidatepurchasebysubscriptionsample] | validates a proposed SaaS purchase at subscription scope before a resource group is selected. x-ms-original-file: 2026-04-01/SaasValidatePurchaseBySubscription.json                                    |
| [saasSubscriptionLevelGlobalValidatePurchaseSample.ts][saassubscriptionlevelglobalvalidatepurchasesample]                             | validates a proposed SaaS purchase within a resource group without creating the resource. x-ms-original-file: 2026-04-01/SaasValidatePurchaseByResourceGroup.json                                       |
| [saasSubscriptionLevelListAccessTokenSample.ts][saassubscriptionlevellistaccesstokensample]                                           | generates a publisher access token for a SaaS resource. x-ms-original-file: 2026-04-01/SaasListAccessToken.json                                                                                         |
| [saasSubscriptionLevelListByResourceGroupSample.ts][saassubscriptionlevellistbyresourcegroupsample]                                   | lists all SaaS resources within a resource group. x-ms-original-file: 2026-04-01/SaasListByResourceGroup.json                                                                                           |
| [saasSubscriptionLevelUnsubscribeSample.ts][saassubscriptionlevelunsubscribesample]                                                   | unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. x-ms-original-file: 2026-04-01/SaasUnsubscribe.json |
| [saasSubscriptionLevelUpdateSample.ts][saassubscriptionlevelupdatesample]                                                             | updates mutable properties or tags on an existing SaaS resource. x-ms-original-file: 2026-04-01/SaasPatch.json                                                                                          |
| [saasSubscriptionLevelValidateUpdateSample.ts][saassubscriptionlevelvalidateupdatesample]                                             | validates a proposed update to an existing SaaS resource without modifying the resource. x-ms-original-file: 2026-04-01/SaasValidateUpdate.json                                                         |
| [saasTenantLevelDeleteResourceSample.ts][saastenantleveldeleteresourcesample]                                                         | deletes a tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantDelete.json                                                                                                              |
| [saasTenantLevelGetResourceSample.ts][saastenantlevelgetresourcesample]                                                               | gets a tenant-level SaaS resource by its identifier. x-ms-original-file: 2026-04-01/SaasTenantGet.json                                                                                                  |
| [saasTenantLevelListAccessTokenSample.ts][saastenantlevellistaccesstokensample]                                                       | generates a publisher access token for a tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantListAccessToken.json                                                                      |
| [saasTenantLevelListSample.ts][saastenantlevellistsample]                                                                             | lists all tenant-level SaaS resources accessible to the caller. x-ms-original-file: 2026-04-01/SaasTenantList.json                                                                                      |
| [saasTenantLevelUpdateResourceSample.ts][saastenantlevelupdateresourcesample]                                                         | updates mutable properties or tags on an existing tenant-level SaaS resource. x-ms-original-file: 2026-04-01/SaasTenantPatch.json                                                                       |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/operationsListSample.ts
[saasoperationstatusesgetsubscriptionoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasOperationStatusesGetSubscriptionOperationStatusSample.ts
[saasoperationstatusesgettenantoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasOperationStatusesGetTenantOperationStatusSample.ts
[saassubscriptionlevelcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelCreateOrUpdateSample.ts
[saassubscriptionleveldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelDeleteSample.ts
[saassubscriptionlevelgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelGetSample.ts
[saassubscriptionlevelglobalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelGlobalCheckNameAvailabilitySample.ts
[saassubscriptionlevelgloballistbyazuresubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelGlobalListByAzureSubscriptionSample.ts
[saassubscriptionlevelglobalvalidatepurchasebysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.ts
[saassubscriptionlevelglobalvalidatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelGlobalValidatePurchaseSample.ts
[saassubscriptionlevellistaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelListAccessTokenSample.ts
[saassubscriptionlevellistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelListByResourceGroupSample.ts
[saassubscriptionlevelunsubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelUnsubscribeSample.ts
[saassubscriptionlevelupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelUpdateSample.ts
[saassubscriptionlevelvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasSubscriptionLevelValidateUpdateSample.ts
[saastenantleveldeleteresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasTenantLevelDeleteResourceSample.ts
[saastenantlevelgetresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasTenantLevelGetResourceSample.ts
[saastenantlevellistaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasTenantLevelListAccessTokenSample.ts
[saastenantlevellistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasTenantLevelListSample.ts
[saastenantlevelupdateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/saas/arm-saas/samples/v1-beta/typescript/src/saasTenantLevelUpdateResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-saas?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/saas/arm-saas/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
