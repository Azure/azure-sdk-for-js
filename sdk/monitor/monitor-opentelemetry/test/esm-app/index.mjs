// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Simple ESM sample that exercises the Azure Monitor OpenTelemetry loader.
 * This file is run by the ESM loader integration test to verify that
 * module.register() is called properly when importing the package.
 */

// Import the main package to trigger the loader registration
import { useAzureMonitor } from "@azure/monitor-opentelemetry";

// Basic check that the main export is available
if (typeof useAzureMonitor !== "function") {
  console.error("useAzureMonitor should be a function");
  process.exit(1);
}

console.log("ESM loader integration test passed");
