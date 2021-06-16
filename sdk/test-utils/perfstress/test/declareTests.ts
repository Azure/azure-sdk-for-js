// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Tests:
import { NoOp } from "./noop.spec";
import { OptionsTest } from "./options.spec";
import { SetupCleanupTest } from "./setupCleanup.spec";
import { Delay500ms } from "./delay.spec";
import { Exception } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";
import { SleepTest } from "./sleep.spec";
import { NodeFetchTest } from "./nodeFetch.spec";

// Populate one of the arrays below whenever a new test is added
//  testsWithDefaultParams         - tests that can run with default params
//  testsRequiringAdditionalParams - tests that require more setup such as passing more commandline options
// The above differentiation allows us to run all the tests one after the other using the `unit-test:node` command

export const testsWithDefaultParams = [
  NoOp,
  SetupCleanupTest,
  Delay500ms,
  Exception,
  SleepTest,
  NodeFetchTest
];

export const testsRequiringAdditionalParams = [OptionsTest, PerfStressPolicyTest];

// Exports all the test classes so that the index.spec.ts can pick them up
export const allTestClasses = testsWithDefaultParams.concat(testsRequiringAdditionalParams);
