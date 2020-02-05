import { isBrowser, RecorderEnvironmentSetup, delay } from "../src/utils";
import chai from "chai";
import { record } from "../src";
import xhrMock from "xhr-mock";
const { expect } = chai;

const expectedHttpResponse = "Hello World!";
const expectedRecording = ``;

async function helloWorldRequest(): Promise<string> {
  return new Promise((resolve) => {
    function reqListener(this: any) {
      // TODO: This is NOT FOUND
      console.log(this.responseText);
      resolve(this.responseText);
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    console.log((window as any).__env__.PATH!);
    req.open("GET", (window as any).__env__.PATH!);
    req.send();
  });
}

describe.only("recorder - Browser", () => {
  it("should record a simple test", async function() {
    if (!isBrowser()) return this.skip();

    (window as any).__env__.TEST_MODE = "record";
    (window as any).__env__.PATH = "/toReplace";

    const recorderEnvSetup: RecorderEnvironmentSetup = {
      replaceableVariables: {
        PATH: "/replaced"
      },
      customizationsOnRecordings: [],
      queryParametersToSkip: []
    };

    xhrMock.get("/toReplace", {
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

    const recorder = record(this, recorderEnvSetup);

    const response = await helloWorldRequest();
    expect(response).to.equal(expectedHttpResponse);
    xhrMock.teardown();
    recorder.stop();

    await delay(1000);
    const fs = require("fs");
    const recording = fs.readFileSync(
      "./recordings/node/recorder__nodejs/recording_should_record_a_simple_test.js",
      { encoding: "utf-8" }
    );
    const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");

    expect(recordingWithoutDate).to.equal(expectedRecording);
  });
});
