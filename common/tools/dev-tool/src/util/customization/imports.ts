// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { Identifier, ImportDeclaration, ImportSpecifier, SourceFile, ts } from "ts-morph";
import { getCustomizationState } from "./state";
import * as path from "path";

export function augmentImports(
  originalImports: Map<string, ImportDeclaration>,
  customImports: ImportDeclaration[],
  originalFile: SourceFile
) {
  const { customDir, originalDir } = getCustomizationState();
  const importMap = new Map<string, ImportDeclaration>();
  for (const [moduleSpecifier, importDecl] of originalImports) {
    importMap.set(moduleSpecifier, importDecl);
  }

  const removedModules = removeDuplicateIdentifiers(
    Array.from(originalImports.values()),
    customImports
  );
  removedModules.forEach(importMap.delete.bind(importMap));

  for (const customImportDecl of customImports) {
    const newModuleSpecifier =
      getOriginalModuleSpecifier(
        originalDir,
        customDir,
        customImportDecl.getSourceFile().getFilePath(),
        customImportDecl.getModuleSpecifierValue()
      ) ?? customImportDecl.getModuleSpecifierValue();

    const originalImportDecl = importMap.get(newModuleSpecifier);
    if (originalImportDecl) {
      augmentImportDeclaration(originalImportDecl, customImportDecl);
    } else {
      const importStructure = customImportDecl.getStructure();
      importStructure.moduleSpecifier = newModuleSpecifier;
      originalFile.addImportDeclaration(importStructure);
    }
  }
}

function augmentImportDeclaration(original: ImportDeclaration, custom: ImportDeclaration) {
  const customDefaultImport = custom.getDefaultImport();
  if (customDefaultImport) {
    original.setDefaultImport(customDefaultImport.getText());
  }

  const customNamedImports = custom.getNamedImports();
  if (customNamedImports.length) {
    original.insertNamedImports(
      0,
      customNamedImports.map((specifier) => {
        return specifier.getStructure();
      })
    );
  }

  const customNamespaceImport = custom.getNamespaceImport();
  if (customNamespaceImport) {
    original.setNamespaceImport(customNamespaceImport.getText());
  }
}

/**
 * Given a source file at {@link customFilePath} which imports {@link originalModuleSpecifier}
 * from a subdirectory of {@link originalPath}, returns the relative path between the output
 * file and the output module. Returns undefined if the module isn't in a subdirectory of
 * {@link originalPath}.
 */
function getOriginalModuleSpecifier(
  originalPath: string,
  customPath: string,
  customFilePath: string,
  originalModuleSpecifier: string
): string | undefined {
  // Check that this custom file import is local, but not in the same directory (or subdirs) as the file
  if (!originalModuleSpecifier.startsWith("../") && !originalModuleSpecifier.startsWith('"../')) {
    return undefined;
  }

  const currentFileDir = path.dirname(customFilePath);
  const moduleAbsolutePath = path.resolve(currentFileDir, originalModuleSpecifier);

  const moduleRelativePath = path.relative(originalPath, moduleAbsolutePath);
  const outputFileRelativePath = path.relative(customPath, currentFileDir);

  const outputModuleSpecifier = path.relative(outputFileRelativePath, moduleRelativePath);

  // Check if the module is actually contained in the original directory
  if (!moduleRelativePath.startsWith("..") && !path.isAbsolute(moduleRelativePath)) {
    if (outputModuleSpecifier.startsWith(".")) {
      return outputModuleSpecifier;
    } else {
      return "./" + outputModuleSpecifier;
    }
  }
}

function removeDuplicateIdentifiers(
  originalImports: ImportDeclaration[],
  customImports: ImportDeclaration[]
): string[] {
  const importMap: Map<string, ImportDeclaration | ImportSpecifier> = new Map(
    originalImports.flatMap((importDecl) => {
      const namedImports = importDecl.getNamedImports();
      const defaultImport = importDecl.getDefaultImport();
      const namespaceImport = importDecl.getNamespaceImport();

      const map: Array<[string, ImportDeclaration | ImportSpecifier]> = namedImports.map(
        (importSpecifier) => [importSpecifier.getNameNode().getText(), importSpecifier]
      );

      if (defaultImport) {
        map.push([defaultImport.getText(), importDecl]);
      }
      if (namespaceImport) {
        map.push([namespaceImport.getText(), importDecl]);
      }

      return map;
    })
  );

  const customIdentifiers = customImports.flatMap((customImportDecl) => {
    return customImportDecl.getDescendantsOfKind(ts.SyntaxKind.Identifier);
  });

  const removedModules = customIdentifiers
    .map(removeFromImports)
    .filter((moduleSpecifier): moduleSpecifier is string => !!moduleSpecifier);

  return removedModules;

  /**
   * Removes the import of a given imported identifier. If the whole import declaration is removed
   * (in the case of a default/namespace import or a named import with exactly one identifier),
   * returns the module specifier of that import declaration.
   */
  function removeFromImports(identifier: Identifier): string | undefined {
    const identifierText = identifier.getText();
    const importNode = importMap.get(identifierText);
    if (!importNode) {
      return;
    }

    const isSoleNamedImport =
      importNode.isKind(ts.SyntaxKind.ImportSpecifier) &&
      importNode.getImportDeclaration().getNamedImports().length === 1;

    const removeNode = isSoleNamedImport ? importNode.getImportDeclaration() : importNode;

    const removedModule = removeNode
      .asKind(ts.SyntaxKind.ImportDeclaration)
      ?.getModuleSpecifierValue();

    removeNode.remove();
    importMap.delete(identifierText);

    return removedModule;
  }
}
