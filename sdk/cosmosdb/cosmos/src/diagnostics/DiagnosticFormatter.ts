// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDiagnostics } from "../CosmosDiagnostics";

export interface DiagnosticFormatter {
  format(cosmosDiagnostic: CosmosDiagnostics): string;
}

export class DefaultDiagnosticFormatter implements DiagnosticFormatter {
  format(cosmosDiagnostic: CosmosDiagnostics): string {
    return JSON.stringify(cosmosDiagnostic);
  }
}
