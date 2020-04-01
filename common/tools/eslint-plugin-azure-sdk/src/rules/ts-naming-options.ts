// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client method option parameter type names to be suffixed with Options and prefixed with the method name.
 * @author Arpan Laha
 */

import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { Rule } from "eslint";
import { ClassDeclaration, Identifier, MethodDefinition } from "estree";
import { getPublicMethods, getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-naming-options",
    "require client method option parameter type names to be suffixed with Options and prefixed with the method name"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices = context.parserServices as ParserServices;
    if (parserServices.program === undefined) {
      return {};
    }
    return {
      // callback functions

      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: ClassDeclaration): void => {
        getPublicMethods(node).forEach((method: MethodDefinition): void => {
          const methodIdentifier = method.key as Identifier;
          const TSFunction = method.value as TSESTree.FunctionExpression;

          // look for parameters with types suffixed with Options
          TSFunction.params.forEach((param: TSESTree.Parameter): void => {
            // checks to validate parameter
            if (param.type === "Identifier" && param.typeAnnotation !== undefined) {
              const typeAnnotation = param.typeAnnotation.typeAnnotation;
              if (
                typeAnnotation.type === "TSTypeReference" &&
                typeAnnotation.typeName.type === "Identifier"
              ) {
                const paramTypeName = typeAnnotation.typeName.name;
                if (paramTypeName.endsWith("Options")) {
                  // check that parameter is prefixed with method name
                  const optionsRegex = new RegExp(`${methodIdentifier.name}Options`, "i");
                  if (!optionsRegex.test(paramTypeName)) {
                    context.report({
                      node: param,
                      message: "options parameter type is not prefixed with the method name"
                    });
                  }
                }
              }
            }
          });
        });
      }
    } as Rule.RuleListener;
  }
};
