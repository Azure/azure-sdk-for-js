---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-maps
urlFragment: maps-search-javascript-beta
---

# Azure Maps Search client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Maps Search in some common scenarios.

| **File Name**                                 | **Description**                                                    |
| --------------------------------------------- | ------------------------------------------------------------------ |
| [search.js][search]                           | An overview of Search API usage. Simple queries are performed.     |
| [batchRequest.js][batchrequest]               | Demonstrates how to manipulate batch requests.                     |
| [searchAddressResult.js][searchaddressresult] | Demonstrates how to manipulate the response `SearchAddressResult`. |

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
node search.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_SUBSCRIPTION_KEY="<maps subscription key>" node search.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[search]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search/samples/v1-beta/javascript/search.js
[batchrequest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search/samples/v1-beta/javascript/batchRequest.js
[searchaddressresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-search/samples/v1-beta/javascript/searchAddressResult.js

<!-- [apiref]: https://docs.microsoft.com/javascript/api/@azure/maps-search -->

[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search/README.md
