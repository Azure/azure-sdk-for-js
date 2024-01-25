// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a Test.
 */
export type TestInfo = MochaTest | VitestTestContext;

/**
 * Represents a Mocha Test.
 */
export interface MochaTest {
  /**
   * The title of the test.
   */
  title: string;
  /**
   * The parent of the Mocha Test Suite.
   */
  parent?: MochaTestSuite;
}

/**
 * Represents a Mocha Test Suite.
 */
export interface MochaTestSuite {
  fullTitle(): string;
}

/**
 * Represents a Vitest Test Context
 */
export interface VitestTestContext {
  /**
   * The Vitest Context Task.
   */
  task: VitestTask;
}

export interface VitestTaskBase {
  name: string;
  suite?: VitestSuite;
}

/**
 * Represents a Vitest Test Context Task
 */
export interface VitestTask extends VitestTaskBase {
  /**
   * The Vitest Context Task Name.
   */
  name: string;
  /**
   * The Vitest Context Task Suite.
   */
  suite: VitestSuite;
}

/**
 * Represents a Vitest Test Suite.
 */
export interface VitestSuite extends VitestTaskBase {
  /**
   * The Vitest Context Task Suite Name.
   */
  name: string;
}

/**
 * Determines whether the given test is a Mocha Test.
 * @param test - The test to check.
 * @returns true if the given test is a Mocha Test.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isMochaTest(test: any): test is MochaTest {
  return test && typeof test.title === "string";
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isVitestTestContext(test: any): test is VitestTestContext {
  return test && typeof test.task === "object" && typeof test.task.name === "string";
}
