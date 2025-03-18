import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { OpenAIRealtimeWS } from "openai/beta/realtime/ws";
import { AzureOpenAI } from "openai";
import Speaker from "speaker";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  const cred = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o-realtime-preview-1001";
  const azureADTokenProvider = getBearerTokenProvider(cred, scope);
  const client = new AzureOpenAI({
    azureADTokenProvider,
    apiVersion: "2024-10-01-preview",
    deployment: deploymentName,
  });

  // Create a Speaker instance with the expected audio format.
  // Adjust channels, sampleRate, bitDepth to match the audio format from the service.
  const speaker = new Speaker({
    channels: 1,
    sampleRate: 24000,
    bitDepth: 16,
  });

  const rt = await OpenAIRealtimeWS.azure(client);

  rt.socket.on("open", () => {
    console.log("Connection opened!");
    rt.send({
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        model: "gpt-4o-realtime-preview",
        voice: "sage",
      },
    });

    rt.send({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Say a couple paragraphs!" }],
      },
    });

    rt.send({ type: "response.create" });
  });

  rt.on("error", (err) => {
    // in a real world scenario this should be logged somewhere as you
    // likely want to continue processing events regardless of any errors
    throw err;
  });

  rt.on("session.created", (event) => {
    console.log("session created!", event.session);
    console.log();
  });

  rt.on("response.text.delta", (event) => process.stdout.write(event.delta));
  rt.on("response.audio.delta", (event) => speaker.write(Buffer.from(event.delta, "base64")));
  rt.on("response.audio_transcript.delta", (event) => process.stdout.write(event.delta));
  rt.on("response.text.done", () => console.log());

  rt.on("response.done", () => rt.close());

  rt.socket.on("close", () => console.log("\nConnection closed!"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
