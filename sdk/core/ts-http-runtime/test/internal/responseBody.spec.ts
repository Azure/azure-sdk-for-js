// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { disposeResponseBody } from "../../src/util/responseBody.js";

describe("disposeResponseBody", () => {
  it("ignores cancellation failure from an errored browser stream", async () => {
    const cancel = vi.fn().mockRejectedValue(new Error("response failed"));

    await expect(disposeResponseBody({ browserStreamBody: { cancel } })).resolves.toBeUndefined();
    expect(cancel).toHaveBeenCalledOnce();
  });
});
