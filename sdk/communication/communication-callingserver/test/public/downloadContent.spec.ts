import { isPlaybackMode, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import assert from "assert";
import { CallingServerClient } from "../../src"
import { Context } from "mocha"
import { RestError } from "@azure/core-http";

const replaceableVariables: { [k: string]: string } = {
    COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
  };

const environmentSetup: RecorderEnvironmentSetup = {
    replaceableVariables,
    customizationsOnRecordings: [
        (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
        (recording: string): string => recording.replace("endpoint:443", "endpoint")
    ],
    queryParametersToSkip: []
  };

describe ("Download Content", function() {
    let recorder: Recorder;
    let uri = "https://endpoint/v1/objects/0-eus-d15-af5689148b0afa252a57a0121b744dcd/content/acsmetadata";
    let callingServerServiceClient = new CallingServerClient("endpoint=https://endpoint/;accesskey=banana");

    beforeEach(async function(this: Context) {
        recorder = record(this, environmentSetup);
        /*Place your code here*/
      });
    
    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    function bodyToString(stream: NodeJS.ReadableStream, length: number) : Promise<String> {
      return new Promise<string>((resolve, reject) => {
        stream.on("readable", () => {
          const chunk = stream.read(length);
          if (chunk) {
            resolve(chunk.toString());
          }
        });
    
        stream.on("error", reject);
        stream.on("end", () => {
          resolve("");
        });
      });
    }

    it("download", async function() {
      if (!isPlaybackMode()) {
          this.skip();
      }

      var downloadResponse = await callingServerServiceClient.download(uri);
      var metadataStream = downloadResponse.readableStreamBody;
      assert.notStrictEqual(metadataStream, null);
      var metadata = await bodyToString(metadataStream!, downloadResponse.contentLength!);
      assert.strictEqual(metadata.includes("0-eus-d15-af5689148b0afa252a57a0121b744dcd"), true);
    })

    it("unauthorized download", async function() {
      if (!isPlaybackMode()) {
          this.skip();
      }

      var execution = async function() {
        await callingServerServiceClient.download(uri);
      }
      assert.rejects(execution, RestError);
    })
})