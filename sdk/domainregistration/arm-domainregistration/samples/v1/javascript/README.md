# @azure/arm-domainregistration client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-domainregistration in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [domainRegistrationProviderListOperationsSample.js][domainregistrationproviderlistoperationssample] | description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider x-ms-original-file: 2024-11-01/ListOperations.json                              |
| [domainsCheckAvailabilitySample.js][domainscheckavailabilitysample]                                 | description for Check if a domain is available for registration. x-ms-original-file: 2024-11-01/CheckDomainAvailability.json                                                                        |
| [domainsCreateOrUpdateOwnershipIdentifierSample.js][domainscreateorupdateownershipidentifiersample] | description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier x-ms-original-file: 2024-11-01/CreateAppServiceDomainOwnershipIdentifier.json |
| [domainsCreateOrUpdateSample.js][domainscreateorupdatesample]                                       | description for Creates or updates a domain. x-ms-original-file: 2024-11-01/CreateAppServiceDomain.json                                                                                             |
| [domainsDeleteOwnershipIdentifierSample.js][domainsdeleteownershipidentifiersample]                 | description for Delete ownership identifier for domain x-ms-original-file: 2024-11-01/DeleteAppServiceDomainOwnershipIdentifier.json                                                                |
| [domainsDeleteSample.js][domainsdeletesample]                                                       | description for Delete a domain. x-ms-original-file: 2024-11-01/DeleteAppServiceDomain.json                                                                                                         |
| [domainsGetControlCenterSsoRequestSample.js][domainsgetcontrolcenterssorequestsample]               | description for Generate a single sign-on request for the domain management portal. x-ms-original-file: 2024-11-01/GetDomainControlCenterSsoRequest.json                                            |
| [domainsGetOwnershipIdentifierSample.js][domainsgetownershipidentifiersample]                       | description for Get ownership identifier for domain x-ms-original-file: 2024-11-01/GetDomainOwnershipIdentifier.json                                                                                |
| [domainsGetSample.js][domainsgetsample]                                                             | description for Get a domain. x-ms-original-file: 2024-11-01/GetDomain.json                                                                                                                         |
| [domainsListByResourceGroupSample.js][domainslistbyresourcegroupsample]                             | description for Get all domains in a resource group. x-ms-original-file: 2024-11-01/ListDomainsByResourceGroup.json                                                                                 |
| [domainsListOwnershipIdentifiersSample.js][domainslistownershipidentifierssample]                   | description for Lists domain ownership identifiers. x-ms-original-file: 2024-11-01/ListDomainOwnershipIdentifiers.json                                                                              |
| [domainsListRecommendationsSample.js][domainslistrecommendationssample]                             | description for Get domain name recommendations based on keywords. x-ms-original-file: 2024-11-01/ListDomainRecommendations.json                                                                    |
| [domainsListSample.js][domainslistsample]                                                           | description for Get all domains in a subscription. x-ms-original-file: 2024-11-01/ListDomainsBySubscription.json                                                                                    |
| [domainsRenewSample.js][domainsrenewsample]                                                         | description for Renew a domain. x-ms-original-file: 2024-11-01/RenewDomain.json                                                                                                                     |
| [domainsTransferOutSample.js][domainstransferoutsample]                                             | transfer out domain to another registrar x-ms-original-file: 2024-11-01/TransferOutDomain.json                                                                                                      |
| [domainsUpdateOwnershipIdentifierSample.js][domainsupdateownershipidentifiersample]                 | description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier x-ms-original-file: 2024-11-01/UpdateAppServiceDomainOwnershipIdentifier.json |
| [domainsUpdateSample.js][domainsupdatesample]                                                       | description for Creates or updates a domain. x-ms-original-file: 2024-11-01/UpdateAppServiceDomain.json                                                                                             |
| [topLevelDomainsGetSample.js][topleveldomainsgetsample]                                             | description for Get details of a top-level domain. x-ms-original-file: 2024-11-01/GetTopLevelDomain.json                                                                                            |
| [topLevelDomainsListAgreementsSample.js][topleveldomainslistagreementssample]                       | description for Gets all legal agreements that user needs to accept before purchasing a domain. x-ms-original-file: 2024-11-01/ListTopLevelDomainAgreements.json                                    |
| [topLevelDomainsListSample.js][topleveldomainslistsample]                                           | description for Get all top-level domains supported for registration. x-ms-original-file: 2024-11-01/ListTopLevelDomains.json                                                                       |

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
node domainRegistrationProviderListOperationsSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node domainRegistrationProviderListOperationsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[domainregistrationproviderlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainRegistrationProviderListOperationsSample.js
[domainscheckavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsCheckAvailabilitySample.js
[domainscreateorupdateownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsCreateOrUpdateOwnershipIdentifierSample.js
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsCreateOrUpdateSample.js
[domainsdeleteownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsDeleteOwnershipIdentifierSample.js
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsDeleteSample.js
[domainsgetcontrolcenterssorequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsGetControlCenterSsoRequestSample.js
[domainsgetownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsGetOwnershipIdentifierSample.js
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsGetSample.js
[domainslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsListByResourceGroupSample.js
[domainslistownershipidentifierssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsListOwnershipIdentifiersSample.js
[domainslistrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsListRecommendationsSample.js
[domainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsListSample.js
[domainsrenewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsRenewSample.js
[domainstransferoutsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsTransferOutSample.js
[domainsupdateownershipidentifiersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsUpdateOwnershipIdentifierSample.js
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/domainsUpdateSample.js
[topleveldomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/topLevelDomainsGetSample.js
[topleveldomainslistagreementssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/topLevelDomainsListAgreementsSample.js
[topleveldomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainregistration/arm-domainregistration/samples/v1/javascript/topLevelDomainsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-domainregistration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/domainregistration/arm-domainregistration/README.md
