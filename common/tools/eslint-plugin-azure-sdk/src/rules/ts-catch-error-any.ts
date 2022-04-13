// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to discourage usage of `any` as the catch variable type.
 */

import { CatchClause } from "estree";
import { ParserServices } from "@typescript-eslint/experimental-utils";
import { Symbol as TSSymbol, Type, TypeChecker, TypeFlags } from "typescript";
import { getRuleMetaData } from "../utils";
// import { ParserWeakMapESTreeToTSNode } from "@typescript-eslint/typescript-estree/dist/parser-options";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Fetches a defined Type from a union Type.
 * @param type the input Type.
 * @returns the first encountered defined Type from a union, or the Type itself.
 */
const getDefinedType = (type: any): Type => {
  if (type.types === undefined) {
    return type;
  }
  const nonUndefinedType = type.types.find(
    (candidate: Type): boolean => candidate.getFlags() !== TypeFlags.Undefined
  );
  return nonUndefinedType !== undefined ? nonUndefinedType : type;
};

/**
 * Determines if a Symbol is or contains AbortSignalLike.
 * @param symbol the Symbol in question.
 * @param typeChecker a TypeScript TypeChecker.
 * @returns if the Symbol is or contains AbortSignalLike.
 */
const isValidSymbol = (symbol: TSSymbol, typeChecker: TypeChecker): boolean => {
  const type = getDefinedType(typeChecker.getTypeAtLocation(symbol.valueDeclaration));
  const typeSymbol = type.getSymbol();
  if (typeSymbol === undefined) {
    return false;
  }
  if (typeSymbol.getEscapedName() === "AbortSignalLike") {
    return true;
  }
  if (typeSymbol.members === undefined) {
    return false;
  }
  let foundValidMember = false;
  typeSymbol.members.forEach((memberSymbol: TSSymbol): void => {
    if (isValidSymbol(memberSymbol, typeChecker)) {
      foundValidMember = true;
    }
  });
  return foundValidMember;
};

export = {
  meta: getRuleMetaData(
    "ts-catch-error-any",
    "discourage usage of `any` as the catch variable type"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices = context.parserServices as ParserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }
    // const typeChecker = parserServices.program.getTypeChecker();
    // const converter = parserServices.esTreeNodeToTSNodeMap;
    return {
      // callback functions

      // call on Client classes
      "CatchClause": (node: CatchClause): void => {
        if (node.param && (node?.param as any).typeAnnotation?.typeAnnotation?.type === "TSAnyKeyword") {
          context.report({
            node: node?.param!,
            message: "please verify the usage of `any` type for the catch variable",
          });
        }
      },
    } as Rule.RuleListener;
  },
};
