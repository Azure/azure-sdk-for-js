// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CallingServerClient, ServerCall } from "../../src"

describe("ServerCall", function() {
    let callingServerClient: CallingServerClient;

    describe("Recording", function() {
        it("Start recording with relative url fails", function() {
            let server_call: ServerCall;

            const connectionString = "endpoint=https://REDACTED.communication.azure.com/;accesskey=eyJhbG==";
            const serverCallId = "aHR0cHM6Ly9jb252LXVzd2UtMDguY29udi5za3lwZS5jb20vY29udi8tby1FWjVpMHJrS3RFTDBNd0FST1J3P2k9ODgmZT02Mzc1Nzc0MTY4MDc4MjQyOTM";
            callingServerClient = new CallingServerClient(connectionString);
            server_call = callingServerClient.initializeServerCall(serverCallId);
            
            var execution = async function() {await server_call.startRecording("/not/absolute/uri"); }
            assert.rejects(execution, Error)
        })
    })
})