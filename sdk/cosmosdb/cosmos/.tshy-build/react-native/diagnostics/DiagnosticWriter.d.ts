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
export declare class LogDiagnosticWriter implements DiagnosticWriter {
    private logger;
    write(diagnosticsData: string): Promise<void>;
}
/**
 * Implementation of a no-op DiagnosticWriter.
 * @hidden
 */
export declare class NoOpDiagnosticWriter implements DiagnosticWriter {
    write(_diagnosticsData: string): Promise<void>;
}
//# sourceMappingURL=DiagnosticWriter.d.ts.map