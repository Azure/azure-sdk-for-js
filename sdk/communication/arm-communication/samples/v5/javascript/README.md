# @azure/arm-communication client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-communication in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationServicesCheckNameAvailabilitySample.js][communicationserviceschecknameavailabilitysample]         | checks that the CommunicationService name is valid and is not already in use. x-ms-original-file: 2026-03-18/communicationServices/checkNameAvailabilityAvailable.json                                  |
| [communicationServicesCreateOrUpdateSample.js][communicationservicescreateorupdatesample]                       | create a new CommunicationService or update an existing CommunicationService. x-ms-original-file: 2026-03-18/communicationServices/createOrUpdate.json                                                  |
| [communicationServicesDeleteSample.js][communicationservicesdeletesample]                                       | operation to delete a CommunicationService. x-ms-original-file: 2026-03-18/communicationServices/delete.json                                                                                            |
| [communicationServicesGetSample.js][communicationservicesgetsample]                                             | get the CommunicationService and its properties. x-ms-original-file: 2026-03-18/communicationServices/get.json                                                                                          |
| [communicationServicesLinkNotificationHubSample.js][communicationserviceslinknotificationhubsample]             | links an Azure Notification Hub to this communication service. x-ms-original-file: 2026-03-18/communicationServices/linkNotificationHub.json                                                            |
| [communicationServicesListByResourceGroupSample.js][communicationserviceslistbyresourcegroupsample]             | handles requests to list all resources in a resource group. x-ms-original-file: 2026-03-18/communicationServices/listByResourceGroup.json                                                               |
| [communicationServicesListBySubscriptionSample.js][communicationserviceslistbysubscriptionsample]               | handles requests to list all resources in a subscription. x-ms-original-file: 2026-03-18/communicationServices/listBySubscription.json                                                                  |
| [communicationServicesListKeysSample.js][communicationserviceslistkeyssample]                                   | get the access keys of the CommunicationService resource. x-ms-original-file: 2026-03-18/communicationServices/listKeys.json                                                                            |
| [communicationServicesRegenerateKeySample.js][communicationservicesregeneratekeysample]                         | regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: 2026-03-18/communicationServices/regenerateKey.json                 |
| [communicationServicesUpdateSample.js][communicationservicesupdatesample]                                       | operation to update an existing CommunicationService. x-ms-original-file: 2026-03-18/communicationServices/update.json                                                                                  |
| [domainsCancelVerificationSample.js][domainscancelverificationsample]                                           | cancel verification of DNS record. x-ms-original-file: 2026-03-18/domains/cancelVerification.json                                                                                                       |
| [domainsCreateOrUpdateSample.js][domainscreateorupdatesample]                                                   | add a new Domains resource under the parent EmailService resource or update an existing Domains resource. x-ms-original-file: 2026-03-18/domains/createOrUpdate.json                                    |
| [domainsDeleteSample.js][domainsdeletesample]                                                                   | operation to delete a Domains resource. x-ms-original-file: 2026-03-18/domains/delete.json                                                                                                              |
| [domainsGetSample.js][domainsgetsample]                                                                         | get the Domains resource and its properties. x-ms-original-file: 2026-03-18/domains/get.json                                                                                                            |
| [domainsInitiateVerificationSample.js][domainsinitiateverificationsample]                                       | initiate verification of DNS record. x-ms-original-file: 2026-03-18/domains/initiateVerification.json                                                                                                   |
| [domainsListByEmailServiceResourceSample.js][domainslistbyemailserviceresourcesample]                           | handles requests to list all Domains resources under the parent EmailServices resource. x-ms-original-file: 2026-03-18/domains/listByEmailService.json                                                  |
| [domainsUpdateSample.js][domainsupdatesample]                                                                   | operation to update an existing Domains resource. x-ms-original-file: 2026-03-18/domains/update.json                                                                                                    |
| [emailServicesCreateOrUpdateSample.js][emailservicescreateorupdatesample]                                       | create a new EmailService or update an existing EmailService. x-ms-original-file: 2026-03-18/emailServices/createOrUpdate.json                                                                          |
| [emailServicesDeleteSample.js][emailservicesdeletesample]                                                       | operation to delete a EmailService. x-ms-original-file: 2026-03-18/emailServices/delete.json                                                                                                            |
| [emailServicesGetSample.js][emailservicesgetsample]                                                             | get the EmailService and its properties. x-ms-original-file: 2026-03-18/emailServices/get.json                                                                                                          |
| [emailServicesListByResourceGroupSample.js][emailserviceslistbyresourcegroupsample]                             | handles requests to list all resources in a resource group. x-ms-original-file: 2026-03-18/emailServices/listByResourceGroup.json                                                                       |
| [emailServicesListBySubscriptionSample.js][emailserviceslistbysubscriptionsample]                               | handles requests to list all resources in a subscription. x-ms-original-file: 2026-03-18/emailServices/listBySubscription.json                                                                          |
| [emailServicesListVerifiedExchangeOnlineDomainsSample.js][emailserviceslistverifiedexchangeonlinedomainssample] | get a list of domains that are fully verified in Exchange Online. x-ms-original-file: 2026-03-18/emailServices/getVerifiedExchangeOnlineDomains.json                                                    |
| [emailServicesUpdateSample.js][emailservicesupdatesample]                                                       | operation to update an existing EmailService. x-ms-original-file: 2026-03-18/emailServices/update.json                                                                                                  |
| [operationsListSample.js][operationslistsample]                                                                 | lists all of the available REST API operations of the Microsoft.Communication provider. x-ms-original-file: 2026-03-18/communicationServices/operationsList.json                                        |
| [senderUsernamesCreateOrUpdateSample.js][senderusernamescreateorupdatesample]                                   | add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource. x-ms-original-file: 2026-03-18/senderUsernames/createOrUpdate.json                   |
| [senderUsernamesDeleteSample.js][senderusernamesdeletesample]                                                   | operation to delete a SenderUsernames resource. x-ms-original-file: 2026-03-18/senderUsernames/delete.json                                                                                              |
| [senderUsernamesGetSample.js][senderusernamesgetsample]                                                         | get a valid sender username for a domains resource. x-ms-original-file: 2026-03-18/senderUsernames/get.json                                                                                             |
| [senderUsernamesListByDomainsSample.js][senderusernameslistbydomainssample]                                     | list all valid sender usernames for a domains resource. x-ms-original-file: 2026-03-18/senderUsernames/listByDomain.json                                                                                |
| [smtpUsernamesCreateOrUpdateSample.js][smtpusernamescreateorupdatesample]                                       | create or update an SmtpUsernameResource. x-ms-original-file: 2026-03-18/smtpUsername/createOrUpdate.json                                                                                               |
| [smtpUsernamesDeleteSample.js][smtpusernamesdeletesample]                                                       | operation to delete a single SmtpUsername resource. x-ms-original-file: 2026-03-18/smtpUsername/delete.json                                                                                             |
| [smtpUsernamesGetSample.js][smtpusernamesgetsample]                                                             | get a SmtpUsernameResource. x-ms-original-file: 2026-03-18/smtpUsername/get.json                                                                                                                        |
| [smtpUsernamesListSample.js][smtpusernameslistsample]                                                           | get all SmtpUsernameResources for a Communication resource. x-ms-original-file: 2026-03-18/smtpUsername/getAll.json                                                                                     |
| [suppressionListAddressesCreateOrUpdateSample.js][suppressionlistaddressescreateorupdatesample]                 | create or update a SuppressionListAddress. x-ms-original-file: 2026-03-18/suppressionLists/createOrUpdateAddress.json                                                                                   |
| [suppressionListAddressesDeleteSample.js][suppressionlistaddressesdeletesample]                                 | operation to delete a single address from a suppression list. x-ms-original-file: 2026-03-18/suppressionLists/deleteAddress.json                                                                        |
| [suppressionListAddressesGetSample.js][suppressionlistaddressesgetsample]                                       | get a SuppressionListAddress. x-ms-original-file: 2026-03-18/suppressionLists/getAddress.json                                                                                                           |
| [suppressionListAddressesListSample.js][suppressionlistaddresseslistsample]                                     | get all the addresses in a suppression list. x-ms-original-file: 2026-03-18/suppressionLists/getAddresses.json                                                                                          |
| [suppressionListsCreateOrUpdateSample.js][suppressionlistscreateorupdatesample]                                 | add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource. x-ms-original-file: 2026-03-18/suppressionLists/createOrUpdateSuppressionList.json |
| [suppressionListsDeleteSample.js][suppressionlistsdeletesample]                                                 | delete a SuppressionList. x-ms-original-file: 2026-03-18/suppressionLists/deleteSuppressionList.json                                                                                                    |
| [suppressionListsGetSample.js][suppressionlistsgetsample]                                                       | get a SuppressionList resource. x-ms-original-file: 2026-03-18/suppressionLists/getSuppressionList.json                                                                                                 |
| [suppressionListsListByDomainSample.js][suppressionlistslistbydomainsample]                                     | list all suppression lists for a domains resource. x-ms-original-file: 2026-03-18/suppressionLists/getSuppressionLists.json                                                                             |

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
node communicationServicesCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node communicationServicesCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesCheckNameAvailabilitySample.js
[communicationservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesCreateOrUpdateSample.js
[communicationservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesDeleteSample.js
[communicationservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesGetSample.js
[communicationserviceslinknotificationhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesLinkNotificationHubSample.js
[communicationserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesListByResourceGroupSample.js
[communicationserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesListBySubscriptionSample.js
[communicationserviceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesListKeysSample.js
[communicationservicesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesRegenerateKeySample.js
[communicationservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/communicationServicesUpdateSample.js
[domainscancelverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsCancelVerificationSample.js
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsCreateOrUpdateSample.js
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsDeleteSample.js
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsGetSample.js
[domainsinitiateverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsInitiateVerificationSample.js
[domainslistbyemailserviceresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsListByEmailServiceResourceSample.js
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/domainsUpdateSample.js
[emailservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesCreateOrUpdateSample.js
[emailservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesDeleteSample.js
[emailservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesGetSample.js
[emailserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesListByResourceGroupSample.js
[emailserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesListBySubscriptionSample.js
[emailserviceslistverifiedexchangeonlinedomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesListVerifiedExchangeOnlineDomainsSample.js
[emailservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/emailServicesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/operationsListSample.js
[senderusernamescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/senderUsernamesCreateOrUpdateSample.js
[senderusernamesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/senderUsernamesDeleteSample.js
[senderusernamesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/senderUsernamesGetSample.js
[senderusernameslistbydomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/senderUsernamesListByDomainsSample.js
[smtpusernamescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/smtpUsernamesCreateOrUpdateSample.js
[smtpusernamesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/smtpUsernamesDeleteSample.js
[smtpusernamesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/smtpUsernamesGetSample.js
[smtpusernameslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/smtpUsernamesListSample.js
[suppressionlistaddressescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListAddressesCreateOrUpdateSample.js
[suppressionlistaddressesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListAddressesDeleteSample.js
[suppressionlistaddressesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListAddressesGetSample.js
[suppressionlistaddresseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListAddressesListSample.js
[suppressionlistscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListsCreateOrUpdateSample.js
[suppressionlistsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListsDeleteSample.js
[suppressionlistsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListsGetSample.js
[suppressionlistslistbydomainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v5/javascript/suppressionListsListByDomainSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-communication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/arm-communication/README.md
