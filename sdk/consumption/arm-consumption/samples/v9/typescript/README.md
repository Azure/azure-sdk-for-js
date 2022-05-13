# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [aggregatedCostGetByManagementGroupSample.ts][aggregatedcostgetbymanagementgroupsample]                                               | Provides the aggregate cost of a management group and all child management groups by current billing period. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/AggregatedCostByManagementGroup.json                                                                                                        |
| [aggregatedCostGetForBillingPeriodByManagementGroupSample.ts][aggregatedcostgetforbillingperiodbymanagementgroupsample]               | Provides the aggregate cost of a management group and all child management groups by specified billing period x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/AggregatedCostForBillingPeriodByManagementGroup.json                                                                                       |
| [balancesGetByBillingAccountSample.ts][balancesgetbybillingaccountsample]                                                             | Gets the balances for a scope by billingAccountId. Balances are available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/BalancesByBillingAccount.json                                                                                                      |
| [balancesGetForBillingPeriodByBillingAccountSample.ts][balancesgetforbillingperiodbybillingaccountsample]                             | Gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/BalancesByBillingAccountForBillingPeriod.json                                                                   |
| [budgetsCreateOrUpdateSample.ts][budgetscreateorupdatesample]                                                                         | The operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/CreateOrUpdateBudget.json |
| [budgetsDeleteSample.ts][budgetsdeletesample]                                                                                         | The operation to delete a budget. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/DeleteBudget.json                                                                                                                                                                                                      |
| [budgetsGetSample.ts][budgetsgetsample]                                                                                               | Gets the budget for the scope by budget name. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/Budget.json                                                                                                                                                                                                |
| [budgetsListSample.ts][budgetslistsample]                                                                                             | Lists all budgets for the defined scope. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/BudgetsList.json                                                                                                                                                                                                |
| [chargesListSample.ts][chargeslistsample]                                                                                             | Lists the charges based for the defined scope. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesForBillingPeriodByDepartment.json                                                                                                                                                                  |
| [creditsGetSample.ts][creditsgetsample]                                                                                               | The credit summary by billingAccountId and billingProfileId. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/CreditSummaryByBillingProfile.json                                                                                                                                                          |
| [eventsListByBillingAccountSample.ts][eventslistbybillingaccountsample]                                                               | Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/EventsGetByBillingAccount.json                                                       |
| [eventsListByBillingProfileSample.ts][eventslistbybillingprofilesample]                                                               | Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/EventsListByBillingProfile.json                                                      |
| [lotsListByBillingAccountSample.ts][lotslistbybillingaccountsample]                                                                   | Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/LotsListByBillingAccount.json                  |
| [lotsListByBillingProfileSample.ts][lotslistbybillingprofilesample]                                                                   | Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/LotsListByBillingProfile.json                  |
| [marketplacesListSample.ts][marketplaceslistsample]                                                                                   | Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByBillingAccountList.json                                                                                    |
| [priceSheetGetByBillingPeriodSample.ts][pricesheetgetbybillingperiodsample]                                                           | Get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/PriceSheetExpand.json                                                                                         |
| [priceSheetGetSample.ts][pricesheetgetsample]                                                                                         | Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/PriceSheet.json                                                                                                                            |
| [reservationRecommendationDetailsGetSample.ts][reservationrecommendationdetailsgetsample]                                             | Details of a reservation recommendation for what-if analysis of reserved instances. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationDetailsByBillingAccount.json                                                                                                                |
| [reservationRecommendationsListSample.ts][reservationrecommendationslistsample]                                                       | List of recommendations for purchasing reserved instances. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsByBillingAccount.json                                                                                                                                               |
| [reservationTransactionsListByBillingProfileSample.ts][reservationtransactionslistbybillingprofilesample]                             | List of transactions for reserved instances on billing account scope x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationTransactionsListByBillingProfileId.json                                                                                                                                  |
| [reservationTransactionsListSample.ts][reservationtransactionslistsample]                                                             | List of transactions for reserved instances on billing account scope x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationTransactionsListByEnrollmentNumber.json                                                                                                                                  |
| [reservationsDetailsListByReservationOrderAndReservationSample.ts][reservationsdetailslistbyreservationorderandreservationsample]     | Lists the reservations details for provided date range. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationDetailsWithReservationId.json                                                                                                                                                         |
| [reservationsDetailsListByReservationOrderSample.ts][reservationsdetailslistbyreservationordersample]                                 | Lists the reservations details for provided date range. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationDetails.json                                                                                                                                                                          |
| [reservationsDetailsListSample.ts][reservationsdetailslistsample]                                                                     | Lists the reservations details for the defined scope and provided date range. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationDetailsByBillingAccountId.json                                                                                                                                  |
| [reservationsSummariesListByReservationOrderAndReservationSample.ts][reservationssummarieslistbyreservationorderandreservationsample] | Lists the reservations summaries for daily or monthly grain. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationSummariesDailyWithReservationId.json                                                                                                                                             |
| [reservationsSummariesListByReservationOrderSample.ts][reservationssummarieslistbyreservationordersample]                             | Lists the reservations summaries for daily or monthly grain. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationSummariesDaily.json                                                                                                                                                              |
| [reservationsSummariesListSample.ts][reservationssummarieslistsample]                                                                 | Lists the reservations summaries for the defined scope daily or monthly grain. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationSummariesDailyWithBillingAccountId.json                                                                                                                        |
| [tagsGetSample.ts][tagsgetsample]                                                                                                     | Get all available tag keys for the defined scope x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/Tags.json                                                                                                                                                                                               |
| [usageDetailsListSample.ts][usagedetailslistsample]                                                                                   | Lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later. x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/UsageDetailsListByBillingAccount.json                                                                                             |

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
node dist/aggregatedCostGetByManagementGroupSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/aggregatedCostGetByManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aggregatedcostgetbymanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/aggregatedCostGetByManagementGroupSample.ts
[aggregatedcostgetforbillingperiodbymanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/aggregatedCostGetForBillingPeriodByManagementGroupSample.ts
[balancesgetbybillingaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/balancesGetByBillingAccountSample.ts
[balancesgetforbillingperiodbybillingaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/balancesGetForBillingPeriodByBillingAccountSample.ts
[budgetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/budgetsCreateOrUpdateSample.ts
[budgetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/budgetsDeleteSample.ts
[budgetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/budgetsGetSample.ts
[budgetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/budgetsListSample.ts
[chargeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/chargesListSample.ts
[creditsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/creditsGetSample.ts
[eventslistbybillingaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/eventsListByBillingAccountSample.ts
[eventslistbybillingprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/eventsListByBillingProfileSample.ts
[lotslistbybillingaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/lotsListByBillingAccountSample.ts
[lotslistbybillingprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/lotsListByBillingProfileSample.ts
[marketplaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/marketplacesListSample.ts
[pricesheetgetbybillingperiodsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/priceSheetGetByBillingPeriodSample.ts
[pricesheetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/priceSheetGetSample.ts
[reservationrecommendationdetailsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationRecommendationDetailsGetSample.ts
[reservationrecommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationRecommendationsListSample.ts
[reservationtransactionslistbybillingprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationTransactionsListByBillingProfileSample.ts
[reservationtransactionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationTransactionsListSample.ts
[reservationsdetailslistbyreservationorderandreservationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsDetailsListByReservationOrderAndReservationSample.ts
[reservationsdetailslistbyreservationordersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsDetailsListByReservationOrderSample.ts
[reservationsdetailslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsDetailsListSample.ts
[reservationssummarieslistbyreservationorderandreservationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsSummariesListByReservationOrderAndReservationSample.ts
[reservationssummarieslistbyreservationordersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsSummariesListByReservationOrderSample.ts
[reservationssummarieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/reservationsSummariesListSample.ts
[tagsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/tagsGetSample.ts
[usagedetailslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/consumption/arm-consumption/samples/v9/typescript/src/usageDetailsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-consumption?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/consumption/arm-consumption/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
