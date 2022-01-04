// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Utilities for analyzing the exports of a package
 * @author Arpan Laha
 */

import { ClassDeclaration, MethodDefinition } from "estree";
import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { SourceFile, Symbol as TSSymbol } from "typescript";
import { Rule } from "eslint";

/**
 * Gets all Symbols of Types of all top-level exports from a package.
 * @param context the ESLint runtime context
 * @returns a list of Symbols containing type information for all top-level exports, or undefined if improperly configured
 */
const getExports = (context: Rule.RuleContext): TSSymbol[] | undefined => {
  const parserServices = context.parserServices as ParserServices;
  if (parserServices.program === undefined) {
    return undefined;
  }

  const program = parserServices.program;
  const typeChecker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(context.settings.main);
  if (sourceFile === undefined) {
    return undefined;
  }

  const symbol = typeChecker.getSymbolAtLocation(sourceFile);
  if (symbol === undefined) {
    return undefined;
  }

  return typeChecker
    .getExportsOfModule(symbol)
    .map((packageExport: TSSymbol): TSSymbol | undefined =>
      typeChecker.getDeclaredTypeOfSymbol(packageExport).getSymbol()
    )
    .filter(
      (exportSymbol: TSSymbol | undefined): boolean => exportSymbol !== undefined
    ) as TSSymbol[];
};

/**
 * Determines whether a given Symbol originates from the library or an external source
 * @param symbol the Symbol of a Type to be tested
 * @returns if the Symbol originates from a dependency
 */
export const isExternal = (symbol: TSSymbol): boolean => {
  // use /node_modules/ to find if a Symbol originated from an external location
  const externalRegex = /node_modules/;
  if (symbol.valueDeclaration !== undefined) {
    // iterate up until the parent chain until no longer possible
    let parent = symbol.valueDeclaration.parent;
    while (parent.parent !== undefined) {
      parent = parent.parent;
    }

    const sourceFile = parent as SourceFile;
    return externalRegex.test(sourceFile.fileName);
  }
  const parentSymbol = symbol as any;
  if (!parentSymbol.parent) {
    return true;
  }
  const parent = parentSymbol.parent as TSSymbol;
  return externalRegex.test(parent.escapedName as string);
};

/**
 * A helper method to verify exports and add them to running list if they are local and haven't been seen yet
 * @param exportSymbol the current Symbol being examined
 * @param localExports the running list of local export Symbols
 */
const addToSeenLocalExports = (exportSymbol: TSSymbol, localExports: TSSymbol[]): void => {
  // skip if it's external or seen already
  if (isExternal(exportSymbol) || localExports.includes(exportSymbol)) {
    return;
  }
  localExports.push(exportSymbol);
};

/**
 * An extension of getExports - additionally only returns Symbols defined locally and fetches information recursively
 * @param context the ESLint runtime context
 * @returns a list of Symbols corresponding to Types of exports and members that are defined inside the package
 */
export const getLocalExports = (context: Rule.RuleContext): TSSymbol[] | undefined => {
  const localExports: TSSymbol[] = [];

  const exportSymbols = getExports(context);
  if (exportSymbols === undefined) {
    return exportSymbols;
  }

  exportSymbols.forEach((exportSymbol: TSSymbol): void => {
    addToSeenLocalExports(exportSymbol, localExports);
    // members exist in both the 'exports' and 'members' fields

    if (exportSymbol.exports !== undefined) {
      exportSymbol.exports.forEach((exportedSymbol: TSSymbol): void =>
        addToSeenLocalExports(exportedSymbol, localExports)
      );
    }
    if (exportSymbol.members !== undefined) {
      exportSymbol.members.forEach((memberSymbol: TSSymbol): void =>
        addToSeenLocalExports(memberSymbol, localExports)
      );
    }
  });

  return localExports;
};

export const getPublicMethods = (node: ClassDeclaration): MethodDefinition[] =>
  node.body.body.filter((method): method is MethodDefinition => {
    const TSMethod = method as TSESTree.MethodDefinition;
    return method.type === "MethodDefinition" && TSMethod.accessibility !== "private";
  });
