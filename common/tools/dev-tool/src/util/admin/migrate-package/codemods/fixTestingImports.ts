import { SourceFile } from "ts-morph";

export default function fixTestingImports(sourceFile: SourceFile): void {
  // Remove if the file is a test utility for chai
  if (
    sourceFile.getFilePath().includes("/test") &&
    !sourceFile.getBaseName().endsWith(".spec.ts")
  ) {
    for (const importDeclaration of sourceFile.getImportDeclarations()) {
      const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
      if (["chai", "assert"].includes(moduleSpecifier)) {
        importDeclaration.remove();
        sourceFile.addImportDeclaration({
          namedImports: ["assert"],
          moduleSpecifier: "vitest",
        });
      }
    }
  }

  if (sourceFile.getBaseName().endsWith(".spec.ts")) {
    if (!sourceFile.getImportDeclaration("vitest")) {
      // If the file ends with .spec.ts, add the import statement
      const hasMocking = sourceFile.getImportDeclarations().some((importDeclaration) => {
        const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
        return moduleSpecifier === "sinon" || moduleSpecifier === "@azure-tools/test-recorder";
      });

      const viTestImports = ["describe", "it", "assert"];
      // Insert typical mocking imports if needed
      if (hasMocking) {
        viTestImports.push("expect, vi, beforeEach, afterEach");
      }

      sourceFile.addImportDeclaration({
        namedImports: viTestImports,
        moduleSpecifier: "vitest",
      });
    }
  }

  const modulesToRemove = ["chai", "chai-as-promised", "chai-exclude", "sinon", "mocha"];

  // Iterate over all the import declarations
  for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
    // If the module specifier is legacy, remove the import declaration
    if (modulesToRemove.includes(moduleSpecifier)) {
      importDeclaration.remove();
    } else if (moduleSpecifier === "@azure-tools/test-utils") {
      // If the module specifier is "@azure-tools/test-utils", remove the "assert" named import
      const namedImports = importDeclaration.getNamedImports();
      const assertImport = namedImports.find((namedImport) => namedImport.getName() === "assert");
      if (assertImport) {
        assertImport.remove();
      }

      // If there are no named imports left, remove the entire import declaration
      if (importDeclaration.getNamedImports().length === 0) {
        importDeclaration.remove();
      }
    }
  }
}
