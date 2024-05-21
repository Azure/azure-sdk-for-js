// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force there to be only named exports at the top level.
 *
 */

import { normalize, relative } from "node:path";
import { createRule } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-modules-only-named",
  meta: {
    type: "suggestion",
    docs: {
      description: "force there to be only named exports at the top level",
      recommended: "recommended",
    },
    messages: {
      NoDefaultExports: "Exports at top level should be named",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    if (relative(normalize(context.filename), normalize(context.settings.main as string)) !== "") {
      return {};
    }

    return {
      // throw error if an export default declaration is seen
      ExportDefaultDeclaration: (node): void =>
        context.report({
          node,
          messageId: "NoDefaultExports",
        }),
    };
  },
});
