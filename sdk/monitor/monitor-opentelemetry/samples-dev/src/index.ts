/**
 * Azure Monitor OpenTelemetry Samples
 *
 * This is the main entry point for running various Azure Monitor OpenTelemetry configuration samples.
 * Based on the official Microsoft documentation:
 * https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-configuration?tabs=nodejs
 */

// Load environment variables from .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// ============================================================================
// IMPORTS - Uncomment the import for the example you want to run
// ============================================================================

// 1. Basic connection with environment variable
// import { BasicConnectionExample } from './01-basic-connection';

// 2. Cloud role name and instance configuration
// import { CloudRoleExample } from './02-cloud-role';

// 3. Sampling configuration
// import { SamplingExample } from './03-sampling';

// 4. Live metrics stream
// import { LiveMetricsExample } from './04-live-metrics';

// 5. Offline storage configuration
// import { OfflineStorageExample } from './05-offline-storage';

// 6. OTLP exporter configuration
// import { OtlpExporterExample } from './06-otlp-exporter';

// 7. Redact URL query strings
// import { RedactQueryStringExample } from './07-redact-query-strings';

// 8. Custom metrics example
// import { CustomMetricExample } from './08-customMetric';

// 9. Custom traces example
// import { CustomTraceExample } from './09-customTrace';

// ============================================================================
// EXAMPLE RUNNER - Uncomment the corresponding run() call below
// ============================================================================

const runExample = async (): Promise<void> => {
  console.log("Azure Monitor OpenTelemetry Samples\n");

  // Uncomment one of the following examples to run:

  // 1. Basic connection with environment variable
  // await BasicConnectionExample.run();

  // 2. Cloud role name and instance configuration
  // await CloudRoleExample.run();

  // 3. Sampling configuration
  // await SamplingExample.run();

  // 4. Live metrics configuration
  // await LiveMetricsExample.run();

  // 5. Offline storage configuration
  // await OfflineStorageExample.run();

  // 6. OTLP exporter configuration
  // await OtlpExporterExample.run();

  // 7. Redact URL query strings
  // await RedactQueryStringExample.run();

  // 8. Custom metrics example
  // await CustomMetricExample.run();

  // 9. Custom traces example
  // await CustomTraceExample.run();

  // ========================================================================
  // Instructions
  // ========================================================================
  console.log("Tip: Uncomment one set of lines (import + await) above to see it in action!");
  console.log("Each example is self-contained and can be copied to your own projects.");
  console.log("To run an example:");
  console.log("   1. Uncomment the import statement at the top");
  console.log("   2. Uncomment the corresponding await statement above");
  console.log("   3. Run: npm run dev");
};

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nShutting down gracefully...");
  process.exit(0);
});

runExample().catch((error) => {
  console.error("Error running example:", error);
  process.exit(1);
});
