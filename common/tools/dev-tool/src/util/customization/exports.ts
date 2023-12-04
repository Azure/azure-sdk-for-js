// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { SourceFile } from "ts-morph";

export async function augmentExports(customFile: SourceFile, originalFile: SourceFile) {
  const customExports = customFile.getExportDeclarations();
  const originalExports = originalFile.getExportDeclarations();
  for (const customExport of customExports) {
    const [original] = originalExports.filter(
      (e) =>
        e.getModuleSpecifier()?.getLiteralValue() ===
        customExport.getModuleSpecifier()?.getLiteralValue(),
    );
    if (original) {
      const exports = customExport.getNamedExports().map((e) => ({
        name: e.getName(),
        alias: e.getAliasNode()?.getText(),
      }));
      original.addNamedExports(exports);
    } else {
      originalFile.addExportDeclaration(customExport.getStructure());
    }
  }
}
