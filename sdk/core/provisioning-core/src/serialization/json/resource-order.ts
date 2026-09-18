// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExpressionNode, ResourceDeclarationNode } from "../contract/index.js";

export type ResourceEntry = [string, ResourceDeclarationNode];

interface CycleDetails {
  readonly path: number[];
  readonly blocked: number[];
}

function collectIdentifierIds(
  expr: ExpressionNode,
  out: Set<string>,
  boundIdentifiers: ReadonlySet<string> = new Set(),
): void {
  switch (expr.kind) {
    case "identifier":
      if (!boundIdentifiers.has(expr.id)) out.add(expr.id);
      break;
    case "property-access":
      collectIdentifierIds(expr.base, out, boundIdentifiers);
      break;
    case "array-access":
      collectIdentifierIds(expr.base, out, boundIdentifiers);
      collectIdentifierIds(expr.index, out, boundIdentifiers);
      break;
    case "function-call":
      if (typeof expr.target !== "string") {
        collectIdentifierIds(expr.target, out, boundIdentifiers);
      }
      for (const arg of expr.args) {
        collectIdentifierIds(arg, out, boundIdentifiers);
      }
      break;
    case "instance-function-call":
      collectIdentifierIds(expr.base, out, boundIdentifiers);
      for (const arg of expr.args) {
        collectIdentifierIds(arg, out, boundIdentifiers);
      }
      break;
    case "binary-operation":
      collectIdentifierIds(expr.left, out, boundIdentifiers);
      collectIdentifierIds(expr.right, out, boundIdentifiers);
      break;
    case "unary-operation":
      collectIdentifierIds(expr.argument, out, boundIdentifiers);
      break;
    case "ternary-operation":
      collectIdentifierIds(expr.condition, out, boundIdentifiers);
      collectIdentifierIds(expr.trueValue, out, boundIdentifiers);
      collectIdentifierIds(expr.falseValue, out, boundIdentifiers);
      break;
    case "if-condition":
      collectIdentifierIds(expr.condition, out, boundIdentifiers);
      collectIdentifierIds(expr.body, out, boundIdentifiers);
      break;
    case "for-expression": {
      collectIdentifierIds(expr.collection, out, boundIdentifiers);
      const loopBindings = new Set(boundIdentifiers);
      loopBindings.add(expr.itemVariable);
      if (expr.indexVariable !== undefined) {
        loopBindings.add(expr.indexVariable);
      }
      collectIdentifierIds(expr.body, out, loopBindings);
      break;
    }
    case "interpolated-string":
      for (const segment of expr.segments) {
        collectIdentifierIds(segment, out, boundIdentifiers);
      }
      break;
    case "object":
      for (const value of Object.values(expr.value)) {
        collectIdentifierIds(value, out, boundIdentifiers);
      }
      break;
    case "array":
      for (const item of expr.items) {
        collectIdentifierIds(item, out, boundIdentifiers);
      }
      break;
    case "null":
    case "boolean":
    case "integer":
    case "string":
      break;
  }
}

function findCycleDetails(
  dependencies: readonly number[][],
  unresolved: ReadonlySet<number>,
): CycleDetails {
  let nextVisitIndex = 0;
  const visitIndices = new Array<number>(dependencies.length).fill(-1);
  const lowLinks = new Array<number>(dependencies.length).fill(-1);
  const stack: number[] = [];
  const onStack = new Set<number>();
  const cycleComponents: number[][] = [];

  function visit(node: number): void {
    visitIndices[node] = nextVisitIndex;
    lowLinks[node] = nextVisitIndex++;
    stack.push(node);
    onStack.add(node);

    for (const dependency of dependencies[node]!) {
      if (!unresolved.has(dependency)) continue;
      if (visitIndices[dependency] === -1) {
        visit(dependency);
        lowLinks[node] = Math.min(lowLinks[node]!, lowLinks[dependency]!);
      } else if (onStack.has(dependency)) {
        lowLinks[node] = Math.min(lowLinks[node]!, visitIndices[dependency]!);
      }
    }

    if (lowLinks[node] !== visitIndices[node]) return;

    const component: number[] = [];
    let member: number;
    do {
      member = stack.pop()!;
      onStack.delete(member);
      component.push(member);
    } while (member !== node);

    if (component.length > 1 || dependencies[node]!.some((dependency) => dependency === node)) {
      cycleComponents.push(component);
    }
  }

  for (const node of unresolved) {
    if (visitIndices[node] === -1) visit(node);
  }

  const firstComponent = cycleComponents
    .slice()
    .sort((left, right) => Math.min(...left) - Math.min(...right))[0]!;
  const componentMembers = new Set(firstComponent);
  const path: number[] = [];
  const pathPositions = new Map<number, number>();

  function findPath(node: number): number[] | undefined {
    pathPositions.set(node, path.length);
    path.push(node);

    for (const dependency of dependencies[node]!) {
      if (!componentMembers.has(dependency)) continue;
      const position = pathPositions.get(dependency);
      if (position !== undefined) {
        return [...path.slice(position), dependency];
      }
      const cycle = findPath(dependency);
      if (cycle !== undefined) return cycle;
    }

    path.pop();
    pathPositions.delete(node);
    return undefined;
  }

  const cyclePath = findPath(Math.min(...firstComponent))!;
  const cycleMembers = new Set(cycleComponents.flat());
  return {
    path: cyclePath,
    blocked: [...unresolved].filter((node) => !cycleMembers.has(node)),
  };
}

export function orderResourceEntries(entries: ResourceEntry[]): ResourceEntry[] {
  if (entries.length === 0) return entries;

  const identifierToIndex = new Map<string, number>();
  for (let index = 0; index < entries.length; index++) {
    const identifier = entries[index]![1].bicepIdentifier;
    if (identifierToIndex.has(identifier)) {
      throw new Error(`Duplicate resource identifier "${identifier}".`);
    }
    identifierToIndex.set(identifier, index);
  }

  const successors: number[][] = entries.map(() => []);
  const dependencies: number[][] = entries.map(() => []);
  const inDegree = new Array<number>(entries.length).fill(0);

  for (let index = 0; index < entries.length; index++) {
    const references = new Set<string>();
    collectIdentifierIds(entries[index]![1].value, references);
    for (const reference of references) {
      const dependencyIndex = identifierToIndex.get(reference);
      if (dependencyIndex !== undefined) {
        dependencies[index]!.push(dependencyIndex);
        successors[dependencyIndex]!.push(index);
        inDegree[index]!++;
      }
    }
  }

  const ready = new Set<number>();
  for (let index = 0; index < entries.length; index++) {
    if (inDegree[index] === 0) ready.add(index);
  }

  const sorted: number[] = [];
  while (ready.size > 0) {
    let nextIndex = Infinity;
    for (const index of ready) {
      if (index < nextIndex) nextIndex = index;
    }
    ready.delete(nextIndex);
    sorted.push(nextIndex);
    for (const successor of successors[nextIndex]!) {
      if (--inDegree[successor]! === 0) ready.add(successor);
    }
  }

  if (sorted.length < entries.length) {
    const sortedSet = new Set(sorted);
    const unresolved = new Set(
      entries.map((_, index) => index).filter((index) => !sortedSet.has(index)),
    );
    const cycle = findCycleDetails(dependencies, unresolved);
    const cyclePath = cycle.path
      .map((index) => `"${entries[index]![1].bicepIdentifier}"`)
      .join(" -> ");
    const blocked = cycle.blocked
      .map((index) => `"${entries[index]![1].bicepIdentifier}"`)
      .join(", ");
    throw new Error(
      `Resource dependency cycle detected: ${cyclePath}.` +
        (blocked.length > 0 ? ` Blocked resources: ${blocked}.` : ""),
    );
  }

  return sorted.map((index) => entries[index]!);
}
