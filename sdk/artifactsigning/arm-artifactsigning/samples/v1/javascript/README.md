# @azure/arm-artifactsigning client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-artifactsigning in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificateProfilesCreateSample.js][certificateprofilescreatesample]                                     | create a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Create.json                                                                  |
| [certificateProfilesDeleteSample.js][certificateprofilesdeletesample]                                     | delete a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Delete.json                                                                  |
| [certificateProfilesGetSample.js][certificateprofilesgetsample]                                           | get details of a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_Get.json                                                             |
| [certificateProfilesListByCodeSigningAccountSample.js][certificateprofileslistbycodesigningaccountsample] | list certificate profiles under an artifact signing account. x-ms-original-file: 2025-10-13/CertificateProfiles_ListByCodeSigningAccount.json                 |
| [certificateProfilesRevokeCertificateSample.js][certificateprofilesrevokecertificatesample]               | revoke a certificate under a certificate profile. x-ms-original-file: 2025-10-13/CertificateProfiles_RevokeCertificate.json                                   |
| [codeSigningAccountsCheckNameAvailabilitySample.js][codesigningaccountschecknameavailabilitysample]       | checks if the artifact signing account name is valid and is not already in use. x-ms-original-file: 2025-10-13/CodeSigningAccounts_CheckNameAvailability.json |
| [codeSigningAccountsCreateSample.js][codesigningaccountscreatesample]                                     | create an artifact Signing Account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Create.json                                                            |
| [codeSigningAccountsDeleteSample.js][codesigningaccountsdeletesample]                                     | delete an artifact signing account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Delete.json                                                            |
| [codeSigningAccountsGetSample.js][codesigningaccountsgetsample]                                           | get an artifact Signing Account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Get.json                                                                  |
| [codeSigningAccountsListByResourceGroupSample.js][codesigningaccountslistbyresourcegroupsample]           | lists artifact signing accounts within a resource group. x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListByResourceGroup.json                          |
| [codeSigningAccountsListBySubscriptionSample.js][codesigningaccountslistbysubscriptionsample]             | lists artifact signing accounts within a subscription. x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListBySubscription.json                             |
| [codeSigningAccountsUpdateSample.js][codesigningaccountsupdatesample]                                     | update an artifact signing account. x-ms-original-file: 2025-10-13/CodeSigningAccounts_Update.json                                                            |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2025-10-13/Operations_List.json                                                                      |

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
node certificateProfilesCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node certificateProfilesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificateprofilescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/certificateProfilesCreateSample.js
[certificateprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/certificateProfilesDeleteSample.js
[certificateprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/certificateProfilesGetSample.js
[certificateprofileslistbycodesigningaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/certificateProfilesListByCodeSigningAccountSample.js
[certificateprofilesrevokecertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/certificateProfilesRevokeCertificateSample.js
[codesigningaccountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsCheckNameAvailabilitySample.js
[codesigningaccountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsCreateSample.js
[codesigningaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsDeleteSample.js
[codesigningaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsGetSample.js
[codesigningaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsListByResourceGroupSample.js
[codesigningaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsListBySubscriptionSample.js
[codesigningaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/codeSigningAccountsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/artifactsigning/arm-artifactsigning/samples/v1/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-artifactsigning?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/artifactsigning/arm-artifactsigning/README.md
