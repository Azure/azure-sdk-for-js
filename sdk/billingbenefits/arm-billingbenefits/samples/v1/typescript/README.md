# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                           | List all the operations. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/OperationsGet.json                                                                                                    |
| [reservationOrderAliasCreateSample.ts][reservationorderaliascreatesample] | Create a reservation order alias. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/ReservationOrderAliasCreate.json                                                                             |
| [reservationOrderAliasGetSample.ts][reservationorderaliasgetsample]       | Get a reservation order alias. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/ReservationOrderAliasGet.json                                                                                   |
| [savingsPlanGetSample.ts][savingsplangetsample]                           | Get savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanItemGet.json                                                                                                      |
| [savingsPlanListAllSample.ts][savingsplanlistallsample]                   | List savings plans. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlansList.json                                                                                                      |
| [savingsPlanListSample.ts][savingsplanlistsample]                         | List savings plans in an order. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlansInOrderList.json                                                                                   |
| [savingsPlanOrderAliasCreateSample.ts][savingsplanorderaliascreatesample] | Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851 x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasCreate.json |
| [savingsPlanOrderAliasGetSample.ts][savingsplanorderaliasgetsample]       | Get a savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasGet.json                                                                                              |
| [savingsPlanOrderElevateSample.ts][savingsplanorderelevatesample]         | Elevate as owner on savings plan order based on billing permissions. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderElevate.json                                              |
| [savingsPlanOrderGetSample.ts][savingsplanordergetsample]                 | Get a savings plan order. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderGet.json                                                                                             |
| [savingsPlanOrderListSample.ts][savingsplanorderlistsample]               | List all Savings plan orders. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderList.json                                                                                        |
| [savingsPlanUpdateSample.ts][savingsplanupdatesample]                     | Update savings plan. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanUpdate.json                                                                                                    |
| [savingsPlanValidateUpdateSample.ts][savingsplanvalidateupdatesample]     | Validate savings plan patch. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidateUpdate.json                                                                                    |
| [validatePurchaseSample.ts][validatepurchasesample]                       | Validate savings plan purchase. x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidatePurchase.json                                                                               |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/operationsListSample.ts
[reservationorderaliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/reservationOrderAliasCreateSample.ts
[reservationorderaliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/reservationOrderAliasGetSample.ts
[savingsplangetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanGetSample.ts
[savingsplanlistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanListAllSample.ts
[savingsplanlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanListSample.ts
[savingsplanorderaliascreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanOrderAliasCreateSample.ts
[savingsplanorderaliasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanOrderAliasGetSample.ts
[savingsplanorderelevatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanOrderElevateSample.ts
[savingsplanordergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanOrderGetSample.ts
[savingsplanorderlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanOrderListSample.ts
[savingsplanupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanUpdateSample.ts
[savingsplanvalidateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/savingsPlanValidateUpdateSample.ts
[validatepurchasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingbenefits/arm-billingbenefits/samples/v1/typescript/src/validatePurchaseSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-billingbenefits?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/billingbenefits/arm-billingbenefits/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
