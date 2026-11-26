// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { parseSnippetDefinitions } from "../src/commands/run/update-snippets.ts";

describe("snippet imports", { timeout: 50000 }, () => {
  it.each([
    'import { Runner, type Options } from "../src";',
    'import { Runner } from "../src"; import type { Options } from "../src";',
    'import { Runner } from "../src"; import type Options from "../src";',
  ])("preserves type-only imports: %s", async (imports) => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "snippet-imports-"));
    try {
      await mkdir(path.join(dir, "test"));
      await writeFile(
        path.join(dir, "test", "snippets.spec.ts"),
        `${imports}
it("configure", () => {
  const options: Options = {};
  new Runner(options);
});`,
      );
      const snippets = await parseSnippetDefinitions({ name: "@azure/example", path: dir });
      const source = (await snippets.get("configure")!.typescriptSourceText).join("\n");
      expect(source).toContain('from "@azure/example"');
      expect(source).toMatch(/(?:type Options|import type Options)/);
      const emitted = ts.transpileModule(source, {
        compilerOptions: { verbatimModuleSyntax: true, module: ts.ModuleKind.ESNext },
      }).outputText;
      expect(emitted).toContain('import { Runner } from "@azure/example"');
      expect(emitted).not.toContain("Options");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
