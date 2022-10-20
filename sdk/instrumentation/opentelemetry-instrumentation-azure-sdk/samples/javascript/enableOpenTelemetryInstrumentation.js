const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

// Set-up and configure a Node Tracer Provider using OpenTelemetry
const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

// Continue to import any Azure SDK client libraries after registering the instrumentation.
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const vaultName = process.env.AZURE_VAULT_NAME || "<VAULT-NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const keyVaultKey = process.env.AZURE_VAULT_KEY_NAME || "MyKeyName";

  const credential = new DefaultAzureCredential();
  const keyClient = new KeyClient(url, credential);

  // Tracing is now enabled using automatic span propagation with an active context.
  await keyClient.getKey(keyVaultKey);

  // If your scenario requires manual span propagation, all Azure client libraries
  // support explicitly passing a parent context via an `options` parameter.
  // Get a tracer from a registered provider, create a span, and get the current context.
  const tracer = opentelemetry.trace.getTracer("my-tracer");
  const span = tracer.startSpan("main");
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), span);

  await keyClient.getKey(keyVaultKey, {
    tracingOptions: {
      // ctx will be used as the parent context for all operations.
      tracingContext: ctx,
    },
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
