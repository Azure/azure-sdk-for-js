// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import {
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { assert } from "chai";
import {
  createPhoneNumbersPagingPolicy,
  phoneNumbersLroPolicy,
} from "../../src/utils/customPipelinePolicies";

describe("phoneNumbersPagingPolicy", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const request: PipelineRequest = {
    url: endpoint,
    method: "GET",
    headers: createHttpHeaders(),
    timeout: 0,
    withCredentials: false,
    requestId: "any-id",
  };

  async function createMockResponse(parsedBody: any) {
    return Promise.resolve({ parsedBody }) as unknown as PipelineResponse;
  }

  it("changes relative nextLink URL to absolute", async function () {
    const policy = createPhoneNumbersPagingPolicy(endpoint);
    const response: FullOperationResponse = await policy.sendRequest(request, (_request) =>
      createMockResponse({
        phoneNumbers: [],
        nextLink: "/phoneNumbers?top=100&skip=100",
      })
    );
    assert.equal(
      response.parsedBody.nextLink,
      "https://contoso.spool.azure.local/phoneNumbers?top=100&skip=100"
    );
  });

  it("does not change absolute nextLink URL", async function () {
    const policy = createPhoneNumbersPagingPolicy(endpoint);
    const response: FullOperationResponse = await policy.sendRequest(request, (_request) =>
      createMockResponse({
        phoneNumbers: [],
        nextLink: "https://contoso.spool.azure.local/phoneNumbers?top=100&skip=100",
      })
    );
    assert.equal(
      response.parsedBody.nextLink,
      "https://contoso.spool.azure.local/phoneNumbers?top=100&skip=100"
    );
  });

  it("does not change responses without nextLink", async function () {
    const policy = createPhoneNumbersPagingPolicy(endpoint);
    const response: FullOperationResponse = await policy.sendRequest(request, (_request) =>
      createMockResponse({ phoneNumbers: [] })
    );
    assert.isUndefined(response.parsedBody.nextLink);
  });

  it("does not duplicate slashes in the URL", async function () {
    const policy = createPhoneNumbersPagingPolicy("https://contoso.spool.azure.local/");
    const response: FullOperationResponse = await policy.sendRequest(request, (_request) =>
      createMockResponse({
        phoneNumbers: [],
        nextLink: "/phoneNumbers?top=100&skip=100",
      })
    );
    assert.equal(
      response.parsedBody.nextLink,
      "https://contoso.spool.azure.local/phoneNumbers?top=100&skip=100"
    );
  });
});

describe("phoneNumbersLroPolicy", function () {
  const request: PipelineRequest = {
    url: "https://contoso.spool.azure.local/availablePhoneNumbers/countries/{countryCode}/:search",
    method: "POST",
    headers: createHttpHeaders(),
    timeout: 0,
    withCredentials: false,
    requestId: "any-id",
  };

  async function createMockResponse(headers: HttpHeaders) {
    return Promise.resolve({ headers }) as unknown as PipelineResponse;
  }

  it("sets azure-asyncoperation header", async function () {
    const headers = createHttpHeaders();
    headers.set("operation-location", "/phoneNumbers/operations/search_12345");
    const response = await phoneNumbersLroPolicy.sendRequest(request, (_request) =>
      createMockResponse(headers)
    );
    assert.exists(response.headers.get("azure-asyncoperation"));
    assert.equal(
      response.headers.get("azure-asyncoperation"),
      "/phoneNumbers/operations/search_12345"
    );
  });

  it("does not mutate headers without operation-location", async function () {
    const response = await phoneNumbersLroPolicy.sendRequest(request, (_request) =>
      createMockResponse(createHttpHeaders())
    );
    assert.isUndefined(response.headers.get("azure-asyncoperation"));
    assert.deepEqual(response.headers, createHttpHeaders());
  });
});
