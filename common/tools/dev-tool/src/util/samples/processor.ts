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
import { AzSdkMetaTags, AZSDK_META_TAG_PREFIX, ModuleInfo, VALID_AZSDK_META_TAGS } from "./info";
import { testSyntax } from "./syntax";
import { toCommonJs } from "./transforms";

const log = createPrinter("samples:processor");

export async function processSources(
  sourceDirectory: string,
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

  const importedRelativeModules = new Set<string>();

  const jobs = sources.map(async (source) => {
    const sourceText = (await fs.readFile(source)).toString("utf8");

    let summary: string | undefined = undefined;

    const importedModules: string[] = [];
    const usedEnvironmentVariables: string[] = [];
    const azSdkTags: AzSdkMetaTags = {};

    const relativeSourcePath = path.relative(sourceDirectory, source);

    const sourceProcessor: ts.TransformerFactory<ts.SourceFile> =
      (context) => (sourceFile: ts.SourceFile) => {
        const exports = sourceFile.statements
          .filter(
            ({ modifiers }) =>
              modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword) &&
              !modifiers.some(({ kind }) => kind === ts.SyntaxKind.DefaultKeyword)
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
            hadUnsupportedSyntax = true;
            emitError(syntaxSupportError.message, node, sourceFile, syntaxSupportError.suggest);
          }

          addImportedModules(node, importedModules);

          addUsedEnvironmentVariables(node, sourceFile, usedEnvironmentVariables);

          const tags = ts.getJSDocTags(node);

          // Look for the @summary jsdoc tag block as well
          summary ??= extractAzSdkTags(tags, relativeSourcePath, node, sourceFile, azSdkTags);

          return ts.visitEachChild(node, visitor, context);
        };

        const visited = ts.visitNode(sourceFile, visitor);

        // We will only process exports for modules that appear to be util modules
        if (summary === undefined || azSdkTags.util) {
          return addCommonJsExports(context, visited, exports);
        }

        return visited;
      };

    const jsModuleText = convert(sourceText, {
      fileName: source,
      transformers: {
        before: [sourceProcessor],
        after: [toCommonJs],
      },
    });

    for (const relativeModule of importedModules
      .filter(isRelativePath)
      .map((modulePath) => path.relative(path.dirname(relativeSourcePath), modulePath))) {
      importedRelativeModules.add(relativeModule);
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

/**
 * Detects usage of environment variables and adds them to an array.
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
 * @param node - the node to analyze for used environment variables
 * @param sourceFile - the source file
 * @param usedEnvironmentVariables - an array to add the environment variable names to
 */
function addUsedEnvironmentVariables(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  usedEnvironmentVariables: string[]
) {
  if (
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
  }
}

/**
 * Accumulates the names of imported modules.
 *
 * @param node - the node to analyze for imports
 * @param importedModules - a list of modules to add the imports to
 */
function addImportedModules(node: ts.Node, importedModules: string[]) {
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
  }
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

  return !isRelativePath(moduleSpecifier);
}

// This seems like a reasonable test for "is a relative path" as long as
// absolute path imports are forbidden.
const isRelativePath = (path: string) => /^\.\.?[\/\\]/.test(path);
