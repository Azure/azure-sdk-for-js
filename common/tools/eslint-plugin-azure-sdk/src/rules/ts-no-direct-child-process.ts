// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Require safe process helpers instead of direct child_process access.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/ruleCreator.js";

type Options = [];
type MessageIds = "useCoreProcess";

const CHILD_PROCESS_MODULES = new Set(["child_process", "node:child_process"]);
const CORE_PROCESS_PACKAGE = "@azure/core-process";

function staticString(node: TSESTree.Node | undefined): string | undefined {
  if (!node) {
    return undefined;
  }
  if (node.type === TSESTree.AST_NODE_TYPES.Literal && typeof node.value === "string") {
    return node.value;
  }
  if (node.type === TSESTree.AST_NODE_TYPES.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.cooked ?? undefined;
  }
  return undefined;
}

function isChildProcessModule(node: TSESTree.Node | undefined): boolean {
  const moduleName = staticString(node);
  return moduleName !== undefined && CHILD_PROCESS_MODULES.has(moduleName);
}

function memberName(node: TSESTree.MemberExpression): string | undefined {
  if (!node.computed && node.property.type === TSESTree.AST_NODE_TYPES.Identifier) {
    return node.property.name;
  }
  return staticString(node.property);
}

function isMemberCall(
  callee: TSESTree.CallExpression["callee"],
  objectName: string,
  propertyName: string,
): boolean {
  return (
    callee.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
    callee.object.type === TSESTree.AST_NODE_TYPES.Identifier &&
    callee.object.name === objectName &&
    memberName(callee) === propertyName
  );
}

function findOwningPackageName(filename: string, cwd: string): string | undefined {
  let directory = path.dirname(path.resolve(cwd, filename));
  const root = path.parse(directory).root;

  while (directory !== root) {
    const packageJsonPath = path.join(directory, "package.json");
    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
          name?: unknown;
        };
        return typeof packageJson.name === "string" ? packageJson.name : undefined;
      } catch {
        return undefined;
      }
    }
    directory = path.dirname(directory);
  }
  return undefined;
}

export default createRule<Options, MessageIds>({
  name: "ts-no-direct-child-process",
  meta: {
    type: "problem",
    docs: {
      description: "Require @azure/core-process for external process execution",
    },
    schema: [],
    messages: {
      useCoreProcess:
        "Do not load child_process directly. Use @azure/core-process; only named fork and type-only imports are allowed.",
    },
  },
  defaultOptions: [],
  create(context) {
    if (findOwningPackageName(context.filename, context.getCwd()) === CORE_PROCESS_PACKAGE) {
      return {};
    }

    const report = (node: TSESTree.Node): void => {
      context.report({ node, messageId: "useCoreProcess" });
    };

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        if (!isChildProcessModule(node.source) || node.importKind === "type") {
          return;
        }

        const isAllowed = node.specifiers.every((specifier) => {
          if (specifier.type !== TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            return false;
          }
          if (specifier.importKind === "type") {
            return true;
          }
          const imported =
            specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier
              ? specifier.imported.name
              : String(specifier.imported.value);
          return imported === "fork";
        });

        if (!isAllowed) {
          report(node);
        }
      },

      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        if (node.source && isChildProcessModule(node.source) && node.exportKind !== "type") {
          report(node);
        }
      },

      ExportAllDeclaration(node: TSESTree.ExportAllDeclaration): void {
        if (isChildProcessModule(node.source) && node.exportKind !== "type") {
          report(node);
        }
      },

      ImportExpression(node: TSESTree.ImportExpression): void {
        if (isChildProcessModule(node.source)) {
          report(node);
        }
      },

      TSImportEqualsDeclaration(node: TSESTree.TSImportEqualsDeclaration): void {
        if (
          node.importKind !== "type" &&
          node.moduleReference.type === TSESTree.AST_NODE_TYPES.TSExternalModuleReference &&
          isChildProcessModule(node.moduleReference.expression)
        ) {
          report(node);
        }
      },

      CallExpression(node: TSESTree.CallExpression): void {
        const isRequire =
          node.callee.type === TSESTree.AST_NODE_TYPES.Identifier && node.callee.name === "require";
        const isModuleRequire = isMemberCall(node.callee, "module", "require");
        const isBuiltinModule = isMemberCall(node.callee, "process", "getBuiltinModule");

        if (
          (isRequire || isModuleRequire || isBuiltinModule) &&
          isChildProcessModule(node.arguments[0])
        ) {
          report(node);
        }
      },
    };
  },
});
