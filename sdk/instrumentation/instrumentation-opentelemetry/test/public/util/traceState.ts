// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TraceState as otTraceState } from "@opentelemetry/api";
export class TraceState implements otTraceState {
  private _values = new Map();

  set(key: string, value: string): otTraceState {
    this._values.set(key, value);
    return this;
  }
  unset(key: string): otTraceState {
    this._values.delete(key);
    return this;
  }
  get(key: string): string | undefined {
    return this._values.get(key);
  }
  serialize(): string {
    const result: string[] = [];
    this._values.forEach((value, key) => {
      result.push(`${key}=${value}`);
    });
    return result.join(",");
  }
}
