# GUIDELINES FOR RECORD AND PLAYBACK

## NOCK [for node tests]

- [nock](https://www.npmjs.com/package/nock)-package is being used to test modules that perform HTTP requests.
- To mock an existing live system, we record and playback the HTTP calls using `nock.recorder`.
- Recording relies on intercepting real requests and responses and then persisting them for later use.

---

## NISE [for browser tests]

- Nock has no support for browsers. For them, we're using [nise](https://www.npmjs.com/package/nise).
- Nise works in a way similar to Nock, intercepting HTTP requests and mocking responses.
- Unlike Nock, Nise does not have a native record/playback feature.
- Some Nise functions are being overwritten to enable record and playback.
- Added new Karma plugins to access the disk and write/read recording files ([karma-json-to-file-reporter](https://www.npmjs.com/package/karma-json-to-file-reporter) to write and [karma-json-preprocessor](https://www.npmjs.com/package/karma-json-preprocessor) to read).

---

## Setup for record and playback

**New env variable for recordings - TEST_MODE** [Supposed to be added in the `.env` file to be able to do record and playback]

- If TEST_MODE = "record",
  - Tests hit the live-service
  - Nock/Nise are used for recording the request-responses for future use
  - If recordings are already present, forces re-recording
- Else If TEST_MODE = "playback",
  - Existing recordings are used
- Else
  - Tests hit the live-service, we don't record the requests/responses

---

## Skipped tests

- Some tests are skipped because record and playback do not work properly when running them.
- The reasons for skipping every test are listed in the code [ `test/utils/recorder.ts` ] . Possible reasons for skipping a test:

  - **Abort:** browser testing unexpectedly finishes when a request is aborted during playback (unknown reason; probably related to the way nise handles it)
  - **Character:** there are characters in the message that are not supported in browser logging or in ECMAScript
  - **Progress:** Nock does not record a request if it's aborted in a 'progress' callback
  - **Size:** the generated recording file is too big and would considerably increase the size of the package
  - **Tempfile:** the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
  - **UUID:** a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it

- We leverage mocha's `.skip()` functionality to skip the test
  `this.skip()` - https://mochajs.org/#inclusive-tests
  By this, the tests in the skip list will only be executed if the `TEST_MODE` is neither `"record"` nor `"playback"`.
- Number of tests being covered in storage-queue:
  - Node: 48/48 (100%)
  - Browser: 30/35 (85%)

---

## Recordings

- Recordings are being saved in one folder for each describe-block test suite
  recording file structure
  - `recordings/node/<describe-block-title>/recording_<test-title>.js` for node tests and
  - `recordings/browsers/<describe-block-title>/recording_<test-title>.json` for browser tests.
- The file name of the recording for a test preserves the title of the `describe`-block and the corresponding `it`-block (with special characters appropriated). The recordings for browser tests go into the `./recordings/browsers/` folder(Similarly, node recordings in the `./recordings/node/` folder).

  For example

  ```typescript
  describe("Aborter", () => {
    it("should abort when abort() is called", async () => {
      ...
      ...
    });
  });
  ```

  (Browser Test) Recording corresponding to the above test is placed at
  `./recordings/browsers/aborter/recording_should_abort_when_abort_is_called.json`

  [ Following this rule - `./recordings/browsers/<describe-block-title>/recording_<test-title>.json` ]

- Just like the test recordings, we save the requests and responses from the before and after sections of the describe block in - `recordings/{node|browsers}/<describe-block-title>/recording_before_all_hook.{js|json}`.

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

## Adding a new test/test-suite

- Any function call that is not in the `it`-block and belongs to a `describe`-block must go in one of the `beforeEach`, `afterEach`, `before` or `after` sections.

- Recordings corresponding to `before` or `after` sections are saved under `recordings/{node|browsers}/<describe-block-title>/recording_before_all_hook.{js|json}`.

- Recordings corresponding to `beforeEach` or `afterEach` sections are saved along with the test recordings(`recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`).

- Follow the below template for adding any new test. `before` and `after` sections are optional, `beforeEach` and `afterEach` sections are compulsory.

  ```typescript
  import { record } from "./utils/recorder";

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

- **Saving randomly generated information/unique info of a test run. Example - `getUniqueName` in storage-queue**

  - Before Record and Playback, `getUniqueName` was being imported from `utils` in the `.spec.ts` test files. `getUniqueName` generates a new value each time we run.

  - Retaining that unique value is crucial in order to replay the http request during `"playback"` mode, which also implies that any unique information related to the test must be saved in order to replay the http requests.

  - When `recorder.stop();` is called for a test, we save that unique information corresponding to the test run along with the test recording.

  - During `playback` mode, the saved unique information must be pulled out from the existing recording in order to replay the http requests.

    For the case of `getUniqueName`, to keep things clean in the `spec.ts` files, we have moved the `getUniqueName` into the `recorder.ts`.
    i.e., a wrapper is added around `getUniqueName` in `recorder.ts` which takes care of the `TEST_MODE`

    - if `TEST_MODE` = `"record"`, `recorder.getUniqueName()` will work the same as the usual `getUniqueName()`.
    - if `TEST_MODE` = `"playback"`, `recorder.getUniqueName()` will pull out the value from existing recording.

  [Same is the case with `newDate` function]

  - Any unique information of the test run that is important for playing back the http request must be saved along with the recordings in the record mode.

- If a new test/test-suite is added, execute the test/test-suite(or all the tests) by setting the env variable `TEST_MODE = record` and **commit** the generated recording files.

- If the new test is supposed to skipped, it must be added in the skip list as described in the earlier section. Doing this would allow the tests in the skip list to be executed only if the `TEST_MODE` is neither `"record"` nor `"playback"`.

---

## Note - `console.log()` for browser tests

- In browser, once the content to be recorded is ready, recordings are supposed to be sent to the appropriate karma reporter in order to generate the corresponding recording file. The way of doing this is by printing the recordings to `console.log()`. As a result, the console gets filled with lots of prints while recording.
- To avoid the issue, we have currently disabled `console.log()` in karma.conf.js (karma configuration) for storage packages in `"record"` mode.

  ```javascript
  browserConsoleLogOptions: {
    // IMPORTANT: Comment the following line if you want to print debug logs in your browsers in record mode!!
    terminal: process.env.TEST_MODE !== "record";
  }
  ```

- In `record` mode, comment the above specified line in `karma.conf.js` to enable `console.log()` in browsers.

---

## References

- https://github.com/Azure/azure-sdk-for-js/pull/2227
