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
import type { Reporter } from "vitest/node.js";

type URLMatrixData = {
  path: string;
  apiVersion?: string;
  model: string;
};
export type URLReportType = URLMatrixData[];
const MatrixDataJSONFile = "matrix-url-report.json";
const MatrixDataCSVFile = "matrix-url-report.csv";

const patternMap = {
  '/assistants/:id': /^\/assistants\/[\w-]+$/,
  '/batches/:id$1': /^\/batches\/[\w-]+([\w\/]*)$/,
  '/deployments/:id$1': /^\/deployments\/[\w-]+([\w\/]*)$/,
  '/files/assistant-:id': /^\/files\/assistant-[\w-]+$/,
  '/files/file-:id': /^\/files\/file-[\w-]+$/,
  '/threads/:id/$1/:id$2': /^\/threads\/[\w-]+\/([\w_]*)\/[\w-]+([\w_\/]*)$/,
  '/threads/:id$1': /^\/threads\/[\w-]+([\w\/]*)$/,
};

const getGenericPath = (path: string): string => {
  for (const [ pattern, regex ] of Object.entries(patternMap)) {
    const match = path.match(regex);
    if (match) {
      // Replace $1, $2, etc. in the pattern with :id or the appropriate segment
      return pattern.replace(/\$(\d+)/g, (_, idx) => {
        const segment = match[parseInt(idx)];
        return segment;
      });
    }
  }
  return path; // Fallback
};


// const getGenericPath = (path: string): string => {
//   // find the first matching pattern
//   for (const [pattern, regex] of Object.entries(patternMap)) {
//     if (regex.test(path)) {
//       return pattern;
//     }
//   }
//   return path;
// }
class URLReportCollector {
  private localReport: URLReportType = [];

  add(data: URLMatrixData): void {

    data.path = getGenericPath(data.path);

    // Check if the data already exists in the report
    if (this.localReport.some(
      item => item.path === data.path && item.model === data.model && item.apiVersion === data.apiVersion)) {
      return;
    }
    // Add the new data to the local report
    this.localReport.push(data);
    // Write the updated report to the file
    const existing = this.get();
    existing.push(data);
    fs.writeFileSync(MatrixDataJSONFile, JSON.stringify(existing));
  }

  get(): URLReportType {
    return fs.existsSync(MatrixDataJSONFile)
      ? JSON.parse(fs.readFileSync(MatrixDataJSONFile, 'utf-8'))
      : [];
  }

  delete(): void {
    fs.unlinkSync(MatrixDataJSONFile);
  }

}

// create thread-safe storage for the report

export const URLReport = new URLReportCollector();

export default class MatrixURLReporter implements Reporter {

  onTestRunEnd(): void {
    const outputPath = resolve(MatrixDataCSVFile);

    const csv = exportTestReportToCSV(URLReport.get());
    fs.writeFileSync(outputPath, csv);
    console.log(`✅ ${ MatrixURLReporter.name } saved report to ${ outputPath }`);
    console.log(`Generated in ${__filename}`);
    URLReport.delete();
  }
}

function exportTestReportToCSV(report: URLReportType): string {
  const allKeys = new Set<string>();
  type TestName = string;
  type Key = string;
  type Visited = boolean;
  const matrix: Record<TestName, Record<Key, Visited>> = {};



  for (const data of report) {
    const key = `${ data.model } ${ data.apiVersion ?? "n/a" }`;
    allKeys.add(key);

    if (!matrix[(data.path)]) matrix[(data.path)] = {};
    matrix[(data.path)][key] = true;
  }
  const sortedKeys = Array.from(allKeys).sort();
  const headers = ["path", ...sortedKeys];

  // Create rows based on path
  const rows = Object.entries(matrix).map(
    ([path, results]) => {
      const row = [path, ...sortedKeys.map((k) => results[k] ?? "")];
      return row.join(",");
    });

  return [headers.join(","), ...rows].join("\n");
}
