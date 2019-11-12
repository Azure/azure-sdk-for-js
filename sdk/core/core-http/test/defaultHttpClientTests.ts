// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, AssertionError } from "chai";
import { AbortController } from "@azure/abort-controller";
import "chai/register-should";
import { createReadStream } from "fs";
import * as http from "http";

import { DefaultHttpClient } from "../lib/defaultHttpClient";
import { RestError } from "../lib/restError";
import { isNode } from "../lib/util/utils";
import { WebResource, HttpRequestBody, TransferProgressEvent } from "../lib/webResource";
import { getHttpMock, HttpMockFacade } from "./mockHttp";
import { TestFunction } from "mocha";

const nodeIt = (isNode ? it : it.skip) as TestFunction;

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

  nodeIt("should not overwrite a user-provided cookie (nodejs only)", async function() {
    // Cookie is only allowed to be set by the browser based on an actual response Set-Cookie header
    httpMock.get("http://my.fake.domain/set-cookie", {
      status: 200,
      headers: {
        "Set-Cookie": "data=123456"
      }
    });

    httpMock.get("http://my.fake.domain/cookie", async (_url, _method, _body, headers) => {
      return {
        status: 200,
        headers: headers
      };
    });

    const client = new DefaultHttpClient();

    const request1 = new WebResource("http://my.fake.domain/set-cookie");
    const response1 = await client.sendRequest(request1);
    response1.headers.get("Set-Cookie")!.should.equal("data=123456");

    const request2 = new WebResource("http://my.fake.domain/cookie");
    const response2 = await client.sendRequest(request2);
    response2.headers.get("Cookie")!.should.equal("data=123456");

    const request3 = new WebResource("http://my.fake.domain/cookie", "GET", undefined, undefined, {
      Cookie: "data=abcdefg"
    });
    const response3 = await client.sendRequest(request3);
    response3.headers.get("Cookie")!.should.equal("data=abcdefg");
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
    const listener = (operationStatus: Notified, ev: TransferProgressEvent) => {
      operationStatus.notified = true;
      if (typeof ProgressEvent !== "undefined") {
        ev.should.not.be.instanceof(ProgressEvent);
      }
      ev.loadedBytes.should.be.a("Number");
    };

    it("for simple bodies", async function() {
      httpMock.post("/fileupload", async (_url, _method, _body) => {
        return {
          status: 251,
          body: body.repeat(9).substring(0, 200),
          headers: { "Content-Length": "200" }
        };
      });

      const upload: Notified = { notified: false };
      const download: Notified = { notified: false };

      const body = "Very large string to upload";
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

    it("for blob or stream bodies", async function() {
      let payload: HttpRequestBody;
      if (isNode) {
        payload = () => createReadStream(__filename);
      } else {
        payload = new Blob([new Uint8Array(1024 * 1024)]);
      }

      const size = isNode ? payload.toString().length : undefined;

      httpMock.post("/bigfileupload", async (_url, _method, _body) => {
        return {
          status: 250,
          body: payload,
          headers: { "Content-Type": "text/javascript", "Content-length": size }
        };
      });

      const upload: Notified = { notified: false };
      const download: Notified = { notified: false };

      const request = new WebResource(
        "/bigfileupload",
        "POST",
        payload,
        undefined,
        undefined,
        true,
        undefined,
        undefined,
        0,
        (ev) => listener(upload, ev),
        (ev) => listener(download, ev)
      );

      const client = new DefaultHttpClient();
      const response = await client.sendRequest(request);
      response.status.should.equal(250);
      if (response.blobBody) {
        await response.blobBody;
      } else if (typeof response.readableStreamBody === "function") {
        const streamBody = (response.readableStreamBody as Function)();
        streamBody.on("data", () => {});
        await new Promise((resolve, reject) => {
          streamBody.on("end", resolve);
          streamBody.on("error", reject);
        });
      }

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

  nodeIt("should send HTTP requests", async function() {
    const localPort = 32293;
    const responseContent = "<html><body><marquee>Under Construction</marquee></body></html>";
    const localServer = http
      .createServer(function(_req, res) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(responseContent);
        res.end();
      })
      .listen(localPort);

    httpMock.passThrough();
    const request = new WebResource(`http://127.0.0.1:${localPort}`, "GET");
    const httpClient = new DefaultHttpClient();

    const response = await httpClient.sendRequest(request);

    // Clean up the server before asserting
    localServer.close();

    assert.deepEqual(response.request, request);
    assert.strictEqual(response.status, 200);
    assert(response.headers);
    assert.strictEqual(response.headers.get("content-type")!.split(";")[0], "text/html");
    const responseBody: string | null | undefined = response.bodyAsText;
    assert.strictEqual(responseBody, responseContent);

    httpMock.teardown();
  });
});
