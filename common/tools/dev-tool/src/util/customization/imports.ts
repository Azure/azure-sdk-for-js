// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { ImportDeclaration } from "ts-morph";
import { getCustomizationState } from "./state";
import * as path from "path";

export function augmentImports(
  originalImports: Map<string, ImportDeclaration>,
  customImports: ImportDeclaration[]
) {
  const { customDir, originalDir } = getCustomizationState();
  const importMap: Map<string, ImportDeclaration> = new Map();

  for (const [, value] of originalImports) {
    const module = value.getModuleSpecifier().getText();
    importMap.set(module, value);
  }

  for (const customImport of customImports) {
    const module = customImport.getModuleSpecifier().getText();

    if (isPathMovingToOriginal(originalDir, customDir, module)) {
      continue;
    }

    const existingImport = importMap.get(module);

    if (!existingImport) {
      importMap.set(module, customImport);
      continue;
    }

    if (isPathMovingToOriginal(originalDir, customDir, module)) {
      continue;
    }

    if (!existingImport.getDefaultImport()) {
      existingImport.setDefaultImport(customImport.getDefaultImport()?.getText() ?? "");
    }

    const existingNamedImports = existingImport.getNamedImports();

    for (const namedImport of customImport.getNamedImports()) {
      if (!existingNamedImports.find((x) => x.getName() === namedImport.getName())) {
        existingImport.addNamedImport(namedImport.getStructure());
      }
    }
  }
}

export function isPathMovingToOriginal(
  originalPath: string,
  currentFile: string,
  resolvePath: string
) {
  // Check if resolvePath is traversing directories upwards
  if (!resolvePath.startsWith("../") && !resolvePath.startsWith('"../')) {
    return false;
  }

  // Resolve the path from the current file's directory
  const currentFileDir = path.dirname(currentFile);
  const resolvedPath = path.resolve(currentFileDir, resolvePath);

  // Check if the resolved path is within the original path root
  return resolvedPath.startsWith(originalPath);
}
