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

test("removes planned declarations and filters only stale model reexports", () => {
  const models = `
export interface StableModel {}
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
  assert.doesNotMatch(nextBarrel, /RemovedModel|CustomRemovedAlias/);
  assert.match(nextBarrel, /OtherType/);
});
