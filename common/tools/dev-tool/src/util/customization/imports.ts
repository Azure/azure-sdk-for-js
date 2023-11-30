// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { ImportDeclaration, SourceFile } from "ts-morph";
import { getCustomizationState } from "./state";
import * as path from "path";

declare const DOT_PREFIXED_RELATIVE_PATH: unique symbol;
declare const LOCAL_MODULE_RELATIVE_PATH: unique symbol;
declare const ABSOLUTE_MODULE_SPECIFIER: unique symbol;
declare const URL_MODULE_SPECIFIER: unique symbol;
declare const NODE_MODULES_PACKAGE_MODULE_SPECIFIER: unique symbol;
declare const RELATIVE_MODULE_SPECIFIER: unique symbol;
declare const MODULE_SPECIFIER: unique symbol;

// The following types have type brands, a zero-cost way to tell the TS compiler that they should
// be considered different types. Any cast to these types should only happen in places where the
// conditions in their docstrings are satisfied, e.g. in their corresponding factory functions.
/**
 * A POSIX style relative path with a `.` as its first character.
 */
type DotPrefixedRelativePath = string & { [DOT_PREFIXED_RELATIVE_PATH]: never };
/**
 * A POSIX style relative path from a source file to the module it imports.
 */
type LocalModuleRelativePath = string & { [LOCAL_MODULE_RELATIVE_PATH]: never };

/**
 * A POSIX style absolute path
 */
type AbsoluteModuleSpecifier = string & { [MODULE_SPECIFIER]: typeof ABSOLUTE_MODULE_SPECIFIER };
/**
 * A URL
 */
type URLModuleSpecifier = string & { [MODULE_SPECIFIER]: typeof URL_MODULE_SPECIFIER };
/**
 * A string corresponding to a package name in `node_modules`
 */
type NodeModulesPackageModuleSpecifier = string & {
  [MODULE_SPECIFIER]: typeof NODE_MODULES_PACKAGE_MODULE_SPECIFIER;
};
/**
 * A POSIX style relative path
 */
type RelativeModuleSpecifier = LocalModuleRelativePath &
  DotPrefixedRelativePath & { [MODULE_SPECIFIER]: typeof RELATIVE_MODULE_SPECIFIER };
/**
 * A valid JS module specifier
 */
type ModuleSpecifier =
  | RelativeModuleSpecifier
  | AbsoluteModuleSpecifier
  | URLModuleSpecifier
  | NodeModulesPackageModuleSpecifier;

export function augmentImports(
  originalImports: Map<string, ImportDeclaration>,
  customImports: ImportDeclaration[],
  originalFile: SourceFile
) {
  const importMap = new Map<string, ImportDeclaration>();
  removeConflictingIdentifiers(Array.from(originalImports.values()), customImports);

  customImports.forEach((customImportDecl) =>
    mergeImportIntoFile(customImportDecl, originalFile, importMap)
  );

  removeEmptyImports(originalFile);
  removeSelfImports(originalFile);
}

function removeSelfImports(originalFile: SourceFile) {
  const filePath = originalFile.getFilePath();
  const filePathWithoutExt = path.normalize(removeFileExtension(filePath));

  originalFile
    .getImportDeclarations()
    .filter(isSelfImport)
    .forEach((originalImport) => originalImport.remove());

  function isSelfImport(originalImport: ImportDeclaration) {
    const modulePath = originalImport.getModuleSpecifierValue() as ModuleSpecifier;
    const moduleResolvedPath = path.normalize(path.join(path.dirname(filePath), modulePath));
    return removeFileExtension(moduleResolvedPath) === filePathWithoutExt;
  }
}

function removeFileExtension(filePath: string): string {
  const filePathObject = path.parse(filePath);
  if (filePathObject.ext.length > 0) {
    return filePath.slice(0, -filePathObject.ext.length);
  }
  return filePath;
}

function removeEmptyImports(originalFile: SourceFile) {
  originalFile.getImportDeclarations().forEach((importDecl) => {
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

  /**
   * Returns the module specifier for this import declaration, fixing it if it points to a
   * generated module
   */
  function getFixedModuleSpecifier(
    customImportDecl: ImportDeclaration
  ): RelativeModuleSpecifier | string {
    const { customDir, originalDir } = getCustomizationState();
    const customFilePath = customImportDecl.getSourceFile().getFilePath();
    const moduleSpecifierFromCustomFile =
      customImportDecl.getModuleSpecifierValue() as ModuleSpecifier;
    if (!isRelativeModuleSpecifier(moduleSpecifierFromCustomFile)) {
      return moduleSpecifierFromCustomFile;
    }

    const fixedModuleSpecifier =
      getFixedModuleSpecifierIfImportedFromOriginal(
        originalDir,
        customDir,
        customFilePath,
        moduleSpecifierFromCustomFile
      ) ?? normalizeRelativeModuleSpecifier(moduleSpecifierFromCustomFile);

    return fixedModuleSpecifier;
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

function isRelativeModuleSpecifier<T extends ModuleSpecifier>(
  moduleSpecifier: T
): moduleSpecifier is T & RelativeModuleSpecifier {
  return moduleSpecifier.startsWith(".");
}

function normalizeRelativeModuleSpecifier<T extends LocalModuleRelativePath>(
  moduleSpecifier: T
): T & RelativeModuleSpecifier {
  const posixStyle = moduleSpecifier.split("\\").join("/");

  return prefixRelativePathWithDot(posixStyle);
}

function prefixRelativePathWithDot<T extends string>(
  filePath: string
): T & DotPrefixedRelativePath {
  if (path.isAbsolute(filePath)) {
    throw Error("Attempted to dot-prefix an absolute path");
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
function getFixedModuleSpecifierIfImportedFromOriginal(
  originalSourceRoot: string,
  customSourceRoot: string,
  customFilePath: string,
  originalModuleSpecifier: LocalModuleRelativePath
): RelativeModuleSpecifier | undefined {
  const customFileDir = path.dirname(customFilePath);
  const moduleAbsolutePath = path.resolve(customFileDir, originalModuleSpecifier);
  const outputModuleRelativePath = path.relative(originalSourceRoot, moduleAbsolutePath);
  const outputFileRelativePath = path.relative(customSourceRoot, customFileDir);
  const outputModuleSpecifier = path.relative(
    outputFileRelativePath,
    outputModuleRelativePath
  ) as LocalModuleRelativePath;

  // Check if the module is actually contained in the original directory
  if (!outputModuleRelativePath.startsWith("..") && !path.isAbsolute(outputModuleRelativePath)) {
    return normalizeRelativeModuleSpecifier(outputModuleSpecifier);
  }
}

function removeConflictingIdentifiers(
  originalImports: ImportDeclaration[],
  customImports: ImportDeclaration[]
) {
  // maps the name of the imported symbol to a nullary function that removes the symbol from the
  // original source file
  const originalImportRemoveCallbackMap: Map<string, () => void> =
    getImportRemoveCallbacks(originalImports);

  const customIdentifiers = getImportRemoveCallbacks(customImports).keys();

  for (const customIdentifier of customIdentifiers) {
    const removeOriginalImportedIdentifier = originalImportRemoveCallbackMap.get(customIdentifier);
    removeOriginalImportedIdentifier?.();
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
