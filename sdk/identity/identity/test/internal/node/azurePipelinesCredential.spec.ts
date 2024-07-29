// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { handleOidcResponse } from "../../../src/credentials/azurePipelinesCredential";
import { assert } from "@azure-tools/test-utils";

describe("AzurePipelinesCredential (internal)", function () {
  let response: PipelineResponse;
  beforeEach(function () {
    response = {
      request: createPipelineRequest({
        url: "https://domoreexp.visualstudio.com/11ac29bc-5a99-400b-b225-01839ab0c9df/_apis/distributedtask/hubs/build/plans/f8b9f114-0f05-49aa-bd84-d1f0197f47a1/jobs/30ea8d6c-7fd8-521d-25e4-72f1dd901d33/oidctoken?api-version=7.1&serviceConnectionId=REDACTED",
        headers: createHttpHeaders({
          "content-type": "application/json",
          authorization: "REDACTED",
          "accept-encoding": "gzip,deflate",
          "user-agent":
            "azsdk-js-identity/4.3.0-beta.3 core-rest-pipeline/1.12.0 Node/v20.11.0 OS/(x64-Linux-5.15.0-1067-azure)",
          "x-ms-client-request-id": "54730b40-5c44-48db-ad98-666c8dabb48d",
        }),
        method: "POST",
      }),
      status: 400,
      headers: createHttpHeaders(),
    };
  });

  it("throws expected Authentication Error", function () {
    assert.throws(
      () => handleOidcResponse(response),
      /AzurePipelinesCredential: Authentication Failed. Received null token from OIDC request. Status code: 400/,
    );
  });
  it("throws expected error message with a service connection not found error", function () {
    response.bodyAsText = "No service connection found with identifier frwerhq-241242-vsdkf-jw";
    assert.throws(
      () => handleOidcResponse(response),
      /AzurePipelinesCredential: Authentication Failed. oidcToken field not detected in the response. Status code: 400[\s\S]*No service connection found with identifier/,
    );
  });
});
