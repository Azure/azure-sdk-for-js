# MapsSearchClient client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for MapsSearchClient in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                             |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fuzzySearch.js][fuzzysearch]                                         | This sample demonstrates how to use the fuzzy search with MapsSearchClient.                                                                                                 |
| [fuzzySearchBatch.js][fuzzysearchbatch]                               | This sample demonstrates how to use the fuzzy search batch request with MapsSearchClient & getLongRunningPoller.                                                            |
| [getPointOfInterestCategoryTree.js][getpointofinterestcategorytree]   | This sample demonstrates how to get all point-of-interest categories.                                                                                                       |
| [reverseSearchAddress.js][reversesearchaddress]                       | This sample demonstrates how to reverse a geocode to an address.                                                                                                            |
| [reverseSearchAddressBatch.js][reversesearchaddressbatch]             | Demonstrate how to request a batch of reverse geocoding.                                                                                                                    |
| [reverseSearchCrossStreetAddress.js][reversesearchcrossstreetaddress] | Demonstrate how to reverse geocode to a cross street.                                                                                                                       |
| [searchAddress.js][searchaddress]                                     | Demonstrate how to search the coordinates of an address (a.k.a. Geocoding).                                                                                                 |
| [searchAddressBatch.js][searchaddressbatch]                           | This sample demonstrates how to make a batched search address request.                                                                                                      |
| [searchAlongRoute.js][searchalongroute]                               | Demonstrate how to perform a fuzzy search for POIs along a specified route.                                                                                                 |
| [searchInsideGeometry.js][searchinsidegeometry]                       | - Demonstrate how to perform a free form search inside a single geometry or many of them.                                                                                   |
| [searchNearbyPointOfInterest.js][searchnearbypointofinterest]         | Demonstrate how to search for POIs nearby the given position.                                                                                                               |
| [searchPointOfInterest.js][searchpointofinterest]                     | Demonstrate how to request POI results by name.                                                                                                                             |
| [searchPointOfInterestCategory.js][searchpointofinterestcategory]     | Demonstrate how to search for POIs by category.                                                                                                                             |
| [searchPolygons.js][searchpolygons]                                   | Demonstrate how to request the geometry data such as a city or country outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. |
| [searchStructuredAddress.js][searchstructuredaddress]                 | Demonstrate how to search the coordinates of an address in a structured format.                                                                                             |

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
node fuzzySearch.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_SUBSCRIPTION_KEY="<maps subscription key>" node fuzzySearch.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fuzzysearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/fuzzySearch.js
[fuzzysearchbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/fuzzySearchBatch.js
[getpointofinterestcategorytree]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/getPointOfInterestCategoryTree.js
[reversesearchaddress]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/reverseSearchAddress.js
[reversesearchaddressbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/reverseSearchAddressBatch.js
[reversesearchcrossstreetaddress]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/reverseSearchCrossStreetAddress.js
[searchaddress]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchAddress.js
[searchaddressbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchAddressBatch.js
[searchalongroute]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchAlongRoute.js
[searchinsidegeometry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchInsideGeometry.js
[searchnearbypointofinterest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchNearbyPointOfInterest.js
[searchpointofinterest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchPointOfInterest.js
[searchpointofinterestcategory]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchPointOfInterestCategory.js
[searchpolygons]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchPolygons.js
[searchstructuredaddress]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search-rest/samples/v1-beta/javascript/searchStructuredAddress.js

<!-- [apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-search -->

[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest/README.md
