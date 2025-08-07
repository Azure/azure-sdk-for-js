import { TSESTree } from "@typescript-eslint/utils";
import { resolve, dirname } from "node:path";
import { createRule } from "../utils/ruleCreator.js";

type Options = [];
type MessageIds = "invalidImport";

export default createRule<Options, MessageIds>({
  name: "no-invalid-test-imports",
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
    const filename = context.getFilename();

    const isTestFile =
      /\.(test|spec)\.[jt]sx?$/.test(filename) ||
      /__tests__/.test(filename) ||
      /[/\\](test|tests)[/\\]/.test(filename);
    if (!isTestFile) {
      return {};
    }

    const projectRoot = context.getCwd();
    const srcDir = resolve(projectRoot, "src");
    const fileDir = dirname(filename);

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const importPath = node.source.value;

        if (typeof importPath !== "string") {
          return;
        }

        // Only inspect relative imports
        if (!importPath.startsWith(".")) {
          return;
        }

        // Resolve the actual path of the import
        const resolvedPath = resolve(fileDir, importPath);

        // Check if resolved path is under src/
        if (resolvedPath.startsWith(srcDir)) {
          context.report({
            node,
            messageId: "invalidImport",
          });
        }
      },
    };
  },
});
