// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TraceState } from "@opentelemetry/types";

/**
 * @ignore
 * @internal
 */
export class OpenCensusTraceStateWrapper implements TraceState {
  private readonly _state?: string;

  constructor(state?: string) {
    this._state = state;
  }

  get(key: string): string | undefined {
    throw new Error("Method not implemented.");
  }

  set(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }

  unset(key: string): void {
    throw new Error("Method not implemented");
  }

  serialize(): string {
    return this._state || "";
  }
}
