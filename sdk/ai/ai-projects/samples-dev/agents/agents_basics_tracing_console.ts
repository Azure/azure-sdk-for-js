// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import { context } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import {
    ConsoleSpanExporter,
    NodeTracerProvider,
    SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";


import * as dotenv from "dotenv";
dotenv.config();

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
    instrumentations: [createAzureSdkInstrumentation()],
});



import { AIProjectsClient } from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {

    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());


    const agent = await client.agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are helpful agent" }, { tracingOptions: { tracingContext: context.active() } });


    console.log(`Created agent, agent ID : ${agent.id}`);

    client.agents.deleteAgent(agent.id);

    console.log(`Deleted agent`);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
