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

describe.only("recorder - Browser", () => {
  it("should record a simple test", async function() {
    if (!isBrowser()) return this.skip();

    // TODO: Comment all of this.
    (window as any).__env__.TEST_MODE = "record";
    (window as any).__env__.PATH = "/to/replace";

    const recorderEnvSetup: RecorderEnvironmentSetup = {
      replaceableVariables: {
        PATH: "/replaced"
      },
      customizationsOnRecordings: [],
      queryParametersToSkip: []
    };

    xhrMock.setup();
    xhrMock.get("/to/replace", {
      status: 200,
      body: expectedHttpResponse
    });

    // The recorder should start in the beforeEach call.
    // We have to do this to emulate that.
    (this as any).currentTest = {
      file: "test/recorder.browser.spec.ts",
      // For this test, we don't care what's the content of the recorded function.
      fn: () => {}
    };

    const originalXHR = window.XMLHttpRequest;
    const originalConsoleLog = console.log;

    const savedConsoleLogParams: any[] = [];
    console.log = (...params: any) => {
      savedConsoleLogParams.push(params);
    };

    const recorder = record(this, recorderEnvSetup);

    // Restoring the XHR, otherwise we can't test this.
    window.XMLHttpRequest = originalXHR;

    const response = await helloWorldRequest();
    expect(response).to.equal(expectedHttpResponse);
    xhrMock.teardown();
    recorder.stop();
    console.log = originalConsoleLog;

    console.log(savedConsoleLogParams.length);
    expect(savedConsoleLogParams).to.deep.equal([
      [
        '{"writeFile":true,"path":"./recordings/browsers/recorder__browser/recording_should_record_a_simple_test.json","content":{"recordings":[],"uniqueTestInfo":{"uniqueName":{},"newDate":{}},"hash":"cd66dca29955acb89b218a38555c2fe1"}}'
      ]
    ]);
  });
});
