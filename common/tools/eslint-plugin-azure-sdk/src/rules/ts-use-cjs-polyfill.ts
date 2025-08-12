// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require proper usage of ESM / CommonJS polyfills in TypeScript files.
 *
 */

import { createRule } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-use-cjs-polyfill",
  meta: {
    type: "problem",
    docs: {
      description: "Require a proper polyfill when using CommonJS concepts in ESM files.",
    },
    messages: {
      usePolyfill:
        "__dirname and __filename should not be used in ESM files. Use the polyfill documented in https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Identifier: (node): void => {
        console.log(`Checking identifier: ${node.name} in file: ${context.filename}`);
        if (node.name === "__dirname" || node.name === "__filename") {
          console.log(`Found ${node.name} in file: ${context.filename}`);
          // if the file name does not match the pattern: "*-cjs.cts" then report
          if (!context.filename.endsWith("-cjs.cts")) {
            context.report({
              node: node,
              messageId: "usePolyfill",
            });
          }
        }
      },
    };
  },
});
