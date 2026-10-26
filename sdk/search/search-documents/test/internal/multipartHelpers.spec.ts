// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { createFilePartDescriptor } from "../../src/static-helpers/multipartHelpers.js";

describe("multipart helpers", () => {
  it("preserves metadata for wrapped empty string contents", () => {
    assert.deepEqual(
      createFilePartDescriptor(
        "content",
        {
          contents: "",
          contentType: "text/plain",
          filename: "empty.txt",
        },
        "application/octet-stream",
      ),
      {
        name: "content",
        body: "",
        contentType: "text/plain",
        filename: "empty.txt",
      },
    );
  });
});
