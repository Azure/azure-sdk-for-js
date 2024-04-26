// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to encourage usage of interfaces over classes as function parameters.
 *
 */

import {
  Declaration,
  Modifier,
  ModifierLike,
  PropertySignature,
  SymbolFlags,
  SyntaxKind,
  Node as TSNode,
  Symbol as TSSymbol,
  Type,
  TypeChecker,
  TypeReference,
  TypeReferenceNode,
  isArrayTypeNode,
  canHaveModifiers,
} from "typescript";
import { ESLintUtils, ParserServicesWithTypeInformation, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

type FunctionType = TSESTree.FunctionExpression | TSESTree.FunctionDeclaration;
type ParserWeakMapESTreeToTSNode = ParserServicesWithTypeInformation["esTreeNodeToTSNodeMap"];

/**
 * Gets a ESTree parameter node's identifier node
 * @param param the parameter node
 * @return the identifier node associated with the parameter
 */
const getParamAsIdentifier = (param: TSESTree.Parameter): TSESTree.Identifier =>
  (param.type === "AssignmentPattern" ? param.left! : param) as TSESTree.Identifier;

/**
 * Gets the type of a paramter
 * @param param the ESTree node corresponding to the parameter
 * @param converter a map between TSESTree nodes and TypeScript nodes
 * @param typeChecker the TypeScript language typechecker
 * @return the Type of the parameter, or the element Type if the parameter type is an array
 */
const getTypeOfParam = (
  param: TSESTree.Parameter,
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker,
): Type => {
  const type = typeChecker.getTypeAtLocation(
    converter.get(getParamAsIdentifier(param) as TSESTree.Node),
  ) as TypeReference;

  // if array, extract type from array
  const typeNode = typeChecker.typeToTypeNode(type, undefined, undefined);
  if (typeNode !== undefined && isArrayTypeNode(typeNode)) {
    const elementTypeReference = typeNode.elementType as TypeReferenceNode;
    const typeName = elementTypeReference.typeName as any;
    if (typeName !== undefined && typeName.symbol !== undefined) {
      return typeChecker.getDeclaredTypeOfSymbol(typeName.symbol);
    }
  }

  return type;
};

/**
 * Recursive helper method to track the types seen in a parameter (including member types)
 * @param symbol The Symbol being inspected for member types
 * @param symbols A list of Symbols seen so far
 * @param typeChecker the TypeScript language typechecker
 */
const addSeenSymbols = (symbol: TSSymbol, symbols: TSSymbol[], typeChecker: TypeChecker): void => {
  let isExternal = false;
  let isOptional = false;

  // check to see if parameter is either external or optional (in which case it would be ignored)
  const declaration = symbol.valueDeclaration as PropertySignature;
  if (declaration !== undefined) {
    isOptional = declaration.questionToken !== undefined;
    isExternal = /node_modules/.test(declaration.getSourceFile().fileName);
  }
  if (isExternal || isOptional) {
    return;
  }

  symbols.push(symbol);

  // recurse on properties of parameter
  typeChecker
    .getPropertiesOfType(typeChecker.getDeclaredTypeOfSymbol(symbol))
    .forEach((element: TSSymbol): void => {
      if (!element.valueDeclaration) {
        return;
      }
      const memberType = typeChecker.getTypeAtLocation(element.valueDeclaration!);
      const memberTypeNode = typeChecker.typeToTypeNode(memberType, undefined, undefined);

      // extract type of member
      let memberSymbol: TSSymbol | undefined;

      // get type from array if parameter is array
      if (memberTypeNode !== undefined && isArrayTypeNode(memberTypeNode)) {
        const elementTypeReference = memberTypeNode.elementType as TypeReferenceNode;
        const typeName = elementTypeReference.typeName as any;
        memberSymbol = typeName !== undefined ? typeName.symbol : undefined;
      } else {
        memberSymbol = memberType.getSymbol();
      }
      if (
        memberSymbol !== undefined &&
        [SymbolFlags.Class, SymbolFlags.Interface].includes(memberSymbol.getFlags()) &&
        !symbols.includes(memberSymbol)
      ) {
        addSeenSymbols(memberSymbol, symbols, typeChecker);
      }
    });
};

/**
 * Gets Symbols corresponding to all types seen in a parameter
 * @param param the ESTree node corresponding to the parameter
 * @param converter a map between TSESTree nodes and TypeScript nodes
 * @param typeChecker the TypeScript language typechecker
 * @return a list of Symbols seen
 */
const getSymbolsUsedInParam = (
  param: TSESTree.Parameter,
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker,
): TSSymbol[] => {
  const symbols: TSSymbol[] = [];
  const symbol = getTypeOfParam(param, converter, typeChecker).getSymbol();
  if (symbol !== undefined) {
    addSeenSymbols(symbol, symbols, typeChecker);
  }
  return symbols;
};

/**
 * Checks whether the parameter is valid
 * @param param the ESTree node corresponding to the parameter
 * @param converter a map between TSESTree nodes and TypeScript nodes
 * @param typeChecker the TypeScript language typechecker
 * @return if the parameter is optional or if every type is not a class
 */
const isValidParam = (
  param: TSESTree.Parameter,
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker,
): boolean => {
  const tsIdentifier = param as TSESTree.Identifier;
  if (tsIdentifier.optional) {
    return true;
  }
  return getSymbolsUsedInParam(param, converter, typeChecker).every(
    (symbol: TSSymbol): boolean => symbol === undefined || symbol.getFlags() !== SymbolFlags.Class,
  );
};

/**
 * Finds if an a function is valid
 * @param overloads a list of definitions for a function
 * @param converter a map between TSESTree nodes and TypeScript nodes
 * @param typeChecker the TypeScript language typechecker
 * @return if at least one definition has only valid parameters
 */
const isValidOverload = (
  overloads: FunctionType[],
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker,
): boolean =>
  overloads.some((overload: FunctionType): boolean =>
    overload.params.every((overloadParam): boolean =>
      isValidParam(overloadParam, converter, typeChecker),
    ),
  );

/**
 * Evaluates the overloads found for a function
 * @param overloads a list of definitions for a function
 * @param converter a map between TSESTree nodes and TypeScript nodes
 * @param typeChecker the TypeScript language typechecker
 * @param verified a list of functions verified so far
 * @param name the name of the current function
 * @param param the ESTree node corresponding to the parameter currently being inspected
 * @param context the RuleContext object in the current runtime
 * @throws if there are no overloads or if none have only non-class parameters
 */
const evaluateOverloads = (
  overloads: FunctionType[],
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker,
  verified: string[],
  name: string | null,
  param: TSESTree.Parameter,
  context: RuleContext<"FunctionParameterIsClass", unknown[]>,
): void => {
  if (
    // Ignore anonymous functions
    name !== null &&
    overloads.length !== 0 &&
    isValidOverload(overloads, converter, typeChecker)
  ) {
    verified.push(name);
    return;
  }

  const identifier = getParamAsIdentifier(param);
  const typeName = typeChecker.typeToString(getTypeOfParam(param, converter, typeChecker));
  const parameterName = identifier.name;
  const functionName = name ?? "<anonymous>";
  context.report({
    node: identifier,
    messageId: "FunctionParameterIsClass",
    data: {
      typeName,
      parameterName,
      functionName,
    },
  });
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-use-interface-parameters",
  meta: {
    type: "suggestion",
    docs: {
      description: "encourage usage of interfaces over classes as function parameters",
    },
    messages: {
      FunctionParameterIsClass:
        "type {{typeName}} of parameter {{parameterName}} of function {{functionName}} is a class or contains a class as a member",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;
    const reverter = parserServices.tsNodeToESTreeNodeMap;

    const verifiedMethods: string[] = [];
    const verifiedDeclarations: string[] = [];

    if (/src/.test(context.filename) === false) {
      return {};
    }
    return {
      "MethodDefinition > FunctionExpression": (node: TSESTree.FunctionExpression): void => {
        const parent = context.sourceCode
          .getAncestors?.(node)
          .reverse()[0] as TSESTree.MethodDefinition;
        const key = parent.key as TSESTree.Identifier;
        const name = key.name;

        // ignore if name seen already
        if (name !== undefined && name !== "" && verifiedMethods.includes(name)) {
          return;
        }

        const tsNode = converter.get(node as TSESTree.Node);
        if (!canHaveModifiers(tsNode)) {
          return;
        }
        // ignore if private method
        const modifiers = tsNode.modifiers;
        if (
          modifiers !== undefined &&
          modifiers.some(
            (modifier: Modifier | ModifierLike): boolean =>
              modifier.kind === SyntaxKind.PrivateKeyword,
          )
        ) {
          return;
        }

        // iterate over parameters
        for (const param of node.params) {
          if (!isValidParam(param, converter, typeChecker)) {
            const symbol = typeChecker
              .getTypeAtLocation(converter.get(node as TSESTree.Node))
              .getSymbol();
            const overloads =
              symbol?.declarations
                ?.filter(
                  (declaration: Declaration): boolean =>
                    reverter.get(declaration as TSNode) !== undefined,
                )
                .map((declaration: Declaration): TSESTree.FunctionExpression => {
                  const method = reverter.get(declaration as TSNode) as TSESTree.MethodDefinition;
                  return method.value as TSESTree.FunctionExpression;
                }) ?? [];
            evaluateOverloads(
              overloads,
              converter,
              typeChecker,
              verifiedMethods,
              name,
              param,
              context,
            );
          }
        }
      },

      FunctionDeclaration: (node: TSESTree.FunctionDeclaration): void => {
        const id = node.id;
        const name = id && id.name;

        // ignore if name seen already
        if (name !== null && name !== "" && verifiedDeclarations.includes(name)) {
          return;
        }

        // iterate over parameters
        for (const param of node.params) {
          if (!isValidParam(param, converter, typeChecker)) {
            const symbol = typeChecker
              .getTypeAtLocation(converter.get(node as TSESTree.Node))
              .getSymbol();
            const overloads =
              symbol?.declarations?.map(
                (declaration: Declaration): TSESTree.FunctionDeclaration =>
                  reverter.get(declaration as TSNode) as TSESTree.FunctionDeclaration,
              ) ?? [];
            evaluateOverloads(
              overloads,
              converter,
              typeChecker,
              verifiedDeclarations,
              name,
              param,
              context,
            );
          }
        }
      },
    };
  },
});
