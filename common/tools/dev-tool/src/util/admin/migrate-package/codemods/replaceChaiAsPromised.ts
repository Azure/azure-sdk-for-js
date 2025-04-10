import { SourceFile, SyntaxKind, Node } from "ts-morph";
import ts from "typescript"; // For using TypeScript factory methods

/**
 * Converts usages of `assert.isRejected` from chai-as-promised to `expect(...).rejects.toThrow(...)`
 *
 * Examples:
 *
 * 1. await assert.isRejected(promise, error) => await expect(promise).rejects.toThrow(error)
 * 2. await assert.isRejected(promise, "errorMessage") => await expect(promise).rejects.toThrow("errorMessage")
 * 3. await assert.isRejected(promise) => await expect(promise).rejects.toThrow()
 *
 * Does _not_ handle cases where `assert.isRejected` is not `await`ed which is an incorrect usage anyway.
 */
export default function replaceAssertIsRejected(sourceFile: SourceFile) {
  // Step 1: Iterate over all AwaitExpression nodes in the source file
  sourceFile.forEachDescendant((node, traversal) => {
    if (node.isKind(SyntaxKind.AwaitExpression)) {
      const expression = node.getExpression();

      // Ensure it's a CallExpression: await assert.isRejected(...)
      if (expression && expression.getKind() === SyntaxKind.CallExpression) {
        const callExpression = expression.asKindOrThrow(SyntaxKind.CallExpression);
        const callee = callExpression.getExpression();

        // Step 2: Ensure the call is assert.isRejected(...)
        if (
          callee.getKind() === SyntaxKind.PropertyAccessExpression &&
          Node.isPropertyAccessExpression(callee) &&
          Node.isIdentifier(callee.getExpression()) &&
          callee.getExpression().getText() === "assert" &&
          callee.getName() === "isRejected"
        ) {
          const args = callExpression.getArguments();

          // Step 3: Create the new call: expect(arg1).rejects.toThrow(arg2)
          const expectCall = ts.factory.createCallExpression(
            ts.factory.createIdentifier("expect"),
            undefined,
            [args[0].compilerNode as ts.Expression],
          );

          const rejectsAccess = ts.factory.createPropertyAccessExpression(
            expectCall,
            ts.factory.createIdentifier("rejects"),
          );

          node.transform(() => {
            // Step 4: Create the new call: expect(arg1).rejects.toThrow(arg2)
            return ts.factory.createAwaitExpression(
              ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                  rejectsAccess,
                  ts.factory.createIdentifier("toThrow"),
                ),
                undefined,
                args.length > 1 ? [args[1].compilerNode as ts.Expression] : [], // Pass second argument if provided
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
}
