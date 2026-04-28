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
    expect(result.statements).toEqual([
      "const client: SecretClient = new SecretClient(url, credential);",
    ]);
    expect(result.remainingVars).toHaveLength(0);
  });

  // 2. No matching assignment → keep as let
  it("keeps let when no assignment found in preamble", () => {
    const result = promoteLetToConst(["let client: SecretClient;"], []);
    expect(result.statements).toHaveLength(0);
    expect(result.remainingVars).toEqual(["let client: SecretClient;"]);
  });

  // 3. let with initializer → no promotion
  it("does not promote let with initializer", () => {
    const result = promoteLetToConst(['let name = "hello";'], ['name = "world"']);
    expect(result.statements).toEqual(['name = "world"']);
    expect(result.remainingVars).toEqual(['let name = "hello";']);
  });

  // 4. const declaration → no promotion (already const)
  it("does not promote const declarations", () => {
    const result = promoteLetToConst(["const x: number = 5;"], []);
    expect(result.statements).toHaveLength(0);
    expect(result.remainingVars).toEqual(["const x: number = 5;"]);
  });

  // 5. Multiple variables, some promotable, some not
  it("promotes selectively", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;", "let count = 0;"],
      ["client = new SecretClient(url, cred)", "count += 1"],
    );
    expect(result.statements).toEqual([
      "const client: SecretClient = new SecretClient(url, cred);",
      "count += 1",
    ]);
    expect(result.remainingVars).toEqual(["let count = 0;"]);
  });

  // 6. Assignment that is not simple assignment (+=, ??=) → no promotion
  it("does not promote compound assignments", () => {
    const result = promoteLetToConst(["let count: number;"], ["count += 1"]);
    expect(result.statements).toEqual(["count += 1"]);
    expect(result.remainingVars).toEqual(["let count: number;"]);
  });

  // 7. Multiple assignments to same variable → no promotion
  it("does not promote when variable is assigned multiple times", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client = new SecretClient(url1, cred)", "client = new SecretClient(url2, cred)"],
    );
    expect(result.statements).toEqual([
      "client = new SecretClient(url1, cred)",
      "client = new SecretClient(url2, cred)",
    ]);
    expect(result.remainingVars).toEqual(["let client: SecretClient;"]);
  });

  // 8. let without type annotation → promoted without type
  it("promotes let without type annotation", () => {
    const result = promoteLetToConst(["let name;"], ['name = "hello"']);
    expect(result.statements).toEqual(['const name = "hello";']);
    expect(result.remainingVars).toHaveLength(0);
  });

  // 9. Preamble statements that are not assignments pass through
  it("preserves non-assignment preamble statements", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client = new SecretClient(url, cred)", 'console.log("ready")'],
    );
    expect(result.statements).toEqual([
      "const client: SecretClient = new SecretClient(url, cred);",
      'console.log("ready")',
    ]);
  });

  // 10. Empty inputs
  it("handles empty inputs", () => {
    const result = promoteLetToConst([], []);
    expect(result.statements).toHaveLength(0);
    expect(result.remainingVars).toHaveLength(0);
  });

  // 11. Multi-line assignment value
  it("handles multi-line assignment expressions", () => {
    const result = promoteLetToConst(
      ["let client: SecretClient;"],
      ["client =\n    new SecretClient(\n        url,\n        credential,\n    )"],
    );
    expect(result.statements).toHaveLength(1);
    expect(result.statements[0]).toContain("const client: SecretClient =");
    expect(result.statements[0]).toContain("new SecretClient(");
    expect(result.remainingVars).toHaveLength(0);
  });

  // 12. Multiple declarators in one let → skip promotion
  it("does not promote multi-declarator let statements", () => {
    const result = promoteLetToConst(["let a: string, b: number;"], ['a = "hello"']);
    expect(result.statements).toEqual(['a = "hello"']);
    expect(result.remainingVars).toEqual(["let a: string, b: number;"]);
  });

  // 13. Order preservation: init() before promoted const
  it("preserves preamble execution order with promoted consts", () => {
    const result = promoteLetToConst(["let client: C;"], ["init()", "client = create()"]);
    expect(result.statements).toEqual(["init()", "const client: C = create();"]);
    expect(result.remainingVars).toHaveLength(0);
  });

  // 14. Read-before-write guard: variable read before assignment → no promotion
  it("does not promote when variable is read before assignment", () => {
    const result = promoteLetToConst(
      ["let client;"],
      ["console.log(client)", "client = new Client()"],
    );
    expect(result.statements).toEqual(["console.log(client)", "client = new Client()"]);
    expect(result.remainingVars).toEqual(["let client;"]);
  });

  // 15. Variable only assigned, not read before → promotion is safe
  it("promotes when variable is only assigned, not read before", () => {
    const result = promoteLetToConst(
      ["let client;"],
      ["client = new Client()", "console.log(client)"],
    );
    expect(result.statements).toEqual(["const client = new Client();", "console.log(client)"]);
    expect(result.remainingVars).toHaveLength(0);
  });

  // 16. Variable reassigned in it-body → no promotion (F1)
  it("does not promote let when variable is reassigned in it-body", () => {
    const result = promoteLetToConst(
      ["let client;"],
      ["client = new Client('initial')", "client = new Client('updated')", "console.log(client)"],
    );
    // Two assignments means reassignment → should NOT be promoted
    expect(result.statements).toEqual([
      "client = new Client('initial')",
      "client = new Client('updated')",
      "console.log(client)",
    ]);
    expect(result.remainingVars).toEqual(["let client;"]);
  });

  // 17. Variable appears in expression before assignment → no promotion
  it("does not promote when variable appears in expression before assignment", () => {
    const result = promoteLetToConst(
      ["let x;"],
      ['const y = x || "default"', "x = computeValue()"],
    );
    expect(result.statements).toEqual(['const y = x || "default"', "x = computeValue()"]);
    expect(result.remainingVars).toEqual(["let x;"]);
  });
});
