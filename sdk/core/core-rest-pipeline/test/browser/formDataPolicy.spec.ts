// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { createHttpHeaders } from "../../src/httpHeaders";
import { PipelineResponse, SendRequest } from "../../src/interfaces";
import { createPipelineRequest } from "../../src/pipelineRequest";
import { formDataPolicy } from "../../src/policies/formDataPolicy";
import { assert } from "chai";

describe("formDataPolicy (browser-only)", function () {
  it("prepares multipart/form-data form data correctly", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({
        "Content-Type": "multipart/form-data",
      }),
    });

    const file = new File([new Uint8Array([1, 2, 3])], "test.txt", { type: "text/plain" });
    request.formData = { a: "va", b: "v:b", c: file };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    const body = result.request.body as any;
    assert.ok(body, "expecting valid body");
    let length = 0;
    for (const [fieldName, value] of body.entries()) {
      length++;
      if (fieldName === "a") {
        assert.strictEqual(value, "va");
      } else if (fieldName === "b") {
        assert.strictEqual(value, "v:b");
      } else if (fieldName === "c") {
        assert.strictEqual(value, file);
      } else {
        assert.fail(`unexpected form data key ${fieldName}`);
      }
    }
    assert.strictEqual(length, 3, "expecting three entries in form data");
  });
});
