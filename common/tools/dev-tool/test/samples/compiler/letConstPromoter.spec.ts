// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { promoteLetToConst } from "../../../src/util/samples/compiler/letConstPromoter.js";

describe("promoteLetToConst", () => {
  // 1. Basic promotion: let x: T; + x = expr → const x: T = expr
  it("promotes uninitialized let with matching assignment", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client = new SecretClient(url, credential)"],
    );
    expect(result.promotedConsts).toHaveLength(1);
    expect(result.promotedConsts[0]).toBe(
      "const client: SecretClient = new SecretClient(url, credential);",
    );
    expect(result.remainingVars).toHaveLength(0);
    expect(result.remainingPreamble).toHaveLength(0);
  });

  // 2. No matching assignment → keep as let
  it("keeps let when no assignment found in preamble", () => {
    const result = promoteLetToConst(["let client: SecretClient;"], []);
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(["let client: SecretClient;"]);
    expect(result.remainingPreamble).toHaveLength(0);
  });

  // 3. let with initializer → no promotion
  it("does not promote let with initializer", () => {
    const result = promoteLetToConst(
      ['let name = "hello";'],
      ['name = "world"'],
    );
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(['let name = "hello";']);
    expect(result.remainingPreamble).toEqual(['name = "world"']);
  });

  // 4. const declaration → no promotion (already const)
  it("does not promote const declarations", () => {
    const result = promoteLetToConst(
      ["const x: number = 5;"],
      [],
    );
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(["const x: number = 5;"]);
  });

  // 5. Multiple variables, some promotable, some not
  it("promotes selectively", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;", "let count = 0;"],
      ["client = new SecretClient(url, cred)", "count += 1"],
    );
    expect(result.promotedConsts).toEqual([
      "const client: SecretClient = new SecretClient(url, cred);",
    ]);
    expect(result.remainingVars).toEqual(["let count = 0;"]);
    expect(result.remainingPreamble).toEqual(["count += 1"]);
  });

  // 6. Assignment that is not simple assignment (+=, ??=) → no promotion
  it("does not promote compound assignments", () => {
    const result = promoteLetToConst(
      ["let count: number;"],
      ["count += 1"],
    );
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(["let count: number;"]);
    expect(result.remainingPreamble).toEqual(["count += 1"]);
  });

  // 7. Multiple assignments to same variable → no promotion
  it("does not promote when variable is assigned multiple times", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client = new SecretClient(url1, cred)", "client = new SecretClient(url2, cred)"],
    );
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(["let client: SecretClient;"]);
    expect(result.remainingPreamble).toEqual([
      "client = new SecretClient(url1, cred)",
      "client = new SecretClient(url2, cred)",
    ]);
  });

  // 8. let without type annotation → promoted without type
  it("promotes let without type annotation", () => {
    const result = promoteLetToConst(
      ["let name;"],
      ['name = "hello"'],
    );
    expect(result.promotedConsts).toEqual(['const name = "hello";']);
    expect(result.remainingVars).toHaveLength(0);
    expect(result.remainingPreamble).toHaveLength(0);
  });

  // 9. Preamble statements that are not assignments pass through
  it("preserves non-assignment preamble statements", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client = new SecretClient(url, cred)", 'console.log("ready")'],
    );
    expect(result.promotedConsts).toEqual([
      "const client: SecretClient = new SecretClient(url, cred);",
    ]);
    expect(result.remainingPreamble).toEqual(['console.log("ready")']);
  });

  // 10. Empty inputs
  it("handles empty inputs", () => {
    const result = promoteLetToConst([], []);
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toHaveLength(0);
    expect(result.remainingPreamble).toHaveLength(0);
  });

  // 11. Multi-line assignment value
  it("handles multi-line assignment expressions", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client =\n    new SecretClient(\n        url,\n        credential,\n    )"],
    );
    expect(result.promotedConsts).toHaveLength(1);
    expect(result.promotedConsts[0]).toContain("const client: SecretClient =");
    expect(result.promotedConsts[0]).toContain("new SecretClient(");
    expect(result.remainingVars).toHaveLength(0);
  });

  // 12. Multiple declarators in one let → skip promotion
  it("does not promote multi-declarator let statements", () => {
    const result = promoteLetToConst(
      ["let a: string, b: number;"],
      ['a = "hello"'],
    );
    expect(result.promotedConsts).toHaveLength(0);
    expect(result.remainingVars).toEqual(["let a: string, b: number;"]);
    expect(result.remainingPreamble).toEqual(['a = "hello"']);
  });
});
