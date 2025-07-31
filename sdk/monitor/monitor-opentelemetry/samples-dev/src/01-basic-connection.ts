/**
 * Basic Connection Example
 *
 * This example demonstrates how to configure Azure Monitor OpenTelemetry
 * using the APPLICATIONINSIGHTS_CONNECTION_STRING environment variable.
 */

export class BasicConnectionExample {
    static async run() {
        const { useAzureMonitor } = await import('@azure/monitor-opentelemetry');

        try {
            // Configure Azure Monitor with connection string from environment
            const options = {
                azureMonitorExporterOptions: {
                    connectionString:
                        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ||
                        '<your connection string>',
                },
            };

            // Enable Azure Monitor integration using the useAzureMonitor function
            useAzureMonitor(options);

            console.log(
                'Azure Monitor configured with connection string from environment variable'
            );
            console.log('Connection string source: APPLICATIONINSIGHTS_CONNECTION_STRING');
            console.log('Telemetry will be sent to Azure Application Insights');

            // Simulate some application work
            console.log('Simulating application work...');

            // This would be your actual application logic
            // The telemetry data will be automatically collected and sent to Azure Monitor

            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Application work completed');
        } catch (error) {
            console.error('Error configuring Azure Monitor:', error);
        }
    }
}

// Usage instructions
if (require.main === module) {
    console.log('💡 To use this example:');
    console.log('1. Set the APPLICATIONINSIGHTS_CONNECTION_STRING environment variable');
    console.log(
        '   - Windows PowerShell: $env:APPLICATIONINSIGHTS_CONNECTION_STRING="your-connection-string"'
    );
    console.log(
        '   - Windows CMD: set APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string'
    );
    console.log(
        '   - Or create a .env file with: APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string'
    );
    console.log('2. Run: npm run dev');
    console.log('3. Uncomment the BasicConnectionExample.run() line in src/index.ts\n');
}
