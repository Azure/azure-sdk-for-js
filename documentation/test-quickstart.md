# Javascript Codegen Quick Start for Test

This page is to help you write and run tests for Javascript Codegen SDK including high-level and rest-level clients. We firstly introduce key concepts we'll touch upon on, then show how to run generated sample tests and add testcases.

# Table of contents

- [Background](#background)
- [Prerequisites](#prerequisites)
- [How to run test](#how-to-run-test)
  - [Key concepts](#key-concepts)
    - [Record](#record)
    - [Playback](#playback)
    - [Sensitive information](#sensitive-information)
    - [TEST_MODE](#test_mode)
  - [Test structure](#test-structure)
  - [Run tests in record mode](#run-tests-in-record-mode)
  - [Run tests in playback mode](#run-tests-in-playback-mode)
- [How to write tests](#how-to-write-tests)
  - [Before writing test](#before-writing-test)
    - [Prepare environment variables](#prepare-environment-variables)
    - [Secure sensitive data](#secure-sensitive-data)
  - [Example: Basic Azure service interaction and recording](#example-basic-azure-service-interaction-and-recording)

# Background

The Azure SDK test framework uses the [`test-recorder`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md) library, which in turn rests upon on a HTTP recording system ([testproxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy)) that enables tests dependent on network interaction to be run offline.

At the moment, tests in our repo depend on one of the two different versions of the recorder tool (`@azure-tools/test-recorder`) - `1.a.b` and `2.x.y`. Eventually, all the tests will be migrated to depend on the 2.x.y version of the recorder and you could refer to the [test recoeder migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md). Please note this quickstart is based on 2.x.y version.

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

## Key concepts

Before we dig into the details let's get a glimpse of key concepts which we'll touch upon on during running tests.

### Record

To **record** means to intercept any HTTP request, store it in a file, then store the response received from the live resource that was originally targeted. We leverage the unified out-of-process test proxy server that is built for this use case. The output files are stored in `recordings/node/*` and in `recordings/browser/*`, which are relative to the root of the project you're working on.

### Playback

To **playback** means to intercept any HTTP request and to respond it with the stored response of a previously recorded matching request.

### Sensitive information

**Sensitive information** means content that should not be shared publicly. Content like passwords, unique identifiers or personal information should be cleaned up from the recordings. Some functionality is provided to fix this problem. You can read more at [securing sensitive data](#securing-sensitive-data).

### TEST_MODE

The Azure SDK test framework uses the [`test-recorder`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md) library to record tests. By using recorder with your clients, the requests are redirected to the test-proxy tool to either save them or replay them.
Interactions with the test-proxy tool vary based on what the `TEST_MODE` environment is.
|TEST_MODE |What? |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record` | Stores network requests with the help of test-proxy tool in a plain text file in the folder `recordings` at the root of your repository (example: root of the `sdk/purview/purview-catalog-rest` project) |
| `playback` | Stored requests/responses are utilized by the test-proxy tool when the requests are redirected to it instead of reaching the service |  
| `live` | Recorder and its methods are no-ops here, requests directly reach the service instead of being redirected at the test-proxy tool layer |

## Test structure

If you are the first time to generate SDK you could enable the config `generate-test: true` in `README.md`. We'll generate simple utils and a sample test file for you with below similar structure. They only contains basics for testing, so you need to update to your own utility and test cases. So the overall structure will be similar to below:

Note: the structure of `test` folder has slight differenct between HLC and RLC SDK. We only have one sample file under the `test` folder which contains all contents.

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

Before running tests it's advised to update the dependencises and build our project by running the command `rush update && rush build -t <your-package-name>`. And please notice this command is time-consuming and take around 10 mins. You could find more [details](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#installing-and-managing-dependencies).

Here we could run the tests in `purview-catalog-rest`. By default, these npm scripts run previously recorded tests. The recordings have been generated by using a custom recording library called [`test-recorder`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

```Shell
sdk/purview/purview-catalog-rest> rushx test
```

If you are the first time to run tests you may fail with below message because there is no any recordings found.

```
[node-tests]   My test
[node-tests]     1) "before each" hook for "sample test"
[node-tests]     2) "after each" hook for "sample test"
[node-tests]
[node-tests]
[node-tests]   0 passing (225ms)
[node-tests]   2 failing
[node-tests]
[node-tests]   1) My test
[node-tests]        "before each" hook for "sample test":
[node-tests]      RecorderError: Start request failed.
```

To record or update your recordings you need to set the environment variable `TEST_MODE` to `record`. On Linux, you could use `export` to set env variable:

```shell
export TEST_MODE=record && rushx test
```

On Windows, you could use `set`:

```shell
SET TEST_MODE=record&& rushx test
```

Then you could have following similar logs and also go to the folder `purview-catalog-rest/recordings` to check the recording files.

```
[test-info] ===TEST_MODE="record"===
[0] [test-proxy] Attempting to start test proxy at http://localhost:5000 & https://localhost:5001.
[0]
[0] [test-proxy] Image tag obtained from the powershell script => 1.0.0-dev.20220427.1
[0]
[0] [test-proxy] Check the output file "test-proxy-output.log" for test-proxy logs.
[node-tests] [check-with-timeout] waiting for 1000ms
[node-tests] [check-with-timeout] waiting for 1000ms
[node-tests] [test-proxy] Proxy tool seems to be active at http://localhost:5000
[node-tests]
[node-tests] [check-with-timeout] checkWithTimeout condition returned true
[node-tests]
[node-tests]
[node-tests]   My test
[node-tests]     √ sample test
[node-tests]
[node-tests]
[node-tests]   1 passing (223ms)
```

## Run tests in playback mode

If you have existing recordings then the tests have been run against generated the HTTP recordings, you can run your tests in `playback` mode.

On Linux, you could use below commands:

```shell
export TEST_MODE=playback && rushx test
```

On Windows, you can use:

```shell
SET TEST_MODE=playback&& rushx test
```

Then the log could indicate that it is in `playback` mode.

```
[test-info] ===TEST_MODE="playback"===
```

# How to write tests

In the `test` directory create a file with the naming pattern `<what_you_are_testing>.spec.ts`. It's recommanded to seprate your test cases into `pulic` and `internal`(if you have) folders.

## Before writing test

### Prepare environment variables

`@azure-tools/test-recorder` exports `env` which loads the environment variables from the correct location (using `process.env` and `dotenv` in Node, and using `window.__env__` via karma in the browser), and also means that the environment variables set in `envSetupForPlayback` are used in playback mode.

- `recorder.start()` internally sets up the environment variables for playback. So, make sure to have the `recorder.start()` call before you use any environment variables in your tests.
- To use an environment variable in a test, just do `env["NAME_OF_THE_VARIABLE"]`.
- Recorder also exports a `assertEnvironmentVariable` global method, which can be used to retrieve the environment variables.
  The function `assertEnvironmentVariable("NAME_OF_THE_VARIABLE")` either returns the value or throws an error saying the variable is not defined in your environment.
  (This function comes handy when your function args expect a non-undefined value but the environment variable may not be defined in the runtime.)

### Secure sensitive data

Live tests need to do sensitive operations, like authenticating with your Azure endpoints, keys, secrets, etc. These are generally contained in the environment variables which are used as part of the tests.

We must secure them and not let them leak into our recordings. To avoid storing the sensitive info in the recordings, we use the sanitizers to mask the values with the fake ones or remove them, `RecorderStartOptions` helps us here.

## Example: Basic Azure service interaction and recording

This simple test creates a resource and checks that its name is assigned correctly. Take `purview-catalog-rest` as example:

- Step 1: Create your test file and add one test case with resource creation, here we have purview catalog glossary test file `glossary.spec.ts` and one case named `Should create a glossary`
- Step 2: Add the utility method `createClient` in `public/utils/recordedClient.ts` to share the `PurviewCatalogClient` creation.
  - Call `createTestCredential` to init your credential and refer [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md#aad-and-the-new-noopcredential) for more details
  - Wrap the `option` with test options by calling `recorder.configureClientOptions(options)`
- Step 3: Call `createClient` to prepare the client and call `client.path("/atlas/v2/glossary").post()` to create our glossary resource
- Step 4: Specify environment variables that would be replaced in the recording and set during playback in the map `envSetupForPlayback` under the file `public/utils/recordedClient.ts`. This could be used to ensure that secrets and user-specific options do not appear in the recording body
- Step 5: Add necessary assertions in your test case, then run and record your test

`glossary.spec.ts`

```typescript
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { PurviewCatalogClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("My test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;
  let glossaryName: string;

  beforeEach(async function () {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
    glossaryName = "js-testing";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should create a glossary", async () => {
    const glossary = await client.path("/atlas/v2/glossary").post({
      body: {
        name: glossaryName,
        shortDescription: "Example Short Description",
        longDescription: "Example Long Description",
        language: "en",
        usage: "Example Glossary",
      },
    });
    assert.strictEqual(glossary.status, "200");
  });
});
```

`utils/recordedClient.ts`

```typescript
import { Context } from "mocha";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import PurviewCatalog, { PurviewCatalogClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import "./env";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
  PURVIEW_CATALOG_GLOSSARY_ENV: "glossary_custom_env", // Add environment vara you'd like to replace
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlaayback,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

// Add your client creation factory
export function createClient(recorder: Recorder, options?: ClientOptions): PurviewCatalogClient {
  // Using createTestCredential so it could work in playback mode
  const credential = createTestCredential();
  const client = PurviewCatalog("<endpoint>", credential, recorder.configureClientOptions(options));
  return client;
}
```
