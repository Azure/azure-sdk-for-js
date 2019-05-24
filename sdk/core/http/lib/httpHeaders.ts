// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A collection of HttpHeaders that can be sent with a HTTP request.
 */
function getHeaderKey(headerName: string) {
  return headerName.toLowerCase();
}

/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
  /**
   * The name of the header.
   */
  name: string;

  /**
   * The value of the header.
   */
  value: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A collection of HTTP header key/value pairs.
 */
export class HttpHeaders {
  private readonly _headersMap: { [headerKey: string]: HttpHeader };

  constructor(rawHeaders?: RawHttpHeaders) {
    this._headersMap = {};
    if (rawHeaders) {
      for (const headerName in rawHeaders) {
        this.set(headerName, rawHeaders[headerName]);
      }
    }
  }

  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param headerName The name of the header to set. This value is case-insensitive.
   * @param headerValue The value of the header to set.
   */
  public set(headerName: string, headerValue: string | number): void {
    this._headersMap[getHeaderKey(headerName)] = { name: headerName, value: headerValue.toString() };
  }

  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param headerName The name of the header.
   */
  public get(headerName: string): string | undefined {
    const header: HttpHeader = this._headersMap[getHeaderKey(headerName)];
    return !header ? undefined : header.value;
  }

  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   */
  public contains(headerName: string): boolean {
    return !!this._headersMap[getHeaderKey(headerName)];
  }

  /**
   * Remove the header with the provided headerName. Return whether or not the header existed and
   * was removed.
   * @param headerName The name of the header to remove.
   */
  public remove(headerName: string): boolean {
    const result: boolean = this.contains(headerName);
    delete this._headersMap[getHeaderKey(headerName)];
    return result;
  }

  /**
   * Get the headers that are contained this collection as an object.
   */
  public rawHeaders(): RawHttpHeaders {
    const result: RawHttpHeaders = {};
    for (const headerKey in this._headersMap) {
      const header: HttpHeader = this._headersMap[headerKey];
      result[header.name.toLowerCase()] = header.value;
    }
    return result;
  }

  /**
   * Get the headers that are contained in this collection as an array.
   */
  public headersArray(): HttpHeader[] {
    const headers: HttpHeader[] = [];
    for (const headerKey in this._headersMap) {
      headers.push(this._headersMap[headerKey]);
    }
    return headers;
  }

  /**
   * Get the header names that are contained in this collection.
   */
  public headerNames(): string[] {
    const headerNames: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerNames.push(headers[i].name);
    }
    return headerNames;
  }

  /**
   * Get the header names that are contained in this collection.
   */
  public headerValues(): string[] {
    const headerValues: string[] = [];
    const headers: HttpHeader[] = this.headersArray();
    for (let i = 0; i < headers.length; ++i) {
      headerValues.push(headers[i].value);
    }
    return headerValues;
  }

  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  public toJson(): RawHttpHeaders {
    return this.rawHeaders();
  }

  /**
   * Get the string representation of this HTTP header collection.
   */
  public toString(): string {
    return JSON.stringify(this.toJson());
  }

  /**
   * Create a deep clone/copy of this HttpHeaders collection.
   */
  public clone(): HttpHeaders {
    return new HttpHeaders(this.rawHeaders());
  }
}
