// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";

export interface PromotionResult {
  /** Describe-scope variable declarations that couldn't be promoted (kept as-is) */
  remainingVars: string[];
  /** Preamble statements in original order, with promoted assignments replaced by const declarations */
  statements: string[];
}

interface LetCandidate {
  name: string;
  typeText: string | undefined;
  originalText: string;
}

/**
 * Analyzes describe-level variable declarations and beforeEach preamble
 * statements to promote `let x: T;` + `x = expr` into `const x: T = expr`.
 *
 * Promotion requires:
 * - The variable is declared with `let`, no initializer, single declarator
 * - Exactly one simple assignment (`x = expr`) exists in the preamble
 * - The variable is not reassigned in additional context (e.g., it-body)
 */
export function promoteLetToConst(
  varTexts: string[],
  preambleTexts: string[],
  additionalContextTexts?: string[],
): PromotionResult {
  // 1. Parse each varText to find promotable let candidates
  const candidates: LetCandidate[] = [];
  const remainingVars: string[] = [];

  for (const text of varTexts) {
    const candidate = parseLetCandidate(text);
    if (candidate) {
      candidates.push(candidate);
    } else {
      remainingVars.push(text);
    }
  }

  // 2. For each preamble statement, check if it's a simple assignment to a candidate
  // Count assignments per candidate name to detect multiple assignments
  const assignmentCounts = new Map<string, number>();
  const candidateNames = new Set(candidates.map((c) => c.name));

  for (const text of preambleTexts) {
    const assignee = parseSimpleAssignment(text);
    if (assignee && candidateNames.has(assignee.name)) {
      assignmentCounts.set(assignee.name, (assignmentCounts.get(assignee.name) ?? 0) + 1);
    }
  }

  // Also count assignments in additional context (e.g., it-body)
  if (additionalContextTexts) {
    for (const text of additionalContextTexts) {
      const assignee = parseSimpleAssignment(text);
      if (assignee && candidateNames.has(assignee.name)) {
        assignmentCounts.set(assignee.name, (assignmentCounts.get(assignee.name) ?? 0) + 1);
      }
    }
  }

  // 3. Build interleaved statements preserving preamble order
  // Only promote if exactly one assignment exists and variable is not read before assignment
  const promotableNames = new Set<string>();
  for (const candidate of candidates) {
    const count = assignmentCounts.get(candidate.name) ?? 0;
    if (count === 1 && !hasReferenceBeforeAssignment(candidate.name, preambleTexts)) {
      promotableNames.add(candidate.name);
    } else {
      remainingVars.push(candidate.originalText);
    }
  }

  const statements: string[] = [];

  for (const text of preambleTexts) {
    const assignee = parseSimpleAssignment(text);
    if (assignee && promotableNames.has(assignee.name)) {
      const candidate = candidates.find((c) => c.name === assignee.name)!;
      const typeAnnotation = candidate.typeText ? `: ${candidate.typeText}` : "";
      statements.push(`const ${candidate.name}${typeAnnotation} = ${assignee.valueText};`);
      promotableNames.delete(assignee.name);
    } else {
      statements.push(text);
    }
  }

  // Any candidate that was promotable but had no assignment found (shouldn't happen given count=1)
  for (const name of promotableNames) {
    const candidate = candidates.find((c) => c.name === name)!;
    remainingVars.push(candidate.originalText);
  }

  return { remainingVars, statements };
}

/**
 * Check if a variable name appears in any preamble statement before its assignment.
 * Prevents promoting variables that are read before being assigned.
 */
function hasReferenceBeforeAssignment(name: string, preambleTexts: string[]): boolean {
  const wordPattern = new RegExp(`\\b${escapeRegExp(name)}\\b`);
  for (const text of preambleTexts) {
    const assignee = parseSimpleAssignment(text);
    if (assignee && assignee.name === name) {
      // Found the assignment before any reference — safe
      return false;
    }
    if (wordPattern.test(text)) {
      // Variable referenced before its assignment
      return true;
    }
  }
  return false;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Parse a variable declaration text to see if it's an uninitialized single-declarator `let`.
 */
function parseLetCandidate(text: string): LetCandidate | undefined {
  const src = ts.createSourceFile("_.ts", text, ts.ScriptTarget.Latest, true);
  if (src.statements.length !== 1) return undefined;

  const stmt = src.statements[0];
  if (!ts.isVariableStatement(stmt)) return undefined;

  const declList = stmt.declarationList;
  // Must be `let` (not `const` or `var`)
  if (!(declList.flags & ts.NodeFlags.Let)) return undefined;
  // Single declarator only
  if (declList.declarations.length !== 1) return undefined;

  const decl = declList.declarations[0];
  // Must be a simple identifier (not destructuring)
  if (!ts.isIdentifier(decl.name)) return undefined;
  // Must have no initializer
  if (decl.initializer) return undefined;

  const name = decl.name.text;
  const typeText = decl.type ? text.slice(decl.type.pos, decl.type.end).trim() : undefined;

  return { name, typeText, originalText: text };
}

/**
 * Parse a preamble text to see if it's a simple assignment expression statement:
 * `name = expr` (not `name += expr`, `name ??= expr`, etc.)
 */
function parseSimpleAssignment(text: string): { name: string; valueText: string } | undefined {
  const src = ts.createSourceFile("_.ts", text, ts.ScriptTarget.Latest, true);
  if (src.statements.length !== 1) return undefined;

  const stmt = src.statements[0];
  if (!ts.isExpressionStatement(stmt)) return undefined;

  const expr = stmt.expression;
  if (!ts.isBinaryExpression(expr)) return undefined;
  if (expr.operatorToken.kind !== ts.SyntaxKind.EqualsToken) return undefined;
  if (!ts.isIdentifier(expr.left)) return undefined;

  const name = expr.left.text;
  // Extract value text from the original source, trimming trailing semicolon
  const valueText = text.slice(expr.right.pos, expr.right.end).trim();
  // The text may include trailing semicolon from the full statement — strip it
  if (text.trimEnd().endsWith(";")) {
    // valueText is just the right-hand side, no semicolon
  }

  return { name, valueText };
}
