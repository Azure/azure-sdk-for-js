// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import test from "node:test";
import {
  collectModelExports,
  filterModelReexports,
  planModelRemovals,
  removeModelDeclarations,
} from "./sync-generated-model-removals.mjs";

test("plans generated removals and downstream custom dependents", () => {
  const previousGenerated = `
export interface StableModel {}
export interface RemovedModel {}
export function removedModelSerializer(item: RemovedModel): any { return item; }
`;
  const currentGenerated = `export interface StableModel {}`;
  const previousSource = `
export interface StableModel {}
export interface CustomSupport {}
export interface RemovedModel extends CustomSupport {}
export function removedModelSerializer(item: RemovedModel): any { return item; }
export type CustomRemovedAlias = RemovedModel;
export interface UnrelatedCustomModel {}
`;

  const plan = planModelRemovals({ previousGenerated, currentGenerated, previousSource });
  assert.deepEqual([...plan.generatedRemovedNames], ["RemovedModel", "removedModelSerializer"]);
  assert.deepEqual(plan.sourceNames, [
    "RemovedModel",
    "removedModelSerializer",
    "CustomRemovedAlias",
  ]);
  assert.equal(plan.sourceNames.includes("CustomSupport"), false);
});

test("ignores property-name collisions with removed models", () => {
  const previousGenerated = `
export interface RemovedModel {}
`;
  const currentGenerated = "";
  const previousSource = `
export interface RemovedModel {}
export interface IndependentModel {
  RemovedModel?: string;
}
export const independentModel = {
  RemovedModel: "value",
};
`;

  const plan = planModelRemovals({ previousGenerated, currentGenerated, previousSource });
  assert.deepEqual(plan.sourceNames, ["RemovedModel"]);
});

test("preserves retained declarators in a partially removed variable statement", () => {
  const previousGenerated = `
export const removed = 1, retained = 2;
`;
  const currentGenerated = `
export const retained = 2;
`;
  const previousSource = `
export const removed = 1, retained = 2;
`;

  const plan = planModelRemovals({ previousGenerated, currentGenerated, previousSource });
  assert.deepEqual([...plan.generatedRemovedNames], ["removed"]);
  assert.deepEqual(plan.sourceNames, ["removed"]);

  const nextSource = removeModelDeclarations(previousSource, new Set(plan.sourceNames));
  assert.doesNotMatch(nextSource, /\bremoved\b/);
  assert.match(nextSource, /export const retained = 2;/);
  assert.deepEqual([...collectModelExports(nextSource)], ["retained"]);
});

test("requires manual reconciliation for retained declarations with removed references", () => {
  const previousGenerated = `
export interface StableModel {}
export interface RemovedModel {}
export type ModelUnion = StableModel | RemovedModel;
`;
  const currentGenerated = `
export interface StableModel {}
export type ModelUnion = StableModel;
`;
  const previousSource = `
export interface StableModel {}
export interface RemovedModel {}
export type ModelUnion = StableModel | RemovedModel;
`;

  const plan = planModelRemovals({
    previousGenerated,
    currentGenerated,
    previousSource,
  });

  assert.deepEqual(plan.sourceNames, ["RemovedModel"]);
  assert.deepEqual(plan.retainedReferenceConflicts, [
    {
      declarationNames: ["ModelUnion"],
      removedReferences: ["RemovedModel"],
    },
  ]);
});

test("accepts manually reconciled retained declarations", () => {
  const previousGenerated = `
export interface StableModel {}
export interface RemovedModel {}
export type ModelUnion = StableModel | RemovedModel;
`;
  const currentGenerated = `
export interface StableModel {}
export type ModelUnion = StableModel;
`;
  const previousSource = `
export interface StableModel {}
export interface RemovedModel {}
export type ModelUnion = StableModel | RemovedModel;
`;

  const plan = planModelRemovals({
    previousGenerated,
    currentGenerated,
    previousSource,
    currentSource: currentGenerated,
  });

  assert.deepEqual(plan.retainedReferenceConflicts, []);
});

test("removes planned declarations and filters only stale model reexports", () => {
  const models = `
export interface StableModel {}
export interface CommentedStableModel {}
export interface RemovedModel {}
export type CustomRemovedAlias = RemovedModel;
`;
  const nextModels = removeModelDeclarations(
    models,
    new Set(["RemovedModel", "CustomRemovedAlias"]),
  );
  const availableNames = collectModelExports(nextModels);
  const barrel = `
export type {
  StableModel,
  /** Retained export documentation. */
  CommentedStableModel,
  RemovedModel,
  CustomRemovedAlias,
} from "./models.js";
export type { OtherType } from "./other.js";
`;
  const nextBarrel = filterModelReexports(
    barrel,
    "./models.js",
    availableNames,
    "src/models/index.ts",
  );

  assert.match(nextBarrel, /StableModel/);
  assert.match(nextBarrel, /\/\*\* Retained export documentation\. \*\//);
  assert.doesNotMatch(nextBarrel, /RemovedModel|CustomRemovedAlias/);
  assert.match(nextBarrel, /OtherType/);
});
