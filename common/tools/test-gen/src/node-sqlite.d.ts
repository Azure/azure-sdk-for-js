// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Minimal type declarations for `node:sqlite` (Node.js 22+).
 * Only the subset used by extract-test-map.ts is declared here.
 */

declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string, options?: { readOnly?: boolean });
    prepare(sql: string): StatementSync;
    close(): void;
  }

  export interface StatementSync {
    all(...params: unknown[]): Record<string, unknown>[];
    get(...params: unknown[]): Record<string, unknown> | undefined;
    run(...params: unknown[]): { changes: number; lastInsertRowid: number };
  }
}
