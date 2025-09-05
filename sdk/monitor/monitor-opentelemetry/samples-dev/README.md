# Azure Monitor OpenTelemetry Samples

A comprehensive collection of Node.js/TypeScript samples demonstrating Azure Monitor OpenTelemetry configuration patterns. Based on the official [Microsoft Azure Monitor OpenTelemetry Configuration Documentation](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-configuration?tabs=nodejs).

## 🚀 Quick Start

### Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Azure Application Insights resource
- Connection string from your Application Insights resource

### Installation

1. **Clone and setup:**

   ```bash
   git clone <your-repo-url>
   cd azure-sdk-for-js/sdk/monitor/monitor-opentelemetry/samples-dev
   npm install
   ```

2. **Set your connection string:**

   **Windows Command Prompt:**

   ```cmd
   set APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=12345678-1234-1234-1234-123456789012;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/
   ```

   **Windows PowerShell:**

   ```powershell
   $env:APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=12345678-1234-1234-1234-123456789012;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/"
   ```


   **Or create `.env` file (make a copy from .env.sample or rename to .env):**

   ```env
   APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=12345678-1234-1234-1234-123456789012;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/
   ```

3. **Run the samples:**

   ```bash
   npm run dev
   ```

## 📚 Sample Catalog

| Sample | Description | Key Features |
|--------|-------------|--------------|
| [01-basic-connection](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/01-basic-connection.ts) | Basic Azure Monitor setup with configuration object | Connection string configuration |
| [02-cloud-role](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/02-cloud-role.ts) | Cloud role name and instance configuration | Service identification, Application Map |
| [03-sampling](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/03-sampling.ts) | Configure sampling to reduce costs | Cost optimization, trace sampling |
| [04-live-metrics](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/04-live-metrics.ts) | Enable/disable live metrics streaming | Real-time monitoring |
| [05-offline-storage](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/05-offline-storage.ts) | Offline storage and automatic retries | Reliability, data persistence |
| [06-otlp-exporter](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/06-otlp-exporter.ts) | Dual export to Azure Monitor and OTLP | Multi-destination telemetry |
| [07-redact-query-strings](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/07-redact-query-strings.ts) | Redact sensitive URL parameters | Security, data privacy |
| [08-custom-metric](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/08-customMetric.ts) | Custom metrics collection | Custom telemetry, business metrics |
| [09-custom-trace](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples-dev/src/09-customTrace.ts) | Custom traces and spans | Custom instrumentation, distributed tracing |

## 🛠️ Project Structure

```text
src/
├── index.ts                    # Main entry point
├── 01-basic-connection.ts      # Basic Azure Monitor setup
├── 02-cloud-role.ts
├── 03-sampling.ts
├── 04-live-metrics.ts
├── 05-offline-storage.ts
├── 06-otlp-exporter.ts
├── 07-redact-query-strings.ts
├── 08-customMetric.ts          # Custom metrics example
├── 09-customTrace.ts           # Custom traces example
└── utils/                      # Utility functions
```

## 🎯 Running Individual Samples

### Method 1: Modify index.ts

Uncomment the desired example in `src/index.ts`:

```typescript
// Uncomment one of the following examples to run:
await BasicConnectionExample.run();
// await CloudRoleExample.run();
// await SamplingExample.run();
```

### Method 2: Run individual files

```bash
# Run specific sample
npx ts-node src/01-basic-connection.ts
npx ts-node src/02-cloud-role.ts
```

### Method 3: Build and run

```bash
npm run build
node dist/01-basic-connection.js
```

## ⚙️ Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | Azure Monitor connection string ||
| `OTEL_METRIC_EXPORT_INTERVAL` | Metric export interval (ms) | 60000 |
| `OTEL_SERVICE_NAME` | Service name for telemetry | azure-monitor-opentelemetry-samples |
| `OTEL_SERVICE_VERSION` | Service version | 1.0.0 |
| `OTEL_SERVICE_NAMESPACE` | Service namespace for cloud role | my-namespace |
| `OTEL_SERVICE_INSTANCE_ID` | Service instance ID for cloud role | my-instance |

### Azure Monitor Configuration

- **Connection String**: Two methods - environment variable or configuration object
- **Sampling**: Configurable rate (0.0-1.0) to control data volume and costs
- **Cloud Role**: Set service name, namespace, and instance for Application Map
- **Live Metrics**: Real-time monitoring dashboard (Preview)
- **Offline Storage**: Local caching with automatic retry (up to 48 hours)
- **OTLP Export**: Send telemetry to multiple destinations
- **Query String Redaction**: Remove sensitive URL parameters

### TypeScript Configuration

This project uses specific TypeScript settings to support OpenTelemetry semantic conventions:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "node16"
  }
}
```

**Important**: The `moduleResolution: "node16"` setting is required to import from `@opentelemetry/semantic-conventions/incubating`. This enables access to:

- `ATTR_SERVICE_NAMESPACE` - Maps to cloud role name (combined with service name)
- `ATTR_SERVICE_INSTANCE_ID` - Maps to cloud role instance
- Other incubating semantic convention constants

**Example import pattern:**

```typescript
// Stable conventions
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
// Incubating conventions (requires node16 resolution)
import { ATTR_SERVICE_NAMESPACE, ATTR_SERVICE_INSTANCE_ID } from '@opentelemetry/semantic-conventions/incubating';
```

## 🔧 Development Commands

```bash
# Development with auto-reload
npm run dev
npm run watch

# Build TypeScript
npm run build

# Run built JavaScript
npm start

# Clean build artifacts
npm run clean
```

## 📊 Monitoring Your Application

After running the samples, view your telemetry data in:

1. **Azure Portal** → **Application Insights** → Your resource
2. **Application Map**: See service topology with cloud roles
3. **Live Metrics Stream**: Real-time performance data
4. **Logs**: Query telemetry data with KQL
5. **Performance**: Application performance insights

## 🛡️ Security Best Practices

1. **Never commit connection strings** to source control
2. **Use environment variables** or Azure Key Vault for secrets
3. **Enable query string redaction** for URLs with sensitive data
4. **Configure appropriate sampling rates** to control data exposure
5. **Review offline storage paths** for sensitive data handling

## 📖 Additional Resources

- [Azure Monitor OpenTelemetry Documentation](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-configuration?tabs=nodejs)
- [OpenTelemetry JavaScript Documentation](https://opentelemetry.io/docs/languages/js/)
- [Azure Application Insights Overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Application Map Documentation](https://learn.microsoft.com/azure/azure-monitor/app/app-map)
- [Sampling in Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/sampling)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your sample with documentation
4. Follow the existing code patterns
5. Test your changes
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Azure/azure-sdk-for-js/blob/main/LICENSE) file for details.

## 🔗 Related Projects

- [Azure Monitor OpenTelemetry for .NET](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=net)
- [Azure Monitor OpenTelemetry for Java](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=java)
- [Azure Monitor OpenTelemetry for Python](https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable?tabs=python)

---

💡 **Tip**: Start with the basic connection example and gradually explore more advanced configurations based on your monitoring requirements.
