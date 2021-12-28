// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { assert } from "chai";
import { expectedSharedKeyLiteHeader } from "./fakeTestSecrets";
import { isNode } from "@azure/test-utils";
import { tablesNamedKeyCredentialPolicy } from "../../src/tablesNamedCredentialPolicy";

describe("TablesSharedKeyCredential", () => {
  let originalToUTCString: () => string;
  beforeEach(() => {
    originalToUTCString = Date.prototype.toUTCString;
    Date.prototype.toUTCString = () => "Thu, 03 Sep 2020 18:50:45 GMT";
  });

  afterEach(() => {
    Date.prototype.toUTCString = originalToUTCString;
  });

  it("It should sign", async function (this: Context) {
    if (!isNode) {
      // AzureNamedKeyCredential auth is not supported in Browser
      this.skip();
    }
    const url =
      "https://testaccount.table.core.windows.net/tablename(PartitionKey='p1',RowKey='r1')";
    const requestToSign = createPipelineRequest({ url });
    const next: SendRequest = function (request: PipelineRequest): Promise<PipelineResponse> {
      return Promise.resolve({
        status: 200,
        request,
        headers: createHttpHeaders(),
      });
    };
    const cred = new AzureNamedKeyCredential("accountName", "accountKey");
    const policy = tablesNamedKeyCredentialPolicy(cred);
    const response = await policy.sendRequest(requestToSign, next);
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.request.headers.get("authorization"), expectedSharedKeyLiteHeader);
  });
});
