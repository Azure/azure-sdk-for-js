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

// Populate the array below whenever a new test is added
export const testClasses = [
  NoOp,
  OptionsTest,
  SetupCleanupTest,
  Delay500ms,
  Exception,
  PerfStressPolicyTest,
  SleepTest,
  NodeFetchTest
];
