import { existsSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import { SourceFile } from "ts-morph";

export default function fixSourceFile(sourceFile: SourceFile): void {
  const sourceLinesToRemove = [
    "const should = chai.should();",
    "chai.use(chaiAsPromised);",
    "chai.use(chaiExclude);",
    "const expect = chai.expect;",
    "dotenv.config();",
  ];
  // Iterate over all the statements in the source file
  for (const statement of sourceFile.getStatements()) {
    // Remove old legacy lines
    for (const line of sourceLinesToRemove) {
      if (statement.getText() === line) {
        statement.remove();
      }
    }
  }

  for (const statement of sourceFile.getStatements()) {
    const patternsToReplace = [
      { pattern: /\(this: Suite\)/g, replace: "(ctx)" },
      { pattern: /\(this: Context\)/g, replace: "(ctx)" },
      { pattern: /\(this\.currentTest\)/g, replace: "(ctx)" },
      { pattern: /\(!this\.currentTest\?\.isPending\(\)\)/g, replace: "(!ctx.task.pending)" },
      { pattern: /this\.skip\(\);/g, replace: "ctx.skip();" },
      {
        pattern: /import\s+(?:\*\s+as\s+dotenv|dotenv)\s+from\s+"dotenv";/g,
        replace: 'import "dotenv/config";',
      },
    ];

    // Replace the patterns in the source file
    for (const { pattern, replace } of patternsToReplace) {
      if (pattern.test(statement.getText())) {
        statement.replaceWithText(statement.getText().replace(pattern, replace));
      }
    }
  }

  // Iterate over all the import declarations
  for (const importExportDeclaration of sourceFile.getImportDeclarations()) {
    let moduleSpecifier = importExportDeclaration.getModuleSpecifierValue();
    moduleSpecifier = fixDeclaration(sourceFile, moduleSpecifier);
    importExportDeclaration.setModuleSpecifier(moduleSpecifier);
  }

  // iterate over all the export declarations
  for (const exportDeclaration of sourceFile.getExportDeclarations()) {
    let moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
    if (moduleSpecifier) {
      moduleSpecifier = fixDeclaration(sourceFile, moduleSpecifier);
      exportDeclaration.setModuleSpecifier(moduleSpecifier);
    }
  }
}

function fixDeclaration(sourceFile: SourceFile, moduleSpecifier: string): string {
  if (moduleSpecifier.startsWith(".") || moduleSpecifier.startsWith("..")) {
    if (!moduleSpecifier.endsWith(".js")) {
      // If the module specifier ends with "/", add "index.js", otherwise add ".js"
      if (moduleSpecifier.endsWith("/")) {
        moduleSpecifier += "index.js";
      } else {
        // Check if the module specifier is a directory
        const path = resolve(sourceFile.getDirectoryPath(), moduleSpecifier);
        if (existsSync(path) && lstatSync(path).isDirectory()) {
          moduleSpecifier += "/index.js";
        } else {
          moduleSpecifier += ".js";
        }
      }
    }
  }
  // Fix the node module declaration as well
  return fixNodeDeclaration(moduleSpecifier);
}

function fixNodeDeclaration(moduleSpecifier: string): string {
  const nodeModules = [
    "assert",
    "buffer",
    "child_process",
    "crypto",
    "events",
    "fs",
    "fs/promises",
    "http",
    "https",
    "net",
    "os",
    "path",
    "process",
    "stream",
    "tls",
    "util",
  ];

  if (nodeModules.includes(moduleSpecifier)) {
    moduleSpecifier = `node:${moduleSpecifier}`;
  }

  return moduleSpecifier;
}
