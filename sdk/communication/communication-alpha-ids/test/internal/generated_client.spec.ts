// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  bearerTokenAuthenticationPolicyName,
} from "@azure/core-rest-pipeline";
import { AlphaIDsClient as AlphaIDsGeneratedClient } from "../../src/generated/src";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import { createMockToken } from "../public/utils/recordedClient";
import { isNodeLike } from "@azure/core-util";
import { parseClientArguments } from "@azure/communication-common";
import sinon from "sinon";
import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T,
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: request.headers,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
};

export const userAgentPolicy: (policyName: string, customHeader: string) => PipelinePolicy = (
  customHeader: string,
  policyName: string,
) => {
  return {
    name: policyName,
    sendRequest: async (req, next) => {
      const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
      req.headers.set(userAgentHeader, customHeader);
      return next(req);
    },
  };
};

export const mockBearerTokenPolicy: () => PipelinePolicy = () => {
  const credential: TokenCredential = createMockToken();
  return bearerTokenAuthenticationPolicy({
    credential,
    scopes: [],
  });
};

describe("AlphaIdsGeneratedClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("generated client throws error with invalid connection string", function () {
    const undefinedConnectionString: unknown = undefined;
    assert.throws(() => {
      new AlphaIDsGeneratedClient(undefinedConnectionString as string);
    });
    const client = new AlphaIDsGeneratedClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, AlphaIDsGeneratedClient);
  });

  it("generated client created successfully", function () {
    let client = new AlphaIDsGeneratedClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, AlphaIDsGeneratedClient);
    // send an empty pipeline and verify client is created successfully
    client = new AlphaIDsGeneratedClient(`endpoint=${endpoint};accesskey=${accessKey}`, {
      pipeline: createEmptyPipeline(),
    });
  });

  it("explicitly add bearer policy to pipeline", async function () {
    const connectionString = `endpoint=${endpoint};accesskey=${accessKey}`;
    const customHeaderPolicyName = "custom-header-policy";
    const customHeader = "alphaidsclient-headers-test-additional";
    const mockBearerPolicy = mockBearerTokenPolicy();
    const testPipeline = createEmptyPipeline();
    const mockHttpClient = createMockHttpClient();
    testPipeline.addPolicy(mockBearerPolicy);
    testPipeline.addPolicy(userAgentPolicy(customHeader, customHeaderPolicyName));

    const { url } = parseClientArguments(connectionString, {});
    const client = new AlphaIDsGeneratedClient(url, {
      pipeline: testPipeline,
      apiVersion: "customApiVersion",
      httpClient: mockHttpClient,
    });
    const policies = client.pipeline.getOrderedPolicies();
    assert.isDefined(policies, "default pipeline should contain policies");
    // verify bearer token policy exists, after explicitly adding it
    assert.isDefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline should have bearerTokenAuthenticationPolicyName",
    );
    assert.isDefined(
      policies.find((p) => p.name === customHeaderPolicyName),
      "pipeline should have customHeaderPolicyName",
    );
    assert.isDefined(
      policies.find((p) => p.name === "CustomApiVersionPolicy"),
      "pipeline should have CustomApiVersionPolicy",
    );

    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await client.alphaIds.upsertDynamicAlphaIdConfiguration(true);
    sinon.assert.calledOnce(spy);
  });
});
