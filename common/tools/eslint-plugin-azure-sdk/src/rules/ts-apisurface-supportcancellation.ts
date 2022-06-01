// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require async client methods to accept an AbortSignalLike parameter.
 * @author Arpan Laha
 */

import { ClassDeclaration, Identifier, MethodDefinition } from "estree";
import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { Symbol as TSSymbol, Type, TypeChecker, TypeFlags } from "typescript";
import { getPublicMethods, getRuleMetaData } from "../utils";
import { ParserWeakMapESTreeToTSNode } from "@typescript-eslint/typescript-estree/dist/parser-options";
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

/**
 * Determines whether a parameter contains or is AbortSignalLike.
 * @param param the parameter in question.
 * @param typeChecker a TypeScript TypeChecker.
 * @param converter a map from TSESTree nodes to TSNodes.
 * @returns whether a parameter contains or is AbortSignalLike.
 */
const isValidParam = (
  param: TSESTree.Parameter,
  typeChecker: TypeChecker,
  converter: ParserWeakMapESTreeToTSNode
): boolean => {
  if (param.type !== "Identifier" || param.typeAnnotation === undefined) {
    return false;
  }

  const typeAnnotation = param.typeAnnotation.typeAnnotation;
  if (typeAnnotation.type !== "TSTypeReference" || typeAnnotation.typeName.type !== "Identifier") {
    return false;
  }

  const typeName = typeAnnotation.typeName.name;

  if (typeName === "AbortSignalLike") {
    return true;
  }

  // check property type names for AbortSignalLike
  return (
    /Options$/.test(typeName) &&
    getDefinedType(typeChecker.getTypeAtLocation(converter.get(param)))
      .getProperties()
      .some((property: TSSymbol): boolean => isValidSymbol(property, typeChecker))
  );
};

export = {
  meta: getRuleMetaData(
    "ts-apisurface-supportcancellation",
    "require async client methods to accept an AbortSignalLike parameter"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices = context.parserServices as ParserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;
    return {
      // callback functions

      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: ClassDeclaration): void => {
        getPublicMethods(node).forEach((method: MethodDefinition): void => {
          const key = method.key as Identifier;
          const TSFunction = method.value as TSESTree.FunctionExpression;

          // report if async and no parameter of type AbortSignalLike
          if (
            TSFunction.async &&
            TSFunction.params.every(
              (param: TSESTree.Parameter): boolean => !isValidParam(param, typeChecker, converter)
            )
          ) {
            context.report({
              node: method,
              message: `async method ${key.name} should accept an AbortSignalLike parameter or option`,
            });
          }
        });
      },
    } as Rule.RuleListener;
  },
};
