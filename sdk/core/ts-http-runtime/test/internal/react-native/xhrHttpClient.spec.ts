// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "../../../src/index.js";
import { createXhrHttpClient } from "../../../src/xhrHttpClient.js";

describe("XhrHttpClient", () => {
  it("rejects the Expect header", async () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "100-continue" }),
    });

    await expect(createXhrHttpClient().sendRequest(request)).rejects.toThrow(
      "The Expect header is only supported by the Node.js HTTP/1 transport.",
    );
  });
});
