// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { compileSampleTest } from "../../../src/util/samples/compiler/compiler.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";

// ── Test 1: Minimal sample-test ──────────────────────────────────────

const minimalInput = `\
/** @summary say hello to the service */
import { GreeterClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("hello", () => {
  it("say hello", async () => {
    const client = new GreeterClient("https://example.azure.net");
    const result = await client.sayHello("world");
    console.log(result.message);
  });
});
`;

describe("compileSampleTest", () => {
  describe("minimal sample-test", () => {
    it("rewrites source import to package name", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain('import { GreeterClient } from "@azure/greeter"');
    });

    it("does not auto-inject dotenv/config import", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).not.toContain('import "dotenv/config"');
    });

    it("inlines single it-block body directly into main()", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      // Single-it: no sub-function, body is inlined into main()
      expect(result.outputText).not.toContain("async function sayHello()");
      expect(result.outputText).not.toContain("await sayHello()");
      expect(result.outputText).toContain("export async function main(): Promise<void>");
      expect(result.outputText).toContain('new GreeterClient("https://example.azure.net")');
      expect(result.outputText).toContain("console.log(result.message)");
    });

    it("generates main().catch handler", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("main().catch(");
      expect(result.outputText).toContain("console.error(error)");
      expect(result.outputText).toContain("process.exit(1)");
    });

    it("includes copyright header", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("Copyright (c) Microsoft Corporation");
      expect(result.outputText).toContain("Licensed under the MIT License");
    });

    it("includes @summary comment", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("@summary say hello to the service");
    });

    it("removes vitest imports", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).not.toContain("vitest");
    });

    it("removes describe/it scaffolding", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).not.toContain("describe(");
      expect(result.outputText).not.toContain('it("');
    });

    it("preserves the function body statements", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("new GreeterClient");
      expect(result.outputText).toContain("client.sayHello");
      expect(result.outputText).toContain("console.log(result.message)");
    });

    it("returns correct metadata", () => {
      const result = compileSampleTest(minimalInput, { packageName: "@azure/greeter" });
      expect(result.metadata.summary).toBe("say hello to the service");
    });
  });

  // ── Test 2: Auth with forPublishing ──────────────────────────────

  describe("auth with forPublishing substitution", () => {
    const authInput = `\
/** @summary list items with real authentication */
import { GreeterClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("listItems", () => {
  it("list items", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    const client = new GreeterClient("https://example.azure.net", credential);
    for await (const item of client.listItems()) {
      console.log(item.name);
    }
  });
});
`;

    it("substitutes forPublishing with the published expression", () => {
      const result = compileSampleTest(authInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("new DefaultAzureCredential()");
    });

    it("removes test credential import", () => {
      const result = compileSampleTest(authInput, { packageName: "@azure/greeter" });
      expect(result.outputText).not.toContain("createTestCredential");
    });

    it("removes forPublishing import", () => {
      const result = compileSampleTest(authInput, { packageName: "@azure/greeter" });
      expect(result.outputText).not.toContain("forPublishing");
    });

    it("keeps @azure/identity import", () => {
      const result = compileSampleTest(authInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("@azure/identity");
    });

    it("rewrites source import to package name", () => {
      const result = compileSampleTest(authInput, { packageName: "@azure/greeter" });
      expect(result.outputText).toContain("@azure/greeter");
    });
  });

  // ── Test 3: Single it with describe-level let → const promotion ──

  describe("single it with let promotion", () => {
    const singleItWithLet = `\
/** @summary backup a secret */
import { SecretClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach } from "vitest";

describe("backup", () => {
  let client: SecretClient;

  beforeEach(async () => {
    client = forPublishing(
      new SecretClient("https://test.vault.azure.net", createTestCredential()),
      () => new SecretClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential()),
    );
  });

  it("backup and restore a secret", async () => {
    const result = await client.setSecret("mySecret", "value");
    console.log(result);
  });
});
`;

    it("promotes let to const inside main()", () => {
      const result = compileSampleTest(singleItWithLet, { packageName: "@azure/keyvault-secrets" });
      expect(result.outputText).toContain("const client: SecretClient =");
      expect(result.outputText).not.toContain("let client: SecretClient;");
    });

    it("inlines body directly into main() without sub-function", () => {
      const result = compileSampleTest(singleItWithLet, { packageName: "@azure/keyvault-secrets" });
      expect(result.outputText).not.toContain("async function backupAndRestoreASecret()");
      expect(result.outputText).not.toContain("await backupAndRestoreASecret()");
      expect(result.outputText).toContain('await client.setSecret("mySecret", "value")');
    });
  });

  // ── Test 4: Multiple it blocks ──────────────────────────────────

  describe("multiple it blocks", () => {
    const multiInput = `\
/** @summary multiple operations */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("operations", () => {
  it("create item", async () => {
    const client = new Client();
    await client.create();
  });
  it("read item", async () => {
    const client = new Client();
    await client.read();
  });
  it("delete item", async () => {
    const client = new Client();
    await client.delete();
  });
});
`;

    it("generates three named functions", () => {
      const result = compileSampleTest(multiInput, { packageName: "@azure/my-client" });
      expect(result.outputText).toContain("async function createItem()");
      expect(result.outputText).toContain("async function readItem()");
      expect(result.outputText).toContain("async function deleteItem()");
    });

    it("main() calls all three functions in order", () => {
      const result = compileSampleTest(multiInput, { packageName: "@azure/my-client" });
      const mainMatch = result.outputText.match(
        /async function main\(\)[^}]*\{([\s\S]*?)\n\}/,
      );
      expect(mainMatch).toBeTruthy();
      const mainBody = mainMatch![1];
      const createIdx = mainBody.indexOf("await createItem()");
      const readIdx = mainBody.indexOf("await readItem()");
      const deleteIdx = mainBody.indexOf("await deleteItem()");
      expect(createIdx).toBeGreaterThanOrEqual(0);
      expect(readIdx).toBeGreaterThan(createIdx);
      expect(deleteIdx).toBeGreaterThan(readIdx);
    });
  });

  // ── Test 4: Full-featured (widget lifecycle) ────────────────────

  describe("full-featured widget lifecycle", () => {
    const fullInput = `\
/** @summary widget lifecycle operations */
import { WidgetClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { forPublishing } from "@azure-tools/test-publishing";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("widget lifecycle", () => {
  let client: WidgetClient;
  let recorder: Recorder;

  beforeEach(async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    recorder = new Recorder(undefined);
    client = new WidgetClient(
      forPublishing("https://test.endpoint", () => process.env.ENDPOINT || ""),
      credential,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create a widget", async () => {
    const widget = await client.createWidget({ name: "test-widget" });
    console.log(widget.id);
    expect(widget.name).toBe("test-widget");
  });

  it("update the widget", async () => {
    const widget = await client.updateWidget("id", { name: "updated" });
    console.log(widget.name);
  });

  it("delete the widget", async () => {
    await client.deleteWidget("id");
    console.log("deleted");
  });
});
`;

    it("keeps surviving describe variable (client)", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).toContain("let client: WidgetClient");
    });

    it("eliminates dead describe variable (recorder)", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).not.toContain("let recorder");
    });

    it("generates three named functions", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).toContain("async function createAWidget()");
      expect(result.outputText).toContain("async function updateTheWidget()");
      expect(result.outputText).toContain("async function deleteTheWidget()");
    });

    it("deduplicates identical it-block names", () => {
      const dupeInput = `\
/** @summary dupe test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("do thing", async () => {
    console.log("first");
  });
  it("do thing", async () => {
    console.log("second");
  });
});
`;
      const result = compileSampleTest(dupeInput, { packageName: "@azure/client" });
      expect(result.outputText).toContain("async function doThing()");
      expect(result.outputText).toContain("async function doThing2()");
    });

    it("includes surviving beforeEach statements in main()", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).toContain("new DefaultAzureCredential()");
      expect(result.outputText).toContain("process.env.ENDPOINT");
    });

    it("removes test artifacts", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).not.toContain("Recorder");
      expect(result.outputText).not.toContain("expect(");
      // recorder references are eliminated
      expect(result.outputText).not.toMatch(/\brecorder\b/);
    });

    it("removes forPublishing calls (substituted)", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).not.toContain("forPublishing");
      expect(result.outputText).not.toContain("createTestCredential");
    });

    it("removes afterEach body (all dead)", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.outputText).not.toContain("recorder.stop");
    });

    it("extracts ENDPOINT env var", () => {
      const result = compileSampleTest(fullInput, { packageName: "@azure/widget" });
      expect(result.envVars).toContain("ENDPOINT");
    });
  });

  // ── Test 5: Snippet extraction ──────────────────────────────────

  describe("snippet extraction", () => {
    const snippetInput = `\
/** @summary snippet example */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("example", async () => {
    // @snippet MySnippet
    const client = new Client();
    const result = await client.doSomething();
    // @snippet-end MySnippet
    console.log(result);
  });
});
`;

    it("extracts named snippet region", () => {
      const result = compileSampleTest(snippetInput, { packageName: "@azure/client" });
      expect(result.snippets.size).toBe(1);
      expect(result.snippets.has("MySnippet")).toBe(true);
    });

    it("snippet content contains the code between markers", () => {
      const result = compileSampleTest(snippetInput, { packageName: "@azure/client" });
      const snippet = result.snippets.get("MySnippet")!;
      expect(snippet).toContain("new Client()");
      expect(snippet).toContain("doSomething()");
    });

    it("snippet markers are stripped from the output text", () => {
      const result = compileSampleTest(snippetInput, { packageName: "@azure/client" });
      expect(result.outputText).not.toContain("// @snippet MySnippet");
      expect(result.outputText).not.toContain("// @snippet-end MySnippet");
      // But the code between markers is still present
      expect(result.outputText).toContain("new Client()");
      expect(result.outputText).toContain("doSomething()");
    });
  });

  // ── Test 5b: @ts-preserve-whitespace handling ─────────────────────

  describe("@ts-preserve-whitespace handling", () => {
    const whitespaceInput = `\
/** @summary whitespace example */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("ws", () => {
  it("example", async () => {
    const client = new Client();
    // @ts-preserve-whitespace
    const result = await client.doSomething();
    // @ts-preserve-whitespace
    console.log(result);
  });
});
`;

    it("converts @ts-preserve-whitespace comments to blank lines", () => {
      const result = compileSampleTest(whitespaceInput, { packageName: "@azure/client" });
      expect(result.outputText).not.toContain("@ts-preserve-whitespace");
      // The surrounding code should still be present
      expect(result.outputText).toContain("new Client()");
      expect(result.outputText).toContain("doSomething()");
      expect(result.outputText).toContain("console.log(result)");
    });
  });

  // ── Test 6: Environment variable extraction ─────────────────────

  describe("environment variable extraction", () => {
    const envInput = `\
/** @summary env var example */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env vars", async () => {
    const endpoint = process.env.ENDPOINT || "";
    const key = process.env.API_KEY || "";
    const client = new Client(endpoint, key);
    console.log(client);
  });
});
`;

    it("extracts dot-notation env vars", () => {
      const result = compileSampleTest(envInput, { packageName: "@azure/client" });
      expect(result.envVars).toContain("ENDPOINT");
      expect(result.envVars).toContain("API_KEY");
    });

    it("returns env vars sorted", () => {
      const result = compileSampleTest(envInput, { packageName: "@azure/client" });
      const sorted = [...result.envVars].sort();
      expect(result.envVars).toEqual(sorted);
    });

    it("extracts single-quoted bracket-notation env vars", () => {
      const input = `\
/** @summary env test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env", async () => {
    const x = process.env['MY_VAR'] || "";
    console.log(new Client(x));
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/client" });
      expect(result.envVars).toContain("MY_VAR");
    });
  });

  // ── Test 7: Error cases ─────────────────────────────────────────

  describe("error cases", () => {
    it("throws CompilerError when @summary is missing", () => {
      const noSummary = `\
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log("hello");
  });
});
`;
      expect(() => compileSampleTest(noSummary, { packageName: "@azure/client" })).toThrow(
        CompilerError,
      );
    });

    it("throws CompilerError for block-bodied arrow in forPublishing", () => {
      const blockBody = `\
/** @summary test */
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const x = forPublishing(1, () => { return 2; });
    console.log(x);
  });
});
`;
      expect(() => compileSampleTest(blockBody, { packageName: "@azure/client" })).toThrow(
        CompilerError,
      );
    });
  });

  // ── Test 8: Metadata tags ─────────────────────────────────────────

  describe("metadata tags", () => {
    it("emits @azsdk-weight when present", () => {
      const input = `\
/**
 * @summary weighted sample
 * @azsdk-weight 40
 */
import { Foo } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log(new Foo());
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/foo" });
      expect(result.outputText).toContain("@azsdk-weight 40");
    });

    it("emits @azsdk-skip-javascript when present", () => {
      const input = `\
/**
 * @summary skip js
 * @azsdk-skip-javascript
 */
import { Foo } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log(new Foo());
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/foo" });
      expect(result.outputText).toContain("@azsdk-skip-javascript");
    });
  });

  // ── Test 7b: forPublishing dead-binding validation ───────────────────

  describe("forPublishing dead-binding validation", () => {
    it("compiles when forPublishing expression references surviving bindings", () => {
      const input = `\
/** @summary test surviving refs */
import { Client } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const cred = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    const client = new Client(cred);
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/client" });
      expect(result.outputText).toContain("new DefaultAzureCredential()");
    });

    it("throws CompilerError when forPublishing expression references a dead binding", () => {
      const input = `\
/** @summary test dead ref */
import { Client } from "../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new Client(forPublishing({}, () => new Recorder()));
    console.log(client);
  });
});
`;
      expect(() => compileSampleTest(input, { packageName: "@azure/client" })).toThrow(
        CompilerError,
      );
      expect(() => compileSampleTest(input, { packageName: "@azure/client" })).toThrow(
        /Recorder.*not available after cleanup/,
      );
    });

    it("compiles when forPublishing references process.env (global, not dead)", () => {
      const input = `\
/** @summary test process.env */
import { Client } from "../src/index.js";
import { assertEnvironmentVariable } from "@azure-tools/test-utils";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const url = forPublishing(assertEnvironmentVariable("URL"), () => process.env.URL || "");
    const client = new Client(url);
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/client" });
      expect(result.outputText).toContain("process.env.URL");
    });
  });

  // ── Test 9: Type-only imports ─────────────────────────────────────────

  describe("type-only imports", () => {
    it("preserves import type from source", () => {
      const input = `\
/** @summary type import test */
import type { MyType } from "../src/index.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const c = new MyClient();
    const t: MyType = c.get();
    console.log(t);
  });
});
`;
      const result = compileSampleTest(input, { packageName: "@azure/foo" });
      expect(result.outputText).toContain('import type { MyType } from "@azure/foo"');
      expect(result.outputText).toContain('import { MyClient } from "@azure/foo"');
    });
  });
});

// ── Import graph following (helper compilation) ────────────────────────

describe("compileSampleTest with helpers", () => {
  const makeResolver = (files: Record<string, string>) => {
    return (_fromFile: string, specifier: string) => {
      const key = specifier.replace(/\.js$/, ".ts");
      if (files[key]) {
        return { canonicalPath: key, sourceText: files[key] };
      }
      return undefined;
    };
  };

  it("compiles with a surviving helper (import kept, helper in helperFiles)", () => {
    const helperSource = `
import { MyClient } from "../src/index.js";

export function createClient(): MyClient {
  return new MyClient(process.env.ENDPOINT || "");
}
`;
    const input = `\
/** @summary test with helper */
import { createClient } from "./helpers.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = createClient();
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      packageName: "@azure/test",
      resolveHelper: makeResolver({ "./helpers.ts": helperSource }),
    });

    expect(result.outputText).toContain("./helpers.js");
    expect(result.helperFiles.size).toBe(1);
    const helperOutput = result.helperFiles.get("./helpers.js");
    expect(helperOutput).toBeDefined();
    expect(helperOutput).toContain("export function createClient()");
    expect(helperOutput).toContain('"@azure/test"');
    // Helper env vars aggregated into main result
    expect(result.envVars).toContain("ENDPOINT");
  });

  it("marks import dead when helper is pure test infrastructure", () => {
    const testHelperSource = `
import { Recorder } from "@azure-tools/test-recorder";

export function createRecorder(ctx: unknown): Recorder {
  return new Recorder(ctx);
}
`;
    const input = `\
/** @summary test with empty helper */
import { createRecorder } from "./testUtils.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new MyClient("url");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      packageName: "@azure/test",
      resolveHelper: makeResolver({ "./testUtils.ts": testHelperSource }),
    });

    // testUtils import should be removed (empty helper)
    expect(result.outputText).not.toContain("testUtils");
    expect(result.outputText).not.toContain("createRecorder");
    expect(result.helperFiles.size).toBe(0);
    // MyClient should still be there
    expect(result.outputText).toContain('"@azure/test"');
  });

  it("cascades dead bindings from empty helper through spec file", () => {
    const testHelperSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function createRecorder(): Recorder {
  return new Recorder();
}
`;
    const input = `\
/** @summary cascade from empty helper */
import { createRecorder } from "./testUtils.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new MyClient("url");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      packageName: "@azure/test",
      resolveHelper: makeResolver({ "./testUtils.ts": testHelperSource }),
    });

    // createRecorder is dead (empty helper) → import removed, binding cascaded
    expect(result.outputText).not.toContain("createRecorder");
    expect(result.outputText).not.toContain("testUtils");
    expect(result.outputText).toContain("new MyClient");
  });

  it("keeps helper import as-is when resolver returns undefined", () => {
    const input = `\
/** @summary test unresolvable helper */
import { helper } from "./missing.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    const result = compileSampleTest(input, {
      packageName: "@azure/test",
      resolveHelper: () => undefined,
    });

    // Import kept as-is (couldn't resolve) + warning
    expect(result.outputText).toContain("./missing.js");
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("missing.js");
  });

  it("works without resolveHelper (backward compatible)", () => {
    const input = `\
/** @summary no resolver */
import { helper } from "./helpers.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    const result = compileSampleTest(input, { packageName: "@azure/test" });

    // Import kept as-is (no resolver)
    expect(result.outputText).toContain("./helpers.js");
    expect(result.helperFiles.size).toBe(0);
  });
});

// ── generateSampleEnv tests ──────────────────────────────────────────

import { generateSampleEnv } from "../../../src/util/samples/compileSampleTests.js";

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
    const varLines = content
      .split("\n")
      .filter((l) => !l.startsWith("#") && l.trim());
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
