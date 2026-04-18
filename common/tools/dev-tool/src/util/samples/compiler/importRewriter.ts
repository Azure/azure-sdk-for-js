// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import type { ClassifiedImport } from "./types.js";

/**
 * Copy leading comments from an original source node onto a newly created node.
 * Uses ts.getLeadingCommentRanges to read comments from the source text, then
 * attaches them as synthetic leading comments so the printer emits them.
 */
function copyLeadingComments<T extends ts.Node>(
  target: T,
  original: ts.Node,
  sourceFile: ts.SourceFile,
): T {
  const sourceText = sourceFile.getFullText();
  const commentRanges = ts.getLeadingCommentRanges(sourceText, original.getFullStart());
  if (!commentRanges) return target;

  let result: T = target;
  for (const range of commentRanges) {
    let text = sourceText.slice(range.pos, range.end);
    // Strip the comment delimiters for the synthetic comment API
    const isMultiLine = range.kind === ts.SyntaxKind.MultiLineCommentTrivia;
    if (isMultiLine) {
      text = text.slice(2, -2); // remove /* and */
    } else {
      text = text.slice(2); // remove //
    }
    result = ts.addSyntheticLeadingComment(
      result,
      range.kind,
      text,
      range.hasTrailingNewLine,
    );
  }
  return result;
}

export interface RewriteResult {
  /** The rewritten import declarations, ready to be placed at the top of the output */
  imports: ts.ImportDeclaration[];
}

/**
 * Clone an ImportSpecifier as a fresh node (detached from any source file).
 */
function cloneSpecifier(spec: ts.ImportSpecifier): ts.ImportSpecifier {
  return ts.factory.createImportSpecifier(
    spec.isTypeOnly,
    spec.propertyName ? ts.factory.createIdentifier(spec.propertyName.text) : undefined,
    ts.factory.createIdentifier(spec.name.text),
  );
}

/**
 * Clone import attributes (the `with { type: "json" }` clause) as fresh nodes.
 */
function cloneAttributes(
  attrs: ts.ImportAttributes | undefined,
): ts.ImportAttributes | undefined {
  if (!attrs) return undefined;
  const elements = attrs.elements.map((el) =>
    ts.factory.createImportAttribute(
      ts.isIdentifier(el.name)
        ? ts.factory.createIdentifier(el.name.text)
        : ts.factory.createStringLiteral((el.name as ts.StringLiteral).text),
      ts.isStringLiteral(el.value)
        ? ts.factory.createStringLiteral(el.value.text)
        : el.value,
    ),
  );
  return ts.factory.createImportAttributes(
    ts.factory.createNodeArray(elements),
  );
}

/**
 * Rebuild an import declaration as entirely fresh nodes, with a new module specifier.
 * This avoids issues where nodes from a parsed source file can't be printed
 * in isolation (the printer looks up text from the original source).
 */
function rebuildImport(
  node: ts.ImportDeclaration,
  specifier: string,
  attrs?: ts.ImportAttributes,
): ts.ImportDeclaration {
  const clause = node.importClause;
  if (!clause) {
    // side-effect import
    return ts.factory.createImportDeclaration(
      undefined,
      undefined,
      ts.factory.createStringLiteral(specifier),
      attrs,
    );
  }

  let newDefault: ts.Identifier | undefined;
  if (clause.name) {
    newDefault = ts.factory.createIdentifier(clause.name.text);
  }

  let newBindings: ts.NamedImportBindings | undefined;
  if (clause.namedBindings) {
    if (ts.isNamespaceImport(clause.namedBindings)) {
      newBindings = ts.factory.createNamespaceImport(
        ts.factory.createIdentifier(clause.namedBindings.name.text),
      );
    } else {
      newBindings = ts.factory.createNamedImports(
        clause.namedBindings.elements.map(cloneSpecifier),
      );
    }
  }

  return ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(clause.isTypeOnly, newDefault, newBindings),
    ts.factory.createStringLiteral(specifier),
    attrs,
  );
}

/**
 * Remove dead specifiers from a named import, returning a fresh node.
 * Returns undefined if all bindings are dead (import should be removed).
 */
function pruneAndRebuild(
  node: ts.ImportDeclaration,
  specifier: string,
  deadBindings: Set<string>,
  attrs?: ts.ImportAttributes,
): ts.ImportDeclaration | undefined {
  const clause = node.importClause;
  if (!clause) {
    // side-effect import — always keep
    return ts.factory.createImportDeclaration(
      undefined,
      undefined,
      ts.factory.createStringLiteral(specifier),
      attrs,
    );
  }

  const defaultName = clause.name;
  const defaultDead = defaultName ? deadBindings.has(defaultName.text) : false;
  const keepDefault = defaultName && !defaultDead;

  if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
    const nsDead = deadBindings.has(clause.namedBindings.name.text);
    if (nsDead && !keepDefault) return undefined;
    const newBindings = nsDead
      ? undefined
      : ts.factory.createNamespaceImport(
          ts.factory.createIdentifier(clause.namedBindings.name.text),
        );
    return ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        clause.isTypeOnly,
        keepDefault ? ts.factory.createIdentifier(defaultName!.text) : undefined,
        newBindings,
      ),
      ts.factory.createStringLiteral(specifier),
      attrs,
    );
  }

  if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
    const liveSpecifiers = clause.namedBindings.elements.filter(
      (s) => !deadBindings.has(s.name.text),
    );
    if (liveSpecifiers.length === 0 && !keepDefault) return undefined;
    const newBindings =
      liveSpecifiers.length > 0
        ? ts.factory.createNamedImports(liveSpecifiers.map(cloneSpecifier))
        : undefined;
    return ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        clause.isTypeOnly,
        keepDefault ? ts.factory.createIdentifier(defaultName!.text) : undefined,
        newBindings,
      ),
      ts.factory.createStringLiteral(specifier),
      attrs,
    );
  }

  // Only default import
  if (defaultDead) return undefined;
  return rebuildImport(node, specifier, attrs);
}

/**
 * Rewrite imports for published sample output.
 *
 * - "sourceCode" imports: rewrite module specifier to packageName
 * - "test" imports: remove entirely
 * - "external" imports: keep as-is
 * - "localHelper" imports: keep (path may need adjustment by caller)
 * - "dataFile" imports: keep as-is
 * - Remove imports where all bindings are in the dead set
 * - Sort: external/package first (alphabetical), then dotenv/config, then local/data
 */
export function rewriteImports(
  classifiedImports: ClassifiedImport[],
  packageName: string,
  deadBindings: Set<string>,
  sourceFile?: ts.SourceFile,
): RewriteResult {
  const packageImports: ts.ImportDeclaration[] = [];
  const localImports: ts.ImportDeclaration[] = [];

  // Collect named specifiers from sourceCode imports for merging
  // Separate type-only from runtime specifiers
  const mergedRuntimeSpecifiers: ts.ImportSpecifier[] = [];
  const mergedTypeOnlySpecifiers: ts.ImportSpecifier[] = [];
  // Track non-named sourceCode imports (default, namespace)
  const nonNamedSourceImports: ts.ImportDeclaration[] = [];
  // Track a surviving default import from source code for merging with named imports
  let sourceDefaultName: string | undefined;

  for (const ci of classifiedImports) {
    if (ci.category === "test") continue;

    if (ci.category === "sourceCode") {
      const clause = ci.node.importClause;
      if (!clause) continue; // side-effect source import

      // Determine if this is a type-only import at the declaration level
      const isTypeOnlyImport = clause.isTypeOnly;

      // Collect live named specifiers for merging
      if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const spec of clause.namedBindings.elements) {
          if (!deadBindings.has(spec.name.text)) {
            if (isTypeOnlyImport || spec.isTypeOnly) {
              mergedTypeOnlySpecifiers.push(spec);
            } else {
              mergedRuntimeSpecifiers.push(spec);
            }
          }
        }
      }

      // Default or namespace imports
      if (clause.name || (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings))) {
        const defaultName = clause.name;
        const defaultDead = defaultName ? deadBindings.has(defaultName.text) : false;
        const keepDefault = defaultName && !defaultDead;
        const hasNs = clause.namedBindings && ts.isNamespaceImport(clause.namedBindings);
        const nsDead = hasNs
          ? deadBindings.has((clause.namedBindings as ts.NamespaceImport).name.text)
          : true;

        if (keepDefault && !hasNs) {
          // Track default for merging with named imports
          sourceDefaultName = defaultName!.text;
        } else if (keepDefault || (hasNs && !nsDead)) {
          // Namespace imports (with or without default) stay separate
          const newDefault = keepDefault
            ? ts.factory.createIdentifier(defaultName!.text)
            : undefined;
          const newBindings =
            hasNs && !nsDead
              ? ts.factory.createNamespaceImport(
                  ts.factory.createIdentifier(
                    (clause.namedBindings as ts.NamespaceImport).name.text,
                  ),
                )
              : undefined;
          nonNamedSourceImports.push(
            ts.factory.createImportDeclaration(
              undefined,
              ts.factory.createImportClause(clause.isTypeOnly, newDefault, newBindings),
              ts.factory.createStringLiteral(packageName),
            ),
          );
        }
      }
      continue;
    }

    // external, localHelper, dataFile
    const attrs = cloneAttributes(ci.node.attributes);
    const rebuilt = pruneAndRebuild(ci.node, ci.moduleSpecifier, deadBindings, attrs);
    if (!rebuilt) continue;

    const withComments = sourceFile ? copyLeadingComments(rebuilt, ci.node, sourceFile) : rebuilt;
    if (ci.category === "external") {
      packageImports.push(withComments);
    } else {
      localImports.push(withComments);
    }
  }

  // Build merged sourceCode named imports (separate runtime and type-only)
  // Include default import in the runtime merged statement if present
  const defaultIdent = sourceDefaultName
    ? ts.factory.createIdentifier(sourceDefaultName)
    : undefined;

  if (mergedRuntimeSpecifiers.length > 0) {
    packageImports.push(
      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          false,
          defaultIdent,
          ts.factory.createNamedImports(mergedRuntimeSpecifiers.map(cloneSpecifier)),
        ),
        ts.factory.createStringLiteral(packageName),
      ),
    );
  } else if (defaultIdent) {
    // Default import only, no named imports to merge with
    packageImports.push(
      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(false, defaultIdent, undefined),
        ts.factory.createStringLiteral(packageName),
      ),
    );
  }
  if (mergedTypeOnlySpecifiers.length > 0) {
    packageImports.push(
      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          true,
          undefined,
          ts.factory.createNamedImports(
            mergedTypeOnlySpecifiers.map((s) =>
              // When merging into a type-only import declaration, per-specifier isTypeOnly must be false
              ts.factory.createImportSpecifier(
                false,
                s.propertyName ? ts.factory.createIdentifier(s.propertyName.text) : undefined,
                ts.factory.createIdentifier(s.name.text),
              ),
            ),
          ),
        ),
        ts.factory.createStringLiteral(packageName),
      ),
    );
  }

  // Add non-named source imports (default/namespace)
  packageImports.push(...nonNamedSourceImports);

  // Sort package imports alphabetically by specifier
  packageImports.sort((a, b) => {
    const specA = (a.moduleSpecifier as ts.StringLiteral).text;
    const specB = (b.moduleSpecifier as ts.StringLiteral).text;
    return specA.localeCompare(specB);
  });

  // Sort local imports alphabetically
  localImports.sort((a, b) => {
    const specA = (a.moduleSpecifier as ts.StringLiteral).text;
    const specB = (b.moduleSpecifier as ts.StringLiteral).text;
    return specA.localeCompare(specB);
  });

  const result: ts.ImportDeclaration[] = [...packageImports];

  result.push(...localImports);

  return { imports: result };
}
