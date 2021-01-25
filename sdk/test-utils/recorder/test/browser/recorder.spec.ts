import { RecorderEnvironmentSetup, windowLens } from "../../src/utils";
import { record, TestContextInterface, TestContext, TestContextTest } from "../../src";
import xhrMock from "xhr-mock";
import MD5 from "md5";
import chai from "chai";
import { consoleLog, setConsoleLogForTesting } from "../../src/customConsoleLog";
const { expect } = chai;

const expectedHttpResponse = "Hello World!";

async function helloWorldRequest(): Promise<string> {
  return new Promise((resolve) => {
    function reqListener(this: any) {
      resolve(this.responseText);
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", windowLens.get(["__env__", "PATH"]));
    req.send();
  });
}

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    PATH: "/replaced"
  },
  customizationsOnRecordings: [],
  queryParametersToSkip: []
};

/**
 * A function that generates another function with a predictable shape, even after compiling it to the browser.
 */
const getNoOpFunction = () => {
  /* istanbul ignore next */
  return () => {};
};

/**
 * Another function that generates another function with a predictable shape, even after compiling it to the browser.
 */
const getAnotherNoOpFunction = () => {
  /* istanbul ignore next */
  return () => 1;
};

describe("The recorder's public API, on a browser", () => {
  afterEach(() => {
    windowLens.set(["__env__", "TEST_MODE"], undefined);
    windowLens.set(["__env__", "PATH"], undefined);
    windowLens.set(["__json__"], undefined);
  });

  it("should record a simple test", async function() {
    // Setting up the record mode, and the PATH environment variable.
    windowLens.set(["__env__", "TEST_MODE"], "record");
    windowLens.set(["__env__", "PATH"], "/to/replace");

    // We can't use Nise's FakeServer since the recorder ends up sending the request through the original XHR anyway.
    xhrMock.setup();
    xhrMock.get("/to/replace", {
      status: 200,
      body: expectedHttpResponse
    });

    // Before starting the recorder, we need to make a copy of the original XHR object, so that we can
    // restore it before doing the recorder do its magic, in order for the HTTP request to hit the xhr-mock instance.
    const originalXHR = XMLHttpRequest;

    // The recorder outputs files into the console,
    // so we need to mock the console.log function to capture and test the recorder output.
    const originalConsoleLog = consoleLog;
    const savedConsoleLogParams: any[] = [];
    setConsoleLogForTesting((...params: any[]) => {
      if (params && params.length > 0) {
        try {
          if (JSON.parse(params[0]).writeFile) {
            savedConsoleLogParams.push(params);
          }
        } catch (err) {}
      }
    });

    // The recorder should start in the beforeEach call.
    // We have to do this to emulate that.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: "test/recorder.browser.spec.ts",
      // For this test, we don't care what's the content of the recorded function.
      fn: getNoOpFunction()
    });

    const recorder = record(fakeThis, recorderEnvSetup);

    // Restoring the XHR, otherwise we can't test this.
    windowLens.set(["XMLHttpRequest"], originalXHR);

    const response = await helloWorldRequest();

    // This test's request reached the server and received the expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    xhrMock.teardown();
    await recorder.stop();
    setConsoleLogForTesting(originalConsoleLog);

    // Here we confirm that the recorder generated an expected output on the console.logs.
    // This output is used to generate the recording files in the filesystem, though here we're only
    // checking what was that the recorded emitted to the standard output.
    expect(savedConsoleLogParams[0][0]).to.equal(
      // The recordings here are empty because we hijacked the XHR.
      // See the playback test for an example of a properly constructed recording object.
      // TODO: Find a way to capture the complete output.
      JSON.stringify({
        writeFile: true,
        path:
          "./recordings/browsers/the_recorders_public_api_on_a_browser/recording_should_record_a_simple_test.json",
        content: {
          recordings: [],
          uniqueTestInfo: {
            uniqueName: {},
            newDate: {}
          },
          hash: MD5(getNoOpFunction().toString())
        }
      })
    );
  });

  it("should playback a simple test", async function() {
    // Setting up the playback mode.
    // The PATH environment variable is not needed on playback.
    // The recorder will assume that it is in playback mode by default.
    // windowLens.set(["__env__", "TEST_MODE"], "playback");

    // This is to emulate what 'karma-json-preprocessor' does for us during the real scenarios.
    windowLens.set(
      [
        "__json__",
        "recordings/browsers/the_recorders_public_api_on_a_browser/recording_should_playback_a_simple_test.json"
      ],
      {
        recordings: [
          {
            method: "GET",
            url: "/replaced",
            response: expectedHttpResponse
          }
        ],
        uniqueTestInfo: { uniqueName: {}, newDate: {} }
      }
    );

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: "test/recorder.browser.spec.ts",
      // For this test, we don't care what's the content of the recorded function.
      fn: getNoOpFunction()
    });

    const recorder = record(fakeThis, recorderEnvSetup);

    const response = await helloWorldRequest();

    // The playback code served the appropriate response based on the recordings.
    expect(response).to.equal(expectedHttpResponse);

    await recorder.stop();
  });

  it("soft-record should re-record a simple outdated test", async function() {
    // Setting up the playback mode.
    // The PATH environment variable is not needed on playback.
    windowLens.set(["__env__", "TEST_MODE"], "soft-record");
    windowLens.set(["__env__", "PATH"], "/to/replace");

    // This is to emulate what 'karma-json-preprocessor' does for us during the real scenarios.
    windowLens.set(
      [
        "__json__",
        "recordings/browsers/the_recorders_public_api_on_a_browser/recording_softrecord_should_rerecord_a_simple_outdated_test.json"
      ],
      {
        recordings: [
          {
            method: "GET",
            url: "/replaced",
            response: expectedHttpResponse
          }
        ],
        uniqueTestInfo: { uniqueName: {}, newDate: {} },
        hash: "fake old hash"
      }
    );

    // We can't use Nise's FakeServer since the recorder ends up sending the request through the original XHR anyway.
    xhrMock.setup();
    xhrMock.get("/to/replace", {
      status: 200,
      body: expectedHttpResponse
    });

    // Before starting the recorder, we need to make a copy of the original XHR object, so that we can
    // restore it before doing the recorder do its magic, in order for the HTTP request to hit the xhr-mock instance.
    const originalXHR = XMLHttpRequest;

    // The recorder outputs files into the console,
    // so we need to override the consoleLog function to capture and test the recorder output.
    const originalConsoleLog = consoleLog;
    const savedConsoleLogParams: any[] = [];
    setConsoleLogForTesting((...params: any[]) => {
      if (params && params.length > 0) {
        try {
          if (JSON.parse(params[0]).writeFile) {
            savedConsoleLogParams.push(params);
          }
        } catch (err) {}
      }
    });

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: "test/recorder.browser.spec.ts",
      // The hash in our expected recording is made out of an empty function.
      // This function has something inside, which means it has changed.
      fn: getAnotherNoOpFunction()
    });

    const recorder = record(fakeThis, recorderEnvSetup);

    // Restoring the XHR, otherwise we can't test this.
    windowLens.set(["XMLHttpRequest"], originalXHR);

    const response = await helloWorldRequest();

    // This test's request reached the server and received the expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    xhrMock.teardown();
    await recorder.stop();
    setConsoleLogForTesting(originalConsoleLog);

    // Now we check the hash has changed in the recorded console.log output.

    // Here we confirm that the recorder generated an expected output on the console.logs.
    // This output is used to generate the recording files in the filesystem, though here we're only
    // checking what was that the recorded emitted to the standard output.
    expect(savedConsoleLogParams[0][0]).to.equal(
      // The recordings here are empty because we hijacked the XHR.
      // See the playback test for an example of a properly constructed recording object.
      // TODO: Find a way to capture the complete output.
      JSON.stringify({
        writeFile: true,
        path:
          "./recordings/browsers/the_recorders_public_api_on_a_browser/recording_softrecord_should_rerecord_a_simple_outdated_test.json",
        content: {
          recordings: [],
          uniqueTestInfo: {
            uniqueName: {},
            newDate: {}
          },
          hash: MD5(getAnotherNoOpFunction().toString())
        }
      })
    );
  });

  it("soft-record should skip a simple unchanged test", async function() {
    // Setting up the playback mode.
    // The PATH environment variable is not needed on playback.
    windowLens.set(["__env__", "TEST_MODE"], "soft-record");

    // This is to emulate what 'karma-json-preprocessor' does for us during the real scenarios.
    windowLens.set(
      [
        "__json__",
        "recordings/browsers/the_recorders_public_api_on_a_browser/recording_softrecord_should_skip_a_simple_unchanged_test.json"
      ],
      {
        recordings: [
          {
            method: "GET",
            url: "/replaced",
            response: expectedHttpResponse
          }
        ],
        uniqueTestInfo: { uniqueName: {}, newDate: {} },
        // This is the expected hash
        hash: MD5(getNoOpFunction().toString())
      }
    );

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    let skipped = false;
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: "test/recorder.browser.spec.ts",
      // The hash in our expected recording is made out of an empty function.
      // This function is empty, which means it remains the same.
      fn: getNoOpFunction()
    });

    // We have to mock this.skip in order to confirm that the recorder has called it.
    // We'll make a fake this.
    fakeThis.skip = () => {
      skipped = true;
      throw new Error("Emulating mocha's skip");
    };

    try {
      record(fakeThis, recorderEnvSetup);
    } catch (e) {
      if (e.message !== "Emulating mocha's skip") {
        throw e;
      }
    }

    expect(skipped).to.true;
  });
});
