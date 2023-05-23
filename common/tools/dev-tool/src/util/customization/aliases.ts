import { SourceFile, TypeAliasDeclaration } from "ts-morph";

export function augmentTypeAliases(
  originalAliases: Map<string, TypeAliasDeclaration>,
  customAliases: TypeAliasDeclaration[],
  originalFile: SourceFile
) {
  for (const customInterface of customAliases) {
    const originalAlias = originalAliases.get(customInterface.getName() ?? "");
    augmentTypeAlias(customInterface, originalAlias, originalFile);
  }
}

export function augmentTypeAlias(
  customTypeAlias: TypeAliasDeclaration,
  originalTypeAlias: TypeAliasDeclaration | undefined,
  originalFile: SourceFile
) {
  // Bring over the custom alias
  originalFile.addTypeAlias(customTypeAlias.getStructure());

  if (originalTypeAlias) {
    // Remove the existing alias
    originalTypeAlias.remove();
  }
}
