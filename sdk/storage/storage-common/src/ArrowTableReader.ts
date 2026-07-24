// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";

/**
 * Minimal structural view of a decoded Apache Arrow table. Using a structural type
 * lets this reader operate on the `apache-arrow` `Table` object without storage-common
 * taking a hard dependency on the (sizable) `apache-arrow` package.
 */
export interface ArrowTableLike {
  numRows: number;
  schema?: { metadata?: { get(key: string): string | null | undefined } | null } | null;
  getChild(columnName: string): { get(rowIndex: number): unknown } | null;
}

/**
 * A thin, format-agnostic reader over a decoded Apache Arrow table.
 *
 * It exposes typed cell accessors (string / boolean / number / date / base64 bytes /
 * map) addressed by column name and row index, plus page-level schema metadata, so a
 * service layer can project Arrow rows onto its own models. It knows nothing about any
 * particular Azure Storage service and is shared across the Storage client libraries.
 */
export class ArrowTableReader {
  private readonly table: ArrowTableLike;

  /**
   * @param table - A decoded Apache Arrow table, such as the result of `tableFromIPC`.
   */
  constructor(table: ArrowTableLike) {
    this.table = table;
  }

  /**
   * The number of rows in the table.
   */
  public get rowCount(): number {
    return this.table.numRows;
  }

  /**
   * Reads a page-level value from the table's schema metadata (for example, a
   * continuation token), or `undefined` when the key is absent.
   *
   * @param key - The metadata key to read.
   */
  public metadata(key: string): string | undefined {
    return this.table.schema?.metadata?.get(key) ?? undefined;
  }

  private cell(rowIndex: number, columnName: string): unknown {
    return this.table.getChild(columnName)?.get(rowIndex);
  }

  /**
   * Reads a cell as a string, or `undefined` when the cell is null or absent.
   */
  public string(rowIndex: number, columnName: string): string | undefined {
    const value = this.cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : String(value);
  }

  /**
   * Reads a cell as a boolean, or `undefined` when the cell is null or absent.
   */
  public boolean(rowIndex: number, columnName: string): boolean | undefined {
    const value = this.cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : Boolean(value);
  }

  /**
   * Reads a cell as a number, or `undefined` when the cell is null or absent.
   */
  public number(rowIndex: number, columnName: string): number | undefined {
    const value = this.cell(rowIndex, columnName);
    return value === undefined || value === null ? undefined : Number(value);
  }

  /**
   * Reads a cell as a {@link Date}, or `undefined` when the cell is null or absent.
   */
  public date(rowIndex: number, columnName: string): Date | undefined {
    const value = this.cell(rowIndex, columnName);
    if (value === undefined || value === null) {
      return undefined;
    }
    // apache-arrow normalizes every Timestamp unit to epoch milliseconds when a
    // cell is read (SECOND x1000, MICROSECOND /1000, NANOSECOND /1e6), so the
    // value is already in the milliseconds a Date expects and must not be scaled
    // again. Fall back to string parsing if a column ever arrives non-numeric.
    const millis = Number(value);
    if (Number.isNaN(millis)) {
      const parsed = Date.parse(String(value));
      return Number.isNaN(parsed) ? undefined : new Date(parsed);
    }
    return new Date(millis);
  }

  /**
   * Reads a string cell and decodes it from base64 into bytes, or `undefined` when the
   * cell is null or absent.
   */
  public bytesFromBase64(rowIndex: number, columnName: string): Uint8Array | undefined {
    const value = this.string(rowIndex, columnName);
    return value === undefined ? undefined : stringToUint8Array(value, "base64");
  }

  /**
   * Reads a map cell into a plain string dictionary, or `undefined` when the cell is
   * null or absent.
   */
  public map(rowIndex: number, columnName: string): Record<string, string> | undefined {
    return toRecord(this.cell(rowIndex, columnName));
  }
}

/**
 * Converts an Apache Arrow map cell into a plain string dictionary. Handles the
 * possible shapes an arrow map value can take (iterable of `[key, value]` pairs,
 * iterable of `{ key, value }` structs, or a plain object).
 */
function toRecord(value: unknown): Record<string, string> | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const result: Record<string, string> = {};
  const asText = (v: unknown): string => (v === undefined || v === null ? "" : String(v));
  if (typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function") {
    for (const entry of value as Iterable<unknown>) {
      if (Array.isArray(entry)) {
        result[String(entry[0])] = asText(entry[1]);
      } else if (entry && typeof entry === "object" && "key" in entry) {
        const { key, value: entryValue } = entry as { key: unknown; value: unknown };
        result[String(key)] = asText(entryValue);
      }
    }
  } else if (typeof value === "object") {
    for (const [key, entryValue] of Object.entries(value as Record<string, unknown>)) {
      result[key] = asText(entryValue);
    }
  }
  return result;
}
