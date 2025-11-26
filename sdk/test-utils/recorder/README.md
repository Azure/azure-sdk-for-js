# Azure @azure-tools/test-recorder library for JavaScript

The Azure SDK for JavaScript is composed of a multitude of libraries that attempt to deliver a common, homogenous SDK to make use of all of the services that Azure can provide. Among the challenges of such a goal, we have some that are specific to tests, some of which we can summarize in the following questions:

- How to write live tests that can work as unit tests?
- How to ensure that tests are as fast as they can be?
- How to avoid writing mocked versions of our HTTP API?
- How to protect sensitive data from our live tests?
- How to write tests that support parallelism?
- How to write isomorphic tests for NodeJS and the Browsers?

Our recorder tool package `@azure-tools/test-recorder` attempts to provide an answer for those questions.

**Note 1: For Asset Sync workflow to push out the test recordings to `Azure/azure-sdk-assets` repository, refer to [asset-sync-workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).**

**Note 2: Refer to [testing-commands](https://github.com/Azure/azure-sdk-for-js/wiki/Golden-Testing-Commands) if you need help on commands to run during testing.**

This library provides interfaces and helper methods to equip the SDKs in the `azure-sdk-for-js` repo with the recording and playback capabilities for the tests, it targets HTTP requests in both Node.js and the Browsers.

`@azure-tools/test-recorder`, as part of the Test Utils available in this repository, it should be added only as a `devDependency` and used only for the tests of an sdk.

This tool helps to record and playback the tests in the JS repo by leveraging the unified out-of-process test proxy server.

## Index

- [Key concepts](#key-concepts)
- [Getting started](#getting-started)
  - [Installing the package](#installing-the-package)
  - [Configuring your project](#configuring-your-project)
  - [TEST_MODE](#test_mode)
- [Onboard to asset-sync workflow](#onboard-to-asset---sync-workflow)
- [Using the `Recorder`](#using-the-recorder)
  - [Recorder#variable()](#recordervariable)
  - [Environment Variables](#environment-variables)
  - [`@azure-tools/test-credential` package and the NoOpCredential](#azure-toolstest-credential-package-and-the-noopcredential)
- [Examples](#examples)
  - [How to record](#how-to-record)
  - [How to playback](#how-to-playback)
  - [Update existing recordings](#update-existing-recordings)
  - [Skipping tests](#skipping-tests)
  - [Securing sensitive data](#securing-sensitive-data)
  - [Supporting parallelism](#supporting-parallelism)
  - [Isomorphic tests](#isomorphic-tests)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions (FAQs)](#frequently-asked-questions-faqs)
- [Next steps](#next-steps)
- [Contributing](#contributing)

## Key concepts

- To **record** means to intercept any HTTP request, store it in a file, then store the response received from the live resource that was originally targeted. We leverage the unified out-of-process test proxy server that is built for this use case. The output files are stored in the external `azure-sdk-assets` repository, managed through the [Asset Sync Workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).
- To **playback** means to intercept any HTTP request and to respond it with the stored response of a previously recorded matching request.
- **Sensitive information** means content that should not be shared publicly. Content like passwords, unique identifiers or personal information should be cleaned up from the recordings. Some functionality is provided to fix this problem. You can read more at [securing sensitive data](#securing-sensitive-data).

## Getting started

We're about to go through how to set up your project to use the `@azure-tools/test-recorder` package.

**_Note: If you're new to this repository, follow the [ContributingGuide.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn how to setup/build the repo and to create/test an SDK in the [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repository._**

### Installing the package

From this point forward, we'll assume that you're developing (perhaps contributing!) to one of the azure-sdk-for-js's libraries. So, your next step is to change directory to the path relevant to your project. Let's say you want to use `@azure-tools/test-recorder` package for `@azure/data-tables`, make sure your `package.json` has the following:

```json
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure-tools/test-credential": "^1.0.0", // If you are using `@azure/identity` in your tests
    "@azure-tools/test-recorder": "^4.1.0"
    // ... more of your devDependencies
  }
  // ... more of your package.json properties
}
```
Do `pnpm install` and `pnpm build --filter @azure-tools/test-recorder...` to install and build the latest dependencies.

And you're ready! Now you can use the test recorder in your code, as shown below:

<!-- dev-tool snippets ignore -->

```typescript
import { Recorder } from "@azure-tools/test-recorder";
```

Or, if you know what you want to import, you can also do the following:

```typescript
import { Recorder, RecorderStartOptions, env, SanitizerOptions } from "@azure-tools/test-recorder";
```

### Configuring your project

Having the recorder as a devDependency means that you'll be able to start recording tests right away by using the `Recorder` class.

The test-recorder provides the `Recorder` class that deals with recording and playing back the network requests, depending on the value assigned to the `TEST_MODE` environment variable.

- If `TEST_MODE` equals to `record`, it will automatically store network requests in a plain text file in the folder `recordings` at the root of your library (it is `sdk/tables/data-tables` in our example).
- As of version 4.0.0, this package supports `vitest` (instead of `mocha` and `karma`) for testing frameworks as suggested by the [template](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template) package in the repo.

#### package.json scripts

Your test scripts (in `package.json`) should be based on the examples in the template package. 
[@azure/template - package.json](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/template/template/package.json)

Read more at [dev-tool commands #usage](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/README.md#usage)

### TEST_MODE

By using recorder with your clients, the requests are redirected to the test-proxy tool to either save them or replay them.
Interactions with the test-proxy tool vary based on what the `TEST_MODE` environment variable is.

| TEST_MODE  | What?                                                                                                                                                                                           |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record`   | Stores network requests with the help of test-proxy tool in JSON files managed through the [Asset Sync Workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md). |
| `playback` | Stored requests/responses are utilized by the test-proxy tool when the requests are redirected to it instead of reaching the service                                                            |
| `live`     | Recorder and its methods are no-ops here, requests directly reach the service instead of being redirected at the test-proxy tool layer                                                          |

## Onboard to asset-sync workflow

This section assumes that your package is new to the JS repo and that you're trying to onboard your tests with recorder, and the asset-sync workflow.

From the root of the repo, navigate to your package

```
cd sdk/<service-folder>/<package-name>
```

Generate an `sdk/<service-folder>/<package-name>/assets.json` file by running the following command.

```
npx dev-tool test-proxy init
```

This command would generate an `assets.json` file with an empty tag.
Once you generate the recordings for your tests and push them to the assets repo, the tag gets populated here.

For further understanding, please read the [ASSET_SYNC_WORKFLOW.md](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).

## Using the `Recorder`

Inside a vitest test (either in the `beforeEach` or in the test body itself), you will need to instantiate the `Recorder` as below to leverage its functionalities.

```ts
let recorder: Recorder;

beforeEach(async function (context) {
  recorder = new Recorder(context);
});
```

The client being tested needs to add the recording policy that redirects requests to the test-proxy tool first before they go to the service. This is done by simply passing the client options bag through the `recorder.configureClientOptions` helper:

```ts
const client = new MyServiceClient(/** args **/, recorder.configureClientOptions(/** client options **/));
```

Recording starts with the `recorder.start()` method.

```ts
await recorder.start(/** recorderOptions go here **/);
```

Recorder options will typically contain the environment setup needed for the `playback` mode, and the sanitizers that help with masking the sensitive information in the recordings, more on the recorder options below.

Any requests that are made using the above `client (MyServiceClient)` will be redirected to the test-proxy tool before they reach the service, the requests and responses will be recorded and saved when `recorder.stop()` is called in `record` mode.

Likewise, in `playback` mode, the saved responses are utilized by the test-proxy tool when the requests are redirected to it instead of reaching the service.

```ts
await recorder.stop();
```

- Call this method to ping the test-proxy tool with a stop request, this helps to stop recording, saves the recording file in record mode.

_Note: Instantiating, starting, and stopping the recorder all have no effect in the `live` mode (`TEST_MODE=live`). In `live` mode, the redirection to the test-proxy tool doesn't happen and the requests are sent to the services as usual._

### Recorder#variable()

To handle dynamic/generated values for testing that are created as part of the tests, ensuring the requests in the `playback` mode match the ones in the `record` mode, you can leverage the `Recorder#variable` function.

This API lets you declare variables computed at record time and re-used during playback. Variables are stored with the recording and retrieved during playback.

Example usage:

```ts
const queueName = recorder.variable("queue-name", `queue-${Math.floor(Math.random() * 1000)}`);
// Assume that we have a client that has a createQueue method.
await client.createQueue(queueName);
// Shows up in the recording as
  "Variables": {
    "queue-name": "queue-1662"
  }
```

In this example, the name of the queue used in the recording is randomized. However, in playback mode, the recorder retrieves the stored value from the recording file.

- In record mode, the function stores the provided value with the recording as a variable and returns that value.
- In playback mode, the function fetches the value from the variables stored as part of the recording and returns the retrieved variable, throwing an error if it is not found.
- In live mode, no recordings are saved; it just returns the provided value.

### Environment variables

`@azure-tools/test-recorder` exports `env` which loads the environment variables from the correct location (using `process.env` through vitest in both Node and browser environments), and also means that the environment variables set in `envSetupForPlayback` are used in playback mode.

- `recorder.start()` internally sets up the environment variables for playback. So, make sure to have the `recorder.start()` call before you use any environment variables in your tests.
- To use an environment variable in a test, just do `env["NAME_OF_THE_VARIABLE"]`.
- Recorder also exports a `assertEnvironmentVariable` global method, which can be used to retrieve the environment variables.
  The function `assertEnvironmentVariable("NAME_OF_THE_VARIABLE")` either returns the value or throws an error saying the variable is not defined in your environment.
  (This function comes handy when your function args expect a non-undefined value but the environment variable may not be defined in the runtime.)

### `@azure-tools/test-credential` package and the NoOpCredential

We do not record the AAD traffic since it is typically noise that is not needed for testing the SDK(unless we are testing the `@azure/identity` package directly which uses the `@azure-tools/test-recorder` differently to record the tests).

- Tests with clients using AAD should make use of the new `@azure-tools/test-credential` package.
- This package provides a `NoOpCredential` implementation of `TokenCredential` which makes no network requests, and should be used in `playback mode`.
- The provided `createTestCredential` helper will handle switching between `NoOpCredential` in playback and `ClientSecretCredential` when recording for you:

```ts
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();

// Create your client using the test credential.
new MyServiceClient(<endpoint>, credential);
```

Since AAD traffic is not recorded by the new recorder, there are no AAD credentials to remove from the recording using a sanitizer.

## Examples

### How to record

To record your tests,

- make sure to set the environment variable `TEST_MODE` to `record`

  ```sh
  # Windows
  set TEST_MODE=record

  # Linux / Mac
  export TEST_MODE=record
  ```

- then in your code, instantiate the `Recorder`
- call `#start()` function with the recorder options
- modify the client options using the `#configureClientOptions()` method
- then make calls with your client as needed
- call `#stop()` function to save the recording in a file

In the following example, we'll use the recorder with the client from `@azure/data-tables`:

_[Example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/template/template/test/public/sampleTest.spec.ts) from the template project if you want to check out._

```typescript
import { RecorderStartOptions, Recorder, env } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { TableServiceClient } from "@azure/data-tables";
import { beforeEach, afterEach, describe, it } from "vitest";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    TABLES_URL: "https://fakeaccount.table.core.windows.net",
  },
  sanitizerOptions: {
    bodySanitizers: [
      {
        target: encodeURIComponent(env.TABLES_URL ?? ""),
        value: encodeURIComponent(`https://fakeaccount.table.core.windows.net`),
      },
    ],
  },
  removeCentralSanitizers: ["sanitizer-id-to-skip"]
};

describe(`TableServiceClient tests`, () => {
  let recorder: Recorder;
  let credential;

  beforeEach(async (context) => {
    recorder = new Recorder(context);
    await recorder.start(recorderOptions);
    credential = createTestCredential();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create new table, then delete", async () => {
    const tableName = recorder.variable(
      "table-name",
      `table${Math.ceil(Math.random() * 1000 + 1000)}`
    );
    const client = new TableServiceClient(
      env["TABLES_URL"],
      credential,
      recorder.configureClientOptions({})
    );
    await client.createTable(tableName);
    await client.deleteTable(tableName);
  });
});
```

- After running this test with the `TEST_MODE` environment variable set to
  `record`, the recorder assisted by the test-proxy tool will create a recording file with the contents of the HTTP requests as well as the responses.

  If the package has been onboarded to asset-sync workflow, the recording will be located under the `.assets/` directory at the root of the repository. 
    - To view the recording, refer to `.assets/.breadcrumb` to find the entry that matches your SDK. This will give you the name of the directory within `.assets` that your recordings are located in.
    - Refer to [asset sync workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md#workflow-with-asset-sync-enabled) for more understanding and further steps.

  **Note:** The recordings are no longer stored directly in your SDK's directory (`recordings/node/*` or `recordings/browsers/*`). Instead, they are managed externally through the Asset-Sync workflow.

- You'll see in the code above that we're invoking `recorder.stop`. This is so that, after each test, we can stop recording and the test file can be generated.

- We recommend instantiating/starting the new recorder in the `beforeEach` block and stopping the recorder on `afterEach` to make sure that the generated files are smaller and easier to understand than by having them all in one chunk.

### Securing Sensitive Data

Live tests need to do sensitive operations, like authenticating with your Azure endpoints, keys, secrets, etc. These are generally contained in the environment variables which are used as part of the tests.

We must secure them and not let them leak into our recordings. To avoid storing the sensitive info in the recordings, we use the sanitizers to mask the values with the fake ones or remove them, `RecorderStartOptions` helps us here.

#### `RecorderStartOptions`

`RecorderStartOptions` has three components, `envSetupForPlayback`, `sanitizerOptions`, and `removeCentralSanitizers`.

For a live test to be run, we typically need the test secrets, which are usally stored as Environment variables.

And since in playback mode, the requests don't reach the service, we don't actually need to have/share the test secrets to run the tests in playback mode.

Another angle to this is that the recordings store the requests, which would contain the sensitive information related to the endpoints, tokens, keys, secrets, credentials, etc that are parts of the supposedly secretive environment variables or derivatives of them.

We try our best to make sure the sensitive information is not leaked anywhere with the help of `envSetupForPlayback` and `Sanitizers`.

#### `envSetupForPlayback`

`envSetupForPlayback` expects key-value pairs, with keys signifying the names of the environment variables, and the values would be the fake ones that you'd like to map/swap the originals with.

```ts
  envSetupForPlayback: {
    TABLES_URL: "https://fakeaccount.table.core.windows.net",
  }
```

Used in record and playback modes. No effect in live mode.

- The key-value pairs will be used as the environment variables in playback mode.
- If the environment variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode.

#### Sanitizers

Sanitizers help remove or mask sensitive information from recordings. The following sanitizers are available:

| Sanitizer Type              | Example Usage                                                                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generalSanitizer`          | `{ regex: true, target: "abc+def", value: "fakeValue" }`                                                                                                                        | Offers a general regex replace across request/response Body, Headers, and URI. For the body, this means regex applying to the raw JSON.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `bodySanitizer`             | `{ regex: true, target: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)", value: fakeSecretValue, groupForReplace: "secret_content" }`                                               | Offers regex replace within a returned body. Specifically, this means regex applying to the raw JSON. If you are attempting to simply replace a specific key, the `bodyKeySanitizer` is probably the way to go.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `headerSanitizer`           | `{ key: "your_uuid", value: sanitizedValue }`                                                                                                                                   | Can be used for multiple purposes:<br/>1) To replace a key with a specific value, do not set "regex" value.<br/>2) To do a simple regex replace operation, define arguments "key", "value", and "regex"<br/>3) To do a targeted substitution of a specific group, define all arguments "key", "value", and "regex"                                                                                                                                                                                                                                                                                                                                         |
| `uriSanitizer`              | `{ target: secretEndpoint, value: fakeEndpoint}`                                                                                                                                | General use sanitizer for cleaning URIs via regex. Runs a regex replace on the member of your choice.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `connectionStringSanitizer` | `{`<br/> `actualConnString: env.TABLES_CONN_STRING,` <br/>`fakeConnString: "Endpoint=https://fakeaccountname.net/;SharedAccessSignature=st=2021-08-03&sig=fakesigval"` <br/>`}` | Internally, <br/>- connection strings are parsed and<br/>- each part of the connection string is mapped with its corresponding fake value<br/>- `generalRegexSanitizer` is applied for each of the parts with the real and fake values that are parsed                                                                                                                                                                                                                                                                                                                                                                                                     |
| `bodyKeySanitizer`          | `{ jsonPath: "$.bodyProvided.secret_info", regex: secretValue, value: fakeSecretValue }`                                                                                        | This sanitizer offers regex update of a specific JTokenPath.<br/><br/> EG: "TableName" within a json response body having its value replaced by whatever substitution is offered.<br/> This simply means that if you are attempting to replace a specific key wholesale, this sanitizer will be simpler<br/> than configuring a BodyRegexSanitizer that has to match against the full "KeyName": "Value" that is part of the json structure.<br/><br/> Further reading is available [here](https://www.newtonsoft.com/json/help/html/SelectToken.htm#SelectTokenJSONPath).<br/><br/> If the body is NOT a JSON object, this sanitizer will NOT be applied. |
| `removeHeaderSanitizer`     | `{ headersForRemoval: ["X-Content-Type-Options"] }`                                                                                                                             | A simple sanitizer that should be used to clean out one or multiple headers by their key. Removes headers from before saving a recording.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `resetSanitizer`            | `true`                                                                                                                                                                          | This clears the sanitizers that are added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Sanitizers can be added in two different ways:

1. Pass them as part of the `recorder.start({ envSetupForPlayback, sanitizerOptions })` call. Sanitizers are applied on the recordings in record mode before they are saved.
2. Call `recorder.addSanitizers(sanitizerOptions, ["record", "playback"])`. This way, the same sanitizer would be applied in both record and playback modes.

### How to playback

Once you have recorded something, you can run your tests again with `TEST_MODE` set to `playback`.

You'll notice how the tests succeed much faster. That's because the requests don't reach the service endpoints, the recorder assisted by the test-proxy tool will respond every request with their matching copy stored in the recordings.

### Update existing recordings

Once you have your recorded files, to update them after changing one of the tests, simply re-run the tests with `TEST_MODE` set to `record`. This will override previously existing files.

> **Note:** If you rename the file of the test, or the name of the test, the
> path of the recording will change. Make sure to delete the recordings
> corresponding to the deleted tests. If at any point in time you lose your
> recordings, don't worry. Running your tests with `TEST_MODE=record` will
> re-generate them.

### Skipping tests

Writing live tests can take considerable time, specially since each time you want to check that everything works fine, you potentially need to run again every test. You can specify what test to run by following vitest's approach of setting certain tests to `it.only`, and also to skip specific tests with `it.skip`.

If you launch the `recorder` in record mode with some of these changes (and given that you activate the recorder on `beforeEach`), only the files that relate to the changed tests will be updated. Skipped tests won't update their recordings.

This way, you can focus on fixing a specific set of tests with `.only`, then remove all the `.only` calls and trust that the playback will keep confirming that the unaffected tests are fine and green.

Refer to [#skipping-suites-and-tests](https://vitest.dev/guide/filtering.html#skipping-suites-and-tests) and [#test-skipif](https://vitest.dev/api/#test-skipif) if you want to conditionally skip a test.

### Supporting parallelism

A common issue while running integration tests is that, sometimes two individuals or machines might try to run the same set of tests against the same resource.

This is not directly related to the `@azure-tools/test-recorder` package, but if you're getting into issues because of concurrent conflicting requests, we strongly suggest using randomly generated strings as prefixes or suffixes for the resources you create.

Refer to [Recorder#variable()](#recordervariable) section to handle the dynamic/generated values for testing that are created as part of the tests, to make sure the requests in the `playback` mode match the ones in the `record` mode.

Since new resources are likely to get accumulated because some tests would crash or fail for any reason, make sure you delete the resources that are not cleared.

### Isomorphic tests

`@azure-tools/test-recorder` does support running tests in the browser. If you use vitest, as long as your vitest configuration is correct, your tests should work both on NodeJS and in the browsers!

## Troubleshooting

### 🤖 The test recording agent

We have developed a GitHub Copilot agent which will help you debug recorded test issues. It is based on a custom prompt that provides special information about recordings, and can

- Help you with your sanitizer configuration
- Help determine whether you have asset sync set up properly
- Check your recordings for secrets

To get started, say `/test-recording <...query>` to Copilot Chat in Agent mode. Claude Sonnet 4 is the recommended model. For example:

```
/test-recording my tests are failing in playback mode, but passing in recording mode. Please help fix them!
```

### Logging

Enabling logging may help uncover useful information about failures. In order to see logs from the recorder client, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling the `setLogLevel` function in the `@azure/logger` package.

### Enabling detailed logging with `test-proxy-debug`

If you need detailed logs to debug request and response modifications made by the test proxy through the sanitizers (both user-defined and central sanitizers), you can enable `test-proxy-debug` flag when running your tests:

```bash
npx dev-tool test:node -- --test-proxy-debug
```

This flag enables detailed logging of request and response modifications performed by the test proxy, which can help identify issues related to sanitization, matching, or unexpected request transformations.

#### Example Output

| Central sanitizer from test proxy | User registered sanitizer |
|-----------------|-----------------|
| <details open>  <summary>Output 1</summary> <img src="https://github.com/user-attachments/assets/57a3fbae-b22c-43d8-9e9c-83a59afc3dd5" height=90></details>      | <details open> <summary>Output 2</summary><img src="https://github.com/user-attachments/assets/23e7a24f-1048-43fe-9c9c-8dac31d7e0d7" height=180> </details>         |

### Common Issues

- **Viewing test proxy logs**: `dev-tool` outputs logs to `test-proxy-output.log` in your package's root directory.

- **Port configuration**: If port 5000 is already in use, set the environment variable `TEST_PROXY_HTTP_PORT` to another port (Example: `export TEST_PROXY_HTTP_PORT=2345`).

- **Permission issues**: Ensure you have write access to the [`azure-sdk-assets`](https://github.com/Azure/azure-sdk-assets) repository.

- **Playback mode failures**: Verify your `assets.json` file and run `npx dev-tool test-proxy restore`.

- **Local vs CI discrepancies**: Refresh your local recordings by deleting `.assets` and running `npx dev-tool test-proxy restore`.

- **Outdated test-proxy version**: Delete the cached test-proxy executable (usually in `.cache/azsdk-dev-tool/...`) and re-run tests.

For detailed troubleshooting steps related to Asset Sync workflow, refer to the [Asset Sync Workflow Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md#troubleshooting).

## Frequently Asked Questions (FAQs)

- **Where are my recordings stored?**  
  Recordings are stored externally in the [`azure-sdk-assets`](https://github.com/Azure/azure-sdk-assets) repository.

- **How do I update my recordings?**  
  Run tests in record mode (`TEST_MODE=record`) and push recordings using `npx dev-tool test-proxy push`.

- **Can I run tests offline?**  
  Yes. Run `npx dev-tool test-proxy restore` beforehand to download recordings.

- **How do I inspect my recordings?**  
  Inspect recordings in the `.assets` directory at the root of the repository. See [Inspecting Recordings](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md#inspecting-recordings-with-asset-sync-enabled).

- **Test succeeds in record mode, but why are the recordings not saved?**  
  Make sure you're stopping the recorder with `await recorder.stop()` at the end of your test.

### Next steps

All the libraries in the `azure-sdk-for-js` repository leverage test-recorder (v4.x.x). 
If you want to refer to the tests that leverage this package, go through the following search link:
<https://github.com/Azure/azure-sdk-for-js/search?q=test-recorder>.
Or just just follow the [template tests](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template/test)

### Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.
