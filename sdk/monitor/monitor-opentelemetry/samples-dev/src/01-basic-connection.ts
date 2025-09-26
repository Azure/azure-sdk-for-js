/**
 * Basic Connection Example
 *
 * This example demonstrates how to configure Azure Monitor OpenTelemetry
 * using the APPLICATIONINSIGHTS_CONNECTION_STRING environment variable.
 *
 * Works in both CommonJS and ESM environments.
 */

export class BasicConnectionExample {
  static async run() {
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with connection string from environment
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
      };

      // Enable Azure Monitor integration using the useAzureMonitor function
      useAzureMonitor(options);

      console.log("Azure Monitor configured successfully!");
      console.log("Connection string source: APPLICATIONINSIGHTS_CONNECTION_STRING");
      console.log("Telemetry will be sent to Azure Application Insights");

      // Simulate some application work
      console.log("Simulating application work...");

      // This would be your actual application logic
      // The telemetry data will be automatically collected and sent to Azure Monitor

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Application work completed");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
      throw error;
    }
  }
}
