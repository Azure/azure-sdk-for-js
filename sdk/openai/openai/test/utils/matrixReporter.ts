// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * MatrixReporter
 * A custom reporter for Vitest that generates a CSV report of test results.
 *
 * The final CSV contains rows of individual tests, and columns for each unique model,
 * model version, and api version. The values of the cells are the test results.
 *
 * The CSV is saved to the current working directory as `matrix-report.csv`.
 *
 * To add a matrix to a test, add the following to the test:
 *
 * ```ts
 * test('my test', (context) => {
 *   context.task.meta.matrix = {
 *     name: 'my test',
 *     apiVersion: 'v1',
 *     modelName: 'my-model',
 *     modelVersion: 'v1',
 *   };
 *   // test code here
 * });
 * ```
 * resultState will be set to the result of the test by this Reporter.
 */
import { resolve } from "path";
import fs from "fs";
import type { Reporter, TestCase, TestResultSkipped } from "vitest/node.js";

declare module "vitest" {
  interface TaskMeta {
    done?: boolean;
    matrix?: TestMatrixData;
  }
}

type TestId = string;
type TestMatrixData = {
  name: string;
  apiVersion?: string;
  modelName: string;
  modelVersion: string;
  resultState?: string;
  resultNotes?: string;
};
type TestReportType = Record<TestId, TestMatrixData>;

const TestReport: TestReportType = {};

export default class MatrixReporter implements Reporter {
  onTestCaseResult(test: TestCase): void {
    if (!test.meta().matrix) {
      return;
    }

    const result = test.result();
    TestReport[test.id] = test.meta().matrix!;
    TestReport[test.id].resultState = result.state;
    TestReport[test.id].resultNotes = (result as TestResultSkipped).note ?? "";
  }

  onTestRunEnd(): void {
    const outputPath = resolve("matrix-report.csv");
    // const oldReport = JSON.parse(fs.readFileSync('matrix-report.json', 'utf-8')) as TestReportType;
    const csv = exportTestReportToCSV(TestReport);
    fs.writeFileSync(outputPath, csv);
    console.log(`✅ Matrix report saved to ${outputPath}`);
  }
}

function exportTestReportToCSV(report: TestReportType): string {
  const getKey = (data: TestMatrixData): string => {
    return `${data.modelName}:${data.modelVersion} v${data.apiVersion ?? "n/a"}`;
  };

  const allKeys = new Set<string>();
  type TestName = string;
  type Key = string;
  type TestResult = string;
  const matrix: Record<TestName, Record<Key, TestResult>> = {};

  // Collect all unique keys (modelName:modelVersion vX.X) and test names
  for (const data of Object.values(report)) {
    const key = getKey(data);
    allKeys.add(key);
    if (!matrix[data.name]) matrix[data.name] = {};
    // If key already exists that's bad. Means we have a non-unique test name + key combo.
    if (matrix[data.name][key]) {
      console.error(`⚠️ Duplicate test name + key combo: ${data.name} + ${key}`);
      continue;
    }
    matrix[data.name][key] = data.resultState ?? "";
  }

  const sortedKeys = Array.from(allKeys).sort();

  const headers = ["test name", ...sortedKeys];

  // Create rows based on test name
  const rows = Object.entries(matrix).map(([testName, results]) => {
    const row = [testName, ...sortedKeys.map((k) => results[k] ?? "")];
    return row.join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
