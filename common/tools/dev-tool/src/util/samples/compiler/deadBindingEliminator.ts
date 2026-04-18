// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { CompilerError } from "./types.js";

export interface EliminationResult {
  /** The source file with dead statements removed */
  outputFile: ts.SourceFile;
  /** Names that were eliminated (including cascaded ones) */
  eliminatedBindings: Set<string>;
  /** Names that survive (still referenced by live code) */
  survivingBindings: Set<string>;
}

/**
 * Collect all Identifier names that are genuine references in an AST subtree.
 * Skips property names on the right-hand side of `a.b` (PropertyAccessExpression),
 * since those are not binding references.
 */
function collectIdentifiers(node: ts.Node): Set<string> {
  const names = new Set<string>();
  function visit(n: ts.Node): void {
    if (ts.isPropertyAccessExpression(n)) {
      // Only visit the left side (expression), not the .name
      visit(n.expression);
      return;
    }
    if (ts.isIdentifier(n)) {
      names.add(n.text);
    }
    ts.forEachChild(n, visit);
  }
  visit(node);
  return names;
}

/**
 * Get binding names introduced by an import declaration.
 */
function getImportBindingNames(node: ts.ImportDeclaration): string[] {
  const names: string[] = [];
  const clause = node.importClause;
  if (!clause) return names;
  if (clause.name) {
    names.push(clause.name.text);
  }
  if (clause.namedBindings) {
    if (ts.isNamedImports(clause.namedBindings)) {
      for (const spec of clause.namedBindings.elements) {
        names.push(spec.name.text);
      }
    } else if (ts.isNamespaceImport(clause.namedBindings)) {
      names.push(clause.namedBindings.name.text);
    }
  }
  return names;
}

/**
 * Get binding names declared by a variable statement.
 */
function getVariableBindingNames(node: ts.VariableStatement): string[] {
  const names: string[] = [];
  for (const decl of node.declarationList.declarations) {
    if (ts.isIdentifier(decl.name)) {
      names.push(decl.name.text);
    }
  }
  return names;
}

/**
 * Find the root identifier of a call chain expression.
 * Walks through CallExpression.expression and PropertyAccessExpression.expression.
 */
function findCallChainRoot(expr: ts.Expression): ts.Identifier | undefined {
  let current: ts.Expression = expr;
  for (;;) {
    if (ts.isIdentifier(current)) {
      return current;
    } else if (ts.isCallExpression(current)) {
      current = current.expression;
    } else if (ts.isPropertyAccessExpression(current)) {
      current = current.expression;
    } else if (ts.isParenthesizedExpression(current)) {
      current = current.expression;
    } else if (ts.isAwaitExpression(current)) {
      current = current.expression;
    } else {
      return undefined;
    }
  }
}

/**
 * Determine if a statement is dead, alive, or tangled.
 * Returns:
 *  - "dead" + declared names if the statement should be removed
 *  - "alive" + declared names if the statement should be kept
 *  - "tangled" if dead and live bindings are inseparably mixed
 *  - "type-only" for interface/type alias declarations (always removed)
 */
function classifyStatement(
  stmt: ts.Statement,
  deadBindings: Set<string>,
): { status: "dead" | "alive" | "tangled" | "type-only"; declaredNames: string[] } {
  // Type declarations are always removed
  if (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) {
    return { status: "type-only", declaredNames: [] };
  }

  // Import declarations
  if (ts.isImportDeclaration(stmt)) {
    const names = getImportBindingNames(stmt);
    if (names.length === 0) return { status: "alive", declaredNames: [] };
    const allDead = names.every((n) => deadBindings.has(n));
    return { status: allDead ? "dead" : "alive", declaredNames: names };
  }

  // Function declarations
  if (ts.isFunctionDeclaration(stmt)) {
    const name = stmt.name?.text;
    if (name && deadBindings.has(name)) {
      return { status: "dead", declaredNames: [name] };
    }
    // Check if body references dead bindings
    if (name) {
      const refs = collectIdentifiers(stmt);
      refs.delete(name);
      const hasDeadRef = [...refs].some((r) => deadBindings.has(r));
      const hasLiveRef = [...refs].some((r) => !deadBindings.has(r));
      if (hasDeadRef && hasLiveRef) {
        return { status: "tangled", declaredNames: [name] };
      }
      if (hasDeadRef && !hasLiveRef) {
        return { status: "dead", declaredNames: [name] };
      }
    }
    return { status: "alive", declaredNames: name ? [name] : [] };
  }

  // Class declarations
  if (ts.isClassDeclaration(stmt)) {
    const name = stmt.name?.text;
    if (name && deadBindings.has(name)) {
      return { status: "dead", declaredNames: [name] };
    }
    return { status: "alive", declaredNames: name ? [name] : [] };
  }

  // Variable statements
  if (ts.isVariableStatement(stmt)) {
    const declaredNames = getVariableBindingNames(stmt);
    const allRefs = collectIdentifiers(stmt);
    // Remove declared names from references
    for (const n of declaredNames) allRefs.delete(n);

    const hasDeadRef = [...allRefs].some((r) => deadBindings.has(r));
    const allDeclaredDead = declaredNames.every((n) => deadBindings.has(n));

    if (allDeclaredDead && declaredNames.length > 0) {
      return { status: "dead", declaredNames };
    }

    if (hasDeadRef) {
      // Check if it's a multi-declaration statement with mixed live/dead
      const decls = stmt.declarationList.declarations;
      if (decls.length > 1) {
        // Check each declaration separately
        let hasLiveDecl = false;
        let hasDeadDecl = false;
        for (const decl of decls) {
          const declRefs = collectIdentifiers(decl);
          if (ts.isIdentifier(decl.name)) declRefs.delete(decl.name.text);
          const declHasDeadRef = [...declRefs].some((r) => deadBindings.has(r));
          if (declHasDeadRef) {
            hasDeadDecl = true;
          } else {
            hasLiveDecl = true;
          }
        }
        if (hasLiveDecl && hasDeadDecl) {
          return { status: "tangled", declaredNames };
        }
      }

      // Single declaration (or all dead): if initializer references dead binding, it's dead
      // But check if there are also live references (tangled)
      const hasLiveRef = [...allRefs].some((r) => !deadBindings.has(r));
      if (hasLiveRef) {
        return { status: "tangled", declaredNames };
      }
      return { status: "dead", declaredNames };
    }

    return { status: "alive", declaredNames };
  }

  // Expression statements
  if (ts.isExpressionStatement(stmt)) {
    const expr = stmt.expression;
    // For call expressions and property access chains, check the root
    const root = findCallChainRoot(expr);
    if (root && deadBindings.has(root.text)) {
      return { status: "dead", declaredNames: [] };
    }

    // For assignment expressions like `recorder = new Recorder(ctx)`
    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const leftRoot = ts.isIdentifier(expr.left) ? expr.left : undefined;
      if (leftRoot && deadBindings.has(leftRoot.text)) {
        return { status: "dead", declaredNames: [] };
      }
      // Check if right side references dead bindings
      const allRefs = collectIdentifiers(stmt);
      const hasDeadRef = [...allRefs].some((r) => deadBindings.has(r));
      const hasLiveRef = [...allRefs].some((r) => !deadBindings.has(r));
      if (hasDeadRef && hasLiveRef) {
        return { status: "tangled", declaredNames: [] };
      }
      if (hasDeadRef) {
        return { status: "dead", declaredNames: [] };
      }
    }

    // General: check if all refs are dead
    const allRefs = collectIdentifiers(stmt);
    const hasDeadRef = [...allRefs].some((r) => deadBindings.has(r));
    if (hasDeadRef) {
      const hasLiveRef = [...allRefs].some((r) => !deadBindings.has(r));
      if (hasLiveRef) {
        // For expression statements, if root is not dead but args have dead refs → tangled
        return { status: "tangled", declaredNames: [] };
      }
      return { status: "dead", declaredNames: [] };
    }

    return { status: "alive", declaredNames: [] };
  }

  // Default: keep alive
  return { status: "alive", declaredNames: [] };
}

/**
 * Remove statements that only reference dead bindings, then cascade.
 */
export function eliminateDeadBindings(
  sourceFile: ts.SourceFile,
  deadBindings: Set<string>,
  fileName?: string,
  options?: { treatTangledAsDead?: boolean },
): EliminationResult {
  const allEliminated = new Set<string>();
  const currentDead = new Set(deadBindings);
  let currentStatements = [...sourceFile.statements];

  // Cascade loop
  let changed = true;
  while (changed) {
    changed = false;
    const surviving: ts.Statement[] = [];
    const newDeadNames: string[] = [];

    for (const stmt of currentStatements) {
      const classification = classifyStatement(stmt, currentDead);

      if (classification.status === "tangled") {
        if (options?.treatTangledAsDead) {
          // In helper files, tangled = dead (cascade the declared names)
          classification.status = "dead";
        } else {
          const line =
            sourceFile.getLineAndCharacterOfPosition(stmt.getStart(sourceFile)).line + 1;
          throw new CompilerError(
            "Dead binding is tangled with live code and cannot be cleanly separated",
            fileName ?? sourceFile.fileName,
            line,
          );
        }
      }

      if (classification.status === "dead" || classification.status === "type-only") {
        changed = true;
        // Track declared names as newly dead (for cascade)
        for (const name of classification.declaredNames) {
          if (!allEliminated.has(name)) {
            allEliminated.add(name);
            currentDead.add(name);
            newDeadNames.push(name);
          }
        }
        // Also track referenced dead bindings that caused this removal
        const refs = collectIdentifiers(stmt);
        for (const ref of refs) {
          if (currentDead.has(ref)) {
            allEliminated.add(ref);
          }
        }
      } else {
        surviving.push(stmt);
      }
    }

    currentStatements = surviving;
  }

  // Build surviving bindings set
  const survivingBindings = new Set<string>();
  for (const stmt of currentStatements) {
    if (ts.isImportDeclaration(stmt)) {
      for (const name of getImportBindingNames(stmt)) {
        survivingBindings.add(name);
      }
    } else if (ts.isVariableStatement(stmt)) {
      for (const name of getVariableBindingNames(stmt)) {
        survivingBindings.add(name);
      }
    } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      survivingBindings.add(stmt.name.text);
    } else if (ts.isClassDeclaration(stmt) && stmt.name) {
      survivingBindings.add(stmt.name.text);
    }
  }

  const outputFile = ts.factory.updateSourceFile(
    sourceFile,
    currentStatements as readonly ts.Statement[] as ts.Statement[],
  );

  return { outputFile, eliminatedBindings: allEliminated, survivingBindings };
}
