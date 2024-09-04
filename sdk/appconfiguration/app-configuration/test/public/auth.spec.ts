// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "../../src/index.js";
import { describe, it, assert } from "vitest";

describe("AppConfigurationClient constructor error cases", () => {
  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });

  it("undefined connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient(undefined as any),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });
});
