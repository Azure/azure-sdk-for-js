import { SourceFile, SyntaxKind, Node } from "ts-morph";
import * as ts from "typescript"; // For using TypeScript factory methods

/**
 * Replaces usages of `assert.supportsTracing` with `expect(...).toSupportTracing(...)`
 * and adds the necessary import statements if needed.
 *
 * Examples:
 *
 * 1. await assert.supportsTracing(async () => { ... }, ["methodName"]) => await expect(async () => { ... }).toSupportTracing(["methodName"])
 * 2. await assert.supportsTracing(async () => { ... }, ["methodName", "methodName2"]) => await expect(async () => { ... }).toSupportTracing(["methodName", "methodName2"])
 *
 * An import for `expect` from "vitest" and `toSupportTracing` from "@azure-tools/test-utils-vitest" will be added if not already present. The two will be wired together using `expect.extend({ toSupportTracing })`.
 */
export default function replaceSupportTracing(sourceFile: SourceFile) {
  // Step 1: Check for any instances of `assert.supportsTracing`
  const supportsTracingExists = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .some((callExpression) => {
      const callee = callExpression.getExpression();
      return (
        callee &&
        Node.isPropertyAccessExpression(callee) &&
        Node.isIdentifier(callee.getExpression()) &&
        callee.getExpression().getText() === "assert" &&
        callee.getName() === "supportsTracing"
      );
    });

  // If no instances of `supportsTracing` exist, return the original source
  if (!supportsTracingExists) {
    return;
  }

  // Step 2: Ensure `expect.extend({ toSupportTracing })` is added
  const extendExists = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .some((callExpression) => {
      const callee = callExpression.getExpression();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const calleeCompilerNode = callee.compilerNode as any;
      if (callee && ts.isPropertyAccessExpression(calleeCompilerNode)) {
        return (
          ts.isIdentifier(calleeCompilerNode.expression) &&
          calleeCompilerNode.expression.text === "expect" &&
          calleeCompilerNode.name.text === "extend"
        );
      }
      return false;
    });

  if (!extendExists) {
    const extendCode = `expect.extend({ toSupportTracing })`;

    // Insert `expect.extend({ toSupportTracing })` after the last import statement
    const lastImport = sourceFile.getLastChildByKind(SyntaxKind.ImportDeclaration);
    if (lastImport) {
      sourceFile.insertStatements(lastImport.getChildIndex() + 1, [extendCode]);
    }
  }

  // Step 3: Ensure `expect` is imported from "vitest"
  const expectImportExists = sourceFile
    .getImportDeclarations()
    .some((importDeclaration) => importDeclaration.getModuleSpecifierValue() === "vitest");

  if (!expectImportExists) {
    sourceFile.addImportDeclaration({
      defaultImport: undefined,
      namedImports: [{ name: "expect" }],
      moduleSpecifier: "vitest",
    });
  }

  // Step 4: Replace `await assert.supportsTracing(...)` with `await expect(...).toSupportTracing(...)`
  sourceFile.forEachDescendant((node, traversal) => {
    if (node.isKind(SyntaxKind.AwaitExpression)) {
      const expression = node.getExpression();
      if (Node.isCallExpression(expression)) {
        const callExpression = expression.asKindOrThrow(SyntaxKind.CallExpression);
        const callee = callExpression.getExpression();

        if (
          Node.isPropertyAccessExpression(callee) &&
          Node.isIdentifier(callee.getExpression()) &&
          callee.getExpression().getText() === "assert" &&
          callee.getName() === "supportsTracing"
        ) {
          const args = callExpression.getArguments();
          const asyncFunction = args[0];
          const methodArray = args[1];

          // Create new `await expect(...).toSupportTracing(...)` structure
          node.transform(() => {
            return ts.factory.createAwaitExpression(
              ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                  ts.factory.createCallExpression(
                    ts.factory.createIdentifier("expect"),
                    undefined,
                    [asyncFunction.compilerNode as ts.Expression],
                  ),
                  ts.factory.createIdentifier("toSupportTracing"),
                ),
                undefined,
                [methodArray.compilerNode as ts.Expression],
              ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any;
          });

          // Skip all children of the current node as it was already transformed
          traversal.skip();
        }
      }
    }
  });

  // Step 5: Ensure import statement for `toSupportTracing` is added after existing imports
  const toSupportTracingImportExists = sourceFile
    .getImportDeclarations()
    .some(
      (importDeclaration) =>
        importDeclaration.getModuleSpecifierValue() === "@azure-tools/test-utils-vitest",
    );

  if (!toSupportTracingImportExists) {
    sourceFile.addImportDeclaration({
      defaultImport: undefined,
      namedImports: [{ name: "toSupportTracing" }],
      moduleSpecifier: "@azure-tools/test-utils-vitest",
    });
  }
}
