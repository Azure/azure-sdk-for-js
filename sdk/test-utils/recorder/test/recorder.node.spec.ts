import { isBrowser, RecorderEnvironmentSetup, delay } from "../src/utils";
import chai from "chai";
import { record } from "../src";
const { expect } = chai;

const expectedHttpResponse = "Hello World!";
const expectedRecording = `let nock = require('nock');

module.exports.hash = "11e537d0ca3f2ede6f3847dcbce1df9c";

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

describe("recorder - NodeJS", () => {
  beforeEach(function() {
    if (isBrowser()) return this.skip();

    // These tests do make files in the recordings folder.
    // For that reason, we make sure these files are deleted before testing.
    const fs = require("fs");
    const path = require("path");
    const directory = path.resolve("./recordings/node/recorder__nodejs");
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
    (this as any).currentTest = {
      file: __filename,
      // For this test, we don't care what's the content of the recorded function.
      fn: () => {}
    };

    const recorder = record(this, recorderEnvSetup);

    const response = await helloWorldRequest();

    // This test's request reached the server and received the expected response.
    expect(response).to.equal(expectedHttpResponse);

    // Cleaning everything before we continue verifying the results.
    server.close();
    recorder.stop();

    // The recorder takes some time to finish writing the output file.
    // It's not a second, but we're being pessimists.
    await delay(1000);
    const fs = require("fs");
    const recording = fs.readFileSync(
      "./recordings/node/recorder__nodejs/recording_should_record_a_simple_test.js",
      { encoding: "utf-8" }
    );

    // Nock does store the date of the request. Let's strip that from the response.
    const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");
    expect(recordingWithoutDate).to.equal(expectedRecording);
  });

  it("should playback a simple test", async function() {
    if (isBrowser()) return this.skip();

    process.env.TEST_MODE = "playback";

    // Making sure the expected recording actually exists before running playback.
    const fs = require("fs");
    fs.writeFileSync(
      "./recordings/node/recorder__nodejs/recording_should_playback_a_simple_test.js",
      expectedRecording
    );

    // The recorder should start in the beforeEach call.
    // To emulate that behavior while keeping the test code as contained as possible,
    // we're compensating with this.
    (this as any).currentTest = {
      file: __filename,
      // For this test, we don't care what's the content of the recorded function.
      fn: () => {}
    };

    const recorder = record(this, recorderEnvSetup);
    const response = await helloWorldRequest();

    // The playback code served the appropriate response based on the recordings.
    expect(response).to.equal(expectedHttpResponse);

    recorder.stop();
  });
});
