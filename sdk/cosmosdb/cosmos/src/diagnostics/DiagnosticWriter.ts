import { AzureLogger, createClientLogger } from "@azure/logger";

export interface DiagnosticWriter {
  write(message: string): Promise<void>;
}

export class LogDiagnosticWriter implements DiagnosticWriter {
  private logger: AzureLogger = createClientLogger("CosmosDBDiagnostics");
  public async write(diagnosticsData: string): Promise<void> {
    this.logger.verbose(diagnosticsData);
  }
}

export class NoOpDiagnosticWriter implements DiagnosticWriter {
  public async write(diagnosticsData: string): Promise<void> {
    //No op
    console.log(diagnosticsData);
  }
}
