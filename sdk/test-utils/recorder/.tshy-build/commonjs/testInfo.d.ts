/**
 * Represents a Test.
 */
export type TestInfo = VitestTestContext;
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
    suite?: VitestSuite;
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
 * Determines whether the given test is a Vitest Test.
 * @param test - The test to check.
 * @returns true if the given test is a Vitest Test.
 */
export declare function isVitestTestContext(test: unknown): test is VitestTestContext;
//# sourceMappingURL=testInfo.d.ts.map