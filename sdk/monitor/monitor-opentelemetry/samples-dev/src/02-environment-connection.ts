/**
 * Environment Connection Example
 *
 * This example demonstrates how to configure the Azure Monitor OpenTelemetry
 * connection string using an environment variable.
 */

export class EnvironmentConnectionExample {
    static async run() {
        const { useAzureMonitor } = await import('@azure/monitor-opentelemetry');

        try {
            // Check if the environment variable is set
            const connectionString =
                process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || '<your connection string>';

            const options = {
                azureMonitorExporterOptions: {
                    connectionString:
                        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ||
                        '<your connection string>',
                },
            };
            // Enable Azure Monitor integration
            // The useAzureMonitor function will automatically read the connection string
            // from the APPLICATIONINSIGHTS_CONNECTION_STRING environment variable
            useAzureMonitor();

            console.log(
                'Azure Monitor configured with connection string from environment variable'
            );
            console.log(`Connection string: ${connectionString.substring(0, 50)}...`);

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

    static showEnvironmentSetup() {
        console.log('\nEnvironment Variable Setup:');
        console.log('Windows Command Prompt:');
        console.log('  set APPLICATIONINSIGHTS_CONNECTION_STRING=<your connection string>');
        console.log('\nWindows PowerShell:');
        console.log('  $env:APPLICATIONINSIGHTS_CONNECTION_STRING="<your connection string>"');
        console.log('\nLinux/macOS:');
        console.log('  export APPLICATIONINSIGHTS_CONNECTION_STRING="<your connection string>"');
        console.log('\nYou can also add this to a .env file in your project root');
    }
}

// Usage instructions
if (require.main === module) {
    EnvironmentConnectionExample.showEnvironmentSetup();
}
