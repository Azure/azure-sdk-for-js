# Defender EASM Client client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Defender EASM Client in some common scenarios.

| **File Name**                                           | **Description**                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| [discoTemplateSample.js][discotemplatesample]           | Create discovery groups using a template                         |
| [discoverRunsSample.js][discoverrunssample]             | Create and manage a discovery group                              |
| [managingExternalIdSample.js][managingexternalidsample] | Tag assets automatically with external ids                       |
| [savedFilterSample.js][savedfiltersample]               | Use saved filters to synchronize queries across multiple scripts |

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
node discoTemplateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env SUBSCRIPTIONID="<subscriptionid>" RESOURCEGROUPNAME="<resourcegroupname>" WORKSPACENAME="<workspacename>" REGION="<region>" PARTIAL_NAME="<partial name>" node discoTemplateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[discotemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/easm/defender-easm-rest/samples/v1-beta/javascript/discoTemplateSample.js
[discoverrunssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/easm/defender-easm-rest/samples/v1-beta/javascript/discoverRunsSample.js
[managingexternalidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/easm/defender-easm-rest/samples/v1-beta/javascript/managingExternalIdSample.js
[savedfiltersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/easm/defender-easm-rest/samples/v1-beta/javascript/savedFilterSample.js
[apiref]: https://learn.microsoft.com/azure/external-attack-surface-management/
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/easm/defender-easm-rest/README.md
