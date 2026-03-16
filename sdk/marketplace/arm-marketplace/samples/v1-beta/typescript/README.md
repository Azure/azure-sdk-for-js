# @azure/arm-marketplace client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-marketplace in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                 | lists all of the available Microsoft.Marketplace REST API operations. x-ms-original-file: 2025-01-01/GetOperations.json                                                                              |
| [privateStoreAcknowledgeOfferNotificationSample.ts][privatestoreacknowledgeoffernotificationsample]                             | acknowledge notification for offer x-ms-original-file: 2025-01-01/AcknowledgeNotification.json                                                                                                       |
| [privateStoreAdminRequestApprovalsListSample.ts][privatestoreadminrequestapprovalslistsample]                                   | get list of admin request approvals x-ms-original-file: 2025-01-01/AdminRequestApprovalsList.json                                                                                                    |
| [privateStoreAnyExistingOffersInTheCollectionsSample.ts][privatestoreanyexistingoffersinthecollectionssample]                   | query whether exists any offer in the collections. x-ms-original-file: 2025-01-01/AnyExistingOffersInTheCollections.json                                                                             |
| [privateStoreBillingAccountsSample.ts][privatestorebillingaccountssample]                                                       | tenant billing accounts names x-ms-original-file: 2025-01-01/BillingAccounts.json                                                                                                                    |
| [privateStoreBulkCollectionsActionSample.ts][privatestorebulkcollectionsactionsample]                                           | perform an action on bulk collections x-ms-original-file: 2025-01-01/BulkCollectionsAction.json                                                                                                      |
| [privateStoreCollectionApproveAllItemsSample.ts][privatestorecollectionapproveallitemssample]                                   | delete all existing offers from the collection and enable approve all items. x-ms-original-file: 2025-01-01/ApproveAllItems.json                                                                     |
| [privateStoreCollectionCreateOrUpdateSample.ts][privatestorecollectioncreateorupdatesample]                                     | create or update private store collection x-ms-original-file: 2025-01-01/CreatePrivateStoreCollection.json                                                                                           |
| [privateStoreCollectionDeleteSample.ts][privatestorecollectiondeletesample]                                                     | delete a collection from the given private store. x-ms-original-file: 2025-01-01/DeletePrivateStoreCollection.json                                                                                   |
| [privateStoreCollectionDisableApproveAllItemsSample.ts][privatestorecollectiondisableapproveallitemssample]                     | disable approve all items for the collection. x-ms-original-file: 2025-01-01/DisableApproveAllItems.json                                                                                             |
| [privateStoreCollectionGetSample.ts][privatestorecollectiongetsample]                                                           | gets private store collection x-ms-original-file: 2025-01-01/GetPrivateStoreCollection.json                                                                                                          |
| [privateStoreCollectionListSample.ts][privatestorecollectionlistsample]                                                         | gets private store collections list x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionsList.json                                                                                               |
| [privateStoreCollectionOfferContextsViewSample.ts][privatestorecollectionoffercontextsviewsample]                               | retrieve offer information with plans under required contexts restrictions. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOfferContextsView.json                                           |
| [privateStoreCollectionOfferCreateOrUpdateSample.ts][privatestorecollectionoffercreateorupdatesample]                           | update or add an offer to a specific collection of the private store. x-ms-original-file: 2025-01-01/PrivateStoreOffer_update.json                                                                   |
| [privateStoreCollectionOfferDeleteSample.ts][privatestorecollectionofferdeletesample]                                           | deletes an offer from the given collection of private store. x-ms-original-file: 2025-01-01/DeletePrivateStoreOffer.json                                                                             |
| [privateStoreCollectionOfferGetSample.ts][privatestorecollectionoffergetsample]                                                 | gets information about a specific offer. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffer.json                                                                                          |
| [privateStoreCollectionOfferListByContextsSample.ts][privatestorecollectionofferlistbycontextssample]                           | get a list of all offers in the given collection according to the required contexts. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffersWithFullContext.json                              |
| [privateStoreCollectionOfferListSample.ts][privatestorecollectionofferlistsample]                                               | get a list of all private offers in the given private store and collection x-ms-original-file: 2025-01-01/GetPrivateStoreOffers.json                                                                 |
| [privateStoreCollectionOfferPostSample.ts][privatestorecollectionofferpostsample]                                               | delete Private store offer. This is a workaround. x-ms-original-file: 2025-01-01/PostPrivateStoreCollectionOffer.json                                                                                |
| [privateStoreCollectionOfferUpsertOfferWithMultiContextSample.ts][privatestorecollectionofferupsertofferwithmulticontextsample] | upsert an offer with multiple context details. x-ms-original-file: 2025-01-01/UpsertOfferWithMultiContext.json                                                                                       |
| [privateStoreCollectionPostSample.ts][privatestorecollectionpostsample]                                                         | delete Private store collection. This is a workaround. x-ms-original-file: 2025-01-01/PostPrivateStoreCollection.json                                                                                |
| [privateStoreCollectionTransferOffersSample.ts][privatestorecollectiontransferofferssample]                                     | transferring offers (copy or move) from source collection to target collection(s) x-ms-original-file: 2025-01-01/TransferOffers.json                                                                 |
| [privateStoreCollectionsToSubscriptionsMappingSample.ts][privatestorecollectionstosubscriptionsmappingsample]                   | for a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list. x-ms-original-file: 2025-01-01/CollectionsToSubscriptionsMapping.json |
| [privateStoreCreateApprovalRequestSample.ts][privatestorecreateapprovalrequestsample]                                           | create approval request x-ms-original-file: 2025-01-01/CreateApprovalRequest.json                                                                                                                    |
| [privateStoreCreateOrUpdateSample.ts][privatestorecreateorupdatesample]                                                         | changes private store properties x-ms-original-file: 2025-01-01/PrivateStores_update.json                                                                                                            |
| [privateStoreDeleteSample.ts][privatestoredeletesample]                                                                         | deletes the private store. All that is not saved will be lost. x-ms-original-file: 2025-01-01/DeletePrivateStore.json                                                                                |
| [privateStoreFetchAllSubscriptionsInTenantSample.ts][privatestorefetchallsubscriptionsintenantsample]                           | fetch all subscriptions in tenant, only for marketplace admin x-ms-original-file: 2025-01-01/FetchAllSubscriptionsInTenant.json                                                                      |
| [privateStoreGetAdminRequestApprovalSample.ts][privatestoregetadminrequestapprovalsample]                                       | get open approval requests x-ms-original-file: 2025-01-01/GetAdminRequestApproval.json                                                                                                               |
| [privateStoreGetApprovalRequestsListSample.ts][privatestoregetapprovalrequestslistsample]                                       | get all open approval requests of current user x-ms-original-file: 2025-01-01/GetApprovalRequestsList.json                                                                                           |
| [privateStoreGetRequestApprovalSample.ts][privatestoregetrequestapprovalsample]                                                 | get open request approval details x-ms-original-file: 2025-01-01/GetRequestApproval.json                                                                                                             |
| [privateStoreGetSample.ts][privatestoregetsample]                                                                               | get information about the private store x-ms-original-file: 2025-01-01/GetPrivateStore.json                                                                                                          |
| [privateStoreListNewPlansNotificationsSample.ts][privatestorelistnewplansnotificationssample]                                   | list new plans notifications x-ms-original-file: 2025-01-01/ListNewPlansNotifications.json                                                                                                           |
| [privateStoreListSample.ts][privatestorelistsample]                                                                             | gets the list of available private stores. x-ms-original-file: 2025-01-01/GetPrivateStores.json                                                                                                      |
| [privateStoreListStopSellOffersPlansNotificationsSample.ts][privatestoreliststopselloffersplansnotificationssample]             | list stop sell notifications for both stop sell offers and stop sell plans x-ms-original-file: 2025-01-01/ListStopSellOffersPlansNotifications.json                                                  |
| [privateStoreListSubscriptionsContextSample.ts][privatestorelistsubscriptionscontextsample]                                     | list all the subscriptions in the private store context x-ms-original-file: 2025-01-01/ListSubscriptionsContext.json                                                                                 |
| [privateStoreQueryApprovedPlansSample.ts][privatestorequeryapprovedplanssample]                                                 | get map of plans and related approved subscriptions. x-ms-original-file: 2025-01-01/QueryApprovedPlans.json                                                                                          |
| [privateStoreQueryNotificationsStateSample.ts][privatestorequerynotificationsstatesample]                                       | get private store notifications state x-ms-original-file: 2025-01-01/NotificationsState.json                                                                                                         |
| [privateStoreQueryOffersSample.ts][privatestorequeryofferssample]                                                               | list of offers, regardless the collections x-ms-original-file: 2025-01-01/QueryOffers.json                                                                                                           |
| [privateStoreQueryRequestApprovalSample.ts][privatestorequeryrequestapprovalsample]                                             | get request statuses foreach plan, this api is used as a complex GET action. x-ms-original-file: 2025-01-01/QueryRequestApproval.json                                                                |
| [privateStoreQueryUserOffersSample.ts][privatestorequeryuserofferssample]                                                       | list of user's approved offers for the provided offers and subscriptions x-ms-original-file: 2025-01-01/QueryUserOffers.json                                                                         |
| [privateStoreUpdateAdminRequestApprovalSample.ts][privatestoreupdateadminrequestapprovalsample]                                 | update the admin action, weather the request is approved or rejected and the approved plans x-ms-original-file: 2025-01-01/UpdateAdminRequestApproval.json                                           |
| [privateStoreWithdrawPlanSample.ts][privatestorewithdrawplansample]                                                             | withdraw a user request approval on specific plan x-ms-original-file: 2025-01-01/WithdrawPlan.json                                                                                                   |
| [queryRulesSample.ts][queryrulessample]                                                                                         | get a list of all private store rules in the given private store and collection x-ms-original-file: 2025-01-01/GetCollectionRules.json                                                               |
| [queryUserRulesSample.ts][queryuserrulessample]                                                                                 | all rules approved in the private store that are relevant for user subscriptions x-ms-original-file: 2025-01-01/QueryUserRules.json                                                                  |
| [setCollectionRulesSample.ts][setcollectionrulessample]                                                                         | set rule for specific private store and collection x-ms-original-file: 2025-01-01/SetCollectionRules.json                                                                                            |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/operationsListSample.ts
[privatestoreacknowledgeoffernotificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreAcknowledgeOfferNotificationSample.ts
[privatestoreadminrequestapprovalslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreAdminRequestApprovalsListSample.ts
[privatestoreanyexistingoffersinthecollectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreAnyExistingOffersInTheCollectionsSample.ts
[privatestorebillingaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreBillingAccountsSample.ts
[privatestorebulkcollectionsactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreBulkCollectionsActionSample.ts
[privatestorecollectionapproveallitemssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionApproveAllItemsSample.ts
[privatestorecollectioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionCreateOrUpdateSample.ts
[privatestorecollectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionDeleteSample.ts
[privatestorecollectiondisableapproveallitemssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionDisableApproveAllItemsSample.ts
[privatestorecollectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionGetSample.ts
[privatestorecollectionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionListSample.ts
[privatestorecollectionoffercontextsviewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferContextsViewSample.ts
[privatestorecollectionoffercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferCreateOrUpdateSample.ts
[privatestorecollectionofferdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferDeleteSample.ts
[privatestorecollectionoffergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferGetSample.ts
[privatestorecollectionofferlistbycontextssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferListByContextsSample.ts
[privatestorecollectionofferlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferListSample.ts
[privatestorecollectionofferpostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferPostSample.ts
[privatestorecollectionofferupsertofferwithmulticontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionOfferUpsertOfferWithMultiContextSample.ts
[privatestorecollectionpostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionPostSample.ts
[privatestorecollectiontransferofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionTransferOffersSample.ts
[privatestorecollectionstosubscriptionsmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCollectionsToSubscriptionsMappingSample.ts
[privatestorecreateapprovalrequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCreateApprovalRequestSample.ts
[privatestorecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreCreateOrUpdateSample.ts
[privatestoredeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreDeleteSample.ts
[privatestorefetchallsubscriptionsintenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreFetchAllSubscriptionsInTenantSample.ts
[privatestoregetadminrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreGetAdminRequestApprovalSample.ts
[privatestoregetapprovalrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreGetApprovalRequestsListSample.ts
[privatestoregetrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreGetRequestApprovalSample.ts
[privatestoregetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreGetSample.ts
[privatestorelistnewplansnotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreListNewPlansNotificationsSample.ts
[privatestorelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreListSample.ts
[privatestoreliststopselloffersplansnotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreListStopSellOffersPlansNotificationsSample.ts
[privatestorelistsubscriptionscontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreListSubscriptionsContextSample.ts
[privatestorequeryapprovedplanssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreQueryApprovedPlansSample.ts
[privatestorequerynotificationsstatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreQueryNotificationsStateSample.ts
[privatestorequeryofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreQueryOffersSample.ts
[privatestorequeryrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreQueryRequestApprovalSample.ts
[privatestorequeryuserofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreQueryUserOffersSample.ts
[privatestoreupdateadminrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreUpdateAdminRequestApprovalSample.ts
[privatestorewithdrawplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/privateStoreWithdrawPlanSample.ts
[queryrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/queryRulesSample.ts
[queryuserrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/queryUserRulesSample.ts
[setcollectionrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/typescript/src/setCollectionRulesSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-marketplace?view=azure-node-preview?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/marketplace/arm-marketplace/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
