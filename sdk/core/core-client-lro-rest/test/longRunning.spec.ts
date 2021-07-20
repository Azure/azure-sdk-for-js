// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Client, getClient } from "@azure-rest/core-client";
import { getLongRunningPoller } from "../src/getLongRunningHelper";
import {
  PipelineResponse,
  createHttpHeaders,
  HttpHeaders,
  HttpMethods,
} from "@azure/core-rest-pipeline";
import { URL } from "./utils/url";

describe("LRO helper", () => {
  let client: Client;

  beforeEach(() => {
    client = getClient("http://localhost:3000", { allowInsecureConnection: true });
    client.pipeline.getOrderedPolicies().forEach(({ name }) => {
      client.pipeline.removePolicy({ name });
    });
  });

  it("LROs_put200Succeeded", async () => {
    // Long running put request, service returns a 200 to the initial request, with an entity that contains ProvisioningState=’Succeeded’.
    const expectedBody = { properties: { provisioningState: "Succeeded" }, id: "100", name: "foo" };
    mockResponse(client, [
      {
        path: "/lro/put/200/succeeded",
        method: "PUT",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/200/succeeded").put();
    const poller = getLongRunningPoller(client, initialResponse);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, expectedBody);
  });

  it("LROs_put201Succeeded", async () => {
    // Long running put request, service returns a 201 to the initial request, with an entity that contains ProvisioningState=’Succeeded’.
    const expectedBody = { properties: { provisioningState: "Succeeded" }, id: "100", name: "foo" };
    mockResponse(client, [
      {
        path: "/lro/put/201/succeeded",
        method: "PUT",
        response: { status: 201, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/201/succeeded").put();
    const poller = getLongRunningPoller(client, initialResponse);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "201");
    assert.deepEqual(result.body, expectedBody);
  });

  it("LROs_post202List", async () => {
    // Long running put request, service returns a 202 with empty body to first request, returns a 200 with body [{ 'id': '100', 'name': 'foo' }].
    const expectedBody = [{ id: "100", name: "foo" }];
    mockResponse(client, [
      {
        path: "/lro/list",
        method: "POST",
        response: {
          status: 202,
          headers: createHttpHeaders({
            // Set the location for polling
            "azure-asyncoperation": "http://localhost:3000/lro/list/pollingGet",
            // Set location for getting the result once polling finished
            location: "http://localhost:3000/lro/list/finalGet",
          }),
        },
      },
      {
        path: "/lro/list/pollingGet",
        method: "GET",
        response: { status: 200, body: { status: "Succeeded" } },
      },
      { path: "/lro/list/finalGet", method: "GET", response: { status: 200, body: expectedBody } },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/list").post();
    const poller = getLongRunningPoller(client, initialResponse, { intervalInMs: 1 });
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, expectedBody);
  });

  it("LROs_put200SucceededNoState", async () => {
    // Long running put request, service returns a 200 to the initial request, with an entity that does not contain ProvisioningState=’Succeeded’.
    const expectedBody = { id: "100", name: "foo" };
    mockResponse(client, [
      {
        path: "/lro/put/200/succeeded/nostate",
        method: "PUT",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/200/succeeded/nostate").put();
    const poller = getLongRunningPoller(client, initialResponse);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, expectedBody);
  });

  it("LROs_put200UpdatingSucceeded200", async () => {
    // Long running put request, service returns a 201 to the initial request, with an entity that contains ProvisioningState=’Updating’.  Polls return this value until the last poll returns a ‘200’ with ProvisioningState=’Succeeded’
    const expectedBody = { properties: { provisioningState: "Succeeded" }, id: "100", name: "foo" };
    mockResponse(client, [
      {
        path: "/lro/put/200/updating/succeeded/200",
        method: "PUT",
        response: {
          status: 200,
          body: { properties: { provisioningState: "Updating" }, id: "100", name: "foo" },
        },
      },
      {
        path: "/lro/put/200/updating/succeeded/200",
        method: "GET",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/200/updating/succeeded/200").put();
    const poller = getLongRunningPoller(client, initialResponse, { intervalInMs: 1 });
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, expectedBody);
  });

  it("LROs_put201CreatingFailed200", async () => {
    // Long running put request, service returns a 201 to the initial request, with an entity that contains ProvisioningState=’Created’.  Polls return this value until the last poll returns a ‘200’ with ProvisioningState=’Failed’    const expectedBody = { "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }
    const expectedBody = { properties: { provisioningState: "Failed" }, id: "100", name: "foo" };

    mockResponse(client, [
      {
        path: "/lro/put/201/created/failed/200",
        method: "PUT",
        response: {
          status: 201,
          body: { properties: { provisioningState: "Created" }, id: "100", name: "foo" },
        },
      },
      {
        path: "/lro/put/201/created/failed/200",
        method: "GET",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/201/created/failed/200").put();
    const poller = getLongRunningPoller(client, initialResponse, { intervalInMs: 1 });
    try {
      await poller.pollUntilDone();
      assert.fail("Expected exception");
    } catch (error) {
      assert.equal(
        error.message,
        "The long running operation has failed. The provisioning state: failed."
      );
    }
  });

  it("LROs_put200Acceptedcanceled200", async () => {
    // Long running put request, service returns a 201 to the initial request, with an entity that contains ProvisioningState=’Created’.  Polls return this value until the last poll returns a ‘200’ with ProvisioningState=’Failed’    const expectedBody = { "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }
    const expectedBody = { properties: { provisioningState: "canceled" }, id: "100", name: "foo" };

    mockResponse(client, [
      {
        path: "/lro/put/200/accepted/canceled/200",
        method: "PUT",
        response: {
          status: 200,
          body: { properties: { provisioningState: "Accepted" }, id: "100", name: "foo" },
        },
      },
      {
        path: "/lro/put/200/accepted/canceled/200",
        method: "GET",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/200/accepted/canceled/200").put();
    const poller = getLongRunningPoller(client, initialResponse, { intervalInMs: 1 });
    try {
      await poller.pollUntilDone();
      assert.fail("Expected exception");
    } catch (error) {
      assert.equal(
        error.message,
        "The long running operation has failed. The provisioning state: canceled."
      );
    }
  });

  it("LROPutNoHeaderInRetry", async () => {
    // Long running put request, service returns a 201 to the initial request, with an entity that contains ProvisioningState=’Created’.  Polls return this value until the last poll returns a ‘200’ with ProvisioningState=’Failed’    const expectedBody = { "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }
    const expectedBody = { properties: { provisioningState: "Succeeded" }, id: "100", name: "foo" };

    mockResponse(client, [
      {
        path: "/lro/put/noheader/202/200",
        method: "PUT",
        response: {
          status: 200,
          body: { properties: { provisioningState: "Accepted" }, id: "100", name: "foo" },
          headers: createHttpHeaders({
            location: "http://localhost:3000/lro/put/noheader/operationresults",
          }),
        },
      },
      { path: "/lro/put/noheader/operationresults", method: "GET", response: { status: 202 } },
      {
        path: "/lro/put/noheader/operationresults",
        method: "GET",
        response: { status: 200, body: expectedBody },
      },
    ]);
    const initialResponse = await client.pathUnchecked("/lro/put/noheader/202/200").put();
    const poller = getLongRunningPoller(client, initialResponse, { intervalInMs: 1 });
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, expectedBody);
  });
});

interface MockResponse {
  path: string;
  method: HttpMethods;
  response: {
    status: number;
    body?: any;
    headers?: HttpHeaders;
  };
}

/**
 * Creates a pipeline with a mocked service call
 * @param client - client to mock requests for
 * @param response - Responses to return, the actual request url is matched to one of the paths in the responses and the defined object is returned.
 * if no path matches a 404 error is returned
 */
function mockResponse(client: Client, responses: MockResponse[]) {
  let count = 0;

  client.pipeline.addPolicy({
    name: "mockClient",
    sendRequest: async (request, _next): Promise<PipelineResponse> => {
      if (count < responses.length) {
        count++;
      }

      const path = new URL(request.url).pathname;
      let responseIndex = -1;

      const response = responses.find((r, index) => {
        const match =
          r.path === path && r.method.toLocaleLowerCase() === request.method.toLocaleLowerCase();

        if (match) {
          responseIndex = index;
        }

        return match;
      });

      if (!response) {
        console.warn(`Didn't find a match for path ${path} and method: ${request.method}`);
        return {
          headers: createHttpHeaders(),
          request,
          status: 404,
        };
      }

      const { body, status } = response.response;
      const bodyAsText = JSON.stringify(body);
      // remove the matched response from the list to avoid matching it again
      responses.splice(responseIndex, 1);
      return {
        headers: response.response.headers ?? createHttpHeaders(),
        request,
        status,
        bodyAsText,
      };
    },
  });
}
