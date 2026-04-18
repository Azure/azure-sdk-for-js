// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  eliminateDeadBindings,
  type EliminationResult,
} from "../../../src/util/samples/compiler/deadBindingEliminator.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";
import { parseSource, printSourceFile, normalizeWhitespace } from "./helpers.js";

/** Helper: run elimination and return result with printed output text. */
function eliminate(
  source: string,
  deadNames: string[],
  fileName?: string,
): EliminationResult & { outputText: string } {
  const sf = parseSource(source, fileName);
  const result = eliminateDeadBindings(sf, new Set(deadNames), fileName);
  return { ...result, outputText: normalizeWhitespace(printSourceFile(result.outputFile)) };
}

describe("deadBindingEliminator", () => {
  // 1. Simple dead import removal
  it("removes a dead import declaration", () => {
    const source = `import { Recorder } from "@azure-tools/test-recorder";
const client = new Client();`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).not.toContain("Recorder");
    expect(result.outputText).toContain("const client = new Client();");
    expect(result.eliminatedBindings).toContain("Recorder");
  });

  // 2. Dead variable removal
  it("removes a dead variable declaration", () => {
    const source = `let recorder: Recorder;
const client = new Client();`;
    const result = eliminate(source, ["recorder"]);
    expect(result.outputText).not.toContain("recorder");
    expect(result.outputText).toContain("const client = new Client();");
    expect(result.eliminatedBindings).toContain("recorder");
  });

  // 3. Cascade: import → variable → expression
  it("cascades: dead import → dead variable → dead expression", () => {
    const source = `import { Recorder } from "@azure-tools/test-recorder";
let recorder: Recorder;
recorder.stop();`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).toBe("");
    expect(result.eliminatedBindings).toContain("Recorder");
    expect(result.eliminatedBindings).toContain("recorder");
  });

  // 4. Full recorder cascade
  it("eliminates full recorder pattern across multiple cascade rounds", () => {
    const source = `import { Recorder } from "@azure-tools/test-recorder";
let recorder: Recorder;
beforeEach(async (ctx) => { recorder = new Recorder(ctx); });
afterEach(async () => { await recorder.stop(); });
const client = new Client();`;
    const result = eliminate(source, ["Recorder", "beforeEach", "afterEach"]);
    expect(result.outputText).toBe("const client = new Client();");
    expect(result.eliminatedBindings).toContain("Recorder");
    expect(result.eliminatedBindings).toContain("recorder");
  });

  // 5. Partial import survival (all bindings dead → import removed)
  it("removes import when all imported names are dead", () => {
    const source = `import { describe, it, expect } from "vitest";
const x = 1;`;
    const result = eliminate(source, ["describe", "it", "expect"]);
    expect(result.outputText).toBe("const x = 1;");
    expect(result.eliminatedBindings).toContain("describe");
    expect(result.eliminatedBindings).toContain("it");
    expect(result.eliminatedBindings).toContain("expect");
  });

  // 6. Live code survives
  it("preserves live code when no dead bindings match", () => {
    const source = `const client = new Client(url);
console.log(client);`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).toContain("const client = new Client(url);");
    expect(result.outputText).toContain("console.log(client);");
  });

  // 7. Mixed live and dead in different statements
  it("removes dead statements while preserving live ones", () => {
    const source = `import { Recorder } from "test-recorder";
import { Client } from "./client";
const client = new Client();`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).toContain('import { Client } from "./client";');
    expect(result.outputText).toContain("const client = new Client();");
    expect(result.outputText).not.toContain("Recorder");
  });

  // 8. ExpressionStatement with dead root (call chain)
  it("removes call chain expression when root is dead", () => {
    const source = `expect(widget.name).toBe("my-widget");
console.log("done");`;
    const result = eliminate(source, ["expect"]);
    expect(result.outputText).not.toContain("expect");
    expect(result.outputText).toContain('console.log("done");');
    expect(result.eliminatedBindings).toContain("expect");
  });

  // 9. ExpressionStatement with live root
  it("preserves expression statement with live root", () => {
    const source = `console.log(result);`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).toContain("console.log(result);");
  });

  // 10. Type declarations always removed
  it("removes interface declarations", () => {
    const source = `interface Foo { x: number; }
const y = 1;`;
    const result = eliminate(source, []);
    expect(result.outputText).toBe("const y = 1;");
  });

  it("removes type alias declarations", () => {
    const source = `type Bar = string;
const y = 1;`;
    const result = eliminate(source, []);
    expect(result.outputText).toBe("const y = 1;");
  });

  // 11. Function declaration dead
  it("removes dead function declaration", () => {
    const source = `function helper() { return 1; }
const x = 2;`;
    const result = eliminate(source, ["helper"]);
    expect(result.outputText).toBe("const x = 2;");
    expect(result.eliminatedBindings).toContain("helper");
  });

  // 12. Class declaration dead
  it("removes dead class declaration", () => {
    const source = `class Foo { bar() {} }
const x = 2;`;
    const result = eliminate(source, ["Foo"]);
    expect(result.outputText).toBe("const x = 2;");
    expect(result.eliminatedBindings).toContain("Foo");
  });

  // 13. Tangled code error
  it("throws CompilerError for tangled dead and live bindings", () => {
    const source = `const result = new Client(url, recorder.options());`;
    expect(() => eliminate(source, ["recorder"], "test.ts")).toThrow(CompilerError);
  });

  // 14. No dead bindings → source unchanged (except types)
  it("returns source unchanged when dead set is empty (minus type declarations)", () => {
    const source = `import { Client } from "./client";
const client = new Client();`;
    const result = eliminate(source, []);
    expect(result.outputText).toContain('import { Client } from "./client";');
    expect(result.outputText).toContain("const client = new Client();");
    expect(result.eliminatedBindings.size).toBe(0);
  });

  // 15. All dead → empty output
  it("returns empty output when all statements reference dead bindings", () => {
    const source = `import { Recorder } from "test-recorder";
let recorder: Recorder;
recorder.stop();`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.outputText).toBe("");
  });

  // 16. Chained property access
  it("removes chained property access when root is dead", () => {
    const source = `recorder.configureClientOptions({});
const x = 1;`;
    const result = eliminate(source, ["recorder"]);
    expect(result.outputText).toBe("const x = 1;");
  });

  // 17. Dead binding in variable initializer
  it("removes variable when its initializer references a dead binding", () => {
    const source = `const opts = recorder.configureClientOptions({});
const x = 1;`;
    const result = eliminate(source, ["recorder"]);
    expect(result.outputText).toBe("const x = 1;");
    expect(result.eliminatedBindings).toContain("opts");
    expect(result.eliminatedBindings).toContain("recorder");
  });

  // 18. Variable with multiple declarations (tangled)
  it("throws CompilerError for tangled multi-declaration variable statement", () => {
    const source = `let a = 1, b = recorder.x;`;
    expect(() => eliminate(source, ["recorder"], "test.ts")).toThrow(CompilerError);
  });

  // survivingBindings tracking
  it("tracks surviving bindings correctly", () => {
    const source = `import { Recorder } from "test-recorder";
import { Client } from "./client";
const client = new Client();`;
    const result = eliminate(source, ["Recorder"]);
    expect(result.survivingBindings).toContain("Client");
    expect(result.survivingBindings).not.toContain("Recorder");
  });
});
