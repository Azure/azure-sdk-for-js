// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get instrumentation by open telemetry.
 *
 * @summary get instrumentation by open telemetry.
 */

const { trace, context } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
const { ConsoleSpanExporter, NodeTracerProvider, SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-node");
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"] || "<key>";
const connectionString = process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"];

// Initialize the exporter
const provider = new NodeTracerProvider();
if (connectionString) {
  const exporter = new AzureMonitorTraceExporter({
    connectionString
  });
  provider.addSpanProcessor(
    new SimpleSpanProcessor(exporter)
  );
}
provider.addSpanProcessor(
  new SimpleSpanProcessor(new ConsoleSpanExporter())
);
provider.register();

// register Azure SDK Instrumentation.
// ************** IMPORTANT SETUP STEP ***************
// this must be done before loading @azure/core-tracing
registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});


const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

async function main() {
  console.log("== Chat Completions Sample ==");

  // initialize a span named "main" with default options for the spans
  const tracer = trace.getTracer('sample', '0.1.0');

  const response = await tracer.startActiveSpan('main', async (span) => {
    const client = ModelClient(endpoint, new AzureKeyCredential(key));
    return client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "What's the weather like in Boston?" }],
        temperature: 1.0,
        max_tokens: 1000,
        top_p: 1.0
      },
      tracingOptions: { tracingContext: context.active() }
    }).then((response) => {
      span.end();
      return response;
    });
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.content);
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

/**
 * Output of the sample:
 */
/*
== Chat Completions Sample ==
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:C:\\Program Files\\nodejs\\node.exe',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: {
    name: '@azure/core-rest-pipeline',
    version: '1.16.4',
    schemaUrl: undefined
  },
  traceId: '9b6358a456f647accca5ca0268627fe4',
  parentId: '2aa9031ca62c83c9',
  traceState: undefined,
  name: 'HTTP POST',
  id: '4ec5c3843b4edda7',
  kind: 2,
  timestamp: 1725682618889000,
  duration: 3430348.6,
  attributes: {
    'http.url': 'https://mistral-large-ajmih-serverless.eastus2.inference.ai.azure.com/chat/completions?api-version=2024-05-01-preview',
    'http.method': 'POST',
    'http.user_agent': 'azsdk-js-ai-inference/1.0.0-beta.2 core-rest-pipeline/1.16.4 Node/18.20.4 OS/(x64-Windows_NT-10.0.22631)',
    requestId: '909ab4a0-2132-4b66-ae1d-dbeb5753591f',
    'az.namespace': 'Micirsoft.CognitiveServices',
    'http.status_code': 200
  },
  status: { code: 1 },
  events: [],
  links: []
}
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:C:\\Program Files\\nodejs\\node.exe',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'ai-inference-rest', version: '1.0.0', schemaUrl: undefined },    
  traceId: '9b6358a456f647accca5ca0268627fe4',
  parentId: 'd299eda61bda07ba',
  traceState: undefined,
  name: 'chat',
  id: '2aa9031ca62c83c9',
  kind: 2,
  timestamp: 1725682618869000,
  duration: 3496122.2,
  attributes: {
    'az.namespace': 'Micirsoft.CognitiveServices',
    'server.address': 'mistral-large-ajmih-serverless.eastus2.inference.ai.azure.com',
    'server.port': 443,
    'gen_ai.operation.name': 'chat',
    'gen_ai.system': 'az.ai_inference',
    'gen_ai.request.max_tokens': 1000,
    'gen_ai.request.temperature': 1,
    'gen_ai.request.top_p': 1,
    'gen_ai.response.id': '77f83fce878f40ce8118d3ceee74ec87',
    'gen_ai.response.model': 'mistral-large',
    'gen_ai.usage.input_tokens': 12,
    'gen_ai.usage.output_tokens': 74
  },
  status: { code: 0 },
  events: [
    {
      name: 'gen_ai.user.message',
      attributes: {
        'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
        'gen_ai.event.content': `{"role":"user","content":"What's the weather like in Boston?"}`  
      },
      time: [ 1725682618, 869494500 ],
      droppedAttributesCount: 0
    },
    {
      name: 'gen_ai.choice',
      attributes: {
        'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
        'gen_ai.event.content': `{"finish_reason":"stop","index":0,"message":{"content":"I don't have real-time data access and can't provide current weather updates. However, Boston, Massachusetts, experiences a continental climate with humid summers and cold, snowy winters. Spring and fall are typically mild, but weather can be variable. Please check a reliable weather forecast for the most accurate and up-to-date information."}}`
      },
      time: [ 1725682622, 365073700 ],
      droppedAttributesCount: 0
    }
  ],
  links: []
}
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:C:\\Program Files\\nodejs\\node.exe',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'sample', version: '0.1.0', schemaUrl: undefined },
  traceId: '9b6358a456f647accca5ca0268627fe4',
  parentId: undefined,
  traceState: undefined,
  name: 'main',
  id: 'd299eda61bda07ba',
  kind: 0,
  timestamp: 1725682618866000,
  duration: 3525184.7,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
I don't have real-time data access and can't provide current weather updates. However, Boston, Massachusetts, experiences a continental climate with humid summers and cold, snowy winters. Spring and fall are typically mild, but weather can be variable. Please check a reliable weather forecast for the most accurate and up-to-date information.
*/
