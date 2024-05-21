// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force usage of built-in promises over external ones.
 *
 */

import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils/index.js";
import { isExternalModule } from "typescript";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-use-promises",
  meta: {
    type: "suggestion",
    docs: {
      description: "force usage of built-in promises over external ones",
      recommended: "recommended",
    },
    messages: {
      NoExternalPromise:
        "promises should use the in-built Promise type, not libraries or polyfills",
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
            node,
            messageId: "NoExternalPromise",
          });
        }
      },
    };
  },
});
