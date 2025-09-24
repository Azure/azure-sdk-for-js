/**
 * Cloud Role Example
 *
 * This example demonstrates how to set the Cloud Role Name and Cloud Role Instance
 * using OpenTelemetry Resource attributes. Values are read from environment variables:
 * - OTEL_SERVICE_NAME (service name)
 * - OTEL_SERVICE_NAMESPACE (service namespace)
 * - OTEL_SERVICE_INSTANCE_ID (service instance ID)
 *
 * Works in both CommonJS and ESM environments.
 */

export class CloudRoleExample {
  static async run() {
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");
    const { resourceFromAttributes } = await import("@opentelemetry/resources");
    const { ATTR_SERVICE_NAME } = await import("@opentelemetry/semantic-conventions");
    const semanticConventionsIncubating = await import(
      "@opentelemetry/semantic-conventions/incubating"
    );
    const { ATTR_SERVICE_NAMESPACE, ATTR_SERVICE_INSTANCE_ID } = semanticConventionsIncubating;

    try {
      // Create a new Resource object with custom resource attributes
      const customResource = resourceFromAttributes({
        [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || "my-service",
        [ATTR_SERVICE_NAMESPACE]: process.env.OTEL_SERVICE_NAMESPACE || "my-namespace",
        [ATTR_SERVICE_INSTANCE_ID]: process.env.OTEL_SERVICE_INSTANCE_ID || "my-instance",
      });

      // Create configuration options with the custom resource
      const options = {
        resource: customResource,
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
      };

      // Enable Azure Monitor integration with custom resource attributes
      useAzureMonitor(options);

      console.log("Azure Monitor configured with custom cloud role settings:");
      console.log(
        `   Service Name: ${process.env.OTEL_SERVICE_NAME || "my-service"} (from OTEL_SERVICE_NAME)`,
      );
      console.log(
        `   Service Namespace: ${process.env.OTEL_SERVICE_NAMESPACE || "my-namespace"} (from OTEL_SERVICE_NAMESPACE)`,
      );
      console.log(
        `   Service Instance ID: ${process.env.OTEL_SERVICE_INSTANCE_ID || "my-instance"} (from OTEL_SERVICE_INSTANCE_ID)`,
      );
      console.log(
        `   Cloud Role Name will appear as: ${process.env.OTEL_SERVICE_NAMESPACE || "my-namespace"}.${process.env.OTEL_SERVICE_NAME || "my-service"}`,
      );
      console.log(
        `   Cloud Role Instance will be: ${process.env.OTEL_SERVICE_INSTANCE_ID || "my-instance"}`,
      );

      // Simulate some application work
      console.log("\nSimulating application work...");
      console.log("This telemetry will show up in Application Map with the custom role name");

      // This would be your actual application logic
      // The telemetry data will include the custom resource attributes

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Application work completed");
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }
}
