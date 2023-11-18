// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { ImportDeclaration, SourceFile } from "ts-morph";
import { getCustomizationState } from "./state";
import * as path from "path";

type DotPrefixedRelativePath = string & { __dotPrefixedRelativePath: never };
type LocalModuleSpecifier = string & { __localModuleSpecifier: never };

export function augmentImports(
  originalImports: Map<string, ImportDeclaration>,
  customImports: ImportDeclaration[],
  originalFile: SourceFile
) {
  const originalFilePath = originalFile.getFilePath();

  const importMap = new Map<string, ImportDeclaration>();
  originalImports.forEach((importDecl, moduleSpecifier) => {
    const normalizedModuleSpecifier = normalizeModuleSpecifier(moduleSpecifier, originalFilePath);
    importDecl.setModuleSpecifier(normalizedModuleSpecifier);
    importMap.set(normalizedModuleSpecifier, importDecl);
  });

  removeConflictingIdentifiers(Array.from(originalImports.values()), customImports);

  customImports.forEach((customImportDecl) =>
    mergeImportIntoFile(customImportDecl, originalFile, importMap)
  );

  removeEmptyImports(originalFile.getImportDeclarations());
}

function removeEmptyImports(importDeclarations: ImportDeclaration[]) {
  importDeclarations.forEach((importDecl) => {
    const isEmpty =
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport() &&
      !importDecl.getNamedImports().length;
    if (isEmpty) {
      importDecl.remove();
    }
  });
}

function mergeImportIntoFile(
  customImportDecl: ImportDeclaration,
  originalFile: SourceFile,
  importMap: Map<string, ImportDeclaration>
) {
  const outputModuleSpecifier = getFixedModuleSpecifier(customImportDecl);

  const existingImportDecl = importMap.get(outputModuleSpecifier);
  if (existingImportDecl) {
    augmentImportDeclaration(existingImportDecl, customImportDecl);
  } else {
    const importStructure = customImportDecl.getStructure();
    importStructure.moduleSpecifier = outputModuleSpecifier;
    originalFile.addImportDeclaration(importStructure);
  }

  function getFixedModuleSpecifier(
    customImportDecl: ImportDeclaration
  ): (string & LocalModuleSpecifier & DotPrefixedRelativePath) | string {
    const { customDir, originalDir } = getCustomizationState();
    const customFilePath = customImportDecl.getSourceFile().getFilePath();

    const moduleSpecifierFromCustomFile = normalizeModuleSpecifier(
      customImportDecl.getModuleSpecifierValue(),
      customFilePath
    );

    const outputModuleSpecifier =
      getModuleSpecifierIfImportedFromOriginal(
        originalDir,
        customDir,
        customFilePath,
        moduleSpecifierFromCustomFile
      ) ?? moduleSpecifierFromCustomFile;

    return outputModuleSpecifier;
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
      customNamedImports.map((specifier) => specifier.getStructure())
    );
  }

  const customNamespaceImport = custom.getNamespaceImport();
  if (customNamespaceImport) {
    original.setNamespaceImport(customNamespaceImport.getText());
  }
}

function normalizeModuleSpecifier<T extends string>(
  moduleSpecifier: T,
  filePath: string
): (T & LocalModuleSpecifier & DotPrefixedRelativePath) | T {
  return normalizeLocalModuleSpecifier(moduleSpecifier, filePath) ?? moduleSpecifier;
}

function normalizeLocalModuleSpecifier<T extends string>(
  moduleSpecifier: T,
  filePath: string
): (T & LocalModuleSpecifier & DotPrefixedRelativePath) | undefined {
  const fileDir = path.dirname(filePath);
  const modulePath = path.resolve(fileDir, moduleSpecifier);
  const normalizedModuleSpecifier = path.relative(fileDir, modulePath) as T & LocalModuleSpecifier;

  return toDotPrefixedRelativePath(normalizedModuleSpecifier);
}

function toDotPrefixedRelativePath<T extends string>(
  filePath: T
): (T & DotPrefixedRelativePath) | undefined;
function toDotPrefixedRelativePath<T extends DotPrefixedRelativePath>(filePath: T): T;
function toDotPrefixedRelativePath<T extends string>(
  filePath: string
): (T & DotPrefixedRelativePath) | undefined {
  if (path.isAbsolute(filePath)) {
    return;
  }

  if (!filePath.startsWith(".")) {
    filePath = "./" + filePath;
  }

  return filePath as T & DotPrefixedRelativePath;
}

/**
 * Given a source file at {@link customFilePath} which imports {@link originalModuleSpecifier}
 * from a subdirectory of {@link originalSourceRoot}, returns the relative path between the output
 * file and the output module. Returns undefined if the module isn't in a subdirectory of
 * {@link originalSourceRoot}.
 */
function getModuleSpecifierIfImportedFromOriginal(
  originalSourceRoot: string,
  customSourceRoot: string,
  customFilePath: string,
  originalModuleSpecifier: string
): (string & LocalModuleSpecifier & DotPrefixedRelativePath) | undefined {
  const customFileDir = path.dirname(customFilePath);
  const moduleAbsolutePath = path.resolve(customFileDir, originalModuleSpecifier);

  const outputModuleRelativePath = path.relative(originalSourceRoot, moduleAbsolutePath);
  const outputFileRelativePath = path.relative(customSourceRoot, customFileDir);

  const outputModuleSpecifier = path.relative(outputFileRelativePath, outputModuleRelativePath);

  // Check if the module is actually contained in the original directory
  if (!outputModuleRelativePath.startsWith("..") && !path.isAbsolute(outputModuleRelativePath)) {
    return normalizeLocalModuleSpecifier(outputModuleSpecifier, outputFileRelativePath);
  }
}

function removeConflictingIdentifiers(
  originalImports: ImportDeclaration[],
  customImports: ImportDeclaration[]
) {
  const importRemoveCallbackMap: Map<string, () => void> =
    getImportRemoveCallbacks(originalImports);

  const customIdentifiers = getBoundIdentifiers(customImports);

  customIdentifiers.forEach((customIdentifier) => {
    const removeIdentifier = importRemoveCallbackMap.get(customIdentifier);
    removeIdentifier?.();
  });

  function getBoundIdentifiers(imports: ImportDeclaration[]): string[] {
    return Array.from(getImportRemoveCallbacks(imports).keys());
  }

  function getImportRemoveCallbacks(imports: ImportDeclaration[]): Map<string, () => void> {
    return new Map(
      imports.flatMap((importDecl) => {
        const defaultImport = importDecl.getDefaultImport();
        const namespaceImport = importDecl.getNamespaceImport();
        const namedImports = importDecl.getNamedImports();

        const importRemoveCallbacks = namedImports.map((importSpecifier): [string, () => void] => {
          const relevantIdentifier =
            importSpecifier.getAliasNode() ?? importSpecifier.getNameNode();
          return [relevantIdentifier.getText(), () => importSpecifier.remove()];
        });
        if (defaultImport)
          importRemoveCallbacks.push([
            defaultImport.getText(),
            () => importDecl.removeDefaultImport(),
          ]);
        if (namespaceImport)
          importRemoveCallbacks.push([
            namespaceImport.getText(),
            () => importDecl.removeNamespaceImport(),
          ]);

        return importRemoveCallbacks;
      })
    );
  }
}
