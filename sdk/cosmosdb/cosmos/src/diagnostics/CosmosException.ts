// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorResponse } from "..";
import { getCosmosDiagnosticsToString, setDiagnostics } from "./Diagnostics";

export class CosmosException extends Error {
  response?: ErrorResponse;

  constructor(m?: any, errorResponse?: ErrorResponse) {
    super(m);
    Object.setPrototypeOf(this, CosmosException.prototype);
    this.response = errorResponse;
    if (typeof m !== "undefined") {
      setDiagnostics(m);
    }
  }
  getDiagnostics() {
    const diagnostic = getCosmosDiagnosticsToString();
    return diagnostic;
  }
}
