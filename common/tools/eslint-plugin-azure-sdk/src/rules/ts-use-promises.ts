// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force usage of built-in promises over external ones.
 * @author Arpan Laha
 */

import { ParserServices } from "@typescript-eslint/experimental-utils";
import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";
import { isExternalModule } from "typescript";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData("ts-use-promises", "force usage of built-in promises over external ones"),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices: ParserServices = context.parserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;
    return {
      ":function[returnType.typeAnnotation.typeName.name='Promise']": (node: any): void => {
        const symbol = typeChecker
          .getTypeAtLocation(converter.get(node.returnType.typeAnnotation))
          .getSymbol();
        if (symbol === undefined) {
          return;
        }

        const declaration = symbol.valueDeclaration;
        if (declaration === undefined) {
          return;
        }

        if (isExternalModule(declaration.getSourceFile())) {
          context.report({
            node: node,
            message: "promises should use the in-built Promise type, not libraries or polyfills",
          });
        }
      },
    };
  },
};
