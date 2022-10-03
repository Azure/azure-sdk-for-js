# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkResourceNameSample.js][checkresourcenamesample]                   | A resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-01-01/examples/CheckResourceName.json                   |
| [subscriptionsGetSample.js][subscriptionsgetsample]                     | Gets details about a specified subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-01-01/examples/GetSubscription.json                                                                                                         |
| [subscriptionsListLocationsSample.js][subscriptionslistlocationssample] | This operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-01-01/examples/GetLocations.json |
| [subscriptionsListSample.js][subscriptionslistsample]                   | Gets all subscriptions for a tenant. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-01-01/examples/GetSubscriptions.json                                                                                                                |
| [tenantsListSample.js][tenantslistsample]                               | Gets the tenants for your account. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-01-01/examples/GetTenants.json                                                                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node checkResourceNameSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node checkResourceNameSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checkresourcenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources-subscriptions/arm-resources-subscriptions/samples/v2/javascript/checkResourceNameSample.js
[subscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources-subscriptions/arm-resources-subscriptions/samples/v2/javascript/subscriptionsGetSample.js
[subscriptionslistlocationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources-subscriptions/arm-resources-subscriptions/samples/v2/javascript/subscriptionsListLocationsSample.js
[subscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources-subscriptions/arm-resources-subscriptions/samples/v2/javascript/subscriptionsListSample.js
[tenantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources-subscriptions/arm-resources-subscriptions/samples/v2/javascript/tenantsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resources-subscriptions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources-subscriptions/arm-resources-subscriptions/README.md
