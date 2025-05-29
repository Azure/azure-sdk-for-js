import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel.js";
export * from "./DiagnosticWriter.js";
export * from "./DiagnosticFormatter.js";
export declare const DefaultDiagnosticLevelValue = CosmosDbDiagnosticLevel.info;
export declare function setDiagnosticLevel(level?: CosmosDbDiagnosticLevel): void;
export declare function getDiagnosticLevelFromEnvironment(): CosmosDbDiagnosticLevel | undefined;
export declare function determineDiagnosticLevel(diagnosticLevelFromClientConfig: CosmosDbDiagnosticLevel, diagnosticLevelFromEnvironment: CosmosDbDiagnosticLevel): CosmosDbDiagnosticLevel;
//# sourceMappingURL=index.d.ts.map