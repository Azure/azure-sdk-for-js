// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseSnippetDefinitions } from "../src/commands/run/update-snippets.js";

/**
 * Creates a minimal ProjectInfo-like object for testing.
 * `parseSnippetDefinitions` only uses `project.path` and `project.name`.
 */
function makeProject(dir: string): { path: string; name: string } {
  return { path: dir, name: "@azure/test-package" };
}

/** Read the TypeScript text of a snippet by name from the parsed definitions map. */
async function getSnippetText(
  defs: Map<string, { typescriptSourceText: Promise<string[]> }>,
  name: string,
): Promise<string> {
  const def = defs.get(name);
  if (!def) throw new Error(`Snippet "${name}" not found`);
  return (await def.typescriptSourceText).join("\n");
}

describe("update-snippets: forPublishing substitution in @snippet blocks", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(os.tmpdir(), "update-snippets-test-"));
    // Create the required directory structure
    await mkdir(path.join(tmpDir, "test", "public", "samples", "node"), { recursive: true });
    await mkdir(path.join(tmpDir, "src"), { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("resolves forPublishing to its published expression inside a marker @snippet", async () => {
    await writeFile(
      path.join(tmpDir, "test", "public", "samples", "node", "hello.spec.ts"),
      `
import { forPublishing } from "@azure-tools/test-publishing";

describe("hello", () => {
  it("create a key", async () => {
    // @snippet ReadmeSampleCreateKey
    const keyName = forPublishing("TestKey", () => \`MyKey-\${Date.now()}\`);
    const result = keyName;
    console.log("result:", result);
    // @snippet-end ReadmeSampleCreateKey
  });
});
`,
    );

    const defs = await parseSnippetDefinitions(makeProject(tmpDir) as any);
    const text = await getSnippetText(defs, "ReadmeSampleCreateKey");

    // forPublishing call is replaced by the published arrow body
    expect(text).toContain("MyKey-");
    expect(text).toContain("Date.now()");
    // The test value "TestKey" and the forPublishing wrapper must NOT appear
    expect(text).not.toContain("forPublishing");
    expect(text).not.toContain('"TestKey"');
  });

  it("does not import @azure-tools/test-publishing in the generated snippet", async () => {
    await writeFile(
      path.join(tmpDir, "test", "public", "samples", "node", "hello.spec.ts"),
      `
import { forPublishing } from "@azure-tools/test-publishing";

describe("hello", () => {
  it("do work", async () => {
    // @snippet ReadmeSampleDoWork
    const url = forPublishing("http://test.example.com", () => process.env["SERVICE_URL"]!);
    console.log("url:", url);
    // @snippet-end ReadmeSampleDoWork
  });
});
`,
    );

    const defs = await parseSnippetDefinitions(makeProject(tmpDir) as any);
    const text = await getSnippetText(defs, "ReadmeSampleDoWork");

    expect(text).not.toContain("test-publishing");
    expect(text).not.toContain("forPublishing");
  });

  it("preserves code outside the forPublishing call in the same snippet", async () => {
    await writeFile(
      path.join(tmpDir, "test", "public", "samples", "node", "hello.spec.ts"),
      `
import { forPublishing } from "@azure-tools/test-publishing";

describe("hello", () => {
  it("create and log", async () => {
    // @snippet ReadmeSampleCreateAndLog
    const keyName = forPublishing("TestKey", () => "MyKey");
    const result = await Promise.resolve(keyName);
    console.log("result:", result);
    // @snippet-end ReadmeSampleCreateAndLog
  });
});
`,
    );

    const defs = await parseSnippetDefinitions(makeProject(tmpDir) as any);
    const text = await getSnippetText(defs, "ReadmeSampleCreateAndLog");

    expect(text).toContain("MyKey");
    expect(text).toContain('console.log("result:", result)');
    expect(text).not.toContain("forPublishing");
  });

  it("handles a spec with no forPublishing calls normally", async () => {
    await writeFile(
      path.join(tmpDir, "test", "public", "samples", "node", "hello.spec.ts"),
      `
describe("hello", () => {
  it("plain snippet", async () => {
    // @snippet ReadmeSamplePlain
    const x = 42;
    console.log("x:", x);
    // @snippet-end ReadmeSamplePlain
  });
});
`,
    );

    const defs = await parseSnippetDefinitions(makeProject(tmpDir) as any);
    const text = await getSnippetText(defs, "ReadmeSamplePlain");

    expect(text).toContain("const x = 42");
    expect(text).toContain('console.log("x:", x)');
  });

  it("handles multiple forPublishing calls in the same snippet", async () => {
    await writeFile(
      path.join(tmpDir, "test", "public", "samples", "node", "hello.spec.ts"),
      `
import { forPublishing } from "@azure-tools/test-publishing";

describe("hello", () => {
  it("two calls", async () => {
    // @snippet ReadmeSampleTwoCalls
    const name = forPublishing("TestName", () => "ProductionName");
    const url = forPublishing("http://test", () => process.env["URL"]!);
    console.log(name, url);
    // @snippet-end ReadmeSampleTwoCalls
  });
});
`,
    );

    const defs = await parseSnippetDefinitions(makeProject(tmpDir) as any);
    const text = await getSnippetText(defs, "ReadmeSampleTwoCalls");

    expect(text).toContain("ProductionName");
    expect(text).toContain('process.env["URL"]!');
    expect(text).not.toContain("forPublishing");
    expect(text).not.toContain("TestName");
  });
});
