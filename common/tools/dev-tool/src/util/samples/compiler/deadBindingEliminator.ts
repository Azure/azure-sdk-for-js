// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Dead binding eliminator — IR-based poison propagation.
 *
 * Instead of per-node-type classification logic, this implementation:
 * 1. **Lowers** statements to normalized EliminationUnits (one per declarator,
 *    one per export specifier, etc.)
 * 2. **Propagates** poison uniformly over units via a single fixpoint loop
 * 3. **Reconstructs** surviving statements from surviving units
 *
 * This eliminates the entire class of "multi-binding tangling" bugs and handles
 * all node types with a single classification rule.
 */

import ts from "typescript";
import { CompilerError } from "./types.js";
import {
  createAnalyzer,
  isDeclarationName,
  resolveNamesToSymbols,
  type BindingAnalyzer,
} from "./bindingAnalyzer.js";

// ── Result types ─────────────────────────────────────────────────────

/** Result from the low-level statement elimination API. */
export interface StatementEliminationResult {
  /** Statements that survived elimination */
  survivingStatements: readonly ts.Statement[];
  /** Symbols newly eliminated during this run (cascaded) */
  newlyDeadSymbols: Set<ts.Symbol>;
}

/** Result from the convenience source-file elimination API. */
export interface EliminationResult {
  /** The source file with dead statements removed */
  outputFile: ts.SourceFile;
  /** Names that were eliminated (including cascaded ones) */
  eliminatedBindings: Set<string>;
  /** Names that survive (still referenced by live code) */
  survivingBindings: Set<string>;
}

// ── IR types ─────────────────────────────────────────────────────────

/**
 * A normalized unit of elimination. Each unit represents the smallest
 * independently-eliminable piece of a statement.
 *
 * - Variable statements are split: one unit per declarator
 * - Export declarations are split: one unit per specifier
 * - All other statements produce exactly one unit
 */
interface EliminationUnit {
  /** Symbols this unit brings into scope */
  declares: ts.Symbol[];
  /** Symbols this unit references at runtime (excluding type-only and locally-declared) */
  runtimeRefs: Set<ts.Symbol>;
  /** Index of the original statement in the input array */
  originalIndex: number;
  /** Side-effectful expressions to salvage if this unit is killed */
  salvageableEffects: ts.Expression[];
  /** True for type-only declarations (interfaces, type aliases) — always eliminated */
  isTypeOnly: boolean;
  /**
   * For variable statement splits: the individual VariableDeclaration.
   * Used during output reconstruction to rebuild partial variable statements.
   */
  declarator?: ts.VariableDeclaration;
  /**
   * For export specifier splits: the individual ExportSpecifier.
   * Used during output reconstruction to rebuild partial export declarations.
   */
  exportSpecifier?: ts.ExportSpecifier;
}

// ── Side-effect analysis ─────────────────────────────────────────────

/**
 * Check whether a node subtree contains any side-effectful operations.
 */
function hasSideEffects(node: ts.Node): boolean {
  if (ts.isCallExpression(node) || ts.isNewExpression(node)) return true;
  if (ts.isAwaitExpression(node)) return true;
  if (ts.isYieldExpression(node)) return true;
  if (ts.isDeleteExpression(node)) return true;
  if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
    node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
  )
    return true;
  if (ts.isPostfixUnaryExpression(node)) return true;
  if (
    ts.isPrefixUnaryExpression(node) &&
    (node.operator === ts.SyntaxKind.PlusPlusToken ||
      node.operator === ts.SyntaxKind.MinusMinusToken)
  )
    return true;
  return ts.forEachChild(node, hasSideEffects) ?? false;
}

/**
 * Walk a dead call chain and collect all arguments that have side effects.
 * Traverses through call → property-access → await → paren chains.
 *
 * Results are returned in source evaluation order: inner calls first
 * (since they execute before outer calls), and within each call,
 * arguments are in left-to-right order.
 */
function collectSideEffectArgs(expr: ts.Expression): ts.Expression[] {
  // Collect argument groups per call level (outermost first)
  const groups: ts.Expression[][] = [];
  let current: ts.Expression = expr;

  for (;;) {
    if (ts.isCallExpression(current)) {
      const group: ts.Expression[] = [];
      for (const arg of current.arguments) {
        if (hasSideEffects(arg)) {
          group.push(arg);
        }
      }
      if (group.length > 0) {
        groups.push(group);
      }
      current = current.expression;
    } else if (ts.isPropertyAccessExpression(current)) {
      current = current.expression;
    } else if (ts.isAwaitExpression(current)) {
      current = current.expression;
    } else if (ts.isParenthesizedExpression(current)) {
      current = current.expression;
    } else {
      break;
    }
  }

  // Reverse groups (inner calls execute first) but preserve within-group order
  groups.reverse();
  return groups.flat();
}

/**
 * Find the root identifier of a call chain expression.
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
 * Extract the root identifier from a LHS expression, walking through
 * property access (obj.prop) and element access (obj["key"]) chains.
 */
function getRootIdentifier(expr: ts.Expression): ts.Identifier | undefined {
  if (ts.isIdentifier(expr)) return expr;
  if (ts.isPropertyAccessExpression(expr)) return getRootIdentifier(expr.expression);
  if (ts.isElementAccessExpression(expr)) return getRootIdentifier(expr.expression);
  return undefined;
}

/**
 * Collect side-effectful sub-expressions from a dead assignment's LHS.
 * E.g., for `dead[getKey()] = val`, extracts `getKey()`.
 */
function collectLhsSideEffects(node: ts.Expression): ts.Expression[] {
  const effects: ts.Expression[] = [];
  function walk(n: ts.Expression): void {
    if (ts.isElementAccessExpression(n)) {
      if (hasSideEffects(n.argumentExpression)) {
        effects.push(n.argumentExpression);
      }
      walk(n.expression);
    } else if (ts.isPropertyAccessExpression(n)) {
      walk(n.expression);
    }
  }
  walk(node);
  return effects;
}

// ── Reference analysis ───────────────────────────────────────────────

/**
 * Collect symbols declared within a subtree (for exclusion from reference analysis).
 */
function collectDeclaredInNode(
  node: ts.Node,
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  const symbols = new Set<ts.Symbol>();

  function visit(n: ts.Node): void {
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) {
      const sym = analyzer.getSymbol(n.name);
      if (sym) symbols.add(sym);
    }
    if (ts.isFunctionDeclaration(n) && n.name) {
      const sym = analyzer.getSymbol(n.name);
      if (sym) symbols.add(sym);
    }
    if (ts.isParameter(n) && ts.isIdentifier(n.name)) {
      const sym = analyzer.getSymbol(n.name);
      if (sym) symbols.add(sym);
    }
    if (ts.isClassDeclaration(n) && n.name) {
      const sym = analyzer.getSymbol(n.name);
      if (sym) symbols.add(sym);
    }
    if (ts.isBindingElement(n) && ts.isIdentifier(n.name)) {
      const sym = analyzer.getSymbol(n.name);
      if (sym) symbols.add(sym);
    }
    ts.forEachChild(n, visit);
  }

  visit(node);
  return symbols;
}

/**
 * Collect runtime references (not type-only, not locally-declared) from a subtree.
 *
 * For property access `a.b.c`, only `a` is collected (the root binding).
 * Type-only positions (annotations, type assertions, heritage clauses) are excluded.
 * Locally declared symbols within the node (parameters, block vars) are excluded.
 */
function collectRuntimeRefs(
  node: ts.Node,
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  const refs = new Set<ts.Symbol>();
  const declaredInNode = collectDeclaredInNode(node, analyzer);

  function visit(n: ts.Node): void {
    if (ts.isTypeNode(n)) return; // Skip type annotations entirely
    if (ts.isPropertyAccessExpression(n)) {
      visit(n.expression);
      return;
    }
    if (ts.isIdentifier(n) && !isDeclarationName(n)) {
      if (analyzer.isTypePosition(n)) return;
      const sym = analyzer.getSymbol(n);
      if (sym && !declaredInNode.has(sym)) {
        refs.add(sym);
      }
    }
    ts.forEachChild(n, visit);
  }

  visit(node);
  return refs;
}

// ── Phase 1: Lower statements to IR units ────────────────────────────

/**
 * Lower an array of statements into normalized EliminationUnits.
 *
 * Splitting rules:
 * - Variable statements with N declarators → N units (one per declarator)
 * - Named export declarations with N specifiers → N units (one per specifier)
 * - All other statements → 1 unit
 */
function lowerToUnits(
  statements: readonly ts.Statement[],
  analyzer: BindingAnalyzer,
): EliminationUnit[] {
  const units: EliminationUnit[] = [];

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];

    // Type declarations → single type-only unit
    if (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) {
      units.push({
        declares: analyzer.getDeclaredSymbols(stmt),
        runtimeRefs: new Set(),
        originalIndex: i,
        salvageableEffects: [],
        isTypeOnly: true,
      });
      continue;
    }

    // Import declarations → single unit, no runtime refs (imports are bindings)
    if (ts.isImportDeclaration(stmt)) {
      const declaredSymbols = analyzer.getDeclaredSymbols(stmt);
      // Side-effect imports (no clause) have no declared symbols → always alive
      units.push({
        declares: declaredSymbols,
        runtimeRefs: new Set(),
        originalIndex: i,
        salvageableEffects: [],
        isTypeOnly: false,
      });
      continue;
    }

    // Variable statements → split per declarator
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        // Get symbols for this specific declarator
        const mySymbols = getDeclaredSymbolsForDeclarator(decl, analyzer);
        // Runtime refs from the initializer only (the binding name is a declaration, not a ref)
        const refs = decl.initializer
          ? collectRuntimeRefs(decl.initializer, analyzer)
          : new Set<ts.Symbol>();
        // Also collect type annotation refs? No — type annotations are erased.
        // But we DO need to mark units whose ONLY refs are dead type refs as eliminable.
        // Check if the declarator has dead type-only refs (for `let x: DeadType;`)
        const hasDeadTypeRef = hasDeadTypeReference(decl, analyzer);

        const salvageable: ts.Expression[] = [];
        if (decl.initializer && hasSideEffects(decl.initializer)) {
          salvageable.push(decl.initializer);
        }

        units.push({
          declares: mySymbols,
          runtimeRefs: refs,
          originalIndex: i,
          salvageableEffects: salvageable,
          isTypeOnly: false,
          declarator: decl,
          _hasDeadTypeRef: hasDeadTypeRef,
        } as EliminationUnit & { _hasDeadTypeRef: boolean });
      }
      continue;
    }

    // Function/class declarations → single unit
    if (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) {
      const declaredSymbols = analyzer.getDeclaredSymbols(stmt);
      const refs = collectRuntimeRefs(stmt, analyzer);
      // Exclude self-declared symbols from refs
      for (const sym of declaredSymbols) refs.delete(sym);
      const hasDeadTypeRef = hasDeadTypeReference(stmt, analyzer);
      units.push({
        declares: declaredSymbols,
        runtimeRefs: refs,
        originalIndex: i,
        salvageableEffects: [],
        isTypeOnly: false,
        _hasDeadTypeRef: hasDeadTypeRef,
      } as EliminationUnit & { _hasDeadTypeRef: boolean });
      continue;
    }

    // Export declarations → split per specifier for named exports
    if (ts.isExportDeclaration(stmt)) {
      const exportDecl = stmt;

      // Namespace re-export (export * from "...") — single alive unit
      if (!exportDecl.exportClause) {
        units.push({
          declares: [],
          runtimeRefs: new Set(),
          originalIndex: i,
          salvageableEffects: [],
          isTypeOnly: false,
        });
        continue;
      }

      // Named exports: split per specifier
      if (ts.isNamedExports(exportDecl.exportClause)) {
        for (const spec of exportDecl.exportClause.elements) {
          const localIdent = spec.propertyName ?? spec.name;
          // Resolve through aliases to find the declaration symbol.
          // Export specifiers create their own alias symbols; we need the
          // underlying declaration symbol to match against deadSymbols.
          let sym = analyzer.checker.getSymbolAtLocation(localIdent);
          if (sym && sym.flags & ts.SymbolFlags.Alias) {
            try {
              sym = analyzer.checker.getAliasedSymbol(sym);
            } catch {
              // ignore resolution failures in noResolve mode
            }
          }
          const refs = new Set<ts.Symbol>();
          if (sym) refs.add(sym);
          units.push({
            declares: [],
            runtimeRefs: refs,
            originalIndex: i,
            salvageableEffects: [],
            isTypeOnly: false,
            exportSpecifier: spec,
          });
        }
        continue;
      }

      // Namespace export (export * as ns from "...") — single alive unit
      units.push({
        declares: [],
        runtimeRefs: new Set(),
        originalIndex: i,
        salvageableEffects: [],
        isTypeOnly: false,
      });
      continue;
    }

    // Expression statements → single unit with specialized analysis
    if (ts.isExpressionStatement(stmt)) {
      const expr = stmt.expression;
      const unit = lowerExpressionStatement(expr, i, analyzer);
      units.push(unit);
      continue;
    }

    // Enum declarations → single unit
    if (ts.isEnumDeclaration(stmt)) {
      const declaredSymbols = analyzer.getDeclaredSymbols(stmt);
      units.push({
        declares: declaredSymbols,
        runtimeRefs: collectRuntimeRefs(stmt, analyzer),
        originalIndex: i,
        salvageableEffects: [],
        isTypeOnly: false,
      });
      continue;
    }

    // Unknown statement types → collect all runtime refs for proper analysis
    // This handles if/try/return/for/while/etc. that may appear in hook/it bodies
    units.push({
      declares: [],
      runtimeRefs: collectRuntimeRefs(stmt, analyzer),
      originalIndex: i,
      salvageableEffects: [],
      isTypeOnly: false,
    });
  }

  return units;
}

/**
 * Lower an expression statement to an EliminationUnit.
 *
 * For call chains and assignments, we use the "root" symbol as the primary
 * reference if it resolves to a local binding. Side-effectful arguments are
 * salvageable when the root-based unit is killed.
 *
 * When the root does NOT resolve to a local symbol (e.g., globals like
 * `beforeEach`), we fall back to collecting ALL runtime refs — this matches
 * the old general-analysis behavior where `beforeEach(() => { recorder = ... })`
 * is killed when `recorder` is the only non-global reference.
 */
function lowerExpressionStatement(
  expr: ts.Expression,
  originalIndex: number,
  analyzer: BindingAnalyzer,
): EliminationUnit {
  // Call chain: the "root" determines liveness when it resolves to a local symbol
  const callRoot = findCallChainRoot(expr);
  if (callRoot) {
    const rootSym = analyzer.getSymbol(callRoot);
    if (rootSym) {
      // Root resolves — use root-only ref with salvageable args
      const refs = new Set<ts.Symbol>();
      refs.add(rootSym);
      const salvageable = collectSideEffectArgs(expr);
      return {
        declares: [],
        runtimeRefs: refs,
        originalIndex,
        salvageableEffects: salvageable,
        isTypeOnly: false,
      };
    }
    // Root is a global/unresolved — fall through to general analysis
  }

  // Assignment: LHS root determines liveness when it resolves to a local symbol
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    const rootId = getRootIdentifier(expr.left);
    if (rootId) {
      const rootSym = analyzer.getSymbol(rootId);
      if (rootSym) {
        // LHS root resolves — use root-only ref with salvageable effects
        const refs = new Set<ts.Symbol>();
        refs.add(rootSym);
        const salvageable: ts.Expression[] = [];
        salvageable.push(...collectLhsSideEffects(expr.left));
        if (hasSideEffects(expr.right)) {
          salvageable.push(expr.right);
        }
        return {
          declares: [],
          runtimeRefs: refs,
          originalIndex,
          salvageableEffects: salvageable,
          isTypeOnly: false,
        };
      }
      // LHS root is unresolved — fall through to general analysis
    }
  }

  // General expression: collect all runtime refs from the entire expression
  const wrapperStmt = ts.factory.createExpressionStatement(expr);
  const refs = collectRuntimeRefs(wrapperStmt, analyzer);
  return {
    declares: [],
    runtimeRefs: refs,
    originalIndex,
    salvageableEffects: [],
    isTypeOnly: false,
  };
}

/**
 * Check if a node has dead type-only references (e.g., `let x: DeadType;`).
 * These make a unit eliminable even without runtime dead refs.
 */
function hasDeadTypeReference(
  node: ts.Node,
  analyzer: BindingAnalyzer,
): boolean {
  let found = false;
  function visit(n: ts.Node): void {
    if (found) return;
    if (ts.isTypeNode(n)) {
      visitType(n);
      return;
    }
    if (ts.isIdentifier(n) && !isDeclarationName(n) && analyzer.isTypePosition(n)) {
      const sym = analyzer.getSymbol(n);
      if (sym) {
        // We can't check deadSymbols here because we don't have it yet.
        // Instead, store that this node HAS type refs, and check in propagation.
        found = true;
      }
      return;
    }
    ts.forEachChild(n, visit);
  }
  function visitType(n: ts.Node): void {
    if (found) return;
    if (ts.isIdentifier(n) && !isDeclarationName(n)) {
      const sym = analyzer.getSymbol(n);
      if (sym) found = true;
    }
    ts.forEachChild(n, visitType);
  }
  visit(node);
  return found;
}

/**
 * Get symbols declared by a single variable declarator.
 */
function getDeclaredSymbolsForDeclarator(
  decl: ts.VariableDeclaration,
  analyzer: BindingAnalyzer,
): ts.Symbol[] {
  const symbols: ts.Symbol[] = [];
  collectBindingSymbols(decl.name, analyzer, symbols);
  return symbols;
}

function collectBindingSymbols(
  name: ts.BindingName,
  analyzer: BindingAnalyzer,
  out: ts.Symbol[],
): void {
  if (ts.isIdentifier(name)) {
    const sym = analyzer.getSymbol(name);
    if (sym) out.push(sym);
  } else if (ts.isObjectBindingPattern(name)) {
    for (const el of name.elements) collectBindingSymbols(el.name, analyzer, out);
  } else if (ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) collectBindingSymbols(el.name, analyzer, out);
    }
  }
}

/**
 * Collect type-only references from a node, returning their symbols.
 * Used during propagation to check if dead type refs make a unit eliminable.
 */
function collectTypeOnlyRefs(
  node: ts.Node,
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  const refs = new Set<ts.Symbol>();
  const declaredInNode = collectDeclaredInNode(node, analyzer);

  function visit(n: ts.Node): void {
    if (ts.isTypeNode(n)) {
      visitType(n);
      return;
    }
    if (ts.isIdentifier(n) && !isDeclarationName(n) && analyzer.isTypePosition(n)) {
      const sym = analyzer.getSymbol(n);
      if (sym && !declaredInNode.has(sym)) refs.add(sym);
      return;
    }
    ts.forEachChild(n, visit);
  }
  function visitType(n: ts.Node): void {
    if (ts.isIdentifier(n) && !isDeclarationName(n)) {
      const sym = analyzer.getSymbol(n);
      if (sym && !declaredInNode.has(sym)) refs.add(sym);
    }
    ts.forEachChild(n, visitType);
  }
  visit(node);
  return refs;
}

// ── Phase 2: Poison propagation ──────────────────────────────────────

type UnitStatus = "alive" | "dead" | "tangled";

/**
 * Classify a unit's status given the current set of poisoned symbols.
 *
 * This is the single, uniform classification rule — no per-node-type logic.
 *
 * Rules:
 * 1. Type-only → dead (always eliminated)
 * 2. Declares a poisoned symbol → dead (its purpose was to declare a dead thing)
 * 3. No declares, no runtimeRefs → alive (pure side effect or structural)
 * 4. All runtimeRefs are poisoned → dead
 * 5. Some runtimeRefs poisoned, some not → tangled
 * 6. No runtimeRefs are poisoned → alive
 *
 * Special: units with dead type-only refs (but no runtime refs) are also dead.
 */
function classifyUnit(
  unit: EliminationUnit,
  poisonedSymbols: Set<ts.Symbol>,
  statements: readonly ts.Statement[],
  analyzer: BindingAnalyzer,
): UnitStatus {
  // Rule 1: type-only → always dead
  if (unit.isTypeOnly) return "dead";

  // Rule 2: if any declared symbol is poisoned → dead
  if (unit.declares.length > 0 && unit.declares.some((s) => poisonedSymbols.has(s))) {
    return "dead";
  }

  // Rule 3: no declares AND no runtimeRefs → alive (side-effect or structural node)
  if (unit.declares.length === 0 && unit.runtimeRefs.size === 0) {
    return "alive";
  }

  // Rules 4-6: check runtimeRefs against poison
  if (unit.runtimeRefs.size > 0) {
    let hasDeadRef = false;
    let hasLiveRef = false;
    for (const sym of unit.runtimeRefs) {
      if (poisonedSymbols.has(sym)) {
        hasDeadRef = true;
      } else {
        hasLiveRef = true;
      }
    }
    if (hasDeadRef && !hasLiveRef) return "dead";
    if (hasDeadRef && hasLiveRef) return "tangled";
    // No dead refs in runtime — but check type-only refs
  }

  // Special: check dead type-only refs for units with no dead runtime refs
  // This handles cases like `let x: DeadType;` or `function f(x: DeadType) {}`
  if (unit.declares.length > 0 && (unit as any)._hasDeadTypeRef) {
    const stmt = statements[unit.originalIndex];
    // For per-declarator units, check the specific declarator
    const nodeToCheck = unit.declarator ?? stmt;
    const typeRefs = collectTypeOnlyRefs(nodeToCheck, analyzer);
    let hasDeadTypeRef = false;
    for (const sym of typeRefs) {
      if (poisonedSymbols.has(sym)) {
        hasDeadTypeRef = true;
        break;
      }
    }
    if (hasDeadTypeRef && unit.runtimeRefs.size === 0) {
      return "dead";
    }
  }

  return "alive";
}

/**
 * Run poison propagation to fixpoint over all units.
 *
 * Returns the final status of each unit and the set of newly poisoned symbols.
 */
function propagatePoison(
  units: EliminationUnit[],
  poisonedSymbols: Set<ts.Symbol>,
  statements: readonly ts.Statement[],
  analyzer: BindingAnalyzer,
  fileName: string,
  options?: { treatTangledAsDead?: boolean },
): { statuses: UnitStatus[]; newlyPoisoned: Set<ts.Symbol> } {
  const newlyPoisoned = new Set<ts.Symbol>();
  const statuses: UnitStatus[] = new Array(units.length).fill("alive");

  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < units.length; i++) {
      if (statuses[i] === "dead") continue; // Already dead, skip

      const status = classifyUnit(units[i], poisonedSymbols, statements, analyzer);

      if (status === "tangled") {
        if (options?.treatTangledAsDead) {
          statuses[i] = "dead";
          // Cascade: add declared symbols to poison set
          for (const sym of units[i].declares) {
            if (!poisonedSymbols.has(sym)) {
              poisonedSymbols.add(sym);
              newlyPoisoned.add(sym);
              changed = true;
            }
          }
        } else {
          const stmt = statements[units[i].originalIndex];
          const line =
            analyzer.sourceFile.getLineAndCharacterOfPosition(
              stmt.getStart(analyzer.sourceFile),
            ).line + 1;
          throw new CompilerError(
            "Dead binding is tangled with live code and cannot be cleanly separated",
            fileName,
            line,
          );
        }
        continue;
      }

      if (status === "dead") {
        statuses[i] = "dead";
        // Cascade: add declared symbols to poison set
        for (const sym of units[i].declares) {
          if (!poisonedSymbols.has(sym)) {
            poisonedSymbols.add(sym);
            newlyPoisoned.add(sym);
            changed = true;
          }
        }
      }
    }
  }

  return { statuses, newlyPoisoned };
}

// ── Phase 3: Output reconstruction ───────────────────────────────────

/**
 * Check if a salvageable effect should be emitted.
 *
 * An effect is ONLY emitted if it references NO poisoned symbols.
 * Effects that reference any dead/removed binding would produce broken
 * output (referencing undefined variables). Effects with no local refs
 * (pure globals like `console.log()`) are always emitted.
 */
function shouldEmitSalvagedEffect(
  effect: ts.Expression,
  poisonedSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
): boolean {
  const refs = collectRuntimeRefs(
    ts.factory.createExpressionStatement(effect),
    analyzer,
  );
  if (refs.size === 0) return true; // No local refs → emit (pure side effect)
  // Reject if ANY ref is poisoned — emitting would reference removed bindings
  for (const sym of refs) {
    if (poisonedSymbols.has(sym)) return false;
  }
  return true;
}

/**
 * Reconstruct surviving statements from units and their statuses.
 *
 * Handles:
 * - Grouping surviving declarators back into variable statements
 * - Grouping surviving export specifiers back into export declarations
 * - Emitting salvaged side effects as expression statements (filtered for dead refs)
 * - Preserving original statement order
 */
function reconstructStatements(
  units: EliminationUnit[],
  statuses: UnitStatus[],
  statements: readonly ts.Statement[],
  poisonedSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
): ts.Statement[] {
  const output: ts.Statement[] = [];

  // Process units grouped by original statement index
  let i = 0;
  while (i < units.length) {
    const originalIndex = units[i].originalIndex;
    const stmt = statements[originalIndex];

    // Collect all units for this original statement
    let j = i;
    while (j < units.length && units[j].originalIndex === originalIndex) {
      j++;
    }
    const stmtUnits = units.slice(i, j);
    const stmtStatuses = statuses.slice(i, j);
    i = j;

    // Check if this is a split variable statement
    if (stmtUnits.some((u) => u.declarator !== undefined)) {
      reconstructVariableStatement(
        stmt as ts.VariableStatement,
        stmtUnits,
        stmtStatuses,
        output,
        poisonedSymbols,
        analyzer,
      );
      continue;
    }

    // Check if this is a split export declaration
    if (stmtUnits.some((u) => u.exportSpecifier !== undefined)) {
      reconstructExportDeclaration(
        stmt as ts.ExportDeclaration,
        stmtUnits,
        stmtStatuses,
        output,
      );
      continue;
    }

    // Single unit — simple alive/dead
    const unit = stmtUnits[0];
    const status = stmtStatuses[0];

    if (status === "dead") {
      // Emit salvaged side effects that aren't themselves dead
      for (const effect of unit.salvageableEffects) {
        if (shouldEmitSalvagedEffect(effect, poisonedSymbols, analyzer)) {
          output.push(ts.factory.createExpressionStatement(effect));
        }
      }
    } else {
      output.push(stmt);
    }
  }

  return output;
}

/**
 * Reconstruct a variable statement from its per-declarator units.
 *
 * Emits surviving declarators and salvaged effects in original evaluation
 * order. When a dead declarator appears between surviving ones, its salvaged
 * effects are interleaved: pending survivors are flushed as a partial
 * variable statement, then the salvaged effect is emitted, preserving
 * the original left-to-right evaluation order.
 */
function reconstructVariableStatement(
  stmt: ts.VariableStatement,
  units: EliminationUnit[],
  statuses: UnitStatus[],
  output: ts.Statement[],
  poisonedSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
): void {
  let pendingDeclarators: ts.VariableDeclaration[] = [];

  function flushPending(): void {
    if (pendingDeclarators.length === 0) return;
    const newDeclList = ts.factory.createVariableDeclarationList(
      pendingDeclarators,
      stmt.declarationList.flags,
    );
    output.push(ts.factory.createVariableStatement(stmt.modifiers, newDeclList));
    pendingDeclarators = [];
  }

  for (let k = 0; k < units.length; k++) {
    if (statuses[k] === "dead") {
      // Collect salvaged effects that should be emitted
      const emittable = units[k].salvageableEffects.filter((effect) =>
        shouldEmitSalvagedEffect(effect, poisonedSymbols, analyzer),
      );
      if (emittable.length > 0) {
        // Flush pending survivors before emitting salvaged effects
        // to preserve original evaluation order
        flushPending();
        for (const effect of emittable) {
          output.push(ts.factory.createExpressionStatement(effect));
        }
      }
    } else {
      pendingDeclarators.push(units[k].declarator!);
    }
  }

  // Check if we can emit the original statement unchanged (optimization)
  if (pendingDeclarators.length === stmt.declarationList.declarations.length) {
    // All survived, no interleaved salvage — emit original
    pendingDeclarators = [];
    output.push(stmt);
    return;
  }

  flushPending();
}

/**
 * Reconstruct an export declaration from its per-specifier units.
 */
function reconstructExportDeclaration(
  stmt: ts.ExportDeclaration,
  units: EliminationUnit[],
  statuses: UnitStatus[],
  output: ts.Statement[],
): void {
  const survivingSpecifiers: ts.ExportSpecifier[] = [];

  for (let k = 0; k < units.length; k++) {
    if (statuses[k] !== "dead") {
      survivingSpecifiers.push(units[k].exportSpecifier!);
    }
  }

  if (survivingSpecifiers.length === 0) return; // All dead

  if (
    survivingSpecifiers.length ===
    (stmt.exportClause && ts.isNamedExports(stmt.exportClause)
      ? stmt.exportClause.elements.length
      : 0)
  ) {
    // All survived — emit original
    output.push(stmt);
  } else {
    // Partial — build new export declaration
    const newClause = ts.factory.createNamedExports(survivingSpecifiers);
    output.push(
      ts.factory.createExportDeclaration(
        stmt.modifiers,
        stmt.isTypeOnly,
        newClause,
        stmt.moduleSpecifier,
        stmt.attributes,
      ),
    );
  }
}

// ── Public APIs ──────────────────────────────────────────────────────

/**
 * Eliminate dead statements using scope-aware symbol analysis.
 *
 * Low-level API: operates on a subset of statements from a file analyzed
 * by the given analyzer. Uses pure symbol identity — no string fallback.
 *
 * NOTE: mutates deadSymbols by adding cascaded dead symbols.
 */
export function eliminateDeadStatements(
  statements: readonly ts.Statement[],
  deadSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
  fileName: string,
  options?: { treatTangledAsDead?: boolean },
): StatementEliminationResult {
  // Phase 1: Lower to IR
  const units = lowerToUnits(statements, analyzer);

  // Phase 2: Propagate poison
  const { statuses, newlyPoisoned } = propagatePoison(
    units,
    deadSymbols,
    statements,
    analyzer,
    fileName,
    options,
  );

  // Phase 3: Reconstruct
  const surviving = reconstructStatements(units, statuses, statements, deadSymbols, analyzer);

  return {
    survivingStatements: surviving,
    newlyDeadSymbols: newlyPoisoned,
  };
}

/**
 * Convenience API: eliminate dead bindings from a complete source file.
 *
 * Creates an analyzer internally, resolves dead names to symbols, runs
 * elimination, and returns a new SourceFile with survivors.
 * Dead names that don't resolve to any declared symbol are silently ignored.
 */
export function eliminateDeadBindings(
  sourceFile: ts.SourceFile,
  deadBindings: Set<string>,
  fileName?: string,
  options?: { treatTangledAsDead?: boolean },
): EliminationResult {
  const effectiveFileName = fileName ?? sourceFile.fileName;
  const sourceText = sourceFile.getFullText();
  const analyzer = createAnalyzer(sourceText, effectiveFileName);
  const deadSymbols = resolveNamesToSymbols(analyzer, deadBindings);

  const result = eliminateDeadStatements(
    [...analyzer.sourceFile.statements],
    deadSymbols,
    analyzer,
    effectiveFileName,
    options,
  );

  // Build string sets for convenience API
  const eliminatedBindings = new Set<string>();
  for (const sym of deadSymbols) eliminatedBindings.add(sym.name);

  const survivingBindings = new Set<string>();
  for (const stmt of result.survivingStatements) {
    for (const sym of analyzer.getDeclaredSymbols(stmt)) {
      survivingBindings.add(sym.name);
    }
  }

  const outputFile = ts.factory.updateSourceFile(
    analyzer.sourceFile,
    result.survivingStatements as readonly ts.Statement[] as ts.Statement[],
  );

  return {
    outputFile,
    eliminatedBindings,
    survivingBindings,
  };
}
