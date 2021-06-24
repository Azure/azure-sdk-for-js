// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getHttpMock, HttpMockFacade } from "../mockHttp";
import * as sinon from "sinon";
import { DefaultHttpClient } from "../../src/defaultHttpClient";
import { CommonResponse } from "../../src/fetchHttpClient";
import { Constants, ServiceClient, WebResource } from "../../src/coreHttp";
import { AbortController } from "@azure/abort-controller";
import { assert } from "chai";

describe("Throttling retry policy", () => {
  let httpMock: HttpMockFacade;
  beforeEach(() => {
    httpMock = getHttpMock();
    httpMock.setup();
  });
  afterEach(() => httpMock.teardown());
  after(() => httpMock.teardown());

  function getMockedHttpClient(): DefaultHttpClient {
    const httpClient = new DefaultHttpClient();
    sinon.stub(httpClient, "fetch").callsFake(async (input, init) => {
      const response = await httpMock.getFetch()!(input, init);
      return (response as unknown) as CommonResponse;
    });

    return httpClient;
  }
  it("Should not retry forever (honors the abort signal passed)", async () => {
    httpMock.get("https://fakeservice.io/", {
      status: Constants.HttpConstants.StatusCodes.TooManyRequests,
      body: {
        type: "https://fakeservice.io/errors/too-many-requests",
        title: "Resource utilization has surpassed the assigned quota",
        policy: "Total Requests",
        status: Constants.HttpConstants.StatusCodes.TooManyRequests
      },
      headers: {
        "Retry-After": "10000"
      }
    });

    let errorWasThrown = false;
    try {
      const client = new ServiceClient(undefined, { httpClient: getMockedHttpClient() });
      const webResource = new WebResource(
        "https://fakeservice.io",
        "GET",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        AbortController.timeout(100)
      );
      await client.sendRequest(webResource);
    } catch (error) {
      errorWasThrown = true;
      assert.equal((error as any).name, "AbortError", "Unexpected error thrown");
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });
});
