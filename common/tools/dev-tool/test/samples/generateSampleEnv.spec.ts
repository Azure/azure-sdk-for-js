// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { generateSampleEnv } from "../../src/util/samples/compileSampleTests.js";

describe("generateSampleEnv", () => {
  it("generates header and sorted vars", () => {
    const { content } = generateSampleEnv(["ENDPOINT", "API_KEY"]);
    expect(content).toContain("ENDPOINT=");
    expect(content).toContain("API_KEY=");
    const lines = content.split("\n");
    const varLines = lines.filter((l) => !l.startsWith("#") && l.trim());
    expect(varLines[0]).toBe("API_KEY=");
    expect(varLines[1]).toBe("ENDPOINT=");
  });

  it("preserves hand-written values", () => {
    const existing = "ENDPOINT=https://myservice.azure.net\nKEY=secret123\n";
    const { content } = generateSampleEnv(["ENDPOINT", "KEY", "API_KEY"], existing);
    expect(content).toContain("ENDPOINT=https://myservice.azure.net");
    expect(content).toContain("KEY=secret123");
    expect(content).toContain("API_KEY=");
  });

  it("warns about unreferenced vars in hand-written file", () => {
    const existing = "UNUSED_VAR=value\nENDPOINT=url\n";
    const { content, warnings } = generateSampleEnv(["ENDPOINT"], existing);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain("UNUSED_VAR");
    // ENDPOINT should still be present
    expect(content).toContain("ENDPOINT=url");
  });

  it("returns header when no vars discovered", () => {
    const { content } = generateSampleEnv([]);
    expect(content).toContain("Copyright");
    const varLines = content.split("\n").filter((l) => !l.startsWith("#") && l.trim());
    expect(varLines).toHaveLength(0);
  });

  it("appends new vars to existing content", () => {
    const existing = "ENDPOINT=https://example.com\n";
    const { content } = generateSampleEnv(["ENDPOINT", "API_KEY"], existing);
    // Original line preserved
    expect(content).toContain("ENDPOINT=https://example.com");
    // New var appended
    expect(content).toContain("API_KEY=");
    // New var comes after existing content
    const lines = content.split("\n");
    const endpointIdx = lines.findIndex((l) => l.startsWith("ENDPOINT="));
    const apiKeyIdx = lines.findIndex((l) => l.startsWith("API_KEY="));
    expect(apiKeyIdx).toBeGreaterThan(endpointIdx);
  });

  it("does not duplicate vars already in existing file", () => {
    const existing = "ENDPOINT=url\nAPI_KEY=key\n";
    const { content } = generateSampleEnv(["ENDPOINT", "API_KEY"], existing);
    const matches = content.match(/ENDPOINT=/g);
    expect(matches).toHaveLength(1);
  });
});
