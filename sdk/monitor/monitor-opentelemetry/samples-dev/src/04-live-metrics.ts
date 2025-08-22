/**
 * Live Metrics Example
 *
 * This example demonstrates how to enable/disable Live Metrics for real-time
 * analytics dashboard and application monitoring.
 */

export class LiveMetricsExample {
  static async run() {
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with Live Metrics enabled
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
        enableLiveMetrics: true, // Enable Live Metrics (default is true)
      };

      // Enable Azure Monitor integration with Live Metrics
      useAzureMonitor(options);

      console.log("Azure Monitor configured with Live Metrics:");
      console.log("   Live Metrics: ENABLED");
      console.log("   Real-time analytics dashboard available");
      console.log("   Provides insight into application activity and performance");
      console.log("   Currently in Preview - see Supplemental Terms");

      // Simulate application activity for Live Metrics
      console.log("\nSimulating application activity...");
      console.log("This activity will be visible in Live Metrics (if enabled)");

      // Simulate various types of activity
      const activities = [
        "Processing incoming request",
        "Querying database",
        "Calling external API",
        "Processing business logic",
        "Returning response",
      ];

      for (const activity of activities) {
        console.log(`   ${activity}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      console.log("Application activity completed");
      console.log("Check Azure Portal > Application Insights > Live Metrics Stream");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }

  static async runWithDisabledLiveMetrics() {
    // Import dependencies inside the method for easier copying to documentation
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with Live Metrics disabled
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
        enableLiveMetrics: false, // Disable Live Metrics
      };

      // Enable Azure Monitor integration without Live Metrics
      useAzureMonitor(options);

      console.log("Azure Monitor configured with Live Metrics:");
      console.log("   Live Metrics: DISABLED");
      console.log("   Regular telemetry collection continues");
      console.log("   Reduced overhead from real-time streaming");

      // Simulate application activity
      console.log("\nSimulating application activity...");
      console.log("This activity will be visible in Live Metrics (if enabled)");

      // Simulate various types of activity
      const activities = [
        "Processing incoming request",
        "Querying database",
        "Calling external API",
        "Processing business logic",
        "Returning response",
      ];

      for (const activity of activities) {
        console.log(`   ${activity}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      console.log("Application activity completed");
      console.log("Check Azure Portal > Application Insights > Live Metrics Stream");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }
}
