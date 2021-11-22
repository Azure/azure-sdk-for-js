// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nodeBuiltins from "builtin-modules";
import fs from "fs-extra";
import { EOL } from "os";
import path from "path";
import { cwd } from "process";
import * as ts from "typescript";
import { convert } from "../../commands/samples/tsToJs";
import { createPrinter } from "../printer";
import { ProjectInfo } from "../resolveProject";
import {
  AzSdkMetaTags,
  AZSDK_META_TAG_PREFIX,
  DEV_SAMPLES_BASE,
  ModuleInfo,
  VALID_AZSDK_META_TAGS,
} from "./generation";

const log = createPrinter("samples:processor");

/**
 * Tests for syntax compatibility.
 *
 * This is a Map from Category -> Name -> Test, where Test is a predicate that determines if a ts.Node is an instance
 * of the syntax form. For example:
 *
 * ES2020 -> NullishCoalesce -> ts.isNullishCoalesce
 * Category: ES2020
 * Name: NullishCoalesce
 * Test: ts.isNullishCoalesce (TS API built-in helper)
 *
 * If the test returns true, then the syntax is considered unsupported by the compiler, and an error will be generated
 * during sample publication.
 */
const SYNTAX_VIABILITY_TESTS = {
  CommonJS: {
    // require(<not a literal string>)
    DynamicRequire: (node: ts.Node) =>
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      !ts.isStringLiteral(node.arguments[0]),
  },
  ESModule: {
    // TODO: this is difficult to support well, but we could do it by enforcing that the RHS is a static require call
    ImportEquals: ts.isImportEqualsDeclaration,
    // These are possible to support, but samples that really need them should probably have their own unique setup
    // export { ... }, export foo from "bar", export * as foo from "bar", and export { ... } from "foo";
    ExportDeclaration: ts.isExportDeclaration,
    // export = { ... }
    ExportAssignment: ts.isExportAssignment,
  },
  ES2020: {
    // 1n
    BigInt: ts.isBigIntLiteral,
    // import("foo")
    ImportExpression: (node: ts.Node) =>
      ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword,
    // foo ?? bar
    NullishCoalesce: ts.isNullishCoalesce,
    // foo?.bar, foo?.(bar), and foo?.[bar]
    OptionalChain: ts.isOptionalChain,
  },
  ES2021: {
    // x ??= y, x ||= y, and x &&= y
    ShorthandAssignment: (node: ts.Node) =>
      ts.isBinaryExpression(node) &&
      [
        ts.SyntaxKind.AmpersandAmpersandEqualsToken,
        ts.SyntaxKind.BarBarEqualsToken,
        ts.SyntaxKind.QuestionQuestionEqualsToken,
      ].includes(node.operatorToken.kind),
    // 1_000_000
    NumericSeparator: (node: ts.Node) =>
      ts.isNumericLiteral(node) && !!node.getText().includes("_"),
  },
  ES2022: {
    // This is well-supported in TypeScript but is emitted as an assignment rather than a `static`
    // static foo = "bar"
    StaticField: (node: ts.Node) =>
      ts.isPropertyDeclaration(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword),
    // #foo
    PrivateIdentifier: ts.isPrivateIdentifier,
    // static { ... }
    StaticInitializer: ts.isClassStaticBlockDeclaration,
  },
} as const;

/**
 * Converts a union type U of types [T1, T2, ... Tn] into an intersection of the same types.
 */
type UnionToIntersection<Union> =
  // Evil distributive magic. The first conditional distributes U into a union of functions, then the second conditional
  // infers an intersection due to variance inversion.
  (Union extends unknown ? (k: Union) => void : never) extends (k: infer Intersection) => void
    ? Intersection
    : never;

type SyntaxTest = (node: ts.Node) => boolean;

type SyntaxName = keyof UnionToIntersection<
  typeof SYNTAX_VIABILITY_TESTS[keyof typeof SYNTAX_VIABILITY_TESTS]
>;

const SUGGEST_SYNTAX: {
  [K in SyntaxName]?: (node: /* makes the type system happy */ ts.Node) => string;
} = {
  DynamicRequire: () => "use static import/exports in samples for the best TypeScript experience",
  ExportAssignment: () => "export each symbol individually instead of using `export =`",
  ExportDeclaration: () =>
    "export each symbol individually where it is declared instead of using a blanket export declaration",
  OptionalChain: (node) => {
    const chain = node as ts.OptionalChain;
    const expressionText = chain.expression.getText().replace(/\?\./g, ".");
    // We need some text for the right-hand side
    const rhs = (
      ts.isPropertyAccessExpression(chain)
        ? "." + chain.name.text
        : ts.isElementAccessExpression(chain)
        ? "[" + chain.argumentExpression.getText() + "]"
        : ts.isCallExpression(chain)
        ? "(" + chain.arguments.map((node) => node.getText()).join(", ") + ")"
        : (() => {
            log.warn(
              "[Internal Error] Unknown right-hand-side of Optional Chain:",
              chain.getText()
            );
            return "<unknown>";
          })()
    ).replace(/\?\./g, ".");
    return `try \`${expressionText} && ${expressionText}${rhs}\` if it does not affect runtime behavior, or use an explicit \`if\` block to handle the nullish case`;
  },
  NullishCoalesce: (node) => {
    const nullish = node as ts.BinaryExpression;
    return `try \`${nullish.left.getText()} || ${nullish.right.getText()}\` if it does not affect runtime behavior, or use an explicit \`if\` block to handle the nullish case`;
  },
};

interface SyntaxSupportError {
  message: string;
  suggest?: string;
}

function testSyntax(node: ts.Node): SyntaxSupportError | undefined {
  for (const [category, tests] of Object.entries(SYNTAX_VIABILITY_TESTS)) {
    for (const [syntaxName, test] of Object.entries(tests) as [SyntaxName, SyntaxTest][]) {
      if (test(node)) {
        return {
          message: `unsupported ${category} "${syntaxName}" syntax`,
          suggest: SUGGEST_SYNTAX[syntaxName]?.(node as never),
        };
      }
    }
  }
}

export async function processSources(
  projectInfo: ProjectInfo,
  sources: string[],
  fail: (...values: unknown[]) => never
): Promise<ModuleInfo[]> {
  const diagnosticHost = {
    getNewLine: () => EOL,
    getCanonicalFileName: (name: string) => name,
    getCurrentDirectory: () => cwd(),
  };

  let hadUnsupportedSyntax = false;

  const emitError = (
    message: string,
    node: ts.Node,
    sourceFile: ts.SourceFile,
    suggest?: string
  ) => {
    hadUnsupportedSyntax = true;
    const [start, end] = [node.getStart(sourceFile), node.getEnd()];
    const diagnostic: ts.Diagnostic = {
      category: ts.DiagnosticCategory.Error,
      // I am intentionally lying to the compiler here to bypass the error code
      code: "-AZURE" as never,
      file: sourceFile,
      start,
      length: end - start,
      messageText: message,
    };
    if (suggest) {
      diagnostic.relatedInformation = [
        {
          category: ts.DiagnosticCategory.Message,
          code: 0,
          messageText: "Suggestion: " + suggest,
          file: undefined,
          start: undefined,
          length: undefined,
        },
      ];
    }
    console.error(ts.formatDiagnosticsWithColorAndContext([diagnostic], diagnosticHost));
  };

  const jobs = sources.map(async (source) => {
    const sourceText = (await fs.readFile(source)).toString("utf8");

    let summary: string | undefined = undefined;

    const importedModules: string[] = [];
    const usedEnvironmentVariables: string[] = [];
    const azSdkTags: AzSdkMetaTags = {};

    const relativeSourcePath = path.relative(path.join(projectInfo.path, DEV_SAMPLES_BASE), source);

    const sourceProcessor: ts.TransformerFactory<ts.SourceFile> =
      (context) => (sourceFile: ts.SourceFile) => {
        let exports = sourceFile.statements
          .filter(({ modifiers }) =>
            modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
          )
          .flatMap(
            (node) =>
              // TypeScript sees `async` and generator functions as ordinary function declarations at this point
              (node as ts.FunctionDeclaration | ts.ClassDeclaration).name?.getText(sourceFile) ??
              ((node as any).declarationList as ts.VariableDeclarationList)?.declarations.map(
                (decl: ts.VariableDeclaration) => decl.name.getText(sourceFile)
              )
          );

        const visitor: ts.Visitor = (node: ts.Node) => {
          const syntaxSupportError = testSyntax(node);
          if (syntaxSupportError) {
            emitError(syntaxSupportError.message, node, sourceFile, syntaxSupportError.suggest);
          }

          if (ts.isImportDeclaration(node)) {
            importedModules.push((node.moduleSpecifier as ts.StringLiteral).text);
          } else if (ts.isCallExpression(node)) {
            const {
              expression,
              arguments: [firstArgument],
            } = node;
            if (
              (ts.isIdentifier(expression) && expression.text === "require") ||
              expression.kind === ts.SyntaxKind.ImportKeyword
            ) {
              if (ts.isStringLiteralLike(firstArgument)) {
                importedModules.push(firstArgument.text);
              }
            }
          } else if (
            ts.isPropertyAccessExpression(node) ||
            (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression))
          ) {
            // Magic that finds out what environment variables you're using in the sources.
            if (node.expression.getText(sourceFile) === "process.env") {
              const value: string = ts.isElementAccessExpression(node)
                ? (node.argumentExpression as ts.StringLiteral).text
                : node.name.text;

              usedEnvironmentVariables.push(value);
            }
          } else if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
            log.error(
              `${relativeSourcePath}: unsupported use of \`export\`: \`${node.getText(
                sourceFile
              )}\``
            );

            fail(
              "Only export modifiers (`export const`, `export function`, etc.) are supported in samples."
            );
          }

          const tags = ts.getJSDocTags(node);

          // Look for the @summary jsdoc tag block as well
          if (summary === undefined) {
            for (const tag of tags) {
              log.debug(`File ${relativeSourcePath} has tag ${tag.tagName.text}`);

              // New TS introduced comment: NodeArray, so we join the text if it is made of many nodes.
              const comment = Array.isArray(tag.comment)
                ? tag.comment.map((node: ts.JSDocText) => node.text ?? " ").join(" ")
                : (tag.comment as string | undefined);

              if (tag.tagName.text === "summary") {
                log.debug("Found summary tag on node:", node.getText(sourceFile));
                // Replace is required due to multi-line splitting messing with table formatting
                summary = comment?.replace(/\s*\r?\n\s*/g, " ");
              } else if (tag.tagName.text.startsWith(`${AZSDK_META_TAG_PREFIX}`)) {
                // We ran into an `azsdk` directive in the metadata
                const metaTag = tag.tagName.text.replace(
                  new RegExp(`^${AZSDK_META_TAG_PREFIX}`),
                  ""
                ) as keyof AzSdkMetaTags;
                log.debug(`File ${relativeSourcePath} has azsdk tag ${tag.tagName.text}`);
                if (VALID_AZSDK_META_TAGS.includes(metaTag)) {
                  const trimmedComment = comment?.trim();
                  // If there was _no_ comment, then we can assume it is a boolean tag
                  // and so being specified at all is an indication that we should use
                  // `true`
                  azSdkTags[metaTag as keyof AzSdkMetaTags] = trimmedComment
                    ? JSON.parse(trimmedComment)
                    : true;
                } else {
                  log.warn(
                    `Invalid azsdk tag ${metaTag}. Valid tags include ${VALID_AZSDK_META_TAGS}`
                  );
                }
              }
            }
          }

          return ts.visitEachChild(node, visitor, context);
        };

        ts.visitNode(sourceFile, visitor);

        // We will only process exports for modules that appear to be util modules
        if ((summary === undefined || azSdkTags.util) && exports.length > 0) {
          return context.factory.updateSourceFile(sourceFile, [
            ...sourceFile.statements,
            // module.exports = { ... }
            context.factory.createExpressionStatement(
              context.factory.createAssignment(
                context.factory.createPropertyAccessExpression(
                  context.factory.createIdentifier("module"),
                  context.factory.createIdentifier("exports")
                ),
                context.factory.createObjectLiteralExpression(
                  exports.map((name) => context.factory.createShorthandPropertyAssignment(name))
                )
              )
            ),
          ]);
        }

        return sourceFile;
      };

    const jsModuleText = convert(sourceText, {
      fileName: source,
      transformers: {
        before: [sourceProcessor],
      },
    });

    if (summary === undefined && azSdkTags.util !== true) {
      fail(
        `${relativeSourcePath} does not include an @summary tag and is not marked as a util (using @azsdk-util true).`
      );
    }

    return {
      filePath: source,
      relativeSourcePath,
      text: sourceText,
      jsModuleText,
      summary,
      importedModules: importedModules.filter(isDependency),
      usedEnvironmentVariables,
      azSdkTags,
    };
  });

  return Promise.all(jobs).then((results) => {
    // Only fail once at the end, so that we don't drown you with tons of red messages
    if (hadUnsupportedSyntax) {
      fail(
        "Samples must support the latest Node LTS well. See the errors above for more information."
      );
    }

    return results;
  });
}

/**
 * Determines whether a module specifier is a package dependency.
 *
 * A dependency is a module specifier that does not refer to a node builtin and
 * is not a relative path.
 *
 * Absolute path imports are not supported in samples (because the package base
 * is not fixed relative to the source file).
 *
 * @param moduleSpecifier - the string given to `import` or `require`
 * @returns - true if `moduleSpecifier` should be considered a reference to a
 * node module dependency
 */
function isDependency(moduleSpecifier: string): boolean {
  if (nodeBuiltins.includes(moduleSpecifier)) return false;

  // This seems like a reasonable test for "is a relative path" as long as
  // absolute path imports are forbidden.
  const isRelativePath = /^\.\.?[\/\\]/.test(moduleSpecifier);
  return !isRelativePath;
}
