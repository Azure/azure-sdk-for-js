# GUIDELINES FOR RECORD AND PLAYBACK

## Setup for record and playback

**New env variable for recordings - TEST_MODE** [Supposed to be added in the environment(or `.env` file if the package uses `dotenv` as a devDependency) to be able to do record and playback]

- If TEST_MODE = "record",
  - Tests hit the live-service
  - Nock/Nise are leveraged for recording the request-responses for future use
  - If recordings are already present, forces re-recording
- Else If TEST_MODE = "live",
  - Tests hit the live-service, we don't record the requests/responses
- Else If TEST_MODE = "playback" (or if the TEST_MODE is neither "record" nor "live"),
  - Existing recordings are played back as responses to the HTTP requests in the tests

Add `@azure/test-utils-recorder` as a devDependency of your sdk.

## Adding a new test/test-suite

- `recorder` package assumes that the tests in the sdk are leveraging [mocha](https://mochajs.org/) and [rollup](https://rollupjs.org/guide/en/) (and [karma](https://karma-runner.github.io/latest/index.html) test runner for browser tests) as suggested by the [template](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template) package in the repo.

- `record` from `@azure/test-utils-recorder` package should be imported in the test files.

- `recorder = record(this);` initiates recording the HTTP requests and when `recorder.stop();` is called, the recording stops
  and all the HTTP requests recorded in between the two calls are saved as part of the recording in the `"record"` mode.
  In the same way, existing recordings are leveraged and played back in the `"playback"` mode when `recorder = record(this);` is invoked.
  [Has no effect if the `TEST_MODE` is `"live"`, tests hit the live-service, we don't record the requests/responses]

- Follow the below template for adding a new test. `before` and `after` sections are optional, `beforeEach` and `afterEach` sections are compulsory.

  ```typescript
  import { record } from "@azure/test-utils-recorder";

  describe("<describe-block-title>", () => {
    // before section is optional
    before(async function() {
      recorder = record(this);
      /*Place your code here*/
      recorder.stop();
    });

    // after section is optional
    after(async function() {
      recorder = record(this);
      /*Place your code here*/
      recorder.stop();
    });

    beforeEach(async function() {
      recorder = record(this);
      /*Place your code here*/
    });

    afterEach(async () => {
      /*Place your code here*/
      recorder.stop();
    });

    it("<test-title>", async () => {
      /*Place your code here*/
    });
  });
  ```

- Consider the `beforeEach`, `afterEach` and `it` blocks in the above test-suite.

  - `recorder = record(this);` is invoked in the `beforeEach` section and `recorder.stop();` in the `afterEach` section.
  - All the HTTP requests recorded in between the two calls are saved as part of the test(`it` block) recording in the `"record"` mode.
  - Existing test recording is played back when invoked `recorder = record(this);` in the `"playback"` mode.

- Recordings corresponding to `beforeEach` or `afterEach` sections are saved along with the test recordings(`recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`).

- Recordings corresponding to `before` or `after` sections are saved separately under `recordings/{node|browsers}/<describe-block-title>/recording_before_all_hook.{js|json}`.

- `Mocha.Context` is being leveraged to obtain the test title and other required information to save and replay the recordings.

- Any function call that affects http requests and is not in the `it`-block and belongs to a `describe`-block must go in one of the `beforeEach`, `afterEach`, `before` or `after` sections.

### Member functions getUniqueName() and newDate() of the `Recorder`

- Retaining (randomly) generated info of the test run during recording is crucial in order to replay the http requests for the test during `"playback"` mode.

- `Recorder` returned by the `record()` method has `getUniqueName()` and `newDate()` member functions along with the `stop()`.

  ```typescript
  recorder = record(this);

  const randomName = recorder.getUniqueName("random");
  const tmr = recorder.newDate("tmr");
  ```

- When `recorder.stop()` is called for a test, we save that unique information corresponding to the test run along with the test recording in the `record` mode.

- In `playback` mode, the saved unique information is pulled out from the existing recording in order to replay the http requests.

- `newDate: (label: string) => Date;`

  - In live test mode, `new Date()` is returned.

  - In record mode, `new Date()` is returned, and is saved in the recordings by assigning the `label`.

  - In playback mode, the date in the recordings associated to the `label` is returned.

  - [IMPORTANT] Same label cannot be used more than once for a test. If re-used, the new value will overwrite the existing value and the playback would fail.

- `getUniqueName: (prefix: string, label?: string) => string`

  - In live test mode, random string is generated, appended to `prefix` and returned.

  - In record mode, random string is generated, appended to `prefix` and returned, and is saved in the test-recordings by assigning the provided `label`.

  - In playback mode, the string in the recordings associated to the `label` is returned.

  - If the `label`(optional param) is not provided, `prefix` is used as the label.

  - [IMPORTANT] Same label cannot be used more than once for a test. If re-used, the new value will overwrite the existing value and the playback would fail.

- Any unique information of the test run that is important for playing back the http request must be saved along with the recordings in the record mode.

- If a new test/test-suite is added, execute the test/test-suite(or all the tests) by setting the env variable `TEST_MODE = record` and **commit** the generated recording files.

### Importing `delay` from `@azure/test-utils-recorder`

- This `delay` has no effect if the `TEST_MODE` is `"playback"`.
- `delay` works as expected(`await delay(<milliseconds>)`) if the `TEST_MODE` is not `"playback"`.

---

## Updating an existing test/test-suite

- Recordings are saved in `./recordings/` folder.
- If a test is modified, we might need to record it again in order to equip the recording to accommodate any updates in the function calls that invoke http requests.

  - execute the test/test-suite script(or all the tests) by setting the env variable `TEST_MODE = record`

- If only the test title is updated,

  - we can either execute that specific test again to generate the recording

    or

  - we can just update the file name of the recording accordingly

- **Commit** the generated recordings.

---

## Recordings

- Recordings are being saved in one folder for each describe-block test suite
  recording file structure
  - `recordings/node/<describe-block-title>/recording_<test-title>.js` for node tests and
  - `recordings/browsers/<describe-block-title>/recording_<test-title>.json` for browser tests.
- The file name of the recording for a test preserves the title of the `describe`-block and the corresponding `it`-block (with special characters appropriated). The recordings for node tests go into the `./recordings/node/` folder(Similarly, browser recordings in the `./recordings/browsers/` folder).

  For example

  ```typescript
  describe("Some Random Test Suite", () => {
    beforeEach(async function() {
      recorder = record(this);
      /*Place your code here*/
    });

    afterEach(async () => {
      /*Place your code here*/
      recorder.stop();
    });

    it("should abort when abort() is called", async () => {
      ...
      ...
    });
  });
  ```

  (Node Test) Recording corresponding to the above test is placed at
  `./recordings/node/some_random_test_suite/recording_should_abort_when_abort_is_called.js`

  [ Following this rule - `./recordings/node/<describe-block-title>/recording_<test-title>.js` ]

- Just like the test recordings, we save the requests and responses from the `before` and `after` sections of the describe block in - `recordings/{node|browsers}/<describe-block-title>/recording_before_all_hook.{js|json}`.
- In node recordings(Nock), the query parameters are not being stored and the SAS Token query parameters are not being stored in browser recordings(Nise).

### ENV Variables

- Any potential plain secrets in the recordings are replaced with dummy values.
- `setReplaceableVariables` and `setReplacements` methods are being exposed from the recorder package so that the environment variables can be managed from the tests in the sdk. These two methods can be imported from `@azure/test-utils-recorder`.
- Taking tests in the Keyvault sdk as an example -

  ```typescript
  setReplaceableVariables({
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azure_tenant_id",
    KEYVAULT_NAME: "keyvault_name"
  });
  ```

  Calling the `setReplaceableVariables` method would mean that

  - In playback mode, the environment variables will be overriden by the provided values.
  - In record mode, occurences of the environment variables in the recordings are replaced with the provided values.
  - This has no effect in the `live` test mode.

  ```typescript
  setReplacements([
    (recording: any): any =>
      recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
    (recording: any): any =>
      keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
  ]);
  ```

  Calling the `setReplacements` method would mean that

  - In `record` mode, occurences of any strings in the recordings that match the regular expressions are replaced with the provided values.
  - This has no effect in the `live` test mode or `playback` mode.

- The above methods can be called from the `before` section so that the tests can leverage the environment variables.

  The same dummy values are used as the environment variables during the playback mode.

---

## Skipping a test

- Currently, some tests (in storage packages) are being skipped because record and playback does not work as expected while executing them, the reasons are listed below.

  - **Abort:** browser testing unexpectedly finishes when a request is aborted during playback (unknown reason; probably related to the way `nise` handles it)
  - **Character:** there are characters in the message that are not supported in browser logging or in ECMAScript
  - **Progress:** Nock does not record a request if it's aborted in a 'progress' callback
  - **Size:** the generated recording file is too big and would considerably increase the size of the package
  - **Tempfile:** the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
  - **UUID:** a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it

- We leverage mocha's `.skip()` functionality to skip the test
  `this.skip()` - https://mochajs.org/#inclusive-tests.

- `{recorder.skip(runtime?: "node" | "browser", reason?: string)}` will skip the test in node or browser runtimes based on the `{runtime}` argument. If the `{runtime}` is undefined, the test will be skipped in both the node and browser runtimes. Has no effect if the `TEST_MODE` is `"record"` or `"live"`.

---

## Setting up karma.conf.js file in the SDK

### Karma.conf.js

- Install and add the plugins `"karma-json-to-file-reporter", "karma-json-preprocessor"` as `devDependencies`.

  ```javascript
  plugins: ["karma-json-to-file-reporter", "karma-json-preprocessor"],
  ```

- Import recordings in playback mode
  ```javascript
  files: [<your-existing-files-list>].concat(process.env.TEST_MODE === "playback" ? ["recordings/browsers/**/*.json"] : []),
  ```
- Preprocessor for converting JSON files into JS variables
  ```javascript
  preprocessors: {"recordings/browsers/**/*.json": ["json"]};
  ```
- Load `TEST_MODE` along with other variables
  ```javascript
  envPreprocessor: ["TEST_MODE"],
  ```
- jsonToFileReporter in karma.conf.js filters the JSON strings in console.logs

  ```javascript
  reporters: ["json-to-file"],

  jsonToFileReporter: {
    filter: function(obj) {
      if (process.env.TEST_MODE === "record") {
        if (obj.writeFile) {
          const fs = require("fs-extra");
          // Create the directories recursively incase they don't exist
          try {
            // Stripping away the filename from the file path and retaining the directory structure
            fs.ensureDirSync(obj.path.substring(0, obj.path.lastIndexOf("/") + 1));
          } catch (err) {
            if (err.code !== "EEXIST") throw err;
          }
          fs.writeFile(obj.path, JSON.stringify(obj.content, null, " "), (err) => {
            if (err) {
              throw err;
            }
          });
        } else {
          console.log(obj);
        }
        return false;
      }
    },
    outputPath: "."
  },

  browserConsoleLogOptions: {
    terminal: process.env.TEST_MODE !== "record"
  },

  ```

  In browser, once the content to be recorded is ready, recordings are supposed to be sent to the appropriate karma reporter in order to generate the corresponding recording file. The way of doing this is by printing the recordings to `console.log()` and filter the console.logs with karma plugins.

  Console logs with `.writeFile` property are captured and are written to a file(as test recordings). Any other console statements are captured and printed normally.

  - Example - `console.warn("hello"); -> console.log({ warn: "hello" });`
  - Example - `console.log("hello"); -> console.log({ log: "hello" });`

---

# More Information

## NOCK [for node tests]

- [nock](https://www.npmjs.com/package/nock)-package is being leveraged to test modules that perform HTTP requests.
- To mock an existing live system, we record and playback the HTTP calls using `nock.recorder`.
- Recording relies on intercepting real requests and responses and then persisting them for later use.

---

## NISE [for browser tests]

- Nock has no support for browsers. [nise](https://www.npmjs.com/package/nise)-package is being leveraged for browser tests.
- Nise works in a way similar to Nock, intercepting HTTP requests and mocking responses.
- Unlike Nock, Nise does not have a native record/playback feature.
- Some Nise functions are being overwritten to enable record and playback.
- karma.conf.js is supposed to be updated with the new Karma plugins which are required to access the disk and write/read recording files ([karma-json-to-file-reporter](https://www.npmjs.com/package/karma-json-to-file-reporter) to write and [karma-json-preprocessor](https://www.npmjs.com/package/karma-json-preprocessor) to read).

---

## References

- https://github.com/Azure/azure-sdk-for-js/pull/2227
