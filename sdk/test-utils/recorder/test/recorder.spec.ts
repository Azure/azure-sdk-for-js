import { isBrowser, RecorderEnvironmentSetup, delay } from "../src/utils";
import chai from "chai";
import { record } from "../src";
const { expect } = chai;

describe("recorder", () => {
  describe("NodeJS", () => {
    it("should record and playback a simple test", async function() {
      if (isBrowser()) return this.skip();

      process.env.TEST_MODE = "record";
      process.env.SERVER_ADDRESS = "http://localhost:8080";

      const recorderEnvSetup: RecorderEnvironmentSetup = {
        replaceableVariables: {
          SERVER_ADDRESS: "http://my_server.com"
        },
        customizationsOnRecordings: [],
        queryParametersToSkip: []
      };

      const expectedResponse = "Hello World!";

      const http = require("http");
      const server = http.createServer(function(_: any, res: any) {
        res.write(expectedResponse);
        res.end();
      });
      server.listen(8080);

      // The recorder should start in the beforeEach call.
      // We have to do this to emulate that.
      (this as any).currentTest = {
        file: __filename,
        // For this test, we don't care what's the content of the recorded function.
        fn: () => {}
      };

      const recorder = record(this, recorderEnvSetup);

      const helloWorldRequest = async function(): Promise<string> {
        return new Promise((resolve) => {
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
      };

      const response = await helloWorldRequest();
      expect(response).to.equal(expectedResponse);
      server.close();

      recorder.stop();

      await delay(1000);

      const fs = require("fs");
      const recording = fs.readFileSync(
        "./recordings/node/recorder_nodejs/recording_should_record_and_playback_a_simple_test.js",
        { encoding: "utf-8" }
      );
      const recordingWithoutDate = recording.replace(/Date',\n[^\n]*\n/, "Date',\n  'DATE',\n");

      expect(recordingWithoutDate).to.equal(
        `let nock = require('nock');

module.exports.hash = "11e537d0ca3f2ede6f3847dcbce1df9c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('http://my_server.com', {"encodedQueryParams":true})
  .get('/')
  .reply(200, "Hello World!", [
  'Date',
  'DATE',
  'Connection',
  'close',
  'Transfer-Encoding',
  'chunked'
]);
`
      );
    });
  });
});
