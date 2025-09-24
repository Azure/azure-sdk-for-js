// Ambient module declarations for samples
// This allows TypeScript to compile samples even when the main package isn't built yet

declare module "@azure/monitor-opentelemetry" {
  export function useAzureMonitor(options?: any): void;
  export function shutdownAzureMonitor(): Promise<void>;
  export interface AzureMonitorOpenTelemetryOptions {
    azureMonitorExporterOptions?: {
      connectionString?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
}

declare module "express" {
  const express: any;
  export = express;
}

declare module "@opentelemetry/exporter-trace-otlp-http" {
  export class OTLPTraceExporter {
    constructor(config?: any);
    export(spans: any[], resultCallback: any): void;
    shutdown(): Promise<void>;
  }
}