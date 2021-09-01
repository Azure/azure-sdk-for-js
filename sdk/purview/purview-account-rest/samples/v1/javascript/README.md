---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: purview-account-javascript
disableDocsMs: true
---

# Azure Purview Account rest client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Purview Account rest in some common scenarios.

|        **File Name**          | **Description**            |
| ----------------------------- | -------------------------- |
| [collections.js][collections] | gets a list of collections |

## Prerequisites

The sample programs are compatible with Node.js >=14.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Purview Account][createpurviewaccount_portal]

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
node collections.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" node collections.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[collections]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-account-rest/samples/v1/javascript/collections.js
[apiref]: https://docs.microsoft.com/azure/purview/tutorial-using-rest-apis
[freesub]: https://azure.microsoft.com/free/
[createpurviewaccount_portal]: https://docs.microsoft.com/azure/purview/create-catalog-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-account-rest/README.md
