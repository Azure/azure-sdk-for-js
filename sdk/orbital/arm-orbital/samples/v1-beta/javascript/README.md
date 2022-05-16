# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availableGroundStationsGetSample.js][availablegroundstationsgetsample]                           | Gets the specified available ground station x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/AvailableGroundStationGet.json              |
| [availableGroundStationsListByCapabilitySample.js][availablegroundstationslistbycapabilitysample] | Returns list of available ground stations x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/AvailableGroundStationsByCapabilityList.json  |
| [contactProfilesCreateOrUpdateSample.js][contactprofilescreateorupdatesample]                     | Creates or updates a contact profile x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfileCreate.json                          |
| [contactProfilesDeleteSample.js][contactprofilesdeletesample]                                     | Deletes a specified contact profile resource. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfileDelete.json                 |
| [contactProfilesGetSample.js][contactprofilesgetsample]                                           | Gets the specified contact Profile in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfileGet.json |
| [contactProfilesListBySubscriptionSample.js][contactprofileslistbysubscriptionsample]             | Returns list of contact profiles x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfilesBySubscriptionList.json                 |
| [contactProfilesListSample.js][contactprofileslistsample]                                         | Returns list of contact profiles x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfilesByResourceGroupList.json                |
| [contactProfilesUpdateTagsSample.js][contactprofilesupdatetagssample]                             | Updates the specified contact profile tags. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactProfileUpdateTag.json                |
| [contactsCreateSample.js][contactscreatesample]                                                   | Creates a contact. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactCreate.json                                                   |
| [contactsDeleteSample.js][contactsdeletesample]                                                   | Deletes a specified contact x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactDelete.json                                          |
| [contactsGetSample.js][contactsgetsample]                                                         | Gets the specified contact in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactGet.json                |
| [contactsListSample.js][contactslistsample]                                                       | Returns list of contacts by spacecraftName x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/ContactsBySpacecraftNameList.json            |
| [operationsListSample.js][operationslistsample]                                                   | Lists all of the available Orbital Rest API operations. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/OperationsList.json             |
| [spacecraftsCreateOrUpdateSample.js][spacecraftscreateorupdatesample]                             | Creates or updates a spacecraft resource x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftCreate.json                          |
| [spacecraftsDeleteSample.js][spacecraftsdeletesample]                                             | Deletes a specified spacecraft resource. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftDelete.json                          |
| [spacecraftsGetSample.js][spacecraftsgetsample]                                                   | Gets the specified spacecraft in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftGet.json          |
| [spacecraftsListAvailableContactsSample.js][spacecraftslistavailablecontactssample]               | Return list of available contacts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/AvailableContactsList.json                            |
| [spacecraftsListBySubscriptionSample.js][spacecraftslistbysubscriptionsample]                     | Return list of spacecrafts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftsBySubscriptionList.json                           |
| [spacecraftsListSample.js][spacecraftslistsample]                                                 | Return list of spacecrafts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftsByResourceGroupList.json                          |
| [spacecraftsUpdateTagsSample.js][spacecraftsupdatetagssample]                                     | Updates the specified spacecraft tags. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/SpacecraftUpdateTags.json                        |

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
node availableGroundStationsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node availableGroundStationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availablegroundstationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/availableGroundStationsGetSample.js
[availablegroundstationslistbycapabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/availableGroundStationsListByCapabilitySample.js
[contactprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesCreateOrUpdateSample.js
[contactprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesDeleteSample.js
[contactprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesGetSample.js
[contactprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesListBySubscriptionSample.js
[contactprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesListSample.js
[contactprofilesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactProfilesUpdateTagsSample.js
[contactscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactsCreateSample.js
[contactsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactsDeleteSample.js
[contactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactsGetSample.js
[contactslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/contactsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/operationsListSample.js
[spacecraftscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsCreateOrUpdateSample.js
[spacecraftsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsDeleteSample.js
[spacecraftsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsGetSample.js
[spacecraftslistavailablecontactssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsListAvailableContactsSample.js
[spacecraftslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsListBySubscriptionSample.js
[spacecraftslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsListSample.js
[spacecraftsupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1-beta/javascript/spacecraftsUpdateTagsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-orbital?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/orbital/arm-orbital/README.md
