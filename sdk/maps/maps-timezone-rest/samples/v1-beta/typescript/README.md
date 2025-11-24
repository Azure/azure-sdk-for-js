# Azure Maps Timezone client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Maps Timezone in some common scenarios.

| **File Name**                                           | **Description**                                            |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| [getTimezoneById.ts][gettimezonebyid]                   | How to get timezone information by IANA ID.                |
| [getTimezoneByCoordinates.ts][gettimezonebycoordinates] | How to get timezone information by coordinates.            |
| [getWindowsTimezoneIds.ts][getwindowstimezoneids]       | How to get the list of Windows Timezone IDs.               |
| [getIanaTimezoneIds.ts][getianatimezoneids]             | How to get the list of IANA Timezone IDs.                  |
| [getIanaVersion.ts][getianaversion]                     | How to get the current IANA version number.                |
| [convertWindowsToIana.ts][convertwindowstoiana]         | How to convert a Windows Timezone ID to IANA Timezone IDs. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/getIanaVersion.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node dist/getIanaVersion.js
```

[getTimezoneById]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/getTimezoneById.ts
[getTimezoneByCoordinates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/getTimezoneByCoordinates.ts
[getWindowsTimezoneIds]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/getWindowsTimezoneIds.ts
[getIanaTimezoneIds]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/getIanaTimezoneIds.ts
[getIanaVersion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/getIanaVersion.ts
[convertWindowsToIana]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-timezone-rest/samples/v1-beta/typescript/src/convertWindowsToIana.ts
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone-rest/README.md
