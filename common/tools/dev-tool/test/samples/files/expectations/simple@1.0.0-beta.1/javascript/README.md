# Azure Template client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Template in some common scenarios.

| **File Name**                                         | **Description**                             |
| ----------------------------------------------------- | ------------------------------------------- |
| [getConfigurationSetting.js][getconfigurationsetting] | a succinct and simple sample example (beta) |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure App Configuration][createinstance_azureappconfiguration]

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
node getConfigurationSetting.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MY_VARIABLE="<my variable>" node getConfigurationSetting.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getconfigurationsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/test/samples/files/expectations/simple@1.0.0-beta.1/javascript/getConfigurationSetting.js
[apiref]: https://docs.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureappconfiguration]: https://docs.microsoft.com/azure/azure-app-configuration/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/dev-tool/README.md
