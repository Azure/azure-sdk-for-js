// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import { assert, AssertionError } from "chai";
import { AbortController } from "@azure/abort-controller";
import "chai/register-should";

import { DefaultHttpClient } from "../src/defaultHttpClient";
import { RestError } from "../src/restError";
import { WebResource, TransferProgressEvent } from "../src/webResource";
import { getHttpMock, HttpMockFacade } from "./mockHttp";

describe("defaultHttpClient", function() {
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let httpMock: HttpMockFacade;
  beforeEach(() => {
    httpMock = getHttpMock();
    httpMock.setup();
  });
  afterEach(() => httpMock.teardown());
  after(() => httpMock.teardown());

  it("should return a response instead of throwing for awaited 404", async function() {
    const resourceUrl = "/nonexistent";

    httpMock.get(resourceUrl, async () => {
      return { status: 404 };
    });

    const request = new WebResource(resourceUrl, "GET");
    const httpClient = new DefaultHttpClient();

    const response = await httpClient.sendRequest(request);
    response.status.should.equal(404);
  });

  it("should allow canceling requests", async function() {
    const resourceUrl = `/fileupload`;
    httpMock.post(resourceUrl, async () => {
      await sleep(10000);
      assert.fail();
      return { status: 201 };
    });
    const controller = new AbortController();
    const veryBigPayload = "very long string";
    const request = new WebResource(
      resourceUrl,
      "POST",
      veryBigPayload,
      undefined,
      undefined,
      true,
      undefined,
      controller.signal
    );
    const client = new DefaultHttpClient();
    const promise = client.sendRequest(request);
    controller.abort();
    try {
      await promise;
      assert.fail("");
    } catch (err) {
      err.name.should.be.equal("AbortError");
      err.should.not.be.instanceof(AssertionError);
    }
  });

  it("should allow canceling requests before request is made", async function() {
    const resourceUrl = `/fileupload`;
    httpMock.post(resourceUrl, async () => {
      await sleep(10000);
      assert.fail();
      return { status: 201 };
    });
    const controller = new AbortController();
    const veryBigPayload = "very long string";
    const request = new WebResource(
      resourceUrl,
      "POST",
      veryBigPayload,
      undefined,
      undefined,
      true,
      undefined,
      controller.signal
    );
    controller.abort();
    const client = new DefaultHttpClient();
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("");
    } catch (err) {
      err.name.should.be.equal("AbortError");
      err.should.not.be.instanceof(AssertionError);
    }
  });

  it("should allow canceling multiple requests with one token", async function() {
    httpMock.post("/fileupload", async () => {
      await sleep(1000);
      assert.fail();
      return { status: 201 };
    });

    const controller = new AbortController();
    const buf = "Very large string";
    const requests = [
      new WebResource(
        "/fileupload",
        "POST",
        buf,
        undefined,
        undefined,
        true,
        undefined,
        controller.signal
      ),
      new WebResource(
        "/fileupload",
        "POST",
        buf,
        undefined,
        undefined,
        true,
        undefined,
        controller.signal
      )
    ];
    const client = new DefaultHttpClient();
    const promises = requests.map((r) => client.sendRequest(r));
    controller.abort();
    // Ensure each promise is individually rejected
    for (const promise of promises) {
      try {
        await promise;
        assert.fail();
      } catch (err) {
        err.should.not.be.instanceof(AssertionError);
      }
    }
  });

  describe("should report upload and download progress", () => {
    type Notified = { notified: boolean };
    const listener = (operationStatus: Notified, ev: TransferProgressEvent): void => {
      operationStatus.notified = true;
      if (typeof ProgressEvent !== "undefined") {
        ev.should.not.be.instanceof(ProgressEvent);
      }
      ev.loadedBytes.should.be.a("Number");
    };

    it("for simple bodies", async function() {
      const body = "Very large string to upload";

      httpMock.post("/fileupload", async (_url, _method, _body) => {
        return {
          status: 251,
          body: body.repeat(9).substring(0, 200),
          headers: { "Content-Length": "200" }
        };
      });

      const upload: Notified = { notified: false };
      const download: Notified = { notified: false };

      const request = new WebResource(
        "/fileupload",
        "POST",
        body,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        0,
        (ev) => listener(upload, ev),
        (ev) => listener(download, ev)
      );

      const client = new DefaultHttpClient();
      const response = await client.sendRequest(request);
      response.should.exist;
      response.status.should.equal(251);
      upload.notified.should.be.true;
      download.notified.should.be.true;
    });
  });

  it("should honor request timeouts", async function() {
    httpMock.timeout("GET", "/slow");

    const request = new WebResource(
      "/slow",
      "GET",
      undefined,
      undefined,
      undefined,
      false,
      false,
      undefined,
      100
    );
    const client = new DefaultHttpClient();
    try {
      await client.sendRequest(request);
      throw new Error("request did not fail as expected");
    } catch (err) {
      err.message.should.not.match(/request did not fail as expected/);
    }
  });

  it("should give a graceful error for nonexistent hosts", async function() {
    // Increase timeout to give the request time to fail
    // eslint-disable-next-line no-invalid-this
    this.timeout(10000);
    const requestUrl = "http://fake.domain";
    httpMock.passThrough();
    const request = new WebResource(requestUrl, "GET");
    const client = new DefaultHttpClient();
    try {
      await client.sendRequest(request);
      throw new Error("request did not fail as expected");
    } catch (err) {
      err.should.be.instanceof(RestError);
      err.code.should.equal("REQUEST_SEND_ERROR");
    }
  });

  it("should interpret undefined as an empty body", async function() {
    const requestUrl = "/expect-empty";
    httpMock.put(requestUrl, async (_url, _method, body, _headers) => {
      if (!body) {
        return {
          status: 200
        };
      } else {
        return {
          status: 400,
          body: `Expected empty body but got "${JSON.stringify(body)}"`
        };
      }
    });

    const request = new WebResource(requestUrl, "PUT");
    const client = new DefaultHttpClient();
    const response = await client.sendRequest(request);
    response.status.should.equal(200, response.bodyAsText!);
  });
});
