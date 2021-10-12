// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CallingServerClient, ServerCallLocator } from "../../src"

describe("ServerCall", function() {
    describe("Recording", function() {
        it("Start recording with relative url fails", function() {
            const connectionString = "endpoint=https://REDACTED.communication.azure.com/;accesskey=eyJhbG==";
            const serverCallId = "aHR0cHM6Ly9jb252LXVzd2UtMDguY29udi5za3lwZS5jb20vY29udi8tby1FWjVpMHJrS3RFTDBNd0FST1J3P2k9ODgmZT02Mzc1Nzc0MTY4MDc4MjQyOTM";
            const callingServerClient = new CallingServerClient(connectionString);
            const callLocator : ServerCallLocator = { serverCallId: serverCallId};

            
            const execution = async function() {
                await callingServerClient.startRecording(callLocator, "/not/absolute/uri");
            }
            assert.rejects(execution, Error)
        })
    })
})
