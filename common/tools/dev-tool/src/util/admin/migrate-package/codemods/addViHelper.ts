import { SourceFile, SyntaxKind } from "ts-morph";

/**
 * Adds an import statement for `vi` from `vitest` if it's used in the file
 */
export default function addViHelper(sourceFile: SourceFile) {
  // Step 1: Find all usages of `vi` in the file
  const viUsages = sourceFile
    .getDescendantsOfKind(SyntaxKind.Identifier)
    .filter((identifier) => identifier.getText() === "vi");

  // If no usage of `vi` is found, do nothing
  if (viUsages.length === 0) {
    return;
  }

  // Step 2: Check if there's already an import of `vi` from `vitest`
  const vitestImport = sourceFile
    .getImportDeclarations()
    .find((importDeclaration) => importDeclaration.getModuleSpecifierValue() === "vitest");

  // Step 3: If `vitest` is imported, check if `vi` is part of the named imports
  const viImported = vitestImport
    ?.getNamedImports()
    .find((importSpecifier) => importSpecifier.getName() === "vi");

  if (viImported) {
    // `vi` is already imported, do nothing
    return;
  }

  // Step 4: If `vitest` is imported but `vi` is not, update the existing import declaration
  if (vitestImport) {
    vitestImport.addNamedImport("vi");
  } else {
    // Step 5: If there's no import from `vitest`, create a new import statement
    sourceFile.addImportDeclaration({
      namedImports: ["vi"],
      moduleSpecifier: "vitest",
    });
  }
}
