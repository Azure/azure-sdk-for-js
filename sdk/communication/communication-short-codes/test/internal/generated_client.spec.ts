// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  bearerTokenAuthenticationPolicyName,
} from "@azure/core-rest-pipeline";
import { ShortCodesClient as ShortCodesGeneratedClient } from "../../src/generated/src";
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

describe("ShortCodesGeneratedClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("generated client throws error with invalid connection string", function () {
    const undefinedConnectionString: unknown = undefined;
    assert.throws(() => {
      new ShortCodesGeneratedClient(undefinedConnectionString as string);
    });
  });

  it("generated client created successfully, no additional options", function () {
    // make sure client is created successfully with no additional options
    const client = new ShortCodesGeneratedClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, ShortCodesGeneratedClient);
  });

  it("generated client created successfully with empty pipeline", function () {
    // send an empty pipeline and verify client is created successfully
    const client = new ShortCodesGeneratedClient(`endpoint=${endpoint};accesskey=${accessKey}`, {
      pipeline: createEmptyPipeline(),
    });
    assert.instanceOf(client, ShortCodesGeneratedClient);
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
    const client = new ShortCodesGeneratedClient(url, {
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
    await client.shortCodes.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);
  });

  it("verify bearer policy exists without explicitly adding it", async function () {
    const connectionString = `endpoint=${endpoint};accesskey=${accessKey}`;
    const mockHttpClient = createMockHttpClient();
    const customHeaderPolicyName = "custom-header-policy";
    const customHeader = "alphaidsclient-headers-test-additional";
    const testPipeline = createEmptyPipeline();
    testPipeline.addPolicy(userAgentPolicy(customHeader, customHeaderPolicyName));
    const { url } = parseClientArguments(connectionString, {});

    const client = new ShortCodesGeneratedClient(url, {
      apiVersion: "customApiVersion",
      httpClient: mockHttpClient,
      pipeline: testPipeline,
      endpoint: "https://contoso.spool.azure.local?param1=param1",
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
    await client.shortCodes.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);
  });
});
