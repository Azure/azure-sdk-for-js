// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile } from "node:fs/promises";
import path from "node:path";
import type {
  CallExpression,
  ClassDeclaration,
  ElementAccessExpression,
  FunctionDeclaration,
  Identifier,
  ImportDeclaration,
  JSDocTag,
  Node,
  PropertyAccessExpression,
  SourceFile,
  Statement,
  StringLiteral,
  VariableStatement,
} from "typescript/ast";
import { SyntaxKind, getJSDocTags, getTrailingCommentRanges } from "typescript/ast";
import {
  isCallExpression,
  isClassDeclaration,
  isElementAccessExpression,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isPropertyAccessExpression,
  isStringLiteralLikeNode,
  isVariableStatement,
} from "typescript/ast/is";
import { convert } from "./convert.ts";
import { createPrinter } from "../printer.ts";
import { createAccumulator } from "../typescript/accumulator.ts";
import { createDiagnosticEmitter } from "../typescript/diagnostic.ts";
import type { SourceRewriter, TextEdit } from "../typescript/edits.ts";
import { getModifiers } from "../typescript/nodes.ts";
import type { AzSdkMetaTags, ModuleInfo } from "./info.ts";
import { AZSDK_META_TAG_PREFIX, VALID_AZSDK_META_TAGS } from "./info.ts";
import { testSyntax } from "./syntax.ts";
import { createToCommonJsTransform, isDependency, isRelativePath } from "./transforms.ts";

const log = createPrinter("samples:processor");

export async function processSources(
  sourceDirectory: string,
  sources: string[],
  fail: (...values: unknown[]) => never,
  requireInScope: (moduleSpecifier: string) => unknown,
): Promise<ModuleInfo[]> {
  // Project-scoped information (shared between all source files)
  let hadUnsupportedSyntax = false;
  const importedRelativeModules = new Set<string>();

  const jobs = sources.map(async (source) => {
    const sourceText = (await readFile(source)).toString("utf8");

    // File-scoped information
    let summary: string | undefined = undefined;
    const azSdkTags: AzSdkMetaTags = {};
    const relativeSourcePath = path.relative(sourceDirectory, source);

    // This object is used to gather information about the nodes.
    // See: util/typescript/accumulator.ts
    const accumulator = createAccumulator({
      importedModules: {
        predicate: isImportOrStaticRequire,
        select: (node: ImportDeclaration | CallExpression) => {
          if (isImportDeclaration(node)) {
            return (node.moduleSpecifier as StringLiteral).text;
          } else {
            return (node.arguments[0] as StringLiteral).text;
          }
        },
      },
      usedEnvironmentVariables: {
        predicate: isProcessEnvAccess,
        select: (node: PropertyAccessExpression | ElementAccessExpression) => {
          if (isPropertyAccessExpression(node)) {
            return node.name.text;
          } else {
            return (node.argumentExpression as StringLiteral).text;
          }
        },
      },
      exports: {
        predicate: (node) => {
          const modifiers = getModifiers(node);
          return (
            (modifiers?.some(({ kind }) => kind === SyntaxKind.ExportKeyword) &&
              !modifiers.some(({ kind }) => kind === SyntaxKind.DefaultKeyword)) ??
            false
          );
        },
        select: (node: FunctionDeclaration | ClassDeclaration | VariableStatement) => {
          if (isVariableStatement(node)) {
            return node.declarationList.declarations
              .filter((decl) => isIdentifier(decl.name))
              .map((decl) => (decl.name as Identifier).text);
          } else {
            return node.name?.text;
          }
        },
      },
    });

    const sourceProcessor: SourceRewriter = ({ sourceFile }) => {
      const emitError = createDiagnosticEmitter(sourceFile);

      const visit = (node: Node): void => {
        const syntaxSupportError = testSyntax(node);
        if (syntaxSupportError) {
          hadUnsupportedSyntax = true;
          emitError(syntaxSupportError.message, node, syntaxSupportError.suggest);

          // We won't check the children of erroneous nodes. It can get confusing quickly to do so.
          return;
        }

        accumulator.addNode(node);

        const tags = getJSDocTags(node);

        // Process azsdk tags. This function returns the summary tag if it was found and also inserts @azsdk-<name>
        // tags into the azSdkTags object.
        summary ??= extractAzSdkTags(tags, relativeSourcePath, node, sourceFile, azSdkTags);

        node.forEachChild(visit);
      };

      visit(sourceFile);

      return [
        ...processImportType(sourceFile),
        ...addCommonJsExports(sourceFile, accumulator.exports),
      ];
    };

    // Where the work happens. This runs the conversion step from the ts-to-js command with the rewriter we've defined
    // above and the CommonJS transforms (see transforms.ts).
    const jsModuleText = await convert(sourceText, {
      fileName: source,
      before: [sourceProcessor],
      after: [createToCommonJsTransform(requireInScope)],
    });

    // Check the imports for any relative module imports (these could be util files), and compute a relative path to the
    // module from the source directory
    for (const relativeModule of accumulator.importedModules
      .filter(isRelativePath)
      .map((modulePath) =>
        path.normalize(path.join(path.dirname(relativeSourcePath), modulePath)),
      )) {
      importedRelativeModules.add(relativeModule);
    }

    return {
      filePath: source,
      relativeSourcePath,
      text: sourceText,
      jsModuleText,
      summary,
      importedModules: accumulator.importedModules.filter(isDependency),
      usedEnvironmentVariables: accumulator.usedEnvironmentVariables,
      azSdkTags,
    };
  });

  return Promise.all(jobs).then((results) => {
    // Only fail once at the end, so that we don't drown you with tons of red messages.
    // Think of this whole *then* continuation as a validation pass.

    if (hadUnsupportedSyntax) {
      fail(
        "Samples must support the latest Node LTS well. See the errors above for more information.",
      );
    }

    for (const result of results) {
      if (
        result.summary === undefined &&
        !importedRelativeModules.has(result.relativeSourcePath.replace(/\.ts$/, "")) &&
        !importedRelativeModules.has(result.relativeSourcePath.replace(/\.ts$/, ".js")) &&
        !result.azSdkTags.util
      ) {
        fail(
          `${result.relativeSourcePath} does not include an @summary tag, is not imported by any other module, and is not marked as a util (using @azsdk-util true).`,
        );
      }
    }

    return results;
  });
}

function isImportOrStaticRequire(node: Node): node is ImportDeclaration | CallExpression {
  return (
    isImportDeclaration(node) ||
    (isCallExpression(node) &&
      ((isIdentifier(node.expression) && node.expression.text === "require") ||
        node.expression.kind === SyntaxKind.ImportKeyword) &&
      isStringLiteralLikeNode(node.arguments[0]))
  );
}

/**
 * Detects usage of environment variables.
 *
 * This can _only_ work with property access expressions where the left hand side is a node that has the exact text
 *
 * "process.env"
 *
 * For example, it won't work with process["env"], and it won't work if process is bound to another name. It will _only_
 * work with:
 *
 * - `process.env.NAME`
 * - `process.env["NAME"]`
 *
 * @param node - the node to test
 * @param sourceFile - the source file where the node appears
 * @returns true if the node appears to be a process.env access.
 */
function isProcessEnvAccess(
  node: Node,
  sourceFile?: SourceFile,
): node is PropertyAccessExpression | ElementAccessExpression {
  return (
    (isPropertyAccessExpression(node) || isElementAccessExpression(node)) &&
    // This is cheating a bit, but it will work and doesn't require us to test the node any deeper
    node.expression.getText(sourceFile) === "process.env"
  );
}

/**
 * Look for Azure SDK JSDoc tags and add them to an object, and extract the value of the `summary` tag.
 *
 * @param tags - JSDoc tags of a node
 * @param relativeSourcePath - the relative source path of the file
 * @param node - the node where the tags come from (used for debug output)
 * @param sourceFile - the source file
 * @param azSdkTags - an object to enter azsdk tags into
 * @returns the summary tag's value or undefined if none was found
 */
function extractAzSdkTags(
  tags: readonly JSDocTag[],
  relativeSourcePath: string,
  node: Node,
  sourceFile: SourceFile,
  azSdkTags: AzSdkMetaTags,
): string | undefined {
  let summary: string | undefined;
  for (const tag of tags) {
    log.debug(`File ${relativeSourcePath} has tag ${tag.tagName.text}`);

    // The comment is made of many nodes (text and links), so we join their text.
    const comment = tag.comment?.map((part) => part.text ?? " ").join(" ");

    if (tag.tagName.text === "summary") {
      log.debug("Found summary tag on node:", node.getText(sourceFile));
      // Replace is required due to multi-line splitting messing with table formatting
      summary = comment?.replace(/\s*\r?\n\s*/g, " ");
    } else if (tag.tagName.text.startsWith(`${AZSDK_META_TAG_PREFIX}`)) {
      // We ran into an `azsdk` directive in the metadata
      const metaTag = tag.tagName.text.replace(
        new RegExp(`^${AZSDK_META_TAG_PREFIX}`),
        "",
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
        log.warn(`Invalid azsdk tag ${metaTag}. Valid tags include ${VALID_AZSDK_META_TAGS}`);
      }
    }
  }
  return summary;
}

/**
 * Describes the edits that turn a source file into a CommonJS module: they handle `export default` and add a
 * `module.exports = { ... }` statement to the end of the file.
 *
 * @param sourceFile - the source file to process
 * @param exports - a list of exported symbols in the file
 * @returns the edits to apply to the source file's text
 */
function addCommonJsExports(sourceFile: SourceFile, exports: string[]): TextEdit[] {
  log.debug("Adding exports:", exports);

  const exportEntries = [...exports];
  const edits = processExportDefault(sourceFile, exportEntries);

  if (exportEntries.length > 0) {
    // The statement goes after the last statement and the comments that trail it on its line, but before any
    // comments that end the file.
    const lastStatement = sourceFile.statements.at(-1);
    const insertAt = lastStatement
      ? (getTrailingCommentRanges(sourceFile.text, lastStatement.getEnd())?.at(-1)?.end ??
        lastStatement.getEnd())
      : 0;
    edits.push({
      start: insertAt,
      end: insertAt,
      // module.exports = { ... }
      text: `\n;\nmodule.exports = { ${exportEntries.join(", ")} };\n`,
    });
  }

  return edits;
}

/**
 * Handles `export default` modifiers.
 *
 * Default exports in the TypeScript compiler are actually handled very strangely. As a consequence, we can only handle
 * `export default function` and `export default class` (as these are just ordinary function/class declarations with an
 * `export` modifier and a `default` modifier at the surface level). Something like `export default {}` is actually a
 * different kind of syntax node: ExportAssignment (the same kind as an `export =` statement). ExportAssignment
 * statements are rejected outright by the sample tool, so we only need to consider `export default function` and
 * `export default class`
 *
 * @param sourceFile - the source file to process
 * @param exportEntries - a list to add the new default property assignments to
 * @returns the edits to apply to the source file's text
 */
function processExportDefault(sourceFile: SourceFile, exportEntries: string[]): TextEdit[] {
  const edits: TextEdit[] = [];

  for (const statement of sourceFile.statements) {
    const modifiers = getModifiers(statement);
    const exportModifier = modifiers?.find(({ kind }) => kind === SyntaxKind.ExportKeyword);
    const defaultModifier = modifiers?.find(({ kind }) => kind === SyntaxKind.DefaultKeyword);

    // Only function and class declarations have modifiers that make a statement a default export, and anything else
    // that has them (such as an interface) doesn't exist at runtime.
    if (
      !exportModifier ||
      !defaultModifier ||
      !(isFunctionDeclaration(statement) || isClassDeclaration(statement))
    ) {
      continue;
    }

    // The ranges of the `export` and `default` keywords and the whitespace after them. Everything else about the
    // declaration (other modifiers, decorators, comments) is kept as written.
    const removedRanges = [exportModifier, defaultModifier].map((modifier) => {
      let end = modifier.getEnd();
      while (/\s/.test(sourceFile.text[end] ?? "")) {
        end++;
      }
      return { start: modifier.getStart(), end };
    });

    if (statement.name) {
      exportEntries.push(`default: ${statement.name.text}`);
      edits.push(...removedRanges.map((range) => ({ ...range, text: "" })));
      continue;
    }

    // If there is no name, the declaration is anonymous, and we will bind it as an expression in module.exports
    const start = statement.getStart();
    let expression = "";
    let position = start;
    for (const range of removedRanges.sort((a, b) => a.start - b.start)) {
      expression += sourceFile.text.slice(position, range.start);
      position = range.end;
    }
    expression += sourceFile.text.slice(position, statement.getEnd());

    // A function without a body is a strange case that I assume has to do with overload declarations.
    if (isClassDeclaration(statement) || statement.body !== undefined) {
      exportEntries.push(`default: ${expression}`);
    }

    edits.push({ start, end: statement.getEnd(), text: ";" });
  }

  return edits;
}

/**
 * Handles `import type {...}` statements.
 *
 * We want to replace import type declaration with a statement that will
 * not be eliminated by the compiler during transpilation to JavaScript so that
 * the comments around it can be preserved.
 *
 * @param sourceFile - the source file to process
 * @returns the edits to apply to the source file's text
 */
function processImportType(sourceFile: SourceFile): TextEdit[] {
  return sourceFile.statements
    .filter(
      (node: Statement) =>
        isImportDeclaration(node) && node.importClause?.phaseModifier === SyntaxKind.TypeKeyword,
    )
    .map((node) => ({ start: node.getStart(), end: node.getEnd(), text: ";" }));
}
