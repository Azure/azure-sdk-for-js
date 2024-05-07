// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require async client methods to accept an AbortSignalLike parameter.
 *
 */

import { TSESTree, ESLintUtils, ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import { Symbol as TSSymbol, Type, TypeChecker, TypeFlags } from "typescript";
import { getPublicMethods, createRule } from "../utils";

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
    (candidate: Type): boolean => candidate.getFlags() !== TypeFlags.Undefined,
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
  if (!symbol.valueDeclaration) {
    return false;
  }
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
  converter: ParserServicesWithTypeInformation["esTreeNodeToTSNodeMap"],
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

export default createRule({
  name: "ts-apisurface-supportcancellation",
  meta: {
    type: "suggestion",
    docs: {
      description: "require async client methods to accept an AbortSignalLike parameter",
      recommended: "recommended",
    },
    messages: {
      MethodShouldAcceptAbortSignal:
        "async method {{methodName}} should accept an AbortSignalLike parameter or option",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;
    return {
      // callback functions

      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: TSESTree.ClassDeclaration): void => {
        getPublicMethods(node).forEach((method: TSESTree.MethodDefinition): void => {
          const key = method.key as TSESTree.Identifier;
          const TSFunction = method.value as TSESTree.FunctionExpression;

          // report if async and no parameter of type AbortSignalLike
          if (
            TSFunction.async &&
            TSFunction.params.every(
              (param: TSESTree.Parameter): boolean => !isValidParam(param, typeChecker, converter),
            )
          ) {
            context.report({
              node: method,
              messageId: "MethodShouldAcceptAbortSignal",
              data: { methodName: key.name },
            });
          }
        });
      },
    };
  },
});
