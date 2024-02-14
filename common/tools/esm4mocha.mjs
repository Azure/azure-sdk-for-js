// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { readFile, stat, constants } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "url";
import { Project } from "./dev-tool/node_modules/ts-morph/dist/ts-morph.js";

// if modules are loaded from dist-esm/ treat them as ESM
export async function resolve(specifier, context, defaultResolve) {
  consoleDir({ label: "resolving", specifier, context });
  const resolved = await defaultResolve(specifier, context, defaultResolve);
  consoleDir({ resolved });
  if (resolved.url.includes("dist-esm/")) {
    resolved.format = "module";
  }
  return resolved;
}

// if modules are loaded from dist-esm/ transform code to have ".js" extension
// for relative imports/exports as that is required by ESM.
export async function load(url, context, defaultLoad) {
  consoleDir({ label: "loading...", url, context });
  if (url.includes("dist-esm/")) {
    const path = fileURLToPath(url);
    const source = await readFile(path);
    const transformed = await addJsExtensionToRelativeModules(source, path);
    return {
      format: context.format,
      source: transformed,
      shortCircuit: true,
    };
  }
  const { source } = await defaultLoad(url, context, defaultLoad);
  const format = url.startsWith("node:") ? "builtin" : context.format;
  return { format, source, shortCircuit: true };
}

async function updateSpecifierValueIfRelative(declaration, base) {
  const specifierValue = declaration.getModuleSpecifierValue();
  consoleDir({ base, specifierValue });
  if (specifierValue?.startsWith(".")) {
    const sourcePath = join(base, specifierValue);
    try {
      const s = await stat(sourcePath, constants.R_OK);
      consoleDir({ sourcePath });
      if (s.isDirectory()) {
        declaration.setModuleSpecifier(`${specifierValue}/index.js`);
      } else {
        declaration.setModuleSpecifier(`${specifierValue}.js`);
      }
    } catch (ex) {
      consoleDir({ error: ex });
      declaration.setModuleSpecifier(`${specifierValue}.js`);
    }
    consoleLog(`  specifier updated to ${declaration.getModuleSpecifierValue()}`);
  }
}

async function addJsExtensionToRelativeModules(source, path) {
  const base = dirname(path);
  const project = new Project({ useInMemoryFileSystem: true });
  const text = source.toString("utf-8");
  const f = project.createSourceFile("file.ts", text);
  const imports = f.getImportDeclarations();
  const exports = f.getExportDeclarations();
  consoleDir({
    l: "input",
    path,
    head: text.substring(0, 1200),
    imports: imports.map((i) => i.getText()),
    exports: exports.map((e) => e.getText()),
  });
  for (const i of imports) {
    await updateSpecifierValueIfRelative(i, base);
  }
  for (const e of exports) {
    await updateSpecifierValueIfRelative(e, base);
  }

  consoleDir({ l: "output", head: f.getFullText().substring(0, 1200) });
  return f.getFullText();
}

function consoleLog(...args) {
  if (process.env.DEBUG && process.env.DEBUG.startsWith("esm4mocha")) {
    console.log(args);
  }
}

function consoleDir(...args) {
  if (process.env.DEBUG && process.env.DEBUG.startsWith("esm4mocha")) {
    console.dir(args);
  }
}
