// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as assert from "assert";
import * as should from "should";
import { AxiosHttpClient } from "../../lib/axiosHttpClient";
import { baseURL } from "../testUtils";
import { WebResource, CancellationTokenLike } from "../../lib/webResource";

describe("axiosHttpClient", () => {
  it("should send HTTP requests", async () => {
    const request = new WebResource(`${baseURL}/example-index.html`, "GET");
    const httpClient = new AxiosHttpClient();

    const response = await httpClient.sendRequest(request);
    assert.deepStrictEqual(response.request, request);
    assert.strictEqual(response.status, 200);
    assert(response.headers);
    assert.strictEqual(response.headers.get("content-length"), "1258");
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
`.replace("\r\n", "\n");
    assert.strictEqual(responseBody, expectedResponseBody);
  });

  it("should throw for awaited 404", async () => {
    const request = new WebResource(`${baseURL}/nonexistent`, "GET");
    const httpClient = new AxiosHttpClient();

    try {
      await httpClient.sendRequest(request);
      assert.fail("Expected error to be thrown.");
    } catch (error) {
      should(error).be.instanceof(Error);
    }
  });

  it("should reject for promised 404", async () => {
    const request = new WebResource(`${baseURL}/nonexistent`, "GET");
    const httpClient = new AxiosHttpClient();

    return httpClient.sendRequest(request)
    .then(() => {
      assert.fail("Expected error to be thrown.");
    })
    .catch((error: any) => {
      should(error).be.instanceof(Error);
    });
  });

  it("should allow canceling requests", async function() {
    // ensure that a large upload is actually cancelled
    this.timeout(200);

    const cancellationToken: CancellationTokenLike = {
      setCancellationListener: (listener) => { cancellationToken.cancel = listener },
      cancel: () => {}
    };

    const request = new WebResource(`${baseURL}/fileupload`, "POST", new Uint8Array(1024*1024*100), undefined, undefined, true, cancellationToken);
    const client = new AxiosHttpClient();
    const promise = client.sendRequest(request);
    cancellationToken.cancel();
    try {
      await promise;
      assert.fail('');
    } catch (err) {
      should(err).not.be.instanceof(assert.AssertionError);
    }
  });
});
