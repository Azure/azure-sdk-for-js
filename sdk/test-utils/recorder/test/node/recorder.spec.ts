import { RecorderEnvironmentSetup, delay, stripNewLines } from "../../src/utils";
import { record, TestContext, TestContextInterface, TestContextTest } from "../../src";
import MD5 from "md5";
import chai from "chai";
const { expect } = chai;

const expectedHttpResponse = "Hello World!";
const emptyFunction = () => {};
const expectedHash = MD5(emptyFunction.toString());
const expectedRecording = `let nock = require('nock');

module.exports.hash = "${expectedHash}";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('http://127.0.0.1:1337', {"encodedQueryParams":true})
  .get('/')
  .reply(200, "Hello World!", [
  'Date',
  'DATE',
  'Connection',
  'close',
  'Transfer-Encoding',
  'chunked'
]);
`;

/**
 * helloWorldRequest makes a get request to the env.SERVER_ADDRESS
 * and returns a promise that resolves when the server responds.
 */
async function helloWorldRequest(): Promise<string> {
  return new Promise((resolve) => {
    const http = require("http");
    http.get(process.env.SERVER_ADDRESS!, (res: any) => {
      let data = "";
      res.on("data", (chunk: string) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });
  });
}

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    SERVER_ADDRESS: "http://127.0.0.1:1337"
  },
  customizationsOnRecordings: [],
  queryParametersToSkip: []
};

describe("The recorder's public API, on NodeJS", () => {
  beforeEach(function() {
    // These tests do make files in the recordings folder.
    // For that reason, we make sure these files are deleted before testing.
    const fs = require("fs");
    const path = require("path");
    const directory = path.resolve("./recordings/node/the_recorders_public_api_on_nodejs");
    try {
      const files = fs.readdirSync(directory);
      for (const file of files) {
        fs.unlinkSync(path.join(directory, file));
      }
    } catch (e) {}
  });

  afterEach(() => {
    delete process.env.TEST_MODE;
    delete process.env.SERVER_ADDRESS;
  });

  it("should record a simple test", async function() {
    process.env.TEST_MODE = "record";
    process.env.SERVER_ADDRESS = "http://127.0.0.1:8080";

    // We create a very simple HTTP server that serves some content at a specific port.
    const http = require("http");
    const server = http.createServer(function(_: any, res: any) {
      res.write(expectedHttpResponse);
      res.end();
    });
    server.listen(8080);

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: __filename,
      fn: emptyFunction
    });

    const recorder = record(fakeThis, recorderEnvSetup);

    const response = await helloWorldRequest();

    // This test's request reached the server and received the expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    server.close();
    await recorder.stop();

    // The recorder takes some time to finish writing the output file.
    // It's not a second, but we're being pessimists.
    await delay(1000);
    const fs = require("fs");
    const recording = fs.readFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_should_record_a_simple_test.js",
      { encoding: "utf-8" }
    );

    // Nock does store the date of the request. Let's strip that from the response.
    const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");

    // Removing non-alphanumeric characters because of inconsistencies for this specific test on CI.
    expect(stripNewLines(recordingWithoutDate).replace(/[^a-zA-Z0-9]+/g, " ")).to.equal(
      stripNewLines(expectedRecording).replace(/[^a-zA-Z0-9]+/g, " ")
    );
  });

  it("should playback a simple test", async function() {
    // The recorder will assume that it is in playback mode by default.
    // process.env.TEST_MODE = "playback";

    // Making sure the expected recording actually exists before running playback.
    const fs = require("fs");
    fs.writeFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_should_playback_a_simple_test.js",
      expectedRecording
    );

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: __filename,
      fn: emptyFunction
    });

    const recorder = record(fakeThis, recorderEnvSetup);
    const response = await helloWorldRequest();

    // The playback code served the appropriate response based on the recordings.
    expect(response).to.equal(expectedHttpResponse);

    await recorder.stop();
  });

  it("soft-record should re-record a simple outdated test", async function() {
    process.env.TEST_MODE = "soft-record";
    process.env.SERVER_ADDRESS = "http://127.0.0.1:8080";

    // Making sure the expected recording actually exists before running playback.
    const fs = require("fs");
    fs.writeFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_softrecord_should_rerecord_a_simple_outdated_test.js",
      expectedRecording
    );

    // We create a very simple HTTP server that serves some content at a specific port.
    const http = require("http");
    const server = http.createServer(function(_: any, res: any) {
      res.write(expectedHttpResponse);
      res.end();
    });
    server.listen(8080);

    const changedTestFunction = () => {
      let the_contents_have_changed = true;
      return the_contents_have_changed;
    };

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: __filename,
      fn: changedTestFunction
    });

    const recorder = record(fakeThis, recorderEnvSetup);

    const response = await helloWorldRequest();

    // This test's request reached the server and received the expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    server.close();
    await recorder.stop();

    // The recorder takes some time to finish writing the output file.
    // It's not a second, but we're being pessimists.
    await delay(1000);
    const recording = fs.readFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_softrecord_should_rerecord_a_simple_outdated_test.js",
      { encoding: "utf-8" }
    );

    // Nock does store the date of the request. Let's strip that from the response.
    const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");

    // Let's make a new expected recording variable,
    // this time with the new hash.
    const expectedRecordingWithUpdatedHash = recordingWithoutDate.replace(
      expectedHash,
      MD5(changedTestFunction.toString())
    );

    // The hash has changed in the recorded file.
    expect(recordingWithoutDate).to.equal(expectedRecordingWithUpdatedHash);
  });

  it("soft-record should skip a simple unchanged test", async function() {
    process.env.TEST_MODE = "soft-record";

    // Making sure the expected recording actually exists before running playback.
    const fs = require("fs");
    fs.writeFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_softrecord_should_skip_a_simple_unchanged_test.js",
      expectedRecording
    );

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    let skipped = false;
    const fakeThis: TestContextInterface = new TestContext(this.test! as TestContextTest, {
      ...this.currentTest,
      file: __filename,
      // The hash in our expected recording is made out of an empty function.
      // This function is empty, which means it remains the same.
      fn: emptyFunction
    });

    // We have to mock this.skip in order to confirm that the recorder has called it.
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

    // The file shouldn't have changed, but just in case.
    // The recorder takes some time to finish writing the output file.
    // It's not a second, but we're being pessimists.
    await delay(1000);
    const recording = fs.readFileSync(
      "./recordings/node/the_recorders_public_api_on_nodejs/recording_softrecord_should_skip_a_simple_unchanged_test.js",
      { encoding: "utf-8" }
    );

    // Nock does store the date of the request. Let's strip that from the response.
    const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");

    // We confirm that the file hasn't changed.
    expect(recordingWithoutDate).to.equal(expectedRecording);
  });
});
