// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage evaluations.
 * 
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations,
 * and perform various operations on them.
 */

import { AIProjectClient } from "@azure/ai-projects-1dp";
import type { Evaluation } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

export async function main(): Promise<void> {
    const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
    const evaluations: Evaluation[] = [];
    const evaluationNames: string[] = [];
    for await (const evaluation of project.evaluations.list()) {
        evaluations.push(evaluation);
        evaluationNames.push(evaluation.displayName ?? "");
    }
    console.log("List of evaluation display names:", evaluationNames);

    // This is temporary, as interface recommend the name of the evaluation
    const id = evaluations[0].id;
    const evaluation = await project.evaluations.get(id);
    console.log("Get an evaluation by ID:", evaluation);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
