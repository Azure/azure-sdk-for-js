# Javascript Codegen Quick Start for Test

This page is to help you write and run tests quickly for Javascript Codegen SDK including high-level and rest-level clients. We firstly show how to run in `record` and `playback` mode and then guide on how to add test cases.

# Table of contents

- [Background](#background)
- [Prerequisites](#prerequisites)
- [How to run test](#how-to-run-test)
  - [Code structure](#code-structure)
  - [Run tests in record mode](#run-tests-in-record-mode)
  - [Run tests in playback mode](#run-tests-in-playback-mode)
- [How to add tests](#how-to-add-tests)
  - [Before adding tests](#before-adding-tests)
    - [Client authentication](#client-authentication)
      - [AzureAD OAuth2 Authentication](#azuread-oauth2-authentication)
      - [API Key Authentication](#api-key-authentication)
  - [Example 1: Basic Azure data-plane service interaction and recording](#example-1-basic-azure-data-plane-service-interaction-and-recording)
  - [Example 2: Basic Azure management service interaction and recording](#example-2-basic-azure-management-service-interaction-and-recording)

# Background

The Azure SDK test framework uses the [`test-recorder`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md) library, which in turn rests upon on a HTTP recording system ([testproxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy)) that enables tests dependent on network interaction to be run offline.

At the moment, tests in our repo depend on one of the two different versions of the recorder tool (`@azure-tools/test-recorder`) - `1.a.b` and `2.x.y`. And this quickstart is based on 2.x.y version.

# Prerequisites

- Docker
  - [Docker](https://www.docker.com/get-started/) is required, as the [test proxy server](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) is running in a container during testing
  - When running the tests, ensure the Docker daemon is running and you have permission to use it.
- Rush 5.x
  - Install/update Rush globally via `npm install -g @microsoft/rush`
- Any of [the LTS versions of Node.js](https://nodejs.org/en/about/releases/)
- A C++ compiler toolchain and Python (for compiling machine-code modules)
  - Refer [here](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for more details

# How to run test

This section describes how to run the SDK tests. If you want to run the tests of a specific project, go to that project's folder and execute `rushx test`. All of the tests will automatically run both in NodeJS and in the browser. To target these environments individually, you can run `rushx test:node` and `rushx test:browser`. Let's take `purview-catalog-rest` as an example.

If you have no concepts of `recording`, `playback` or [TEST_MODE](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md#test_mode) we'll highly recommand you to read this [doc](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md#key-concepts). We'll touch upon these concepts in below content.

## Code structure

If you are the first time to generate SDK you could enable the config `generate-test: true` in `README.md`. We'll generate simple utils and a sample test file for you.

```yml
generate-test: true
```

They only contains basics for testing, you need to update to your own utility and test cases. The overall structure will be similar to below:

_Note: the structure of `test` folder has slight differences between high-level and rest-level clients. In HLC we only have one file under the `test` folder which contains all contents. But in RLC we separate the sample test and utils._

```
sdk/
├─ purview/
│  ├─ purview-catalog-rest/
│  │  ├─ src/
│  │  │  ├─ ...
│  │  ├─ recordings/
│  │  │  ├─ node/
│  │  │  ├─ browsers/
│  │  ├─ test/
│  │  │  ├─ public/
│  │  │  |  ├─ utils/
│  │  │  |  |  ├─ recordedClient.ts
│  │  │  |  ├─ sampleTest.spec.ts
```

## Run tests in record mode

Before running tests it's advised to update the dependencises and build our project by running the command `rush update && rush build -t <package-name>`. Please notice this command is time-consuming and it will take around 10 mins, you could refer [here](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#resolving-dependency-version-conflicts) for more details.

```Shell
> rush update
> rush build -t @azure-rest/purview-catalog
```

Then we could go to the project folder to run the tests. By default, if you don't specify `TEST_MODE`, it will run previously recorded tests.

```Shell
> cd sdk/purview/purview-catalog-rest
sdk/purview/purview-catalog-rest> rushx test
```

If you are the first time to run tests you may fail with below message because there is no any recordings found.

```
[test-info] ===TEST_MODE=undefined===
...
[node-tests]   2 failing
[node-tests]
[node-tests]   1) My test
[node-tests]        "before each" hook for "sample test":
[node-tests]      RecorderError: Start request failed.
```

To record or update our recordings we need to set the environment variable `TEST_MODE` to `record`. Then run `rushx test`.

```Shell
# Windows
> set TEST_MODE=record
> rushx test

# Linux / Mac
> export TEST_MODE=record
> rushx test
```

This time we could get following similar logs. Go to the folder `purview-catalog-rest/recordings` to view recording files.

```
[test-info] ===TEST_MODE="record"===
...
[node-tests]   My test
[node-tests]     √ sample test
[node-tests]
[node-tests]   1 passing (223ms)
```

## Run tests in playback mode

If we have existing recordings then the tests have been run against generated the HTTP recordings, we can run your tests in `playback` mode.

```Shell
# Windows
> set TEST_MODE=playback
> rushx test

# Linux / Mac
> export TEST_MODE=playback
> rushx test
```

# How to add tests

Adding runnable tests requires both a good understanding of the service, and the knowledge of the client and test framework. Feel free to contact SDK developers, if you encountered issues on client or test framework.

## Before adding tests

### Client authentication

There are several ways to authenticate to Azure and most common ways are AzureAD OAuth2 authentication and API key authentication. Before adding tests you are supposed to know what your services support and ensure you or service principal have rights to perform actions in test.

#### AzureAD OAuth2 Authentication

If your service uses AzureAD OAuth2 token for authentication. A common solution is to provide [an application and its service principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals) and to provide RBAC to the service principal for the access to the Azure resource of your service.

Client requires following three variables for the service principal using client ID/secret for authentication:

```
AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
```

The recommended practice is to store these three values in environment variables called `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and `AZURE_CLIENT_SECRET`. To set an environment variable use the following commands:

```Shell
# Windows
> set AZURE_TENANT_ID=<value>

# Linux / Mac
> export AZURE_TENANT_ID=<value>
```

To ensure our recorder could record OAuth traffic we have to leverage the `createTestCredential` helper to prepare test credential. So please follow below code snippet to create your client.

```typescript
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();

// Create your client using the test credential.
new MyServiceClient(<endpoint>, credential);
```

To avoid storing the sensitive info in the recordings like authenticating with your Azure endpoints, keys, secrets, etc, we use the sanitizers to mask the values with the fake ones or remove them, `RecorderStartOptions` helps us here. In our generated sample file we have below sanitizers' code:

```typescript
const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlaayback,
};

//...
await recorder.start(recorderEnvSetup);
```

#### API Key Authentication

API key authentication would hit the service's endpoint directly so these traffic will be recorded. It doesn't require any customization in tests. However we must secure the sensitive data and not leak into our recordings, so add a sanitizer to replace your API keys. You could read more on how to add sanitizer at [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

## Example 1: Basic Azure data-plane service interaction and recording

At the code structure [section](#code-structure) we described we'll generate sample file for you, if you are the first time to write test cases you could grow up your own based on them.

This simple test creates a resource and checks that the service handles it correctly in the project `purview-catalog-rest`. Below are the steps:

- Step 1: Create your test file and add one test case with resource creation, here we have purview catalog glossary test file `glossary.spec.ts` and one case named `Should create a glossary`. Or rename the `sampleTest.spec.ts` file and its case `sample test`.
- Step 2: Add the utility method `createClient` in `public/utils/recordedClient.ts` to share the `PurviewCatalogClient` creation.
  - Call `createTestCredential` to init your credential and refer [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md#aad-and-the-new-noopcredential) for more details
  - Wrap the `option` with test options by calling `recorder.configureClientOptions(options)`
- Step 3: In `glossary.spec.ts` file call `createClient` to prepare the client and call `client.path("/atlas/v2/glossary").post()` to create our glossary resource under our case `Should create a glossary`
- Step 4[Optional]: Specify environment variables that would be faked in the recordings in map `envSetupForPlayback` under the file `public/utils/recordedClient.ts`.
- Step 5: In `glossary.spec.ts` file add necessary assertions in your test case
- Step 6: Run and record your test cases

### `glossary.spec.ts`

```typescript
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { PurviewCatalogClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("My test", () => {
  let recorder: Recorder;
  // Step 3: Declare your own variables
  let client: PurviewCatalogClient;
  let glossaryName: string;

  beforeEach(async function () {
    recorder = await createRecorder(this);
    // Step 3: Create your client
    client = await createClient(recorder);
    glossaryName = "js-testing";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // Step 1: Create your test case
  it("Should create a glossary", async () => {
    // Step 3: Add your test cases
    const glossary = await client.path("/atlas/v2/glossary").post({
      body: {
        name: glossaryName,
        shortDescription: "Example Short Description",
        longDescription: "Example Long Description",
        language: "en",
        usage: "Example Glossary",
      },
    });
    // Step 5: Add your assertions
    assert.strictEqual(glossary.status, "200");
  });
});
```

### `utils/recordedClient.ts`

```typescript
import { Context } from "mocha";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import PurviewCatalog, { PurviewCatalogClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
  // Step 4: Add environment variables you'd like to mask the values in recordings
  PURVIEW_CATALOG_GLOSSARY_ENV: "glossary_custom_env",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlaayback,
};

/**
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

// Step 2: Add your client creation factory
export function createClient(recorder: Recorder, options?: ClientOptions): PurviewCatalogClient {
  // Use createTestCredential to record AAD traffic so it could work in playback mode
  const credential = createTestCredential();
  // Use recorder.configureClientOptions to add the recording policy in the client options
  const client = PurviewCatalog("<endpoint>", credential, recorder.configureClientOptions(options));
  return client;
}
```

## Example 2: Basic Azure management service interaction and recording

At the code structure [section](#code-structure) we described if your SDK is generated base on HLC we'll generate a sample test named `sampleTest.ts` for you.

Next we'll take the package `@azure/arm-monitor` as an example to guide you how to add your own test case. Below are the steps:

- Step 1: Create your test file and add one test case with resource creation, here we have monitor test file `monitor.spec.ts` and one case named `Should create diagnosticSettings`. Or rename the `sampleTest.spec.ts` file and its case `sample test`.
- Step 2: Add declarations for common variables e.g monitor client, its diagnostic name and subscription id.
- Step 3: Create the monitor client in `beforeEach` and call `client.diagnosticSettings.createOrUpdate` in test case
  - Read the `subscriptionId` from `env`
  - Call `createTestCredential` to init your credential and refer [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md#aad-and-the-new-noopcredential) for more details
  - Wrap the `option` with test options by calling `recorder.configureClientOptions(options)`
- Step 4[Optional]: Specify environment variables that would be faked in the recordings in map `envSetupForPlayback`.
- Step 5: Add necessary assertions in your test case
- Step 6: Run and record your test cases

### `monitor.spec.ts`

```typescript
/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { env, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { MonitorClient } from "../src/monitorClient";

// Step 4: Add environment variables you'd like to mask the values in recordings
const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

// Step 1: prepare the test file and test case
describe("Monitor client", () => {
  let recorder: Recorder;
  // Step 2: declare common variables
  let subscriptionId: string;
  let client: MonitorClient;
  let diagnosticName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    // Step 3: create clients
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new MonitorClient(credential, subscriptionId, recorder.configureClientOptions({}));
    diagnosticName = "my-test-diagnostic-name";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create diagnosticSettings", async function () {
    // Step 3: call createOrUpdate to prepare resource
    const res = await client.diagnosticSettings.createOrUpdate("workflowsId", diagnosticName, {
      storageAccountId: "storageId",
      workspaceId: "workspaceId",
      eventHubAuthorizationRuleId: "authorizationId",
      eventHubName: "eventhubName",
      metrics: [],
      logs: [
        {
          category: "WorkflowRuntime",
          enabled: true,
          retentionPolicy: {
            enabled: false,
            days: 0,
          },
        },
      ],
    });
    // Step 5: Add assertions
    assert.equal(res.name, diagnosticName);
  });
});
```
