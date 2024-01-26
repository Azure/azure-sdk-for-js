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
export function isMochaTest(test: unknown): test is MochaTest {
  return typeof test === "object" && test != null && "title" in test;
}

/**
 * Determines whether the given test is a Vitest Test.
 * @param test - The test to check.
 * @returns true if the given test is a Vitest Test.
 */
export function isVitestTestContext(test: unknown): test is VitestTestContext {
  return typeof test == "function" && "task" in test &&
    typeof test.task === "object" && test.task != null && "name" in test.task;
}
