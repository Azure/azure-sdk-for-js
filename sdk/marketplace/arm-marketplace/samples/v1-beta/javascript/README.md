# @azure/arm-marketplace client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-marketplace in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                 | lists all of the available Microsoft.Marketplace REST API operations. x-ms-original-file: 2025-01-01/GetOperations.json                                                                              |
| [privateStoreAcknowledgeOfferNotificationSample.js][privatestoreacknowledgeoffernotificationsample]                             | acknowledge notification for offer x-ms-original-file: 2025-01-01/AcknowledgeNotification.json                                                                                                       |
| [privateStoreAdminRequestApprovalsListSample.js][privatestoreadminrequestapprovalslistsample]                                   | get list of admin request approvals x-ms-original-file: 2025-01-01/AdminRequestApprovalsList.json                                                                                                    |
| [privateStoreAnyExistingOffersInTheCollectionsSample.js][privatestoreanyexistingoffersinthecollectionssample]                   | query whether exists any offer in the collections. x-ms-original-file: 2025-01-01/AnyExistingOffersInTheCollections.json                                                                             |
| [privateStoreBillingAccountsSample.js][privatestorebillingaccountssample]                                                       | tenant billing accounts names x-ms-original-file: 2025-01-01/BillingAccounts.json                                                                                                                    |
| [privateStoreBulkCollectionsActionSample.js][privatestorebulkcollectionsactionsample]                                           | perform an action on bulk collections x-ms-original-file: 2025-01-01/BulkCollectionsAction.json                                                                                                      |
| [privateStoreCollectionApproveAllItemsSample.js][privatestorecollectionapproveallitemssample]                                   | delete all existing offers from the collection and enable approve all items. x-ms-original-file: 2025-01-01/ApproveAllItems.json                                                                     |
| [privateStoreCollectionCreateOrUpdateSample.js][privatestorecollectioncreateorupdatesample]                                     | create or update private store collection x-ms-original-file: 2025-01-01/CreatePrivateStoreCollection.json                                                                                           |
| [privateStoreCollectionDeleteSample.js][privatestorecollectiondeletesample]                                                     | delete a collection from the given private store. x-ms-original-file: 2025-01-01/DeletePrivateStoreCollection.json                                                                                   |
| [privateStoreCollectionDisableApproveAllItemsSample.js][privatestorecollectiondisableapproveallitemssample]                     | disable approve all items for the collection. x-ms-original-file: 2025-01-01/DisableApproveAllItems.json                                                                                             |
| [privateStoreCollectionGetSample.js][privatestorecollectiongetsample]                                                           | gets private store collection x-ms-original-file: 2025-01-01/GetPrivateStoreCollection.json                                                                                                          |
| [privateStoreCollectionListSample.js][privatestorecollectionlistsample]                                                         | gets private store collections list x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionsList.json                                                                                               |
| [privateStoreCollectionOfferContextsViewSample.js][privatestorecollectionoffercontextsviewsample]                               | retrieve offer information with plans under required contexts restrictions. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOfferContextsView.json                                           |
| [privateStoreCollectionOfferCreateOrUpdateSample.js][privatestorecollectionoffercreateorupdatesample]                           | update or add an offer to a specific collection of the private store. x-ms-original-file: 2025-01-01/PrivateStoreOffer_update.json                                                                   |
| [privateStoreCollectionOfferDeleteSample.js][privatestorecollectionofferdeletesample]                                           | deletes an offer from the given collection of private store. x-ms-original-file: 2025-01-01/DeletePrivateStoreOffer.json                                                                             |
| [privateStoreCollectionOfferGetSample.js][privatestorecollectionoffergetsample]                                                 | gets information about a specific offer. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffer.json                                                                                          |
| [privateStoreCollectionOfferListByContextsSample.js][privatestorecollectionofferlistbycontextssample]                           | get a list of all offers in the given collection according to the required contexts. x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionOffersWithFullContext.json                              |
| [privateStoreCollectionOfferListSample.js][privatestorecollectionofferlistsample]                                               | get a list of all private offers in the given private store and collection x-ms-original-file: 2025-01-01/GetPrivateStoreOffers.json                                                                 |
| [privateStoreCollectionOfferPostSample.js][privatestorecollectionofferpostsample]                                               | delete Private store offer. This is a workaround. x-ms-original-file: 2025-01-01/PostPrivateStoreCollectionOffer.json                                                                                |
| [privateStoreCollectionOfferUpsertOfferWithMultiContextSample.js][privatestorecollectionofferupsertofferwithmulticontextsample] | upsert an offer with multiple context details. x-ms-original-file: 2025-01-01/UpsertOfferWithMultiContext.json                                                                                       |
| [privateStoreCollectionPostSample.js][privatestorecollectionpostsample]                                                         | delete Private store collection. This is a workaround. x-ms-original-file: 2025-01-01/PostPrivateStoreCollection.json                                                                                |
| [privateStoreCollectionTransferOffersSample.js][privatestorecollectiontransferofferssample]                                     | transferring offers (copy or move) from source collection to target collection(s) x-ms-original-file: 2025-01-01/TransferOffers.json                                                                 |
| [privateStoreCollectionsToSubscriptionsMappingSample.js][privatestorecollectionstosubscriptionsmappingsample]                   | for a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list. x-ms-original-file: 2025-01-01/CollectionsToSubscriptionsMapping.json |
| [privateStoreCreateApprovalRequestSample.js][privatestorecreateapprovalrequestsample]                                           | create approval request x-ms-original-file: 2025-01-01/CreateApprovalRequest.json                                                                                                                    |
| [privateStoreCreateOrUpdateSample.js][privatestorecreateorupdatesample]                                                         | changes private store properties x-ms-original-file: 2025-01-01/PrivateStores_update.json                                                                                                            |
| [privateStoreDeleteSample.js][privatestoredeletesample]                                                                         | deletes the private store. All that is not saved will be lost. x-ms-original-file: 2025-01-01/DeletePrivateStore.json                                                                                |
| [privateStoreFetchAllSubscriptionsInTenantSample.js][privatestorefetchallsubscriptionsintenantsample]                           | fetch all subscriptions in tenant, only for marketplace admin x-ms-original-file: 2025-01-01/FetchAllSubscriptionsInTenant.json                                                                      |
| [privateStoreGetAdminRequestApprovalSample.js][privatestoregetadminrequestapprovalsample]                                       | get open approval requests x-ms-original-file: 2025-01-01/GetAdminRequestApproval.json                                                                                                               |
| [privateStoreGetApprovalRequestsListSample.js][privatestoregetapprovalrequestslistsample]                                       | get all open approval requests of current user x-ms-original-file: 2025-01-01/GetApprovalRequestsList.json                                                                                           |
| [privateStoreGetRequestApprovalSample.js][privatestoregetrequestapprovalsample]                                                 | get open request approval details x-ms-original-file: 2025-01-01/GetRequestApproval.json                                                                                                             |
| [privateStoreGetSample.js][privatestoregetsample]                                                                               | get information about the private store x-ms-original-file: 2025-01-01/GetPrivateStore.json                                                                                                          |
| [privateStoreListNewPlansNotificationsSample.js][privatestorelistnewplansnotificationssample]                                   | list new plans notifications x-ms-original-file: 2025-01-01/ListNewPlansNotifications.json                                                                                                           |
| [privateStoreListSample.js][privatestorelistsample]                                                                             | gets the list of available private stores. x-ms-original-file: 2025-01-01/GetPrivateStores.json                                                                                                      |
| [privateStoreListStopSellOffersPlansNotificationsSample.js][privatestoreliststopselloffersplansnotificationssample]             | list stop sell notifications for both stop sell offers and stop sell plans x-ms-original-file: 2025-01-01/ListStopSellOffersPlansNotifications.json                                                  |
| [privateStoreListSubscriptionsContextSample.js][privatestorelistsubscriptionscontextsample]                                     | list all the subscriptions in the private store context x-ms-original-file: 2025-01-01/ListSubscriptionsContext.json                                                                                 |
| [privateStoreQueryApprovedPlansSample.js][privatestorequeryapprovedplanssample]                                                 | get map of plans and related approved subscriptions. x-ms-original-file: 2025-01-01/QueryApprovedPlans.json                                                                                          |
| [privateStoreQueryNotificationsStateSample.js][privatestorequerynotificationsstatesample]                                       | get private store notifications state x-ms-original-file: 2025-01-01/NotificationsState.json                                                                                                         |
| [privateStoreQueryOffersSample.js][privatestorequeryofferssample]                                                               | list of offers, regardless the collections x-ms-original-file: 2025-01-01/QueryOffers.json                                                                                                           |
| [privateStoreQueryRequestApprovalSample.js][privatestorequeryrequestapprovalsample]                                             | get request statuses foreach plan, this api is used as a complex GET action. x-ms-original-file: 2025-01-01/QueryRequestApproval.json                                                                |
| [privateStoreQueryUserOffersSample.js][privatestorequeryuserofferssample]                                                       | list of user's approved offers for the provided offers and subscriptions x-ms-original-file: 2025-01-01/QueryUserOffers.json                                                                         |
| [privateStoreUpdateAdminRequestApprovalSample.js][privatestoreupdateadminrequestapprovalsample]                                 | update the admin action, weather the request is approved or rejected and the approved plans x-ms-original-file: 2025-01-01/UpdateAdminRequestApproval.json                                           |
| [privateStoreWithdrawPlanSample.js][privatestorewithdrawplansample]                                                             | withdraw a user request approval on specific plan x-ms-original-file: 2025-01-01/WithdrawPlan.json                                                                                                   |
| [queryRulesSample.js][queryrulessample]                                                                                         | get a list of all private store rules in the given private store and collection x-ms-original-file: 2025-01-01/GetCollectionRules.json                                                               |
| [queryUserRulesSample.js][queryuserrulessample]                                                                                 | all rules approved in the private store that are relevant for user subscriptions x-ms-original-file: 2025-01-01/QueryUserRules.json                                                                  |
| [setCollectionRulesSample.js][setcollectionrulessample]                                                                         | set rule for specific private store and collection x-ms-original-file: 2025-01-01/SetCollectionRules.json                                                                                            |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/operationsListSample.js
[privatestoreacknowledgeoffernotificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreAcknowledgeOfferNotificationSample.js
[privatestoreadminrequestapprovalslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreAdminRequestApprovalsListSample.js
[privatestoreanyexistingoffersinthecollectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreAnyExistingOffersInTheCollectionsSample.js
[privatestorebillingaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreBillingAccountsSample.js
[privatestorebulkcollectionsactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreBulkCollectionsActionSample.js
[privatestorecollectionapproveallitemssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionApproveAllItemsSample.js
[privatestorecollectioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionCreateOrUpdateSample.js
[privatestorecollectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionDeleteSample.js
[privatestorecollectiondisableapproveallitemssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionDisableApproveAllItemsSample.js
[privatestorecollectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionGetSample.js
[privatestorecollectionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionListSample.js
[privatestorecollectionoffercontextsviewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferContextsViewSample.js
[privatestorecollectionoffercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferCreateOrUpdateSample.js
[privatestorecollectionofferdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferDeleteSample.js
[privatestorecollectionoffergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferGetSample.js
[privatestorecollectionofferlistbycontextssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferListByContextsSample.js
[privatestorecollectionofferlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferListSample.js
[privatestorecollectionofferpostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferPostSample.js
[privatestorecollectionofferupsertofferwithmulticontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionOfferUpsertOfferWithMultiContextSample.js
[privatestorecollectionpostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionPostSample.js
[privatestorecollectiontransferofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionTransferOffersSample.js
[privatestorecollectionstosubscriptionsmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCollectionsToSubscriptionsMappingSample.js
[privatestorecreateapprovalrequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCreateApprovalRequestSample.js
[privatestorecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreCreateOrUpdateSample.js
[privatestoredeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreDeleteSample.js
[privatestorefetchallsubscriptionsintenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreFetchAllSubscriptionsInTenantSample.js
[privatestoregetadminrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreGetAdminRequestApprovalSample.js
[privatestoregetapprovalrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreGetApprovalRequestsListSample.js
[privatestoregetrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreGetRequestApprovalSample.js
[privatestoregetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreGetSample.js
[privatestorelistnewplansnotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreListNewPlansNotificationsSample.js
[privatestorelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreListSample.js
[privatestoreliststopselloffersplansnotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreListStopSellOffersPlansNotificationsSample.js
[privatestorelistsubscriptionscontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreListSubscriptionsContextSample.js
[privatestorequeryapprovedplanssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreQueryApprovedPlansSample.js
[privatestorequerynotificationsstatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreQueryNotificationsStateSample.js
[privatestorequeryofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreQueryOffersSample.js
[privatestorequeryrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreQueryRequestApprovalSample.js
[privatestorequeryuserofferssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreQueryUserOffersSample.js
[privatestoreupdateadminrequestapprovalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreUpdateAdminRequestApprovalSample.js
[privatestorewithdrawplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/privateStoreWithdrawPlanSample.js
[queryrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/queryRulesSample.js
[queryuserrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/queryUserRulesSample.js
[setcollectionrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplace/arm-marketplace/samples/v1-beta/javascript/setCollectionRulesSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-marketplace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/marketplace/arm-marketplace/README.md
