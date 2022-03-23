// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import * as ts from "typescript";
import { convert } from "./convert";
import { createPrinter } from "../printer";
import { createAccumulator } from "../typescript/accumulator";
import { createDiagnosticEmitter } from "../typescript/diagnostic";
import { AzSdkMetaTags, AZSDK_META_TAG_PREFIX, ModuleInfo, VALID_AZSDK_META_TAGS } from "./info";
import { testSyntax } from "./syntax";
import { createToCommonJsTransform, isDependency, isRelativePath } from "./transforms";

const log = createPrinter("samples:processor");

export async function processSources(
  sourceDirectory: string,
  sources: string[],
  fail: (...values: unknown[]) => never,
  requireInScope: (moduleSpecifier: string) => unknown
): Promise<ModuleInfo[]> {
  // Project-scoped information (shared between all source files)
  let hadUnsupportedSyntax = false;
  const importedRelativeModules = new Set<string>();

  const jobs = sources.map(async (source) => {
    const sourceText = (await fs.readFile(source)).toString("utf8");

    // File-scoped information
    let summary: string | undefined = undefined;
    const azSdkTags: AzSdkMetaTags = {};
    const relativeSourcePath = path.relative(sourceDirectory, source);

    // This object is used to gather information about the nodes.
    // See: util/typescript/accumulator.ts
    const accumulator = createAccumulator({
      importedModules: {
        predicate: isImportOrStaticRequire,
        select: (node: ts.ImportDeclaration | ts.CallExpression) => {
          if (ts.isImportDeclaration(node)) {
            return (node.moduleSpecifier as ts.StringLiteral).text;
          } else {
            return (node.arguments[0] as ts.StringLiteralLike).text;
          }
        },
      },
      usedEnvironmentVariables: {
        predicate: isProcessEnvAccess,
        select: (node: ts.PropertyAccessExpression | ts.ElementAccessExpression) => {
          if (ts.isPropertyAccessExpression(node)) {
            return node.name.text;
          } else {
            return (node.argumentExpression as ts.StringLiteralLike).text;
          }
        },
      },
      exports: {
        predicate: ({ modifiers }) =>
          (modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword) &&
            !modifiers.some(({ kind }) => kind === ts.SyntaxKind.DefaultKeyword)) ??
          false,
        select: (node: ts.FunctionDeclaration | ts.ClassDeclaration | ts.VariableStatement) => {
          if (ts.isVariableStatement(node)) {
            return node.declarationList.declarations
              .filter((decl) => ts.isIdentifier(decl.name))
              .map((decl) => (decl.name as ts.Identifier).text);
          } else {
            return node.name?.text;
          }
        },
      },
    });

    const sourceProcessor: ts.TransformerFactory<ts.SourceFile> =
      (context) => (sourceFile: ts.SourceFile) => {
        const emitError = createDiagnosticEmitter(sourceFile);

        const visitor: ts.Visitor = (node: ts.Node) => {
          const syntaxSupportError = testSyntax(node);
          if (syntaxSupportError) {
            hadUnsupportedSyntax = true;
            emitError(syntaxSupportError.message, node, syntaxSupportError.suggest);

            // We won't check the children of erroneous nodes. It can get confusing quickly to do so.
            return undefined;
          }

          accumulator.addNode(node);

          const tags = ts.getJSDocTags(node);

          // Process azsdk tags. This function returns the summary tag if it was found and also inserts @azsdk-<name>
          // tags into the azSdkTags object.
          summary ??= extractAzSdkTags(tags, relativeSourcePath, node, sourceFile, azSdkTags);

          return ts.visitEachChild(node, visitor, context);
        };

        return addCommonJsExports(context, ts.visitNode(sourceFile, visitor), accumulator.exports);
      };

    // Where the work happens. This runs the conversion step from the ts-to-js command with the visitor we've defined
    // above and the CommonJS transforms (see transforms.ts).
    const jsModuleText = convert(sourceText, {
      fileName: source,
      transformers: {
        before: [sourceProcessor],
        after: [createToCommonJsTransform(requireInScope)],
      },
    });

    // Check the imports for any relative module imports (these could be util files), and compute a relative path to the
    // module from the source directory
    for (const relativeModule of accumulator.importedModules
      .filter(isRelativePath)
      .map((modulePath) =>
        path.normalize(path.join(path.dirname(relativeSourcePath), modulePath))
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
        "Samples must support the latest Node LTS well. See the errors above for more information."
      );
    }

    for (const result of results) {
      if (
        result.summary === undefined &&
        !importedRelativeModules.has(result.relativeSourcePath.replace(/\.ts$/, "")) &&
        !result.azSdkTags.util
      ) {
        fail(
          `${result.relativeSourcePath} does not include an @summary tag, is not imported by any other module, and is not marked as a util (using @azsdk-util true).`
        );
      }
    }

    return results;
  });
}

function isImportOrStaticRequire(node: ts.Node): node is ts.ImportDeclaration | ts.CallExpression {
  return (
    ts.isImportDeclaration(node) ||
    (ts.isCallExpression(node) &&
      ((ts.isIdentifier(node.expression) && node.expression.text === "require") ||
        node.expression.kind === ts.SyntaxKind.ImportKeyword) &&
      ts.isStringLiteralLike(node.arguments[0]))
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
  node: ts.Node,
  sourceFile?: ts.SourceFile
): node is ts.PropertyAccessExpression | ts.ElementAccessExpression {
  return (
    (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) &&
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
  tags: readonly ts.JSDocTag[],
  relativeSourcePath: string,
  node: ts.Node,
  sourceFile: ts.SourceFile,
  azSdkTags: AzSdkMetaTags
): string | undefined {
  let summary: string | undefined;
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
        log.warn(`Invalid azsdk tag ${metaTag}. Valid tags include ${VALID_AZSDK_META_TAGS}`);
      }
    }
  }
  return summary;
}

/**
 * Adds a node to the end of a source file containing a CommonJS module.exports = block.
 *
 * @param context - transformation context from the compiler API
 * @param sourceFile - the source file to process
 * @param exports - a list of exported symbols in the file
 * @returns the updated SourceFile node
 */
function addCommonJsExports(
  context: ts.TransformationContext,
  sourceFile: ts.SourceFile,
  exports: string[]
): ts.SourceFile {
  log.debug("Adding exports:", exports);

  const factory = context.factory;

  const exportEntries: ts.ObjectLiteralElementLike[] = exports.map((name) =>
    factory.createShorthandPropertyAssignment(name)
  );

  const transformedOriginalStatements = processExportDefault(sourceFile, factory, exportEntries);

  if (exportEntries.length > 0) {
    transformedOriginalStatements.push(
      factory.createEmptyStatement(),
      // module.exports = { ... }
      factory.createExpressionStatement(
        factory.createAssignment(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("module"),
            factory.createIdentifier("exports")
          ),
          factory.createObjectLiteralExpression(exportEntries)
        )
      )
    );
  }

  return factory.updateSourceFile(sourceFile, transformedOriginalStatements);
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
 * @param factory - a context-bound NodeFactory
 * @param exportEntries - a list to add the new default property assignments to
 * @returns a new list of statements for the source file
 */
function processExportDefault(
  sourceFile: ts.SourceFile,
  factory: ts.NodeFactory,
  exportEntries: ts.ObjectLiteralElementLike[]
): ts.Statement[] {
  return sourceFile.statements.map((statement) => {
    const isDefault =
      statement.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.DefaultKeyword) &&
      statement.modifiers.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword);

    if (!isDefault) {
      return statement;
    }

    // The only forms that can have `export default` modifiers are the following.
    const decl = statement as ts.FunctionDeclaration | ts.ClassDeclaration;
    const updatedModifiers = decl.modifiers?.filter(
      ({ kind }) => kind !== ts.SyntaxKind.DefaultKeyword && kind !== ts.SyntaxKind.ExportKeyword
    );

    if (!decl.name) {
      // If there is no name, the declaration is anonymous, and we will bind it as an expression in module.exports
      const initializer = ts.isClassDeclaration(decl)
        ? factory.createClassExpression(
            decl.decorators,
            updatedModifiers,
            undefined,
            decl.typeParameters,
            decl.heritageClauses,
            decl.members
          )
        : decl.body === undefined // This is a strange case that I assume has to do with overload declarations.
        ? undefined
        : factory.createFunctionExpression(
            updatedModifiers,
            decl.asteriskToken,
            undefined,
            decl.typeParameters,
            decl.parameters,
            decl.type,
            decl.body
          );

      if (initializer) {
        exportEntries.push(factory.createPropertyAssignment("default", initializer));
      }

      return factory.createEmptyStatement();
    }

    exportEntries.push(factory.createPropertyAssignment("default", decl.name));

    return ts.isClassDeclaration(decl)
      ? factory.updateClassDeclaration(
          decl,
          decl.decorators,
          updatedModifiers,
          decl.name,
          decl.typeParameters,
          decl.heritageClauses,
          decl.members
        )
      : factory.updateFunctionDeclaration(
          decl,
          decl.decorators,
          updatedModifiers,
          decl.asteriskToken,
          decl.name,
          decl.typeParameters,
          decl.parameters,
          decl.type,
          decl.body
        );
  });
}
