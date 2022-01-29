// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force there to be only named exports at the top level.
 * @author Arpan Laha
 */

import { normalize, relative } from "path";
import { ExportDefaultDeclaration } from "estree";
import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-modules-only-named",
    "force there to be only named exports at the top level"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    relative(normalize(context.getFilename()), normalize(context.settings.main)) === ""
      ? ({
          // callback functions

          // throw error if an export default declaration is seen
          ExportDefaultDeclaration: (node: ExportDefaultDeclaration): void =>
            context.report({
              node: node,
              message: "default exports exist at top level",
            }),
        } as Rule.RuleListener)
      : {},
};
