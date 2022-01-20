// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force Node support for all LTS versions.
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

/**
 * definition of LTS Node versions
 * * needs updating as definitions change
 */
const LTS = ">=12.0.0";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-engine-is-present",
    "force Node support for all LTS versions",
    "code",
    [
      {
        type: "object",
        properties: {
          nodeVersionOverride: {
            type: "string",
            default: LTS,
            description: "Allows specifying a different node version than the current default",
          },
        },
      },
    ]
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const options = context.options[0] || {};

    const verifiers = getVerifiers(context, {
      outer: "engines",
      inner: "node",
      expected: options.nodeVersionOverride || LTS,
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if engines exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that node is a member of engines
          "ExpressionStatement > ObjectExpression > Property[key.value='engines']":
            verifiers.isMemberOf,

          // check the node corresponding to engines.node to see if it is set to '>=8.0.0'
          "ExpressionStatement > ObjectExpression > Property[key.value='engines'] > ObjectExpression > Property[key.value='node']":
            verifiers.innerMatchesExpected,
        } as Rule.RuleListener)
      : {};
  },
};
