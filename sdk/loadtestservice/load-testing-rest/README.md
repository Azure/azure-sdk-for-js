# Azure Load Testing client library for JavaScript

Azure Load Testing provides client library in JavaScript to the user by which they can interact natively with Azure Load Testing service. Azure Load Testing is a fully managed load-testing service that enables you to generate high-scale load. The service simulates traffic for your applications, regardless of where they're hosted. Developers, testers, and quality assurance (QA) engineers can use it to optimize application performance, scalability, or capacity.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

## Documentation

Various documentation is available to help you get started

<!-- - [Source code][source_code] -->

- [API reference documentation][api_reference_doc]
- [Product Documentation][product_documentation]

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) and [Azure Load Test Service Resource](https://learn.microsoft.com/azure/load-testing/) to use this package.

### Install the `@azure-rest/load-testing` package

Install the AzureLoadTesting client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/load-testing
```

### Create and authenticate a `AzureLoadTesting` client

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Key concepts

The following components make up the Azure Load Testing Service. The Azure Load Test client library for JavaScript allows you to interact with each of these components through the use of a dedicated client object.

#### Test

A test specifies the test script, and configuration settings for running a load test. You can create one or more tests in an Azure Load Testing resource.

#### App Component

When you run a load test for an Azure-hosted application, you can monitor resource metrics for the different Azure application components (server-side metrics). While the load test runs, and after completion of the test, you can monitor and analyze the resource metrics in the Azure Load Testing dashboard.

#### Metrics

During a load test, Azure Load Testing collects metrics about the test execution. There are two types of metrics:

1. Client-side metrics give you details reported by the test engine. These metrics include the number of virtual users, the request response time, the number of failed requests, or the number of requests per second.

2. Server-side metrics are available for Azure-hosted applications and provide information about your Azure application components. Metrics can be for the number of database reads, the type of HTTP responses, or container resource consumption.

### Test Engine

A test engine is computing infrastructure that runs the Apache JMeter test script. You can scale out your load test by configuring the number of test engines. The test script runs in parallel across the specified number of test engines.

### Test Run

A test run represents one execution of a load test. It collects the logs associated with running the Apache JMeter script, the load test YAML configuration, the list of app components to monitor, and the results of the test.

### Data-Plane Endpoint

Data-plane of Azure Load Testing resources is addressable using the following URL format:

`00000000-0000-0000-0000-000000000000.aaa.cnt-prod.loadtesting.azure.com`

The first GUID `00000000-0000-0000-0000-000000000000` is the unique identifier used for accessing the Azure Load Testing resource. This is followed by `aaa` which is the Azure region of the resource.

The data-plane endpoint is obtained from Control Plane APIs.

**Example:** `1234abcd-12ab-12ab-12ab-123456abcdef.eus.cnt-prod.loadtesting.azure.com`

In the above example, `eus` represents the Azure region `East US`.

## Examples

### Creating a load test

```javascript
import AzureLoadTesting, { AzureLoadTestingClient } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";

var TEST_ID = "some-test-id";
var DISPLAY_NAME = "my-load-test";

const Client: AzureLoadTestingClient = AzureLoadTesting(Endpoint, new DefaultAzureCredential());

await Client.path("/loadtests/{testId}", TEST_ID).patch({
  contentType: "application/merge-patch+json",
  body: {
    displayName: DISPLAY_NAME,
    description: "",
    loadTestConfig: {
      engineInstances: 1,
      splitAllCSVs: false,
    },
    secrets: {},
    environmentVariables: {},
    passFailCriteria: { passFailMetrics: {} },
  },
});
```

### Uploading .jmx file to a Test

```javascript
import { AzureLoadTestingClient } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { createReadStream } from "fs";

var TEST_ID = "some-test-id";
var FILE_ID = "some-file-id";
const readStream = createReadStream("./sample.jmx");

const Client: AzureLoadTestingClient = AzureLoadTesting(Endpoint, new DefaultAzureCredential());

await Client.path("/loadtests/{testId}/files/{fileId}", TEST_ID, FILE_ID).put({
  contentType: "multipart/form-data",
  body: {
    file: readStream,
  },
});
```

### Running a Test

```javascript
import { AzureLoadTestingClient } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";

var TEST_ID = "some-test-id";
var TEST_RUN_ID = "some-testrun-id";
var DISPLAY_NAME = "my-load-test-run";

const Client: AzureLoadTestingClient = AzureLoadTesting(Endpoint, new DefaultAzureCredential());

await Client.path("/testruns/{testRunId}", TEST_RUN_ID).patch({
  contentType: "application/merge-patch+json",
  body: {
    testId: TEST_ID,
    displayName: DISPLAY_NAME,
  },
});

var result = await client.path("/testruns/{testRunId}", TEST_RUN_ID).get();
console.log(result);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Azure Loading Testing JavaScript SDK samples are available to you in the SDK's GitHub repository. These samples provide example code for additional scenarios commonly encountered.

<!-- See [Azure Load Testing samples][sample_code]. -->

## Contributing

For details on contributing to this repository, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

<!-- LINKS -->
<!-- [source_code]: https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/loadtesting/azure-developer-loadtesting/src -->
<!-- [sample_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtestservice/load-testing-rest/samples/v1-beta -->

[api_reference_doc]: https://docs.microsoft.com/rest/api/loadtesting/
[product_documentation]: https://azure.microsoft.com/services/load-testing/
[azure_subscription]: https://azure.microsoft.com/free/
