// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { stripImportPrefix } from "../formatter.js";

describe("stripImportPrefix", () => {
  it("strips namespace aliases from qualified names", () => {
    const result = stripImportPrefix(
      "coreClient.OperationOptions",
      false,
      new Set(["coreClient"]),
    );
    expect(result).toBe("OperationOptions");
  });

  it("preserves non-aliased qualified names", () => {
    const result = stripImportPrefix("SomeModule.Type", false, new Set(["coreClient"]));
    expect(result).toBe("SomeModule.Type");
  });

  it("strips import(...) prefixes", () => {
    const result = stripImportPrefix(
      'import("@azure/core-client").OperationOptions',
      false,
      new Set(),
    );
    expect(result).toBe("OperationOptions");
  });

  it("strips multiple import(...) prefixes in generics", () => {
    const result = stripImportPrefix(
      'import("./path").Foo<import("./p").Bar>',
      false,
      new Set(),
    );
    expect(result).toBe("Foo<Bar>");
  });

  it("strips generic parameters when baseOnly is true", () => {
    const result = stripImportPrefix("Promise<Response>", true, new Set());
    expect(result).toBe("Promise");
  });

  it("handles typeof import(...) syntax", () => {
    const result = stripImportPrefix('typeof import("@azure/core-client")', false, new Set());
    expect(result).toBe("typeof core-client");
  });

  it("returns plain type name unchanged when no prefix present", () => {
    const result = stripImportPrefix("OperationOptions", false, new Set());
    expect(result).toBe("OperationOptions");
  });

  it("strips multiple namespace aliases", () => {
    const result = stripImportPrefix(
      "coreClient.Foo | coreAuth.TokenCredential",
      false,
      new Set(["coreClient", "coreAuth"]),
    );
    expect(result).toBe("Foo | TokenCredential");
  });
});
