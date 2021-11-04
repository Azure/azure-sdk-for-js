# Agenda

## API View

https://apiview.dev/Assemblies/Review/e66480bf205b44ffab0bf5e91b705742

## Scenarios

### As Package Author

```typescript
class MyClient {
  private readonly tracingClient: TracingClient;

  constructor() {
    this.tracingClient = createTracingClient({
      namespace: "Microsoft.KeyVault",
      // Optional
      packageInformation: {
        name: "@azure/my-package"
      }
    });
  }

  // Champion: Almost all of the current usecases will be covered by this
  async doTheThings(options): Promise<Things> {
    return this.tracingClient.withTrace(
      "MyClient.doTheThings",
      async (updatedOptions) => {
        const result = await this.callGeneratedClient(updatedOptions);
        return mapToPublic(result);
      },
      options
    );
  }

  // Niche: For EventHubs, ServiceBus, etc.
  callUserCode(context: TracingContext): void {
    return this.tracingClient.withContext(
      context,
      this._eventHandlers.processEvents,
      /* CallbackThis */ undefined,
      /* CallbackArgs */ events
    );
  }

  // Niche: Creating links...
  processMessages(messages, options) {
    const links = [];
    for (const message of messages) {
      const identifier = fromTraceparentHeader(message["Diagnostic-Id"]);
      links.push(identifier);
    }
    //...
    links.push({
      context: identifier,
      // Not supported yet... how should we support this?
      attributes: {
        enqueuedTime: receivedEvent.enqueuedTimeUtc.getTime()
      }
    });
    //...
    return this.tracingClient.withTrace(
      "MyClient.processMessages",
      async (updatedOptions) => {},
      options,
      { spanLinks: links, spanKind: "client" }
    );
  }
}
```

### Tracing Policy

```typescript
// This is how I imagine it'll work... haven't quite gotten there yet...
export function tracingPolicy(options) {
  const tracingClient = getTracingClient(options) || createTracingClient();

  return {
    async sendRequest(request, next) {
      const createSpanOptions: TracingSpanOptions = {
        kind: SpanKind.CLIENT
      };

      return tracingClient.withTrace(
        `HTTP ${request.method}`,
        (updatedOptions, span) => {
          // We can also offer span.setAttributes if we want
          span.setAttribute(
            "az.namespace",
            getNamespaceFromContext(updatedOptions.tracingOptions.tracingContext)
          );
          span.setAttribute("http.method", request.method);
          span.setAttribute("http.url", request.url);
          span.setAttribute("requestId", request.requestId);

          const headers = span.serialize();
          for (const header in headers) {
            request.headers.set(header, headers[header]);
          }

          return next({
            ...request,
            tracingOptions: updatedOptions.tracingOptions
          }); // Not sure if new tracingContext needs to be passed
        },
        { tracingOptions: request.tracingOptions },
        createSpanOptions
      );
    }
  };
}
```

### SDK User

```typescript
import { useTracer } from "@azure/core-tracing";
import { OpenTelemetryTracer } from "@azure/core-tracing-opentelemetry";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { MyClient } from "@azure/my-package";

// First initialize OTel
const provider = new NodeTracerProvider();
// ... exporters
provider.register();
// ... auto-instrumentation

// Use an OTel tracer globally in Azure SDK
const tracer = new OpenTelemetryTracer();
useTracer(tracer);

// Start to do the things
new MyClient().doTheThings().catch(console.error);
```
