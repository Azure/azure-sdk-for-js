// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DiagnosticSpan,
  getCosmosDiagnostics,
  getdiagnosticsdurationMilliseconds,
  recordDiagnostics,
} from "./CosmosDiagnostics";

export class CosmosException extends Error {
  constructor(m: string | any) {
    super(JSON.stringify(m));
    Object.setPrototypeOf(this, CosmosException.prototype);
  }

  static getdiagnostics(): string {
    return getCosmosDiagnostics();
  }

  static getduration() {
    return getdiagnosticsdurationMilliseconds();
  }

  static record(m: string | DiagnosticSpan) {
    recordDiagnostics(JSON.stringify(m));
    return new CosmosException(m);
  }
}
