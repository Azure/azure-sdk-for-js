import { assert } from "chai";
import { CallingServerClient } from "../../src"

describe ("Download Content", function() {
    it.only("download", async function() {
        const connectionString = "endpoint=https://recording-e2e-sample-xiaoxli.communication.azure.com/;accesskey=TyYsQlMbQ7+zgmepk1+XbNJt4k0wqSsxnhvAGin8+oMkK6XPWcVzz6NHZ2CggW+Sj2w52/51/z12PP8zDuZClw==";
        const uri = "https://us-storage.asm.skype.com/v1/objects/0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242/content/acsmetadata";
        let callingServerServiceClient = new CallingServerClient(connectionString);
        var something = await callingServerServiceClient.download(uri);
        assert.isTrue(something._response.bodyAsText!.includes("0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242"));
    })
})