// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { extractEnvVarNames } from "../../../src/util/samples/compiler/envVarExtractor.js";

describe("extractEnvVarNames", () => {
  it("extracts process.env.VAR_NAME (dot notation)", () => {
    const result = extractEnvVarNames(`
      const endpoint = process.env.AZURE_ENDPOINT;
      const key = process.env.API_KEY;
    `);
    expect(result).toEqual(["API_KEY", "AZURE_ENDPOINT"]);
  });

  it("extracts process.env['VAR_NAME'] (single-quote bracket)", () => {
    const result = extractEnvVarNames(`
      const x = process.env['MY_VAR'];
    `);
    expect(result).toEqual(["MY_VAR"]);
  });

  it('extracts process.env["VAR_NAME"] (double-quote bracket)', () => {
    const result = extractEnvVarNames(`
      const x = process.env["MY_VAR"];
    `);
    expect(result).toEqual(["MY_VAR"]);
  });

  it("extracts destructuring from process.env", () => {
    const result = extractEnvVarNames(`
      const { ENDPOINT, API_KEY } = process.env;
    `);
    expect(result).toEqual(["API_KEY", "ENDPOINT"]);
  });

  it("extracts destructuring with renaming (VAR: alias)", () => {
    const result = extractEnvVarNames(`
      const { ENDPOINT: endpoint, API_KEY: apiKey } = process.env;
    `);
    // The env var names are ENDPOINT and API_KEY, not the local aliases
    expect(result).toEqual(["API_KEY", "ENDPOINT"]);
  });

  it("extracts destructuring with defaults (VAR = 'default')", () => {
    const result = extractEnvVarNames(`
      const { ENDPOINT = "https://default.com" } = process.env;
    `);
    expect(result).toEqual(["ENDPOINT"]);
  });

  it("extracts destructuring with renaming and defaults (VAR: alias = 'default')", () => {
    const result = extractEnvVarNames(`
      const { ENDPOINT: endpoint = "https://default.com" } = process.env;
    `);
    expect(result).toEqual(["ENDPOINT"]);
  });

  // This test validates the AST-based approach: regex would incorrectly match these
  it("ignores process.env references in comments", () => {
    const result = extractEnvVarNames(`
      // Use process.env.COMMENTED_VAR for configuration
      /* process.env.BLOCK_COMMENTED */
      const actual = process.env.REAL_VAR;
    `);
    expect(result).toEqual(["REAL_VAR"]);
  });

  it("ignores process.env references in string literals", () => {
    const result = extractEnvVarNames(`
      const message = "Set process.env.FAKE_VAR to configure";
      const template = \`Use process.env.TEMPLATE_FAKE\`;
      const real = process.env.REAL_VAR;
    `);
    expect(result).toEqual(["REAL_VAR"]);
  });

  it("returns empty array when no env vars found", () => {
    const result = extractEnvVarNames(`
      const x = 1;
      console.log("hello");
    `);
    expect(result).toEqual([]);
  });

  it("handles mixed access patterns", () => {
    const result = extractEnvVarNames(`
      const { VAR_A } = process.env;
      const b = process.env.VAR_B;
      const c = process.env["VAR_C"];
      const d = process.env['VAR_D'];
    `);
    expect(result).toEqual(["VAR_A", "VAR_B", "VAR_C", "VAR_D"]);
  });

  it("extracts env vars from destructuring defaults", () => {
    const result = extractEnvVarNames(`
      const { FOO = process.env.BAR } = process.env;
    `);
    // FOO from destructuring, BAR from the default expression
    expect(result).toEqual(["BAR", "FOO"]);
  });

  // ── Optional chaining and globalThis patterns ──────────────────────────

  it("extracts env vars with optional chaining (process?.env)", () => {
    const result = extractEnvVarNames(`
      const a = process?.env.VAR_A;
      const b = process?.env["VAR_B"];
    `);
    expect(result).toEqual(["VAR_A", "VAR_B"]);
  });

  it("extracts env vars from globalThis.process.env", () => {
    const result = extractEnvVarNames(`
      const a = globalThis.process.env.VAR_A;
      const b = globalThis.process.env["VAR_B"];
    `);
    expect(result).toEqual(["VAR_A", "VAR_B"]);
  });

  it("extracts env vars from globalThis.process?.env", () => {
    const result = extractEnvVarNames(`
      const a = globalThis.process?.env.VAR_A;
      const b = globalThis.process?.env["VAR_B"];
    `);
    expect(result).toEqual(["VAR_A", "VAR_B"]);
  });

  it("handles destructuring from process?.env", () => {
    const result = extractEnvVarNames(`
      const { FOO, BAR } = process?.env ?? {};
    `);
    // The destructuring here is from process?.env ?? {}, not directly process?.env
    // This won't match because the initializer is a BinaryExpression, not process?.env
    // This is an expected limitation - users should use process.env for destructuring
    expect(result).toEqual([]);
  });

  it("handles destructuring from globalThis.process.env", () => {
    const result = extractEnvVarNames(`
      const { FOO, BAR } = globalThis.process.env;
    `);
    expect(result).toEqual(["BAR", "FOO"]);
  });
});
