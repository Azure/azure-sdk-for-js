# @azure/arm-professionalservice client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-professionalservice in some common scenarios.

| **File Name**                                                                                                                                                       | **Description**                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                                                     | list the operations for the provider x-ms-original-file: 2026-05-01/ProfessionalServiceGetOperations.json                                                                                                                                                                 |
| [professionalServiceOperationStatusesGetSubscriptionOperationStatusSample.ts][professionalserviceoperationstatusesgetsubscriptionoperationstatussample]             | gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint. x-ms-original-file: 2026-05-01/ProfessionalServiceGetSubscriptionOperationStatus.json |
| [professionalServiceSubscriptionLevelCreateOrUpdateSample.ts][professionalservicesubscriptionlevelcreateorupdatesample]                                             | creates or updates a Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServicePut.json                                                                                                                                                            |
| [professionalServiceSubscriptionLevelDeleteSample.ts][professionalservicesubscriptionleveldeletesample]                                                             | deletes a Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServiceDelete.json                                                                                                                                                                    |
| [professionalServiceSubscriptionLevelGetSample.ts][professionalservicesubscriptionlevelgetsample]                                                                   | gets a Professional Service resource by its name. x-ms-original-file: 2026-05-01/ProfessionalServiceGet.json                                                                                                                                                              |
| [professionalServiceSubscriptionLevelGlobalCheckNameAvailabilitySample.ts][professionalservicesubscriptionlevelglobalchecknameavailabilitysample]                   | checks whether a proposed Professional Service resource name is available. x-ms-original-file: 2026-05-01/ProfessionalServiceCheckNameAvailability.json                                                                                                                   |
| [professionalServiceSubscriptionLevelGlobalListByAzureSubscriptionSample.ts][professionalservicesubscriptionlevelgloballistbyazuresubscriptionsample]               | lists all Professional Service resources within an Azure subscription. x-ms-original-file: 2026-05-01/ProfessionalServiceListBySubscription.json                                                                                                                          |
| [professionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.ts][professionalservicesubscriptionlevelglobalvalidatepurchasebysubscriptionsample] | validates a proposed Professional Service purchase at subscription scope before a resource group is selected. x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseBySubscription.json                                                                       |
| [professionalServiceSubscriptionLevelGlobalValidatePurchaseSample.ts][professionalservicesubscriptionlevelglobalvalidatepurchasesample]                             | validates a proposed Professional Service purchase within a resource group without creating the resource. x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseByResourceGroup.json                                                                          |
| [professionalServiceSubscriptionLevelListByResourceGroupSample.ts][professionalservicesubscriptionlevellistbyresourcegroupsample]                                   | lists all Professional Service resources within a resource group. x-ms-original-file: 2026-05-01/ProfessionalServiceListByResourceGroup.json                                                                                                                              |
| [professionalServiceSubscriptionLevelUnsubscribeSample.ts][professionalservicesubscriptionlevelunsubscribesample]                                                   | unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. x-ms-original-file: 2026-05-01/ProfessionalServiceUnsubscribe.json                                    |
| [professionalServiceSubscriptionLevelUpdateSample.ts][professionalservicesubscriptionlevelupdatesample]                                                             | updates mutable properties or tags on an existing Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServiceUpdate.json                                                                                                                            |
| [professionalServiceSubscriptionLevelValidateUpdateSample.ts][professionalservicesubscriptionlevelvalidateupdatesample]                                             | validates a proposed update to an existing Professional Service resource without modifying the resource. x-ms-original-file: 2026-05-01/ProfessionalServiceValidateUpdate.json                                                                                            |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/operationsListSample.ts
[professionalserviceoperationstatusesgetsubscriptionoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceOperationStatusesGetSubscriptionOperationStatusSample.ts
[professionalservicesubscriptionlevelcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelCreateOrUpdateSample.ts
[professionalservicesubscriptionleveldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelDeleteSample.ts
[professionalservicesubscriptionlevelgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelGetSample.ts
[professionalservicesubscriptionlevelglobalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelGlobalCheckNameAvailabilitySample.ts
[professionalservicesubscriptionlevelgloballistbyazuresubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelGlobalListByAzureSubscriptionSample.ts
[professionalservicesubscriptionlevelglobalvalidatepurchasebysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.ts
[professionalservicesubscriptionlevelglobalvalidatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelGlobalValidatePurchaseSample.ts
[professionalservicesubscriptionlevellistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelListByResourceGroupSample.ts
[professionalservicesubscriptionlevelunsubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelUnsubscribeSample.ts
[professionalservicesubscriptionlevelupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelUpdateSample.ts
[professionalservicesubscriptionlevelvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/typescript/src/professionalServiceSubscriptionLevelValidateUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-professionalservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/professionalservice/arm-professionalservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
