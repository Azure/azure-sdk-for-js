import { env, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { CallingServerClient } from "../../src"

const replaceableVariables: { [k: string]: string } = {
    COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
  };

const environmentSetup: RecorderEnvironmentSetup = {
    replaceableVariables,
    customizationsOnRecordings: [],
    queryParametersToSkip: []
  };

describe ("Download Content", function() {
    let recorder: Recorder;

    beforeEach(async function() {
        recorder = record(this, environmentSetup);
        /*Place your code here*/
        });
    
    afterEach(async () => {
    /*Place your code here*/
    await recorder.stop();
    });

    it("download", async function() {
        const connectionString = "endpoint=https://recording-e2e-sample-xiaoxli.communication.azure.com/;accesskey=TyYsQlMbQ7+zgmepk1+XbNJt4k0wqSsxnhvAGin8+oMkK6XPWcVzz6NHZ2CggW+Sj2w52/51/z12PP8zDuZClw==";
        const uri = "https://us-storage.asm.skype.com/v1/objects/0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242/content/acsmetadata";
        let callingServerServiceClient = new CallingServerClient(connectionString);
        var something = await callingServerServiceClient.download(uri);
        something.readableStreamBody!.on('data', (chunk) => {
            assert.isTrue(chunk.includes("0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242"));
         });
    })

    it.only("unauthorized download", async function() {
        const uri = "https://us-storage.asm.skype.com/v1/objects/0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242/content/acsmetadata";
        let callingServerServiceClient = new CallingServerClient("endpoint=https://endpoint/;accesskey=banana");
        console.log("before failing?");
        var something = await callingServerServiceClient.download(uri);
        console.log("Status code: " + something._response.status);
    })
})