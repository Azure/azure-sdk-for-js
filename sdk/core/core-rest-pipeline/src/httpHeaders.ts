// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeaders, RawHttpHeaders, RawHttpHeadersInput } from "./interfaces";

interface HeaderEntry {
  name: string;
  value: string;
}

function normalizeName(name: string): string {
  return name.toLowerCase();
}

function* headerIterator(map: Map<string, HeaderEntry>): IterableIterator<[string, string]> {
  for (const entry of map.values()) {
    yield [entry.name, entry.value];
  }
}

class HttpHeadersImpl implements HttpHeaders {
  private readonly _headersMap: Map<string, HeaderEntry>;

  constructor(rawHeaders?: RawHttpHeaders | RawHttpHeadersInput) {
    this._headersMap = new Map<string, HeaderEntry>();
    if (rawHeaders) {
      for (const headerName of Object.keys(rawHeaders)) {
        this.set(headerName, rawHeaders[headerName]);
      }
    }
  }

  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param name - The name of the header to set. This value is case-insensitive.
   * @param value - The value of the header to set.
   */
  public set(name: string, value: string | number | boolean): void {
    this._headersMap.set(normalizeName(name), { name, value: String(value) });
  }

  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param name - The name of the header. This value is case-insensitive.
   */
  public get(name: string): string | undefined {
    return this._headersMap.get(normalizeName(name))?.value;
  }

  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   * @param name - The name of the header to set. This value is case-insensitive.
   */
  public has(name: string): boolean {
    return this._headersMap.has(normalizeName(name));
  }

  /**
   * Remove the header with the provided headerName.
   * @param name - The name of the header to remove.
   */
  public delete(name: string): void {
    this._headersMap.delete(normalizeName(name));
  }

  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  public toJSON(options: { preserveCase?: boolean } = {}): RawHttpHeaders {
    const result: RawHttpHeaders = {};
    if (options.preserveCase) {
      for (const entry of this._headersMap.values()) {
        result[entry.name] = entry.value;
      }
    } else {
      for (const [normalizedName, entry] of this._headersMap) {
        result[normalizedName] = entry.value;
      }
    }

    return result;
  }

  /**
   * Get the string representation of this HTTP header collection.
   */
  public toString(): string {
    return JSON.stringify(this.toJSON({ preserveCase: true }));
  }

  /**
   * Iterate over tuples of header [name, value] pairs.
   */
  [Symbol.iterator](): Iterator<[string, string]> {
    return headerIterator(this._headersMap);
  }
}

/**
 * Creates an object that satisfies the `HttpHeaders` interface.
 * @param rawHeaders - A simple object representing initial headers
 */
export function createHttpHeaders(rawHeaders?: RawHttpHeadersInput): HttpHeaders {
  return new HttpHeadersImpl(rawHeaders);
}
