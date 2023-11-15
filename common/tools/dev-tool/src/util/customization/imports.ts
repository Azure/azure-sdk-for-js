// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { ImportDeclaration, ImportSpecifier, SourceFile, ts } from "ts-morph";
import { getCustomizationState } from "./state";
import * as path from "path";

export function augmentImports(
  originalImports: Map<string, ImportDeclaration>,
  customImports: ImportDeclaration[],
  originalFile: SourceFile
) {
  const importRemoveCallbackMap: Map<string, ImportDeclaration | ImportSpecifier> = new Map(
    Array.from(originalImports.values()).flatMap((importDecl) => {
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

  const { customDir, originalDir } = getCustomizationState();
  const importMap = new Map<string, ImportDeclaration>();
  for (const [moduleSpecifier, importDecl] of originalImports) {
    importMap.set(moduleSpecifier, importDecl);
  }

  // remove identifiers from original if they're present in custom

  const identifiers = customImports.flatMap((customImportDecl) => {
    return customImportDecl.getDescendantsOfKind(ts.SyntaxKind.Identifier);
  });

  identifiers.forEach((identifier) => {
    const identifierText = identifier.getText();

    const importNode = importRemoveCallbackMap.get(identifierText);
    if (!importNode) {
      return;
    }

    const isSoleNamedImport =
      importNode.isKind(ts.SyntaxKind.ImportSpecifier) &&
      importNode.getImportDeclaration().getNamedImports().length === 1;

    const removeNode = isSoleNamedImport ? importNode.getImportDeclaration() : importNode;

    if (removeNode.isKind(ts.SyntaxKind.ImportDeclaration)) {
      importMap.delete(removeNode.getModuleSpecifierValue());
    }

    removeNode.remove();
    importRemoveCallbackMap.delete(identifierText);
  });

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
    original.setNamespaceImport(customNamespaceImport?.getText());
  }
}

/**
 * Given a source file at {@link customFilePath} which imports {@link originalModuleSpecifier}
 * from a subdirectory of {@link originalPath}, returns the relative path between the output
 * file and the output module.
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
