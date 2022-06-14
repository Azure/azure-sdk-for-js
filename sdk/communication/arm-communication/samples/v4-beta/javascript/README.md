# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationServicesCheckNameAvailabilitySample.js][communicationserviceschecknameavailabilitysample]         | Checks that the CommunicationService name is valid and is not already in use. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/checkNameAvailabilityAvailable.json                  |
| [communicationServicesCreateOrUpdateSample.js][communicationservicescreateorupdatesample]                       | Create a new CommunicationService or update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/createOrUpdate.json                                  |
| [communicationServicesDeleteSample.js][communicationservicesdeletesample]                                       | Operation to delete a CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/delete.json                                                                            |
| [communicationServicesGetSample.js][communicationservicesgetsample]                                             | Get the CommunicationService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/get.json                                                                          |
| [communicationServicesLinkNotificationHubSample.js][communicationserviceslinknotificationhubsample]             | Links an Azure Notification Hub to this communication service. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/linkNotificationHub.json                                            |
| [communicationServicesListByResourceGroupSample.js][communicationserviceslistbyresourcegroupsample]             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listByResourceGroup.json                                               |
| [communicationServicesListBySubscriptionSample.js][communicationserviceslistbysubscriptionsample]               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listBySubscription.json                                                  |
| [communicationServicesListKeysSample.js][communicationserviceslistkeyssample]                                   | Get the access keys of the CommunicationService resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listKeys.json                                                            |
| [communicationServicesRegenerateKeySample.js][communicationservicesregeneratekeysample]                         | Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/regenerateKey.json |
| [communicationServicesUpdateSample.js][communicationservicesupdatesample]                                       | Operation to update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/update.json                                                                  |
| [domainsCancelVerificationSample.js][domainscancelverificationsample]                                           | Cancel verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/cancelVerification.json                                                                                       |
| [domainsCreateOrUpdateSample.js][domainscreateorupdatesample]                                                   | Add a new Domains resource under the parent EmailService resource or update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/createOrUpdate.json                    |
| [domainsDeleteSample.js][domainsdeletesample]                                                                   | Operation to delete a Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/delete.json                                                                                              |
| [domainsGetSample.js][domainsgetsample]                                                                         | Get the Domains resource and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/get.json                                                                                            |
| [domainsInitiateVerificationSample.js][domainsinitiateverificationsample]                                       | Initiate verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/initiateVerification.json                                                                                   |
| [domainsListByEmailServiceResourceSample.js][domainslistbyemailserviceresourcesample]                           | Handles requests to list all Domains resources under the parent EmailServices resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/listByEmailService.json                                  |
| [domainsUpdateSample.js][domainsupdatesample]                                                                   | Operation to update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/update.json                                                                                    |
| [emailServicesCreateOrUpdateSample.js][emailservicescreateorupdatesample]                                       | Create a new EmailService or update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/createOrUpdate.json                                                          |
| [emailServicesDeleteSample.js][emailservicesdeletesample]                                                       | Operation to delete a EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/delete.json                                                                                            |
| [emailServicesGetSample.js][emailservicesgetsample]                                                             | Get the EmailService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/get.json                                                                                          |
| [emailServicesListByResourceGroupSample.js][emailserviceslistbyresourcegroupsample]                             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/listByResourceGroup.json                                                       |
| [emailServicesListBySubscriptionSample.js][emailserviceslistbysubscriptionsample]                               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/listBySubscription.json                                                          |
| [emailServicesListVerifiedExchangeOnlineDomainsSample.js][emailserviceslistverifiedexchangeonlinedomainssample] | Get a list of domains that are fully verified in Exchange Online. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/getVerifiedExchangeOnlineDomains.json                                    |
| [emailServicesUpdateSample.js][emailservicesupdatesample]                                                       | Operation to update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/update.json                                                                                  |
| [operationsListSample.js][operationslistsample]                                                                 | Lists all of the available REST API operations of the Microsoft.Communication provider. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/operationsList.json                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node communicationServicesCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesCheckNameAvailabilitySample.js
[communicationservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesCreateOrUpdateSample.js
[communicationservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesDeleteSample.js
[communicationservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesGetSample.js
[communicationserviceslinknotificationhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesLinkNotificationHubSample.js
[communicationserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesListByResourceGroupSample.js
[communicationserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesListBySubscriptionSample.js
[communicationserviceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesListKeysSample.js
[communicationservicesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesRegenerateKeySample.js
[communicationservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/communicationServicesUpdateSample.js
[domainscancelverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsCancelVerificationSample.js
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsCreateOrUpdateSample.js
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsDeleteSample.js
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsGetSample.js
[domainsinitiateverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsInitiateVerificationSample.js
[domainslistbyemailserviceresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsListByEmailServiceResourceSample.js
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/domainsUpdateSample.js
[emailservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesCreateOrUpdateSample.js
[emailservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesDeleteSample.js
[emailservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesGetSample.js
[emailserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesListByResourceGroupSample.js
[emailserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesListBySubscriptionSample.js
[emailserviceslistverifiedexchangeonlinedomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesListVerifiedExchangeOnlineDomainsSample.js
[emailservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/emailServicesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-communication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/arm-communication/README.md
