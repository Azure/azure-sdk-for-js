// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { assert, describe, expect, it } from "vitest";

const examples = [
  {
    file: ["agents", "agentVoiceRealtimeAudio.ts"],
    variables: ["adjacentInput", "inputPath"],
    selected: "inputPath",
    asset: "input.pcm",
    published: true,
  },
  {
    file: ["agents", "agentVoiceLiveAudio.ts"],
    variables: ["adjacentInput", "inputPath"],
    selected: "inputPath",
    asset: "input.pcm",
    published: false,
  },
];
const layouts = [
  { name: "source ESM", read: ["samples-dev"], runtime: ["samples-dev"], language: "source" },
  {
    name: "published TypeScript",
    read: ["samples", "v2", "typescript", "src"],
    runtime: ["samples", "v2", "typescript", "src"],
    language: "typescript",
  },
  {
    name: "compiled TypeScript layout",
    read: ["samples", "v2", "typescript", "src"],
    runtime: ["samples", "v2", "typescript", "dist"],
    language: "typescript",
  },
  {
    name: "published CommonJS",
    read: ["samples", "v2", "javascript"],
    runtime: ["samples", "v2", "javascript"],
    language: "javascript",
  },
];

function selectAsset(
  sourceFile: string,
  runtimeFile: string,
  example: (typeof examples)[number],
): string | URL {
  const source = ts.createSourceFile(
    sourceFile,
    readFileSync(sourceFile, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const main = source.statements.find(
    (statement): statement is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === "main",
  );
  assert.ok(main?.body);
  const declarations = main.body.statements.filter(
    (statement) =>
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.some(
        (declaration) =>
          ts.isIdentifier(declaration.name) && example.variables.includes(declaration.name.text),
      ),
  );
  assert.isNotEmpty(declarations);
  // Evaluate only the sample's asset-selection statements, never its SDK/network setup.
  const selection = declarations
    .map((statement) => statement.getText(source))
    .join("\n")
    .replaceAll("import.meta.url", "moduleUrl");
  const compiled = ts.transpileModule(`${selection}\n${example.selected};`, {
    compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
    reportDiagnostics: true,
  });
  expect(compiled.diagnostics).toEqual([]);
  const selected: unknown = runInNewContext(
    compiled.outputText,
    {
      moduleUrl: pathToFileURL(runtimeFile).href,
      __filename: runtimeFile,
      fileURLToPath,
      URL,
      path,
      fs: { existsSync },
      existsSync,
      process: { env: {} },
      require: (name: string) => {
        expect(name).toBe("node:url");
        return { pathToFileURL };
      },
    },
    { filename: sourceFile, timeout: 1000 },
  );
  assert.ok(typeof selected === "string" || selected instanceof URL);
  return selected;
}

describe("Voice sample asset paths", () => {
  for (const example of examples) {
    it.each(layouts.filter((layout) => example.published || layout.language === "source"))(
      `${example.file.at(-1)} resolves its shipped asset in $name`,
      (layout) => {
        const sourceSegments = [...example.file];
        if (layout.language === "javascript") {
          sourceSegments[sourceSegments.length - 1] = sourceSegments
            .at(-1)!
            .replace(/\.ts$/, ".js");
        }
        const runtimeSegments = [...sourceSegments];
        if (layout.name === "compiled TypeScript layout") {
          runtimeSegments[runtimeSegments.length - 1] = runtimeSegments
            .at(-1)!
            .replace(/\.ts$/, ".js");
        }
        const sourceFile = path.join(process.cwd(), ...layout.read, ...sourceSegments);
        const runtimeFile = path.join(process.cwd(), ...layout.runtime, ...runtimeSegments);
        const selected = selectAsset(sourceFile, runtimeFile, example);
        const selectedPath = selected instanceof URL ? fileURLToPath(selected) : selected;
        const assetRoot =
          layout.language === "source"
            ? path.join(process.cwd(), "samples-dev")
            : path.join(process.cwd(), "samples", "v2", layout.language);
        const expected = path.join(assetRoot, "agents", "assets", example.asset);
        expect(existsSync(selectedPath), selectedPath).toBe(true);
        expect(realpathSync(selectedPath)).toBe(realpathSync(expected));
        const digest = (file: string): string =>
          createHash("sha256").update(readFileSync(file)).digest("hex");
        expect(digest(selectedPath)).toBe(
          digest(path.join(process.cwd(), "samples-dev", "agents", "assets", example.asset)),
        );
      },
    );
  }
});
