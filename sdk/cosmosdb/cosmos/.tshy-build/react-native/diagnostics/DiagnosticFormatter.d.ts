import type { CosmosDiagnostics } from "../CosmosDiagnostics.js";
export interface DiagnosticFormatter {
    format(cosmosDiagnostic: CosmosDiagnostics): string;
}
export declare class DefaultDiagnosticFormatter implements DiagnosticFormatter {
    format(cosmosDiagnostic: CosmosDiagnostics): string;
}
//# sourceMappingURL=DiagnosticFormatter.d.ts.map