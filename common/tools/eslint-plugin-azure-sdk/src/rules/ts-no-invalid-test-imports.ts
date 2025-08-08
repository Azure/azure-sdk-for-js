// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to disallow relative imports from src/ in test files.
 */

import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/ruleCreator.js";

type Options = [];
type MessageIds = "invalidImport";

export default createRule<Options, MessageIds>({
  name: "ts-no-invalid-test-imports",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow relative imports from src/ in test files",
    },
    schema: [],
    messages: {
      invalidImport:
        'Test files may not import from "src/" using relative paths. Import from the package name directly or from $internal',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename;
    const isTestFile =
      /\.(test|spec)\.[jt]sx?$/.test(filename) || /[/\\](test|tests)[/\\]/.test(filename);
    if (!isTestFile) {
      return {};
    }

    function isRelativeImportIntoSrc(raw: string): boolean {
      if (!raw.startsWith(".")) {
        return false;
      } // only relative imports considered
      const segs = raw.split(/[\\/]+/); // split on / or \\ for cross-platform paths
      let i = 0;
      // Skip leading current-dir markers
      while (i < segs.length && segs[i] === ".") {
        i++;
      }
      let sawParent = false;
      while (i < segs.length && segs[i] === "..") {
        sawParent = true;
        i++;
      }
      if (!sawParent) {
        return false;
      } // must climb at least one level
      // Now if the next segment is exactly "src" we consider it disallowed
      return i < segs.length && segs[i] === "src";
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const importPath = node.source.value;
        if (typeof importPath !== "string") {
          return;
        }
        if (isRelativeImportIntoSrc(importPath)) {
          context.report({ node, messageId: "invalidImport" });
        }
      },
    };
  },
});
