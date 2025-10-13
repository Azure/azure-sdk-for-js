---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: iot-modelsrepository-javascript
---

# Azure IoT Models Repository client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure IoT Models Repository in some common scenarios.

| **File Name**                                     | **Description**                                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [dtmiConventionsSample.js][dtmiconventionssample] | Demonstrates the use of a getModelUri and isValidDtmi, helper functions for interacting with DTMIs. |
| [modelResolutionSample.js][modelresolutionsample] | Demonstrates the use of ModelsRepositoryClient to get models from an endpoint.                      |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
node dtmiConventionsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dtmiConventionsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dtmiconventionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iot/iot-modelsrepository/samples/v1/javascript/dtmiConventionsSample.js
[modelresolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iot/iot-modelsrepository/samples/v1/javascript/modelResolutionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iot/iot-modelsrepository/README.md
