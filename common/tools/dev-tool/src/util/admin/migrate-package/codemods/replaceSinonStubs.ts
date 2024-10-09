import { SourceFile, SyntaxKind, Node } from "ts-morph";
import * as ts from "typescript"; // For using TypeScript factory methods

/**
 * Replaces usages of `sinon.stub` with `vi.spyOn` and `sinon.restore` with `vi.restoreAllMocks`
 *
 * Examples:
 *
 * 1. sinon.stub(obj, "methodName").returns(someValue) => vi.spyOn(obj, "methodName").mockReturnValue(someValue)
 * 2. sinon.stub(obj, "methodName").resolves(someValue) => vi.spyOn(obj, "methodName").mockResolvedValue(someValue)
 * 3. sinon.stub(obj, "methodName").throwsException(someError) => vi.spyOn(obj, "methodName").mockRejectedValue(someError)
 * 4. sinon.restore() => vi.restoreAllMocks()
 * 5. sandbox.restore() => vi.restoreAllMocks()
 */
export default function replaceSinonStub(sourceFile: SourceFile) {
  // Helper function to perform a case-insensitive check for the 'sinon' identifier
  const isSinonIdentifier = (identifier: string) =>
    identifier.toLowerCase() === "sinon" || identifier.toLowerCase() === "sandbox";

  // Step 1: Replace `sinon.stub(arg1, "methodName").returns(someValue)`
  // with `vi.spyOn(arg1, "methodName").mockReturnValue(someValue)`

  sourceFile.forEachDescendant((node, traversal) => {
    if (node.isKind(SyntaxKind.CallExpression)) {
      const callee = node.getExpression();
      // Check if the callee is a PropertyAccessExpression with 'sinon' and 'stub'
      if (
        Node.isPropertyAccessExpression(callee) &&
        isSinonIdentifier(callee.getExpression().getText()) &&
        callee.getName() === "stub"
      ) {
        const args = node.getArguments();
        if (args.length < 2) return; // Ensure we have enough arguments

        const obj = args[0].getText(); // Extract text before replacing the node
        const methodName = args[1].getText(); // Extract text before replacing the node

        const parent = node.getParentIfKind(SyntaxKind.PropertyAccessExpression);
        const methodNameAfterStub = parent?.getName();

        if (methodNameAfterStub === "returns" || methodNameAfterStub === "resolves") {
          const returnsCall = parent?.getParentIfKind(SyntaxKind.CallExpression);
          if (returnsCall && returnsCall.getArguments().length > 0) {
            const returnValue = returnsCall.getArguments()[0].getText(); // Extract the text
            const vitestMethod =
              methodNameAfterStub === "returns" ? "mockReturnValue" : "mockResolvedValue";

            // Replace the entire call chain (stub + returns) with spyOn + mockReturnValue
            // or spyOn + mockResolvedValue depending on the method name
            returnsCall.replaceWithText(`
            vi.spyOn(${obj}, ${methodName})
            .${vitestMethod}(${returnValue})
          `);

            // Skip all children of the current node as it was already transformed
            traversal.skip();
          }
        } else if (methodNameAfterStub === "throwsException") {
          const throwsCall = parent?.getParentIfKind(SyntaxKind.CallExpression);
          if (throwsCall && throwsCall.getArguments().length > 0) {
            const errorValue = throwsCall.getArguments()[0].getText(); // Extract the text

            // Replace the entire call chain (stub + throwsException) with spyOn + mockRejectedValue
            throwsCall.replaceWithText(`
            vi.spyOn(${obj}, ${methodName})
            .mockRejectedValue(${errorValue})
          `);

            // Skip all children of the current node as it was already transformed
            traversal.skip();
          }
        } else if (methodNameAfterStub === undefined) {
          // Replace the entire call chain (sinon.stub) with spyOn
          node.replaceWithText(`vi.spyOn(${obj}, ${methodName})`);

          // Skip all children of the current node as it was already transformed
          traversal.skip();
        }
      } else if (
        ts.isPropertyAccessExpression(callee.compilerNode) &&
        isSinonIdentifier(callee.compilerNode.expression.getText()) &&
        callee.compilerNode.name.getText() === "restore"
      ) {
        // Replace with vi.restoreAllMocks()
        node.replaceWithText("vi.restoreAllMocks()");

        // Skip all children of the current node as it was already transformed
        traversal.skip();
      }
    }
  });
}
