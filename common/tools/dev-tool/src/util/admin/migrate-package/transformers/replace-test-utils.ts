import { SourceFile } from "ts-morph";

export default function transformer(sourceFile: SourceFile) {
  // Find all ImportDeclarations with source "@azure-tools/test-utils"
  sourceFile.getImportDeclarations().forEach((importDecl) => {
    if (importDecl.getModuleSpecifierValue() === "@azure-tools/test-utils") {
      // Update the module specifier to "@azure-tools/test-utils-vitest"
      importDecl.setModuleSpecifier("@azure-tools/test-utils-vitest");
    }
  });

  // No need to return anything, ts-morph applies changes directly to the source file
}
