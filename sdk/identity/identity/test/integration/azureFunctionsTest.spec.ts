// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import { Context } from "mocha";
import { isLiveMode } from "@azure-tools/test-recorder";


describe("AzureFunctions Integration test", function() {
    it("test the Azure Functions endpoint where the sync MI credential is used.", async function(this: Context) {
        if(!isLiveMode){
            this.skip();
        }
        const baseUri = baseUrl()
        const client = new ServiceClient({baseUri: baseUri})
        const pipelineRequest = createPipelineRequest({
            url: baseUri,
            method: "GET"

        })
        const response = await client.sendRequest(pipelineRequest);
        assert.equal(response.status,200,`Expected status 200. Received ${response.status}`);
    })
});

function baseUrl(): string{
    const functionName = process.env.IDENTITY_FUNCTION_NAME;
    if(!functionName){
       console.log("IDENTITY_FUNCTION_NAME is not set");
       throw new Error("IDENTITY_FUNCTION_NAME is not set");
    }
    return `https://${functionName}.azurewebsites.net/api/`
}
