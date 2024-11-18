# MapsSearchClient client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for MapsSearchClient in some common scenarios.

| **File Name**                                     | **Description**                                                                                                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [geocoding.ts][geocoding]                         | Demonstrate how to search the coordinates of an address (a.k.a. Geocoding).                                                                                                 |
| [geocodingBatch.ts][geocodingbatch]               | This sample demonstrates how to make a batched search address request.                                                                                                      |
| [reverseGeocoding.ts][reversegeocoding]           | This sample demonstrates how to reverse a geocode to an address.                                                                                                            |
| [reverseGeocodingBatch.ts][reversegeocodingbatch] | Demonstrate how to request a batch of reverse geocoding.                                                                                                                    |
| [searchPolygons.ts][searchpolygons]               | Demonstrate how to request the geometry data such as a city or country outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

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
node dist/geocoding.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node dist/geocoding.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[geocoding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v2-beta/typescript/src/geocoding.ts
[geocodingbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v2-beta/typescript/src/geocodingBatch.ts
[reversegeocoding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v2-beta/typescript/src/reverseGeocoding.ts
[reversegeocodingbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v2-beta/typescript/src/reverseGeocodingBatch.ts
[searchpolygons]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v2-beta/typescript/src/searchPolygons.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-search
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
