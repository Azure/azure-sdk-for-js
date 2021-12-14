# CommonJS client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for CommonJS in some common scenarios.

| **File Name**     | **Description**                             |
| ----------------- | ------------------------------------------- |
| [index.js][index] | validates several forms of CommonJS imports |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [test][createinstance_test]

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
node index.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env WAIT_TIME="<wait time>" node index.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[index]: https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/test/samples/files/expectations/cjs-forms/javascript/index.js
[apiref]: https://docs.microsoft.com/
[freesub]: https://azure.microsoft.com/free/
[createinstance_test]: https://contoso.com
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/dev-tool/README.md
