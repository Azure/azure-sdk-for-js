// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client method option parameter type names to be suffixed with Options and prefixed with the class name if it is a class constructor and prefixed with the method name otherwise.
 * @author Arpan Laha
 */

import { ClassDeclaration, Identifier, MethodDefinition } from "estree";
import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { getPublicMethods, getRuleMetaData } from "../utils";
import { Rule } from "eslint";

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
          const optionsRegex =
            // the null check will always succeed because we apply this only for
            // classes where id.name=/Client$/.
            method.kind === "constructor" && node.id !== null
              ? new RegExp(`${node.id.name}Options`, "i")
              : new RegExp(`${methodIdentifier.name}Options`, "i");
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
                  if (!optionsRegex.test(paramTypeName)) {
                    const prefixKind = method.kind === "constructor" ? "class" : "method";
                    context.report({
                      node: param,
                      message: `options parameter type is not prefixed with the ${prefixKind} name`,
                    });
                  }
                }
              }
            }
          });
        });
      },
    } as Rule.RuleListener;
  },
};
