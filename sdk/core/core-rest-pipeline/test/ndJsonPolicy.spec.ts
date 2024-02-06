// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  ndJsonPolicy,
} from "../src";

describe("NdJsonPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Formats arrays correctly", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    request.body = JSON.stringify([{ a: 1 }, { b: 2 }, { c: 3 }]);
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = ndJsonPolicy();

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.request.body, `{"a":1}\n{"b":2}\n{"c":3}\n`);
  });
});
