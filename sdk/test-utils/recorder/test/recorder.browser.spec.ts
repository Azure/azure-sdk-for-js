import { isBrowser, RecorderEnvironmentSetup } from "../src/utils";
import chai from "chai";
import { record } from "../src";
import xhrMock from "xhr-mock";
const { expect } = chai;

const expectedHttpResponse = "Hello World!";

async function helloWorldRequest(): Promise<string> {
  return new Promise((resolve) => {
    function reqListener(this: any) {
      resolve(this.responseText);
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", (window as any).__env__.PATH!);
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

describe("recorder - Browser", () => {
  beforeEach(function() {
    if (!isBrowser()) return this.skip();
  });

  afterEach(() => {
    delete (window as any).__env__.TEST_MODE;
    delete (window as any).__env__.PATH;
  });

  it("should record a simple test", async function() {
    // Setting up the record mode, and the PATH environment variable.
    (window as any).__env__.TEST_MODE = "record";
    (window as any).__env__.PATH = "/to/replace";

    // We can't use Nise's FakeServer since the recorder ends up sending the request through the original XHR anyway.
    xhrMock.setup();
    xhrMock.get("/to/replace", {
      status: 200,
      body: expectedHttpResponse
    });

    // Before starting the recorder, we need to make a copy of the original XHR object, so that we can
    // restore it before doing the recorder do its magic, in order for the HTTP request to hit the xhr-mock instance.
    const originalXHR = window.XMLHttpRequest;

    // The recorder outputs files into the console,
    // so we need to mock the console.log function to capture and test the recorder output.
    const originalConsoleLog = console.log;
    const savedConsoleLogParams: any[] = [];
    console.log = (...params: any) => {
      savedConsoleLogParams.push(params);
    };

    // The recorder should start in the beforeEach call.
    // We have to do this to emulate that.
    (this as any).currentTest = {
      file: "test/recorder.browser.spec.ts",
      // For this test, we don't care what's the content of the recorded function.
      fn: () => {}
    };

    const recorder = record(this, recorderEnvSetup);

    // Restoring the XHR, otherwise we can't test this.
    window.XMLHttpRequest = originalXHR;

    const response = await helloWorldRequest();

    // Here we confirm that the recorder reached the server and got an expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    xhrMock.teardown();
    recorder.stop();
    console.log = originalConsoleLog;

    // Here we confirm that the recorder generated an expected output on the console.logs.
    // This output is used to generate the recording files in the filesystem, though here we're only
    // checking what was that the recorded emitted to the standard output.
    expect(savedConsoleLogParams).to.deep.equal([
      [
        // The recordings here are empty because we hijacked the XHR.
        // See the playback test for an example of a properly constructed recording object.
        // TODO: Find a way to capture the complete output.
        '{"writeFile":true,"path":"./recordings/browsers/recorder__browser/recording_should_record_a_simple_test.json","content":{"recordings":[],"uniqueTestInfo":{"uniqueName":{},"newDate":{}},"hash":"bee6c8ee9e9197caa06d7a1a88c30aaa"}}'
      ]
    ]);
  });

  it("should playback a simple test", async function() {
    // Setting up the playback mode.
    // The PATH environment variable is not needed on playback.
    (window as any).__env__.TEST_MODE = "playback";

    // This is to emulate what 'karma-json-preprocessor' does for us during the real scenarios.
    (window as any).__json__ = {
      ["recordings/browsers/recorder__browser/recording_should_playback_a_simple_test.json"]: {
        recordings: [
          {
            method: "GET",
            url: "/replaced",
            response: expectedHttpResponse
          }
        ],
        uniqueTestInfo: { uniqueName: {}, newDate: {} }
      }
    };

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    (this as any).currentTest = {
      file: "test/recorder.browser.spec.ts",
      // For this test, we don't care what's the content of the recorded function.
      fn: () => {}
    };

    const recorder = record(this, recorderEnvSetup);

    const response = await helloWorldRequest();
    expect(response).to.equal(expectedHttpResponse);

    recorder.stop();
  });
});
