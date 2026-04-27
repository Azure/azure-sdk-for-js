// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { compileSampleTest } from "../../../src/util/samples/compiler/compiler.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";

/**
 * Test predicate: classify paths containing "/src/" as source code.
 * In tests, we use synthetic file paths, so specifiers like "../src/index.js"
 * resolve to paths containing "/src/".
 */
const testIsSourceImport = (resolvedPath: string): boolean => resolvedPath.includes("/src/");

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
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain('import { GreeterClient } from "@azure/greeter"');
    });

    it("does not auto-inject dotenv/config import", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).not.toContain('import "dotenv/config"');
    });

    it("inlines single it-block body directly into main()", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      // Single-it: no sub-function, body is inlined into main()
      expect(result.outputText).not.toContain("async function sayHello()");
      expect(result.outputText).not.toContain("await sayHello()");
      expect(result.outputText).toContain("export async function main(): Promise<void>");
      expect(result.outputText).toContain('new GreeterClient("https://example.azure.net")');
      expect(result.outputText).toContain("console.log(result.message)");
    });

    it("generates main().catch handler", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("main().catch(");
      expect(result.outputText).toContain("console.error(error)");
      expect(result.outputText).toContain("process.exit(1)");
    });

    it("includes copyright header", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("Copyright (c) Microsoft Corporation");
      expect(result.outputText).toContain("Licensed under the MIT License");
    });

    it("includes @summary comment", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("@summary say hello to the service");
    });

    it("removes vitest imports", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).not.toContain("vitest");
    });

    it("removes describe/it scaffolding", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).not.toContain("describe(");
      expect(result.outputText).not.toContain('it("');
    });

    it("awaits expression-bodied callbacks to preserve promise semantics", () => {
      // Non-async expression-bodied arrow: () => client.doThing()
      // Should be awaited in the output to ensure promise completion
      const expressionBodyInput = `\
/** @summary expression body test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", () => new Client().doSomething());
});
`;
      const result = compileSampleTest(expressionBodyInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/test",
      });
      // Should have await in the output
      expect(result.outputText).toContain("await new Client().doSomething()");
    });

    it("preserves the function body statements", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("new GreeterClient");
      expect(result.outputText).toContain("client.sayHello");
      expect(result.outputText).toContain("console.log(result.message)");
    });

    it("returns correct metadata", () => {
      const result = compileSampleTest(minimalInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
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
      const result = compileSampleTest(authInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("new DefaultAzureCredential()");
    });

    it("removes test credential import", () => {
      const result = compileSampleTest(authInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).not.toContain("createTestCredential");
    });

    it("removes forPublishing import", () => {
      const result = compileSampleTest(authInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).not.toContain("forPublishing");
    });

    it("keeps @azure/identity import", () => {
      const result = compileSampleTest(authInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
      expect(result.outputText).toContain("@azure/identity");
    });

    it("rewrites source import to package name", () => {
      const result = compileSampleTest(authInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/greeter",
      });
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
      const result = compileSampleTest(singleItWithLet, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/keyvault-secrets",
      });
      expect(result.outputText).toContain("const client: SecretClient =");
      expect(result.outputText).not.toContain("let client: SecretClient;");
    });

    it("inlines body directly into main() without sub-function", () => {
      const result = compileSampleTest(singleItWithLet, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/keyvault-secrets",
      });
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
      const result = compileSampleTest(multiInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/my-client",
      });
      expect(result.outputText).toContain("async function createItem()");
      expect(result.outputText).toContain("async function readItem()");
      expect(result.outputText).toContain("async function deleteItem()");
    });

    it("main() calls all three functions in order", () => {
      const result = compileSampleTest(multiInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/my-client",
      });
      const mainMatch = result.outputText.match(/async function main\(\)[^}]*\{([\s\S]*?)\n\}/);
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
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).toContain("let client: WidgetClient");
    });

    it("eliminates dead describe variable (recorder)", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).not.toContain("let recorder");
    });

    it("generates three named functions", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
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
      const result = compileSampleTest(dupeInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("async function doThing()");
      expect(result.outputText).toContain("async function doThing2()");
    });

    it("includes surviving beforeEach statements in main()", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).toContain("new DefaultAzureCredential()");
      expect(result.outputText).toContain("process.env.ENDPOINT");
    });

    it("removes test artifacts", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).not.toContain("Recorder");
      expect(result.outputText).not.toContain("expect(");
      // recorder references are eliminated
      expect(result.outputText).not.toMatch(/\brecorder\b/);
    });

    it("removes forPublishing calls (substituted)", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).not.toContain("forPublishing");
      expect(result.outputText).not.toContain("createTestCredential");
    });

    it("removes afterEach body (all dead)", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
      expect(result.outputText).not.toContain("recorder.stop");
    });

    it("extracts ENDPOINT env var", () => {
      const result = compileSampleTest(fullInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/widget",
      });
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
      const result = compileSampleTest(snippetInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.snippets.size).toBe(1);
      expect(result.snippets.has("MySnippet")).toBe(true);
    });

    it("snippet content contains the code between markers", () => {
      const result = compileSampleTest(snippetInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      const snippet = result.snippets.get("MySnippet")!;
      expect(snippet).toContain("new Client()");
      expect(snippet).toContain("doSomething()");
    });

    it("snippet markers are stripped from the output text", () => {
      const result = compileSampleTest(snippetInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).not.toContain("// @snippet MySnippet");
      expect(result.outputText).not.toContain("// @snippet-end MySnippet");
      // But the code between markers is still present
      expect(result.outputText).toContain("new Client()");
      expect(result.outputText).toContain("doSomething()");
    });

    it("throws on unclosed snippet marker", () => {
      const input = `\
/** @summary unclosed snippet */
import { describe, it } from "vitest";
describe("x", () => {
  it("y", async () => {
    // @snippet Dangling
    const x = 1;
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Unclosed snippet.*Dangling/);
    });

    it("throws on nested snippet markers", () => {
      const input = `\
/** @summary nested snippet */
import { describe, it } from "vitest";
describe("x", () => {
  it("y", async () => {
    // @snippet Outer
    const x = 1;
    // @snippet Inner
    const y = 2;
    // @snippet-end Inner
    // @snippet-end Outer
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Nested snippet.*Inner.*inside.*Outer/);
    });

    it("throws on stray @snippet-end without matching @snippet", () => {
      const input = `\
/** @summary stray snippet-end */
import { describe, it } from "vitest";
describe("x", () => {
  it("y", async () => {
    const x = 1;
    // @snippet-end Orphan
    const y = 2;
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Stray.*@snippet-end Orphan.*without matching/);
    });

    it("throws on mismatched @snippet-end name", () => {
      const input = `\
/** @summary mismatched snippet-end */
import { describe, it } from "vitest";
describe("x", () => {
  it("y", async () => {
    // @snippet Alpha
    const x = 1;
    // @snippet-end Beta
    const y = 2;
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Mismatched snippet end.*@snippet-end Beta.*does not match.*@snippet Alpha/);
    });

    it("throws on duplicate snippet names", () => {
      const input = `\
/** @summary duplicate snippets */
import { describe, it } from "vitest";
describe("x", () => {
  it("y", async () => {
    // @snippet Dup
    const x = 1;
    // @snippet-end Dup
    // @snippet Dup
    const y = 2;
    // @snippet-end Dup
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Duplicate snippet name.*Dup/);
    });

    it("throws on multiple top-level describe blocks", () => {
      const input = `\
/** @summary multiple describes */
import { describe, it } from "vitest";
describe("first", () => {
  it("test1", async () => {
    console.log("one");
  });
});
describe("second", () => {
  it("test2", async () => {
    console.log("two");
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/Multiple top-level describe blocks/);
    });

    it("throws on top-level statements outside describe", () => {
      const input = `\
/** @summary outside describe */
import { describe, it } from "vitest";
function formatDate(d: Date): string {
  return d.toISOString();
}
describe("test", () => {
  it("example", async () => {
    console.log(formatDate(new Date()));
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/test",
        }),
      ).toThrow(/statement\(s\) outside describe block.*function at line 3/s);
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
      const result = compileSampleTest(whitespaceInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).not.toContain("@ts-preserve-whitespace");
      // The surrounding code should still be present
      expect(result.outputText).toContain("new Client()");
      expect(result.outputText).toContain("doSomething()");
      expect(result.outputText).toContain("console.log(result)");
    });
  });

  // ── Test 5c: Local type declarations preserved ─────────────────────

  describe("local type declarations", () => {
    it("preserves interface used as annotation", () => {
      const input = `\
/** @summary local interface */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("types", () => {
  interface Options {
    timeout: number;
    retries: number;
  }

  it("example", async () => {
    const options: Options = { timeout: 30, retries: 3 };
    const client = new Client(options);
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("interface Options");
      expect(result.outputText).toContain("timeout: number");
      expect(result.outputText).toContain("const options: Options");
    });

    it("preserves type alias used as annotation", () => {
      const input = `\
/** @summary local type alias */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("types", () => {
  type Config = { url: string; key: string };

  it("example", async () => {
    const config: Config = { url: "https://example.com", key: "abc" };
    const client = new Client(config);
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("type Config");
      expect(result.outputText).toContain("url: string");
      expect(result.outputText).toContain("const config: Config");
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
      const result = compileSampleTest(envInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("ENDPOINT");
      expect(result.envVars).toContain("API_KEY");
    });

    it("returns env vars sorted", () => {
      const result = compileSampleTest(envInput, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("MY_VAR");
    });

    it("extracts env vars from process.env destructuring", () => {
      const input = `\
/** @summary destructure env test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env", async () => {
    const { ENDPOINT, API_KEY } = process.env;
    console.log(new Client(ENDPOINT, API_KEY));
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("ENDPOINT");
      expect(result.envVars).toContain("API_KEY");
    });

    it("extracts both dot-access and destructured env vars", () => {
      const input = `\
/** @summary mixed env test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env", async () => {
    const url = process.env.URL || "";
    const { KEY } = process.env;
    console.log(new Client(url, KEY));
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("URL");
      expect(result.envVars).toContain("KEY");
      expect(result.envVars).toHaveLength(2);
    });

    it("extracts env var name from aliased destructuring", () => {
      const input = `\
/** @summary aliased destructure test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env", async () => {
    const { ENDPOINT: endpoint } = process.env;
    console.log(new Client(endpoint));
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("ENDPOINT");
      expect(result.envVars).toHaveLength(1);
    });

    it("extracts env var name from destructuring with default", () => {
      const input = `\
/** @summary default destructure test */
import { Client } from "../src/index.js";
import { describe, it } from "vitest";

describe("env", () => {
  it("use env", async () => {
    const { ENDPOINT = "", API_KEY: key = "none" } = process.env;
    console.log(new Client(ENDPOINT, key));
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.envVars).toContain("ENDPOINT");
      expect(result.envVars).toContain("API_KEY");
      expect(result.envVars).toHaveLength(2);
    });
  });

  // ── Test 7: Error cases ─────────────────────────────────────────

  describe("error cases", () => {
    it("throws CompilerError when description is missing", () => {
      const noSummary = `\
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log("hello");
  });
});
`;
      expect(() =>
        compileSampleTest(noSummary, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/client",
        }),
      ).toThrow(CompilerError);
    });

    it("accepts plain JSDoc description without @summary tag", () => {
      const plainDescription = `\
/** Demonstrates how to say hello without @summary. */
import { describe, it } from "vitest";

describe("hello", () => {
  it("say hello", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(plainDescription, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.metadata.summary).toBe("Demonstrates how to say hello without @summary.");
      expect(result.outputText).toContain(
        "@summary Demonstrates how to say hello without @summary.",
      );
    });

    it("browser platform auto-sets skipJavascript", () => {
      const browserSample = `\
/** Demonstrates browser-specific usage. */
import { describe, it } from "vitest";

describe("browser", () => {
  it("fetch data", async () => {
    const response = await fetch("https://example.com");
    console.log(response.status);
  });
});
`;
      const result = compileSampleTest(browserSample, {
        packageName: "@azure/client",
        platform: "browser",
      });
      expect(result.metadata.skipJavascript).toBe(true);
      expect(result.outputText).toContain("@azsdk-skip-javascript");
    });

    it("node platform does not set skipJavascript", () => {
      const nodeSample = `\
/** Demonstrates Node.js-specific usage. */
import { describe, it } from "vitest";

describe("node", () => {
  it("read file", async () => {
    console.log("hello node");
  });
});
`;
      const result = compileSampleTest(nodeSample, {
        packageName: "@azure/client",
        platform: "node",
      });
      expect(result.metadata.skipJavascript).toBeUndefined();
      expect(result.outputText).not.toContain("@azsdk-skip-javascript");
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
      expect(() =>
        compileSampleTest(blockBody, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/client",
        }),
      ).toThrow(CompilerError);
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
      });
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
      });
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
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
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/client",
        }),
      ).toThrow(CompilerError);
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/client",
        }),
      ).toThrow(/Recorder.*not available after cleanup/);
    });

    it("does not error when forPublishing arrow uses parameter that shadows a dead binding", () => {
      const input = `\
/** @summary parameter shadow test */
import { vi } from "vitest";
import { Client } from "../src/index.js";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("test", () => {
  const mock = vi.fn();

  it("x", async () => {
    const items = [1, 2, 3];
    const doubled = forPublishing(items, () => items.map((mock) => mock * 2));
    console.log(doubled);
  });
});
`;
      // "mock" in the arrow param shadows the dead describe-scope mock — should not false-positive
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("items.map((mock) => mock * 2)");
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("process.env.URL");
    });
  });

  // ── Describe-scope statements (Fix 6) ──────────────────────────────

  describe("describe-scope statements", () => {
    it("preserves describe-scope function used in sample body", () => {
      const input = `\
/** @summary describe-scope function */
import { describe, it } from "vitest";

describe("sample", () => {
  function formatKey(key: string) { return key.toUpperCase(); }
  it("test", async () => {
    const result = formatKey("hello");
    console.log(result);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("formatKey");
    });

    it("eliminates describe-scope function that references a dead binding", () => {
      const input = `\
/** @summary dead describe function */
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it } from "vitest";

describe("sample", () => {
  function createRecorder() { return new Recorder(undefined); }
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).not.toContain("createRecorder");
      expect(result.outputText).not.toContain("Recorder");
    });

    it("preserves describe-scope class used in sample body", () => {
      const input = `\
/** @summary describe-scope class */
import { describe, it } from "vitest";

describe("sample", () => {
  class Formatter { format(s: string) { return s.toUpperCase(); } }
  it("test", async () => {
    const f = new Formatter();
    console.log(f.format("hello"));
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("Formatter");
      expect(result.outputText).toContain("new Formatter()");
    });

    it("eliminates helper call when helper signature references dead type", () => {
      const input = `\
/** @summary helper with dead param type */
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, beforeEach } from "vitest";

describe("sample", () => {
  let recorder: Recorder;
  beforeEach(() => {
    recorder = new Recorder(undefined);
  });
  function logRecorder(r: Recorder) { console.log(r); }
  it("test", async () => {
    logRecorder(recorder);
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      // Both recorder and logRecorder should be eliminated since logRecorder references Recorder type
      expect(result.outputText).not.toContain("recorder");
      expect(result.outputText).not.toContain("logRecorder");
      expect(result.outputText).not.toContain("Recorder");
      expect(result.outputText).toContain('console.log("hello")');
    });

    it("errors when helper call uses dead binding as argument", () => {
      // This tests the case where a live call has a dead argument.
      // The compiler now correctly detects this as tangled (c5-1 fix) because:
      // 1. logThing survives (no type dependencies)
      // 2. logThing(recorder) references both logThing (alive) and recorder (dead)
      // 3. Mixed live/dead refs → tangled → error
      // In practice, test helpers should have typed parameters which causes proper cascade.
      const input = `\
/** @summary helper with any param */
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, beforeEach } from "vitest";

describe("sample", () => {
  let recorder: Recorder;
  beforeEach(() => {
    recorder = new Recorder(undefined);
  });
  function logThing(r: any) { console.log("thing:", r); }
  it("test", async () => {
    logThing(recorder);
    console.log("hello");
  });
});
`;
      expect(() =>
        compileSampleTest(input, {
          isSourceImport: testIsSourceImport,
          packageName: "@azure/client",
        }),
      ).toThrow(/mixes dead bindings.*with live bindings/i);
    });
  });

  // ── Promotion ordering (Fix 7) ────────────────────────────────────

  describe("promotion ordering", () => {
    it("preserves interleaved order of promoted const and preamble statements", () => {
      const input = `\
/** @summary ordering test */
import { Client } from "../src/index.js";
import { describe, it, beforeEach } from "vitest";

describe("sample", () => {
  let endpoint: string;
  let client: any;
  beforeEach(() => {
    endpoint = process.env.ENDPOINT || "default";
    client = new Client(endpoint);
  });
  it("test", async () => {
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      // Both should be promoted to const inside main()
      expect(result.outputText).toContain("const endpoint");
      expect(result.outputText).toContain("const client");
      // endpoint assignment must come before client assignment (order preserved)
      const endpointIdx = result.outputText.indexOf("const endpoint");
      const clientIdx = result.outputText.indexOf("const client");
      expect(endpointIdx).toBeGreaterThanOrEqual(0);
      expect(clientIdx).toBeGreaterThan(endpointIdx);
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
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
      });
      expect(result.outputText).toContain('import type { MyType } from "@azure/foo"');
      expect(result.outputText).toContain('import { MyClient } from "@azure/foo"');
    });
  });

  // ── Browser platform ─────────────────────────────────────────────────

  describe("browser platform", () => {
    it("omits process.exit(1) for browser samples", () => {
      const input = `\
/** @summary browser sample */
import { describe, it } from "vitest";

describe("sample", () => {
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
        platform: "browser",
      });
      expect(result.outputText).not.toContain("process.exit(1)");
      expect(result.outputText).toContain("main().catch((error) => {");
      expect(result.outputText).toContain("console.error(error)");
    });

    it("includes process.exit(1) for node samples", () => {
      const input = `\
/** @summary node sample */
import { describe, it } from "vitest";

describe("sample", () => {
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
        platform: "node",
      });
      expect(result.outputText).toContain("process.exit(1)");
    });

    it("includes process.exit(1) by default (no platform)", () => {
      const input = `\
/** @summary default sample */
import { describe, it } from "vitest";

describe("sample", () => {
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/foo",
      });
      expect(result.outputText).toContain("process.exit(1)");
    });
  });

  // ── afterEach/afterAll hooks ────────────────────────────────────────

  describe("cleanup hooks", () => {
    it("single-it with afterEach uses try/finally", () => {
      const input = `\
/** @summary afterEach test */
import { Client } from "../src/index.js";
import { describe, it, afterEach } from "vitest";

describe("sample", () => {
  let client: Client;
  afterEach(async () => {
    await client.close();
  });
  it("test", async () => {
    client = new Client();
    console.log(client);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("try {");
      expect(result.outputText).toContain("} finally {");
      expect(result.outputText).toContain("await client.close()");
    });

    it("single-it with afterAll uses try/finally", () => {
      const input = `\
/** @summary afterAll test */
import { Pool } from "../src/index.js";
import { describe, it, afterAll } from "vitest";

describe("sample", () => {
  const pool = new Pool();
  afterAll(async () => {
    await pool.dispose();
  });
  it("test", async () => {
    console.log(pool);
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("try {");
      expect(result.outputText).toContain("} finally {");
      expect(result.outputText).toContain("await pool.dispose()");
    });

    it("multi-it with afterEach wraps each call", () => {
      const input = `\
/** @summary multi-it afterEach */
import { Client } from "../src/index.js";
import { describe, it, afterEach } from "vitest";

describe("sample", () => {
  let client: Client;
  afterEach(async () => {
    await client.reset();
  });
  it("first", async () => {
    client = new Client();
    console.log("first");
  });
  it("second", async () => {
    console.log("second");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      // Each function call should be wrapped
      expect(result.outputText).toContain("await first()");
      expect(result.outputText).toContain("await second()");
      // afterEach should appear after each
      const output = result.outputText;
      expect((output.match(/await client\.reset\(\)/g) || []).length).toBe(2);
    });

    it("multi-it with afterAll wraps all in one try/finally", () => {
      const input = `\
/** @summary multi-it afterAll */
import { Pool } from "../src/index.js";
import { describe, it, afterAll } from "vitest";

describe("sample", () => {
  const pool = new Pool();
  afterAll(async () => {
    await pool.dispose();
  });
  it("first", async () => {
    console.log("first");
  });
  it("second", async () => {
    console.log("second");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      expect(result.outputText).toContain("try {");
      expect(result.outputText).toContain("} finally {");
      expect(result.outputText).toContain("await pool.dispose()");
      // afterAll should only appear once
      expect((result.outputText.match(/await pool\.dispose\(\)/g) || []).length).toBe(1);
    });

    it("eliminates afterEach that only uses dead bindings", () => {
      const input = `\
/** @summary dead afterEach */
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, afterEach } from "vitest";

describe("sample", () => {
  let recorder: Recorder;
  afterEach(async () => {
    await recorder.stop();
  });
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      // Dead cleanup should be eliminated, no try/finally needed
      expect(result.outputText).not.toContain("try {");
      expect(result.outputText).not.toContain("recorder.stop");
    });

    it("preserves imports referenced only in cleanup hooks (c5-2)", () => {
      const input = `\
/** @summary import in cleanup only */
import { cleanupHelper } from "./helpers.js";
import { describe, it, afterAll } from "vitest";

describe("sample", () => {
  afterAll(async () => {
    await cleanupHelper();
  });
  it("test", async () => {
    console.log("hello");
  });
});
`;
      const result = compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/client",
      });
      // Import used only in afterAll must survive
      expect(result.outputText).toContain("cleanupHelper");
      expect(result.outputText).toContain('import { cleanupHelper } from "./helpers.js"');
    });
  });
});

// ── beforeAll / afterAll compiler tests ──────────────────────────────

describe("compileSampleTest — beforeAll/afterAll hooks", () => {
  it("beforeAll setup appears in compiled output before beforeEach", () => {
    const input = `\
/** @summary beforeAll ordering */
import { describe, it, beforeAll, beforeEach } from "vitest";
import { MyClient } from "../src/index.js";

describe("test", () => {
  beforeAll(async () => {
    const globalConn = "global";
  });

  beforeEach(async () => {
    const localSetup = "local";
  });

  it("does stuff", async () => {
    const x = 1;
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
    });
    // Both preamble items should appear in output
    expect(result.outputText).toContain("globalConn");
    expect(result.outputText).toContain("localSetup");
    // beforeAll preamble should come before beforeEach preamble
    const globalIdx = result.outputText.indexOf("globalConn");
    const localIdx = result.outputText.indexOf("localSetup");
    expect(globalIdx).toBeLessThan(localIdx);
  });

  it("afterAll cleanup appears in compiled output", () => {
    const input = `\
/** @summary afterAll kept */
import { describe, it, afterAll } from "vitest";
import { MyClient } from "../src/index.js";

describe("test", () => {
  let client: MyClient;

  afterAll(async () => {
    await client.close();
  });

  it("does stuff", async () => {
    client = new MyClient();
    const x = 1;
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
    });
    // afterAll body should appear in output (now supported)
    expect(result.outputText).toContain("await client.close()");
    // Should use try/finally pattern
    expect(result.outputText).toContain("try {");
    expect(result.outputText).toContain("} finally {");
  });
});

// ── F1: let→const promotion skips vars reassigned in it-body ────────

describe("let→const promotion with it-body reassignment", () => {
  it("does not promote let when variable is reassigned in it-body", () => {
    const input = `\
/** @summary reassignment test */
import { Client } from "../src/index.js";
import { describe, it, beforeEach } from "vitest";

describe("test", () => {
  let client: any;
  beforeEach(() => {
    client = new Client("initial");
  });
  it("test", async () => {
    client = new Client("updated");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });
    // Should NOT be promoted to const since it's reassigned in the body
    expect(result.outputText).toContain("let client");
    expect(result.outputText).not.toContain("const client");
  });

  it("preserves describe-scope statement order when non-var statements are interleaved", () => {
    const input = `
import { describe, it } from "vitest";
import { Client } from "@azure/client";

/** @sample @summary interleaved describe scope */
describe("test", () => {
  const config = { url: "https://example.com" };
  console.log("initializing");
  const client = new Client(config.url);
  it("test", async () => {
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });
    // Statement order must be preserved: config → console.log → client
    const configIdx = result.outputText.indexOf("config");
    const logIdx = result.outputText.indexOf('"initializing"');
    const clientIdx = result.outputText.indexOf("new Client");
    expect(configIdx).toBeLessThan(logIdx);
    expect(logIdx).toBeLessThan(clientIdx);
  });
});

// ── C4 edge case: forPublishing with local capture that depends on dead binding ──

describe("compileSampleTest — forPublishing local capture validation", () => {
  it("detects when forPublishing references a binding that depends on dead test infrastructure", () => {
    const input = `
/** @summary test local capture */
import { describe, it, beforeEach } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";

describe("test", () => {
  let recorder: Recorder;
  
  beforeEach(async () => {
    recorder = new Recorder();
    await recorder.start();
  });

  it("x", async () => {
    // recorder is dead (from test infrastructure), so this should fail
    const config = forPublishing("fallback", () => recorder.someConfig);
    console.log(config);
  });
});
`;
    // The recorder variable is declared at describe scope, but its type (Recorder)
    // comes from test infrastructure. When the Recorder import dies, the let binding
    // becomes dead too, so forPublishing should throw because recorder is unavailable.
    expect(() =>
      compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/test",
      }),
    ).toThrow(/recorder.*not available/i);
  });
});

// ── sampleOnly integration tests ─────────────────────────────────────────────

describe("compileSampleTest — sampleOnly integration", () => {
  it("substitutes sampleOnly and removes its import", () => {
    const input = `
/** @summary test sample-only integration */
import { describe, it } from "vitest";
import { sampleOnly } from "@azure-tools/test-publishing";
import { Client } from "../src/index.js";

describe("test", () => {
  it("use client", async () => {
    sampleOnly(() => console.log("Only visible in samples"));
    const client = new Client("https://example.com");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });

    // sampleOnly call is substituted with its body expression
    expect(result.outputText).toContain('console.log("Only visible in samples")');
    // sampleOnly import is removed (it's now dead after substitution)
    expect(result.outputText).not.toContain("sampleOnly");
    expect(result.outputText).not.toContain("test-publishing");
    // Other imports are preserved
    expect(result.outputText).toContain('import { Client } from "@azure/client"');
  });

  it("handles sampleOnly alongside forPublishing", () => {
    // Note: forPublishing requires an expression body, so sampleOnly cannot be nested
    // inside forPublishing's arrow function. Test them together at the same level.
    const input = `
/** @summary test both constructs */
import { describe, it } from "vitest";
import { forPublishing, sampleOnly } from "@azure-tools/test-publishing";
import { Client } from "../src/index.js";

describe("test", () => {
  it("both constructs", async () => {
    sampleOnly(() => console.log("sample-only message"));
    const config = forPublishing("test-value", () => "published-value");
    const client = new Client(config);
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });

    // forPublishing yields "published-value"
    expect(result.outputText).toContain('"published-value"');
    // sampleOnly yields its body
    expect(result.outputText).toContain('console.log("sample-only message")');
    // Both imports are dead after substitution
    expect(result.outputText).not.toContain("forPublishing");
    expect(result.outputText).not.toContain("sampleOnly");
    expect(result.outputText).not.toContain("test-publishing");
  });

  it("handles multiple sampleOnly calls", () => {
    const input = `
/** @summary test multiple sample-only calls */
import { describe, it } from "vitest";
import { sampleOnly } from "@azure-tools/test-publishing";
import { Client } from "../src/index.js";

describe("test", () => {
  it("multiple calls", async () => {
    sampleOnly(() => console.log("First"));
    const client = new Client("https://example.com");
    sampleOnly(() => console.log("Second"));
    console.log(client);
    sampleOnly(() => console.log("Third"));
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });

    // All three sampleOnly calls are substituted
    expect(result.outputText).toContain('console.log("First")');
    expect(result.outputText).toContain('console.log("Second")');
    expect(result.outputText).toContain('console.log("Third")');
    // The import is removed
    expect(result.outputText).not.toContain("sampleOnly");
  });

  it("handles sampleOnly in beforeEach", () => {
    const input = `
/** @summary test sample-only in hook */
import { describe, it, beforeEach } from "vitest";
import { sampleOnly } from "@azure-tools/test-publishing";
import { Client } from "../src/index.js";

describe("test", () => {
  beforeEach(async () => {
    sampleOnly(() => console.log("Sample setup"));
  });

  it("use client", async () => {
    const client = new Client("https://example.com");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });

    // sampleOnly in beforeEach is substituted
    expect(result.outputText).toContain('console.log("Sample setup")');
    // The import is removed
    expect(result.outputText).not.toContain("sampleOnly");
  });

  it("handles sampleOnly referencing external imports", () => {
    const input = `
/** @summary test sample-only with imports */
import { describe, it } from "vitest";
import { sampleOnly } from "@azure-tools/test-publishing";
import { Client } from "../src/index.js";
import { someHelper } from "some-package";

describe("test", () => {
  it("use client", async () => {
    sampleOnly(() => someHelper("sample-only-arg"));
    const client = new Client("https://example.com");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/client",
    });

    // sampleOnly is substituted with its body (which uses someHelper)
    expect(result.outputText).toContain('someHelper("sample-only-arg")');
    // someHelper import is preserved (it's referenced in the output)
    expect(result.outputText).toContain('import { someHelper } from "some-package"');
    // sampleOnly import is removed
    expect(result.outputText).not.toContain("test-publishing");
  });
});
