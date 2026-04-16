# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                           | List all the operations. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/OperationsGet.json                                                                                                    |
| [reservationOrderAliasCreateSample.js][reservationorderaliascreatesample] | Create a reservation order alias. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/ReservationOrderAliasCreate.json                                                                             |
| [reservationOrderAliasGetSample.js][reservationorderaliasgetsample]       | Get a reservation order alias. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/ReservationOrderAliasGet.json                                                                                   |
| [savingsPlanGetSample.js][savingsplangetsample]                           | Get savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanItemGet.json                                                                                                      |
| [savingsPlanListAllSample.js][savingsplanlistallsample]                   | List savings plans. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlansList.json                                                                                                      |
| [savingsPlanListSample.js][savingsplanlistsample]                         | List savings plans in an order. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlansInOrderList.json                                                                                   |
| [savingsPlanOrderAliasCreateSample.js][savingsplanorderaliascreatesample] | Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851 x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasCreate.json |
| [savingsPlanOrderAliasGetSample.js][savingsplanorderaliasgetsample]       | Get a savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasGet.json                                                                                              |
| [savingsPlanOrderElevateSample.js][savingsplanorderelevatesample]         | Elevate as owner on savings plan order based on billing permissions. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderElevate.json                                              |
| [savingsPlanOrderGetSample.js][savingsplanordergetsample]                 | Get a savings plan order. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderGet.json                                                                                             |
| [savingsPlanOrderListSample.js][savingsplanorderlistsample]               | List all Savings plan orders. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderList.json                                                                                        |
| [savingsPlanUpdateSample.js][savingsplanupdatesample]                     | Update savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanUpdate.json                                                                                                    |
| [savingsPlanValidateUpdateSample.js][savingsplanvalidateupdatesample]     | Validate savings plan patch. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidateUpdate.json                                                                                    |
| [validatePurchaseSample.js][validatepurchasesample]                       | Validate savings plan purchase. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidatePurchase.json                                                                               |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/operationsListSample.js
[reservationorderaliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/reservationOrderAliasCreateSample.js
[reservationorderaliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/reservationOrderAliasGetSample.js
[savingsplangetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanGetSample.js
[savingsplanlistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanListAllSample.js
[savingsplanlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanListSample.js
[savingsplanorderaliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanOrderAliasCreateSample.js
[savingsplanorderaliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanOrderAliasGetSample.js
[savingsplanorderelevatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanOrderElevateSample.js
[savingsplanordergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanOrderGetSample.js
[savingsplanorderlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanOrderListSample.js
[savingsplanupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanUpdateSample.js
[savingsplanvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/savingsPlanValidateUpdateSample.js
[validatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/javascript/validatePurchaseSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-billingbenefits?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/billingbenefits/arm-billingbenefits/README.md
