// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SendRequest,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest
} from "@azure/core-https";
import { isNode } from "../testUtils";
import { assert } from "chai";

import { TablesSharedKeyCredential } from "../../src/TablesSharedKeyCredential";
import { tablesSharedKeyCredentialPolicy } from "../../src/TablesSharedKeyCredentialPolicy";

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
    const url =
      "https://testaccount.table.core.windows.net/tablename(PartitionKey='p1',RowKey='r1')";
    const requestToSign = createPipelineRequest({ url });
    const next: SendRequest = function(request: PipelineRequest): Promise<PipelineResponse> {
      return Promise.resolve({
        status: 200,
        request,
        headers: createHttpHeaders()
      });
    };
    const cred = new TablesSharedKeyCredential("accountName", "accountKey");
    const policy = tablesSharedKeyCredentialPolicy(cred);
    const response = await policy.sendRequest(requestToSign, next);
    assert.strictEqual(response.status, 200);
    assert.deepEqual(
      response.request.headers.get("authorization"),
      "SharedKeyLite accountName:mzKy4ZjXbTEueNQp2cxou+kKrfCnWpdau5I6kJIO58g="
    );
  });
});
