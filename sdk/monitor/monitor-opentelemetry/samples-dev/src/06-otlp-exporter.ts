/**
 * OTLP Exporter Example
 *
 * This example demonstrates how to enable the OpenTelemetry Protocol (OTLP) Exporter
 * alongside the Azure Monitor Exporter to send telemetry to two locations.
 */

export class OtlpExporterExample {
  static async run() {
    // Import dependencies inside the method for easier copying to documentation
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");
    const { BatchSpanProcessor } = await import("@opentelemetry/sdk-trace-base");
    const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");

    try {
      // Create an OTLP exporter
      const otlpExporter = new OTLPTraceExporter({
        url: "http://localhost:4318/v1/traces", // Default OTLP collector endpoint
        // You can customize the endpoint based on your OpenTelemetry Collector setup
      });

      // Configure Azure Monitor with OTLP exporter
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
        // Add the OTLP exporter as an additional span processor
        spanProcessors: [new BatchSpanProcessor(otlpExporter)],
      };

      // Enable Azure Monitor integration with dual export
      useAzureMonitor(options);

      console.log("Azure Monitor configured with dual export:");
      console.log("   Azure Monitor: Enabled");
      console.log("   OTLP Exporter: Enabled");
      console.log("   Endpoint: http://localhost:4318/v1/traces");
      console.log("   Telemetry sent to both destinations");

      // Show setup requirements
      this.showSetupRequirements();

      // Simulate application work that generates traces
      console.log("\nGenerating traces for dual export...");

      const operations = [
        "user-authentication",
        "database-query",
        "external-api-call",
        "data-processing",
        "response-generation",
      ];

      for (const operation of operations) {
        console.log(`   Trace: ${operation}`);

        // Simulate some work that would generate traces
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      console.log("\nTrace generation completed");
      console.log("Check both Azure Monitor and your OTLP collector for the traces");
    } catch (error) {
      console.error("Error configuring OTLP exporter:", error);
      console.log("\nMake sure you have an OpenTelemetry Collector running");
      console.log("   or update the OTLP endpoint URL to match your setup");
    }
  }

  private static showSetupRequirements() {
    console.log("\nSetup Requirements:");
    console.log("1. Install required packages (already included):");
    console.log("   - npm install @opentelemetry/api");
    console.log("   - npm install @opentelemetry/exporter-trace-otlp-http");
    console.log("   - npm install @opentelemetry/sdk-trace-base");
    console.log("   - npm install @opentelemetry/sdk-trace-node");
    console.log("\n2. Run OpenTelemetry Collector:");
    console.log("   - Download from: https://opentelemetry.io/docs/collector/");
    console.log(
      "   - Or use Docker: docker run -p 4317:4317 -p 4318:4318 otel/opentelemetry-collector",
    );
    console.log("\n3. Configure collector to receive OTLP data");
  }
}
