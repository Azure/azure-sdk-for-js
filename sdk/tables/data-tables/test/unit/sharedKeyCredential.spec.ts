// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  HttpOperationResponse,
  isNode,
  RequestPolicyOptions,
  WebResource
} from "@azure/core-http";
import { assert } from "chai";

import { TablesSharedKeyCredential } from "../../src/TablesSharedKeyCredential";
import { TablesSharedKeyCredentialPolicy } from "../../src/TablesSharedKeyCredentialPolicy";

describe("TablesSharedKeyCredential", () => {
  let originalToUTCString: () => string;
  beforeEach(() => {
    originalToUTCString = Date.prototype.toUTCString;
    Date.prototype.toUTCString = () => "Thu, 03 Sep 2020 18:50:45 GMT";
  });

  afterEach(() => {
    Date.prototype.toUTCString = originalToUTCString;
  });

  it("It should sign", async function() {
    if (!isNode) {
      // TablesSharedKeyCredential auth is not supported in Browser
      // eslint-disable-next-line no-invalid-this
      this.skip();
    }
    const defaultResponse = {
      status: 200,
      request: new WebResource(),
      headers: new HttpHeaders()
    };
    const request = new WebResource();
    request.url =
      "https://testaccount.table.core.windows.net/tablename(PartitionKey='p1',RowKey='r1')";
    const nextPolicy = {
      sendRequest: (requestToSend: WebResource): Promise<HttpOperationResponse> => {
        assert.deepEqual(
          requestToSend.headers.get("authorization"),
          "SharedKeyLite accountName:16/0SHs6v8s1QttELYnXerVacaJwSkejQsVh+coIzpo="
        );
        return Promise.resolve(defaultResponse);
      }
    };
    const cred = new TablesSharedKeyCredential("accountName", "accountKey");
    const policy = new TablesSharedKeyCredentialPolicy(
      nextPolicy,
      new RequestPolicyOptions(),
      cred
    );
    await policy.sendRequest(request);
  });
});
