// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { SourceFile, TypeAliasDeclaration } from "ts-morph";

export function augmentTypeAliases(
  originalAliases: Map<string, TypeAliasDeclaration>,
  customAliases: TypeAliasDeclaration[],
  originalFile: SourceFile,
) {
  for (const customAlias of customAliases) {
    const aliasName = customAlias.getName();
    if (!aliasName) {
      const aliasStructure = customAlias.getStructure();
      throw new Error(`Alias doesn't have a name\n${JSON.stringify(aliasStructure)}`);
    }
    const originalAlias = originalAliases.get(aliasName);
    augmentTypeAlias(customAlias, originalAlias, originalFile);
  }
}

export function augmentTypeAlias(
  customTypeAlias: TypeAliasDeclaration,
  originalTypeAlias: TypeAliasDeclaration | undefined,
  originalFile: SourceFile,
) {
  // Bring over the custom alias
  originalFile.addTypeAlias(customTypeAlias.getStructure());

  if (originalTypeAlias) {
    // Remove the existing alias
    originalTypeAlias.remove();
  }
}
