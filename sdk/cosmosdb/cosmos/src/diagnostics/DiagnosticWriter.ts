// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureLogger, createClientLogger } from "@azure/logger";

/**
 * Interface for a Diagnostic Writer.
 * @hidden
 */
export interface DiagnosticWriter {
  write(message: string): Promise<void>;
}

/**
 * Implementation of DiagnosticWriter, which uses \@azure/logger to write
 * diagnostics.
 * @hidden
 */
export class LogDiagnosticWriter implements DiagnosticWriter {
  private logger: AzureLogger = createClientLogger("CosmosDBDiagnostics");
  public async write(diagnosticsData: string): Promise<void> {
    this.logger.verbose(diagnosticsData);
  }
}

/**
 * Implementation of a no-op DiagnosticWriter.
 * @hidden
 */
export class NoOpDiagnosticWriter implements DiagnosticWriter {
  public async write(_diagnosticsData: string): Promise<void> {
    // No op
  }
}
