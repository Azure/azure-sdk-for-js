// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as assert from "assert";
import * as should from "should";
import { AxiosHttpClient } from "../../lib/axiosHttpClient";
import { baseURL } from "../testUtils";
import { WebResource } from "../../lib/webResource";
import { isNode } from "../../lib/msRest";

function getAbortController(): AbortController {
  let controller: AbortController;
  if (typeof AbortController === "function") {
    controller = new AbortController();
  } else {
    const AbortControllerPonyfill = require("abortcontroller-polyfill/dist/cjs-ponyfill").AbortController;
    controller = new AbortControllerPonyfill();
  }
  return controller;
}

describe("axiosHttpClient", () => {
  it("should send HTTP requests", async () => {
    const request = new WebResource(`${baseURL}/example-index.html`, "GET");
    const httpClient = new AxiosHttpClient();

    const response = await httpClient.sendRequest(request);
    assert.deepStrictEqual(response.request, request);
    assert.strictEqual(response.status, 200);
    assert(response.headers);
    // content-length varies based on OS line endings
    assert.strictEqual(response.headers.get("content-length"), response.bodyAsText!.length.toString());
    assert.strictEqual(response.headers.get("content-type")!.split(";")[0], "text/html");
    const responseBody: string | null | undefined = response.bodyAsText;
    const expectedResponseBody =
    `<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 50px;
        background-color: #fff;
        border-radius: 1em;
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        body {
            background-color: #fff;
        }
        div {
            width: auto;
            margin: 0 auto;
            border-radius: 0;
            padding: 1em;
        }
    }
    </style>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is established to be used for illustrative examples in documents. You may use this
    domain in examples without prior coordination or asking for permission.</p>
    <p><a href="http://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
`;
    assert.strictEqual(
      responseBody && responseBody.replace(/\r\n/g, "\n"),
      expectedResponseBody.replace(/\r\n/g, "\n"));
  });

  it("should return a response instead of throwing for awaited 404", async () => {
    const request = new WebResource(`${baseURL}/nonexistent`, "GET");
    const httpClient = new AxiosHttpClient();

    const response = await httpClient.sendRequest(request);
    assert(response);
  });

  it("should allow canceling requests", async function() {
    // ensure that a large upload is actually cancelled
    this.timeout(2000);

    const controller = getAbortController();
    const request = new WebResource(`${baseURL}/fileupload`, "POST", new Uint8Array(1024*1024*100), undefined, undefined, true, controller.signal);
    const client = new AxiosHttpClient();
    const promise = client.sendRequest(request);
    await new Promise((resolve) => {
      setTimeout(() => {
        controller.abort();
        resolve();
      });
    });
    try {
      await promise;
      assert.fail('');
    } catch (err) {
      should(err).not.be.instanceof(assert.AssertionError);
    }
  });

  it("should not overwrite a user-provided cookie (nodejs only)", async function() {
    // Cookie is only allowed to be set by the browser based on an actual response Set-Cookie header
    if (!isNode) {
      this.skip();
    }

    const client = new AxiosHttpClient();

    const request1 = new WebResource(`${baseURL}/set-cookie`);
    await client.sendRequest(request1);

    const request2 = new WebResource(`${baseURL}/cookie`);
    const response2 = await client.sendRequest(request2);
    should(response2.headers.get("Cookie")).equal("data=123456");

    const request3 = new WebResource(`${baseURL}/cookie`, "GET", undefined, undefined, { Cookie: "data=abcdefg" });
    const response3 = await client.sendRequest(request3);
    should(response3.headers.get("Cookie")).equal("data=abcdefg");
  });

  it("should allow canceling multiple requests with one token", async function () {
    // ensure that a large upload is actually cancelled
    this.timeout(4000);

    const controller = getAbortController();
    const buf = new Uint8Array(1024*1024*100);
    const requests = [
      new WebResource(`${baseURL}/fileupload`, "POST", buf, undefined, undefined, true, controller.signal),
      new WebResource(`${baseURL}/fileupload`, "POST", buf, undefined, undefined, true, controller.signal)
    ];
    const client = new AxiosHttpClient();
    const promises = requests.map(r => client.sendRequest(r));
    await new Promise((resolve) => {
      setTimeout(() => {
        controller.abort();
        resolve();
      });
    });
    // Ensure each promise is individually rejected
    for (const promise of promises) {
      try {
        await promise;
        assert.fail('');
      } catch (err) {
        should(err).not.be.instanceof(assert.AssertionError);
      }
    }
  });
});
