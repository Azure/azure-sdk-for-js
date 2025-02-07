import { existsSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import { CallExpression, FunctionExpression, SourceFile, SyntaxKind } from "ts-morph";

export default function fixSourceFile(sourceFile: SourceFile): void {
  removeLegacyStatements(sourceFile);
  fixVitestMethods(sourceFile);
  fixLegacyStatements(sourceFile);
  fixArrowFunctions(sourceFile);
  fixFunctionReturnTypes(sourceFile);

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

function fixFunctionReturnTypes(sourceFile: SourceFile): void {
  const functionDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration);

  for (const funcDecl of functionDeclarations) {
    if (
      funcDecl.getModifiers().some((mod) => mod.getText() === "async") &&
      !funcDecl.getReturnTypeNode()
    ) {
      funcDecl.setReturnType("Promise<void>");
    }
  }
}

function fixLegacyStatements(sourceFile: SourceFile): void {
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
}

function removeLegacyStatements(sourceFile: SourceFile): void {
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
}

function fixVitestMethods(sourceFile: SourceFile): void {
  // Find all 'it' and 'it.skip' call expressions and check for 'timeout'
  const itCalls = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter((callExpr: CallExpression) => {
      const exprText = callExpr.getExpression().getText();
      return exprText === "it" || exprText === "it.skip";
    });

  for (const itCall of itCalls) {
    const timeoutCall = itCall
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .find((callExpr: CallExpression) => callExpr.getExpression().getText() === "timeout");

    if (timeoutCall) {
      const timeoutValue = timeoutCall.getArguments()[0].getText();
      const itArguments = itCall.getArguments();
      const testName = itArguments[0].getText();
      const testFunction = itArguments[1].getText();

      // Replace the 'it' call with the new format
      itCall.replaceWithText(`it(${testName}, { timeout: ${timeoutValue} }, ${testFunction});`);
    }
  }
}

function fixArrowFunctions(sourceFile: SourceFile): void {
  // Replace 'function' with arrow functions in 'beforeEach' and 'afterEach' calls
  const lifecycleMethods = ["beforeEach", "afterEach"];
  for (const method of lifecycleMethods) {
    const methodCalls = sourceFile
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .filter((callExpr: CallExpression) => callExpr.getExpression().getText() === method);

    for (const methodCall of methodCalls) {
      const funcExpr = methodCall.getArguments()[0] as FunctionExpression;
      if (funcExpr && funcExpr.getKind() === SyntaxKind.FunctionExpression) {
        const params = funcExpr
          .getParameters()
          .map((param) => param.getText())
          .join(", ");
        const body = funcExpr.getBody().getText();
        methodCall.getArguments()[0].replaceWithText(`async (${params}) => ${body}`);
      }
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
