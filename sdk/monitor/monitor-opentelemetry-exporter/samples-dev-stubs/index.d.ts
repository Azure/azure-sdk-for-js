// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Stub type definition for samples to use when ESM/CommonJS modules are not available
// This file should be copied to dist/esm/index.d.ts and dist/commonjs/index.d.ts
// in build pipelines where the actual build fails but samples still need to run

export interface AzureMonitorExporterOptions {
  connectionString?: string;
}

export declare class AzureMonitorTraceExporter {
  constructor(options?: AzureMonitorExporterOptions);
  export(): { code: number };
  shutdown(): Promise<{ code: number }>;
}

export declare class AzureMonitorLogExporter {
  constructor(options?: AzureMonitorExporterOptions);
  export(): { code: number };
  shutdown(): Promise<{ code: number }>;
}

export declare class AzureMonitorMetricExporter {
  constructor(options?: AzureMonitorExporterOptions);
  export(): { code: number };
  shutdown(): Promise<{ code: number }>;
}