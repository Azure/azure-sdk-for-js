// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*const path = require("path");

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: bootstrapping from", __dirname);
}

// Shim to invoke true typescript source
require("ts-node").register({
  transpileOnly: true,
  skipProject: true,
  preferTsExts: true,
  compilerOptions: {
    target: "es6",
    module: "commonjs"
  }
});
require(path.join(__dirname, "src", "register.ts"));*/

/**
 * This file loads our monkey patch for module resolution
 * in samples and tests. We use this to make sure that TS/ES
 * loading is supported and that path-mapped imports work
 * without rewriting them.
 */

const path = require("path");

const ts = require("typescript");

const cwd = process.cwd();

// This is the calling module, which will be the node repl context.
const main = module.parent;

// We need to know which package name to monkey patch
const { name: hostPackageName } = main.require("./package.json");

if (process.env.DEBUG) {
  console.info("Azure SDK for JS dev-tool: patching module loader from:", __dirname);
}

require("dotenv").config();

/**
 * The transformer we will use to handle imports of the host package.
 *
 * For example, if an @azure/template sample needs to import @azure/template,
 * this transformer will handle rewriting the imports for us.
 */
const makeTransformers = (_program) => ({
  before: [
    (transformationContext) => (sourceFile) =>
      ts.visitEachChild(
        sourceFile,
        (node) => {
          // If the sample or test program is trying to import the host package, we'll rewrite
          // it on the fly to make the import work.
          if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === hostPackageName) {
            // rewrite the import to use a relative path
            const oldName = node.moduleSpecifier.text;
            node.moduleSpecifier.text = path.relative(
              // This is marked internal in the TS API, need to make sure there's not a better way
              // to get the path from the sourceFile node
              path.dirname(sourceFile.path),
              path.join(cwd, "dist-esm", "src", "index")
            );
            console.log(
              `[dev-tool] Rewrote import of "${oldName}" to "${node.moduleSpecifier.text}".`
            );
          }
          return node;
        },
        transformationContext
      )
  ]
});

require("ts-node").register({
  skipProject: true,
  transpileOnly: false,
  compilerOptions: {
    target: "es6",
    module: "commonjs",
    allowJs: true
  },
  transformers: makeTransformers
});
