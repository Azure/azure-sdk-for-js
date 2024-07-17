import { PipelineResponse } from "@azure/core-rest-pipeline";
import { handleOidcResponse } from "../../../src/credentials/azurePipelinesCredential";

//TODO: complete this
describe("AzurePipelinesCredential (internal)", function () {
  it("throws expected error message with a service connection not found error", function () {
    const response: PipelineResponse = {
        request: {

    }
        status: 400
    };
    await handleOidcResponse(response);
  });
});
