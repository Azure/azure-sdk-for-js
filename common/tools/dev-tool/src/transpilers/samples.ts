// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nodeBuiltins from "builtin-modules";
import fs from "fs-extra";
import path from "path";
import * as ts from "typescript";
import { convert } from "../commands/samples/tsToJs";
import { createPrinter } from "../util/printer";
import { ProjectInfo } from "../util/resolveProject";
import {
  AzSdkMetaTags,
  AZSDK_META_TAG_PREFIX,
  DEV_SAMPLES_BASE,
  ModuleInfo,
  VALID_AZSDK_META_TAGS
} from "../util/sampleGenerationInfo";

const log = createPrinter("transpile:samples");

const SYNTAX_VIABILITY_TESTS = {
  ES2020: {
    BigInt: ts.isBigIntLiteral,
    ImportExpression: (node: ts.Node) =>
      ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword,
    NullishCoalesce: ts.isNullishCoalesce,
    OptionalChain: ts.isOptionalChain
  },
  ES2021: {
    ShorthandAssignment: (node: ts.Node) =>
      ts.isBinaryExpression(node) &&
      [
        ts.SyntaxKind.AmpersandAmpersandEqualsToken,
        ts.SyntaxKind.BarBarEqualsToken,
        ts.SyntaxKind.QuestionQuestionEqualsToken
      ].includes(node.operatorToken.kind),
    NumericSeparator: (node: ts.Node) => ts.isNumericLiteral(node) && !!node.getText().includes("_")
  },
  ES2022: {
    StaticField: (node: ts.Node) =>
      ts.isPropertyDeclaration(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword),
    PrivateIdentifier: ts.isPrivateIdentifier,
    StaticInitializer: ts.isClassStaticBlockDeclaration
  }
} as const;

function isForbiddenEcmaSyntax(node: ts.Node): string | false {
  for (const [esVersion, tests] of Object.entries(SYNTAX_VIABILITY_TESTS)) {
    for (const [syntaxName, test] of Object.entries(tests)) {
      if (test(node)) {
        return `forbidden ${esVersion} "${syntaxName}" syntax (samples must support ES2019)`;
      }
    }
  }

  return false;
}

export async function processSources(
  projectInfo: ProjectInfo,
  sources: string[],
  fail: (...values: unknown[]) => never
): Promise<ModuleInfo[]> {
  const jobs = sources.map(async (source) => {
    const sourceText = (await fs.readFile(source)).toString("utf8");

    let summary: string | undefined = undefined;

    const importedModules: string[] = [];
    const usedEnvironmentVariables: string[] = [];
    const azSdkTags: AzSdkMetaTags = {};

    const relativeSourcePath = path.relative(path.join(projectInfo.path, DEV_SAMPLES_BASE), source);

    const sourceProcessor: ts.TransformerFactory<ts.SourceFile> = (context) => (
      sourceFile: ts.SourceFile
    ) => {
      let exports = sourceFile.statements
        .filter(({ modifiers }) =>
          modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
        )
        .flatMap(
          (node) =>
            (node as ts.FunctionDeclaration).name?.getText(sourceFile) ??
            ((node as any)
              .declarationList as ts.VariableDeclarationList)?.declarations.map(
              (decl: ts.VariableDeclaration) => decl.name.getText(sourceFile)
            )
        );

      const visitor: ts.Visitor = (node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.ExportKeyword) return undefined;

        let ecmaSupportError;
        if ((ecmaSupportError = isForbiddenEcmaSyntax(node))) {
          log.error(`${relativeSourcePath}: ${ecmaSupportError}: \`${node.getText(sourceFile)}\``);
        }

        if (ts.isImportDeclaration(node)) {
          importedModules.push((node.moduleSpecifier as ts.StringLiteral).text);
        } else if (ts.isImportEqualsDeclaration(node)) {
          log.error(
            `${relativeSourcePath}: unsupported \`import =\` declaration: \`${node.getText(
              sourceFile
            )}\`.`
          );
          fail(
            [
              "`import =` is not supported when targeting ECMAScript modules.",
              "This dependency will NOT be included in your package's dependencies."
            ].join(" ")
          );
        } else if (ts.isCallExpression(node)) {
          const {
            expression,
            arguments: [firstArgument]
          } = node;
          if (
            (ts.isIdentifier(expression) && expression.text === "require") ||
            expression.kind === ts.SyntaxKind.ImportKeyword
          ) {
            if (ts.isStringLiteralLike(firstArgument)) {
              importedModules.push(firstArgument.text);
            } else {
              log.error(
                `${relativeSourcePath}: unsupported dynamic import: \`${node.getText(sourceFile)}\``
              );
              fail(
                "Dynamic imports (`import` expressions or `require` calls) cannot be statically analyzed."
              );
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
            `${relativeSourcePath}: unsupported use of \`export\`: \`${node.getText(sourceFile)}\``
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
          )
        ]);
      }

      return sourceFile;
    };

    const jsModuleText = convert(sourceText, {
      fileName: source,
      transformers: {
        before: [sourceProcessor]
      }
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
      azSdkTags
    };
  });

  return Promise.all(jobs);
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
