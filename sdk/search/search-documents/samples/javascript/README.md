# Azure Cognitive Search client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Search in some common scenarios.

| **File Name**                | **Description**          |
| ---------------------------- | ------------------------ |
| [readonlyQuery.js][readonly] | queries a public dataset |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Search service][search_resource] to run these sample programs. Samples retrieve credentials to access the Azure Cognitive Search endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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
node readonlyQuery.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SEARCH_API_ENDPOINT="<endpoint>" SEARCH_API_KEY="<api key>" node readonlyQuery.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[readonly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/readonlyQuery.js
[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/README.md
