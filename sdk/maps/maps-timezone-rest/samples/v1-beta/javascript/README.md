# Azure Maps Timezone client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Maps Timezone in some common scenarios.

| **File Name**                                           | **Description**                                            |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| [getTimezoneById.js][gettimezonebyid]                   | How to get timezone information by IANA ID.                |
| [getTimezoneByCoordinates.js][gettimezonebycoordinates] | How to get timezone information by coordinates.            |
| [getWindowsTimezoneIds.js][getwindowstimezoneids]       | How to get the list of Windows Timezone IDs.               |
| [getIanaTimezoneIds.js][getianatimezoneids]             | How to get the list of IANA Timezone IDs.                  |
| [getIanaVersion.js][getianaversion]                     | How to get the current IANA version number.                |
| [convertWindowsToIana.js][convertwindowstoiana]         | How to convert a Windows Timezone ID to IANA Timezone IDs. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Maps Resource][createinstance_azuremapsresource]

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
node getIanaVersion.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node getIanaVersion.js
```

[getTimezoneById]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/getTimezoneById.js
[getTimezoneByCoordinates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/getTimezoneByCoordinates.js
[getWindowsTimezoneIds]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/getWindowsTimezoneIds.js
[getIanaTimezoneIds]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/getIanaTimezoneIds.js
[getIanaVersion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/getIanaVersion.js
[convertWindowsToIana]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/javascript/convertWindowsToIana.js
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone-rest/README.md
