// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import updateSnippetsCommand from "../src/commands/run/update-snippets.ts";
import { resolveProject } from "../src/util/resolveProject.ts";
import type * as ResolveProjectModule from "../src/util/resolveProject.ts";

vi.mock("../src/util/resolveProject.ts", async (importOriginal) => ({
  ...(await importOriginal<typeof ResolveProjectModule>()),
  resolveProject: vi.fn(),
}));

const roots: string[] = [];

afterAll(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

/**
 * Creates a package whose snippets file has the given text and whose README has a TypeScript and a JavaScript
 * snippet for each of the given snippet names, then updates the snippets.
 */
async function updateReadme(snippets: string, snippetNames: string[]): Promise<string> {
  const root = mkdtempSync(path.join(tmpdir(), "update-snippets-"));
  roots.push(root);
  const files: Record<string, string> = {
    "package.json": JSON.stringify({ name: "@example/pkg", version: "1.0.0" }),
    "src/index.ts": "export class Client {}\nexport function hello(): void {}\n",
    "test/snippets.spec.ts": snippets,
    "README.md": [
      "# Example",
      "",
      ...snippetNames.flatMap((name) => [
        `\`\`\`ts snippet:${name}`,
        "placeholder",
        "```",
        "",
        `\`\`\`js snippet:${name}`,
        "placeholder",
        "```",
        "",
      ]),
    ].join("\n"),
  };
  for (const [file, text] of Object.entries(files)) {
    const target = path.join(root, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, text);
  }
  vi.mocked(resolveProject).mockResolvedValue({
    name: "@example/pkg",
    version: "1.0.0",
    path: root,
    packageJson: {} as never,
  });

  expect(await updateSnippetsCommand()).toBe(true);

  return readFileSync(path.join(root, "README.md"), "utf8").replace(/\r\n/g, "\n");
}

describe("update-snippets", () => {
  it("writes each snippet in TypeScript and JavaScript, importing the symbols it uses", async () => {
    const readme = await updateReadme(
      [
        'import { describe, it } from "vitest";',
        'import { DefaultAzureCredential } from "@azure/identity";',
        'import { Client, hello } from "../src/index.js";',
        "",
        'describe("snippets", () => {',
        '  it("Basic", async () => {',
        "    const credential = new DefaultAzureCredential();",
        "    const client = new Client();",
        "    hello();",
        "  });",
        "});",
        "",
      ].join("\n"),
      ["Basic"],
    );

    expect(readme).toContain(
      [
        "```ts snippet:Basic",
        'import { DefaultAzureCredential } from "@azure/identity";',
        'import { Client, hello } from "@example/pkg";',
        "",
        "const credential = new DefaultAzureCredential();",
        "const client = new Client();",
        "hello();",
        "```",
      ].join("\n"),
    );
    // The JavaScript snippet has the same imports and statements.
    expect(readme).toContain(
      [
        "```js snippet:Basic",
        'import { DefaultAzureCredential } from "@azure/identity";',
        'import { Client, hello } from "@example/pkg";',
        "",
        "const credential = new DefaultAzureCredential();",
        "const client = new Client();",
      ].join("\n"),
    );
  });

  it("keeps comments, drops blank lines unless marked, and drops comments after the last statement", async () => {
    const readme = await updateReadme(
      [
        'import { describe, it } from "vitest";',
        'import { Client } from "../src/index.js";',
        "",
        'describe("snippets", () => {',
        '  it("Comments", async () => {',
        "    // Create the client",
        "    const client = new Client();",
        "",
        "    const other = new Client(); // trailing",
        "    // @ts-preserve-whitespace",
        "    // Use the clients",
        "    console.log(client, other);",
        "    // Nothing follows",
        "  });",
        "});",
        "",
      ].join("\n"),
      ["Comments"],
    );

    expect(readme).toContain(
      [
        "```ts snippet:Comments",
        'import { Client } from "@example/pkg";',
        "",
        "// Create the client",
        "const client = new Client();",
        "const other = new Client(); // trailing",
        "",
        "// Use the clients",
        "console.log(client, other);",
        "```",
      ].join("\n"),
    );
  });

  // KNOWN GAP in the TypeScript 7.1 API: the printer prints a number from its value, so `1.0` comes out as `1` and
  // `0xFF` as `255`. This test fails until the API can print the text of a literal as written.
  it.fails("keeps numbers as they are written", async () => {
    const readme = await updateReadme(
      [
        'import { describe, it } from "vitest";',
        "",
        'describe("snippets", () => {',
        '  it("Numbers", async () => {',
        "    const ratio = 1.0;",
        "    const mask = 0xff;",
        "    console.log(ratio, mask);",
        "  });",
        "});",
        "",
      ].join("\n"),
      ["Numbers"],
    );

    expect(readme).toContain("const ratio = 1.0;\nconst mask = 0xff;");
  });

  it("keeps non-ASCII characters in comments and literals where they are", async () => {
    const readme = await updateReadme(
      [
        'import { describe, it } from "vitest";',
        'import { Client } from "../src/index.js";',
        "",
        "// A header with a “curly” quote and an emoji 😀",
        'describe("snippets", () => {',
        '  it("Unicode", async () => {',
        "    // It’s a client for naïve users",
        "    const client = new Client();",
        '    const greeting = "héllo wörld 😀";',
        "    // @ts-preserve-whitespace",
        "    // “Quoted” — and dashed",
        "    console.log(client, greeting);",
        "  });",
        "});",
        "",
      ].join("\n"),
      ["Unicode"],
    );

    expect(readme).toContain(
      [
        "```ts snippet:Unicode",
        'import { Client } from "@example/pkg";',
        "",
        "// It’s a client for naïve users",
        "const client = new Client();",
        'const greeting = "héllo wörld 😀";',
        "",
        "// “Quoted” — and dashed",
        "console.log(client, greeting);",
        "```",
      ].join("\n"),
    );
  });
});
