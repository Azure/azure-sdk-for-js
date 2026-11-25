# @azure/arm-professionalservice client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-professionalservice in some common scenarios.

| **File Name**                                                                                                                                                       | **Description**                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                                                     | list the operations for the provider x-ms-original-file: 2026-05-01/ProfessionalServiceGetOperations.json                                                                                                                                                                 |
| [professionalServiceOperationStatusesGetSubscriptionOperationStatusSample.js][professionalserviceoperationstatusesgetsubscriptionoperationstatussample]             | gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint. x-ms-original-file: 2026-05-01/ProfessionalServiceGetSubscriptionOperationStatus.json |
| [professionalServiceSubscriptionLevelCreateOrUpdateSample.js][professionalservicesubscriptionlevelcreateorupdatesample]                                             | creates or updates a Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServicePut.json                                                                                                                                                            |
| [professionalServiceSubscriptionLevelDeleteSample.js][professionalservicesubscriptionleveldeletesample]                                                             | deletes a Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServiceDelete.json                                                                                                                                                                    |
| [professionalServiceSubscriptionLevelGetSample.js][professionalservicesubscriptionlevelgetsample]                                                                   | gets a Professional Service resource by its name. x-ms-original-file: 2026-05-01/ProfessionalServiceGet.json                                                                                                                                                              |
| [professionalServiceSubscriptionLevelGlobalCheckNameAvailabilitySample.js][professionalservicesubscriptionlevelglobalchecknameavailabilitysample]                   | checks whether a proposed Professional Service resource name is available. x-ms-original-file: 2026-05-01/ProfessionalServiceCheckNameAvailability.json                                                                                                                   |
| [professionalServiceSubscriptionLevelGlobalListByAzureSubscriptionSample.js][professionalservicesubscriptionlevelgloballistbyazuresubscriptionsample]               | lists all Professional Service resources within an Azure subscription. x-ms-original-file: 2026-05-01/ProfessionalServiceListBySubscription.json                                                                                                                          |
| [professionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.js][professionalservicesubscriptionlevelglobalvalidatepurchasebysubscriptionsample] | validates a proposed Professional Service purchase at subscription scope before a resource group is selected. x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseBySubscription.json                                                                       |
| [professionalServiceSubscriptionLevelGlobalValidatePurchaseSample.js][professionalservicesubscriptionlevelglobalvalidatepurchasesample]                             | validates a proposed Professional Service purchase within a resource group without creating the resource. x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseByResourceGroup.json                                                                          |
| [professionalServiceSubscriptionLevelListByResourceGroupSample.js][professionalservicesubscriptionlevellistbyresourcegroupsample]                                   | lists all Professional Service resources within a resource group. x-ms-original-file: 2026-05-01/ProfessionalServiceListByResourceGroup.json                                                                                                                              |
| [professionalServiceSubscriptionLevelUnsubscribeSample.js][professionalservicesubscriptionlevelunsubscribesample]                                                   | unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. x-ms-original-file: 2026-05-01/ProfessionalServiceUnsubscribe.json                                    |
| [professionalServiceSubscriptionLevelUpdateSample.js][professionalservicesubscriptionlevelupdatesample]                                                             | updates mutable properties or tags on an existing Professional Service resource. x-ms-original-file: 2026-05-01/ProfessionalServiceUpdate.json                                                                                                                            |
| [professionalServiceSubscriptionLevelValidateUpdateSample.js][professionalservicesubscriptionlevelvalidateupdatesample]                                             | validates a proposed update to an existing Professional Service resource without modifying the resource. x-ms-original-file: 2026-05-01/ProfessionalServiceValidateUpdate.json                                                                                            |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/operationsListSample.js
[professionalserviceoperationstatusesgetsubscriptionoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceOperationStatusesGetSubscriptionOperationStatusSample.js
[professionalservicesubscriptionlevelcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelCreateOrUpdateSample.js
[professionalservicesubscriptionleveldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelDeleteSample.js
[professionalservicesubscriptionlevelgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelGetSample.js
[professionalservicesubscriptionlevelglobalchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelGlobalCheckNameAvailabilitySample.js
[professionalservicesubscriptionlevelgloballistbyazuresubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelGlobalListByAzureSubscriptionSample.js
[professionalservicesubscriptionlevelglobalvalidatepurchasebysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionSample.js
[professionalservicesubscriptionlevelglobalvalidatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelGlobalValidatePurchaseSample.js
[professionalservicesubscriptionlevellistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelListByResourceGroupSample.js
[professionalservicesubscriptionlevelunsubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelUnsubscribeSample.js
[professionalservicesubscriptionlevelupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelUpdateSample.js
[professionalservicesubscriptionlevelvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/professionalservice/arm-professionalservice/samples/v1-beta/javascript/professionalServiceSubscriptionLevelValidateUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-professionalservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/professionalservice/arm-professionalservice/README.md
