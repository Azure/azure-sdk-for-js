// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Stub for samples to use when ESM/CommonJS modules are not available
// This file should be copied to dist/esm/index.js and dist/commonjs/index.js
// in build pipelines where the actual build fails but samples still need to run

// Create minimal implementations to avoid dependency issues
export class AzureMonitorTraceExporter {
  constructor(options = {}) {
    this.options = options;
    console.log("AzureMonitorTraceExporter stub created");
  }
  
  export() {
    return { code: 0 };
  }

  async shutdown() {
    return { code: 0 };
  }
}

export class AzureMonitorLogExporter {
  constructor(options = {}) {
    this.options = options;
    console.log("AzureMonitorLogExporter stub created");
  }
  
  export() {
    return { code: 0 };
  }

  async shutdown() {
    return { code: 0 };
  }
}

export class AzureMonitorMetricExporter {
  constructor(options = {}) {
    this.options = options;
    console.log("AzureMonitorMetricExporter stub created");
  }
  
  export() {
    return { code: 0 };
  }

  async shutdown() {
    return { code: 0 };
  }
}