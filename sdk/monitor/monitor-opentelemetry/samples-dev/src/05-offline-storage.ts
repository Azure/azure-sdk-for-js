/**
 * Offline Storage Example
 *
 * This example demonstrates how to configure offline storage and automatic retries
 * for Azure Monitor OpenTelemetry when the application disconnects.
 */

export class OfflineStorageExample {
  static async run() {
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with custom offline storage settings
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
          storageDirectory: "C:\\AzureMonitorStorage", // Custom storage directory
          disableOfflineStorage: false, // Enable offline storage (default)
        },
      };

      // Enable Azure Monitor integration with offline storage
      useAzureMonitor(options);

      console.log("Azure Monitor configured with offline storage:");
      console.log("   Offline Storage: ENABLED");
      console.log("   Custom Storage Directory: C:\\AzureMonitorStorage");
      console.log("   Automatic Retries: Up to 48 hours");
      console.log("   Telemetry cached when disconnected");

      // Demonstrate the offline storage behavior
      console.log("\nSimulating application work with potential connectivity issues...");

      const scenarios = [
        "Normal operation - telemetry sent immediately",
        "Network hiccup - telemetry cached locally",
        "Extended offline - telemetry stored for retry",
        "Connection restored - cached telemetry sent",
        "High load scenario - prioritizing recent events",
      ];

      for (const scenario of scenarios) {
        console.log(`   ${scenario}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      console.log("\nOffline storage demonstration completed");
      console.log("Check your storage directory for cached telemetry files");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }

  static async runWithDisabledStorage() {
    // Import dependencies inside the method for easier copying to documentation
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with offline storage disabled
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
          disableOfflineStorage: true, // Disable offline storage
        },
      };

      // Enable Azure Monitor integration without offline storage
      useAzureMonitor(options);

      console.log("Azure Monitor configured with offline storage:");
      console.log("   Offline Storage: DISABLED");
      console.log("   Telemetry will be lost if connection fails");
      console.log("   Reduced local disk usage");

      console.log("\nSimulating application work with potential connectivity issues...");

      const scenarios = [
        "Normal operation - telemetry sent immediately",
        "Network hiccup - telemetry cached locally",
        "Extended offline - telemetry stored for retry",
        "Connection restored - cached telemetry sent",
        "High load scenario - prioritizing recent events",
      ];

      for (const scenario of scenarios) {
        console.log(`   ${scenario}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      console.log("\nOffline storage demonstration completed");
      console.log("Check your storage directory for cached telemetry files");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
      console.error(
        "Make sure APPLICATIONINSIGHTS_CONNECTION_STRING is set in your environment or .env file",
      );
    }
  }
}
