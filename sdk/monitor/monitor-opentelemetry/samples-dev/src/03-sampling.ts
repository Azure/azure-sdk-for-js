/**
 * Sampling Example
 *
 * This example demonstrates how to enable sampling to reduce data ingestion volume
 * and control costs while maintaining accurate experiences.
 */

export class SamplingExample {
  static async run() {
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with sampling
      // A rate of 0.1 means approximately 10% of traces are sent
      const options = {
        samplingRatio: 0.1, // 10% sampling rate
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
      };

      // Enable Azure Monitor integration with sampling
      useAzureMonitor(options);

      console.log("Azure Monitor configured with sampling:");
      console.log("   Sampling Ratio: 10% (0.1)");
      console.log("   This reduces data ingestion volume and costs");
      console.log("   Maintains accurate experiences and event counts");
      console.log("   Preserves traces across services");

      // Simulate multiple operations to demonstrate sampling
      console.log("\nSimulating multiple operations to demonstrate sampling...");

      for (let i = 1; i <= 10; i++) {
        console.log(`   Operation ${i}/10: Processing request`);

        // Simulate some work
        await new Promise((resolve) => setTimeout(resolve, 100));

        // With 10% sampling, approximately 1 out of these 10 operations
        // will be traced and sent to Azure Monitor
      }

      console.log("All operations completed");
      console.log("With 10% sampling, approximately 1 of these operations was traced");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }
}
