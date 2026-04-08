// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Trace an agent-mode VoiceLive session with function calling.
 *
 * This sample shows telemetry for a Foundry-agent session that uses
 * function calling and MCP tools. The resulting traces capture:
 *   - Agent attributes (name, project, version)
 *   - Function call IDs, arguments, and outputs
 *   - MCP call/list-tools counters
 *   - Token usage on response.done
 *   - First-token latency
 */

import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { VoiceLiveClient, VoiceLiveInstrumentor } from "@azure/ai-voicelive";
import { DefaultAzureCredential } from "@azure/identity";

// ------------------------------------------------------------------ //
// 1. OpenTelemetry setup                                             //
// ------------------------------------------------------------------ //

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// ------------------------------------------------------------------ //
// 2. Instrument the SDK                                              //
// ------------------------------------------------------------------ //

const instrumentor = new VoiceLiveInstrumentor();
instrumentor.instrument({ enableContentRecording: true });

// ------------------------------------------------------------------ //
// 3. Run an agent session with function calling                      //
// ------------------------------------------------------------------ //

async function main(): Promise<void> {
  const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT
    ?? "https://your-resource.cognitiveservices.azure.com";
  const credential = new DefaultAzureCredential();

  const client = new VoiceLiveClient(endpoint, credential);

  // Start in agent mode — the connect span will carry agent attributes
  const session = await client.startSession({
    agent: {
      agentName: "weather-assistant",
      projectName: "my-foundry-project",
    },
  });

  // Define tools
  await session.updateSession({
    modalities: ["audio", "text"],
    instructions: "You help users with weather forecasts. Use get_weather to look up conditions.",
    tools: [
      {
        type: "function",
        name: "get_weather",
        description: "Get the current weather for a city",
        parameters: {
          type: "object",
          properties: {
            city: { type: "string", description: "City name" },
          },
          required: ["city"],
        },
      },
    ],
    toolChoice: "auto",
  });

  // Handle function calls
  session.subscribe({
    onResponseFunctionCallArgumentsDone: async (event) => {
      console.log(`Function call: ${event.name}(${event.arguments})`);

      if (event.name === "get_weather") {
        const args = JSON.parse(event.arguments);
        const result = { city: args.city, temp: "22°C", conditions: "partly cloudy" };

        // Send the function output — traced as "send conversation.item.create"
        await session.addConversationItem({
          type: "function_call_output",
          callId: event.callId,
          output: JSON.stringify(result),
        });

        // Ask for a new response — traced as "send response.create"
        await session.sendEvent({ type: "response.create" });
      }
    },
    onResponseTextDelta: async (event) => {
      process.stdout.write(event.delta ?? "");
    },
    onResponseDone: async () => {
      console.log("\n[turn complete]");
    },
  });

  // Kick off the conversation
  await session.addConversationItem({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What's the weather in Seattle?" }],
  });
  await session.sendEvent({ type: "response.create" });

  // Wait for the full round-trip (text response after function call)
  await new Promise((resolve) => setTimeout(resolve, 15_000));

  await session.disconnect();
  instrumentor.uninstrument();
  await provider.shutdown();

  console.log("\nDone. Check the console output above for exported spans.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
