import * as fs from "fs";
import { inferenceClient } from "./azureOpenAIClient";
import { ChatRequestMessage, isUnexpected } from "@azure-rest/ai-inference";

/**
 * Extracts lines of code around specified line numbers from a given file.
 * This provides context for analyzing uncovered lines in test coverage.
 *
 * @param filePath - Path to the source file.
 * @param lineNumbers - Array of line numbers to extract context around.
 * @param contextRadius - Number of lines to include before and after each line number.
 * @returns An object mapping each line number to its surrounding lines of context.
 */
function extractContext(filePath: string, lineNumbers: number[], contextRadius = 3): Record<number, string[]> {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const context: Record<number, string[]> = {};
  lineNumbers.forEach((lineNumber) => {
    const start = Math.max(0, lineNumber - contextRadius - 1);
    const end = Math.min(lines.length, lineNumber + contextRadius);
    context[lineNumber] = lines.slice(start, end);
  });
  return context;
}

/**
 * Analyzes uncovered lines of code by querying Azure OpenAI to identify specific scenarios,
 * edge cases, or error conditions that would trigger these uncovered lines.
 */
export async function analyzeCoverage(): Promise<void> {
  // Define uncovered lines of code to analyze.
  const uncoveredLines = {
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/appConfigCredential.ts': [
    //   21, 22, 23, 24, 25, 26,
    //   27, 28, 29, 30, 31, 33,
    //   34, 37, 42
    // ],
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/appConfigurationClient.ts': [255, 353, 356],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/featureFlag.ts': [62, 63, 67, 96, 97, 106],
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/secretReference.ts': [36, 37, 63, 64],
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/generated/src/appConfiguration.ts': [
    //   101, 104, 109, 139, 169,
    //   177, 197, 254, 277, 406,
    //   427, 471, 483, 498, 513,
    //   528, 543, 558
    // ],
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/internal/helpers.ts': [
    //   67, 217, 218,
    //   342, 344, 345,
    //   443, 450
    // ],
    // '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/internal/synctokenpolicy.ts': [141]
  };

  const uncoveredLinesWithContext: Record<string, Record<number, string[]>> = {};
  for (const [filePath, lines] of Object.entries(uncoveredLines)) {
    uncoveredLinesWithContext[filePath] = extractContext(filePath, lines);
  }

  console.log("Uncovered lines of code with context:", JSON.stringify(uncoveredLinesWithContext, null, 2));
  // Construct the prompt to send to Azure OpenAI.
  const prompt = `
Given the following uncovered lines of code along with their surrounding context, identify specific scenarios, edge cases, or error conditions that would trigger these uncovered lines. Provide concrete test scenarios or inputs for each uncovered line.

${JSON.stringify(uncoveredLinesWithContext, null, 2)}
`;

  // Prepare messages for Azure OpenAI inference request.
  const messages: ChatRequestMessage[] = [
    {
      role: "system",
      content: "You are an expert software engineer helping analyze test coverage.",
    },
    { role: "user", content: prompt },
  ];

  // Send request to Azure OpenAI inference endpoint.
  const result = await inferenceClient.path("/chat/completions").post({
    body: {
      messages,
      temperature: 0.5, // Lower temperature for more deterministic responses
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
    },
  });

  // Handle unexpected responses from Azure OpenAI.
  if (isUnexpected(result)) {
    console.error(`Unexpected response here: ${result.status} - ${result.body}`);
    return;
  }

  // Extract and log the analysis provided by Azure OpenAI.
  const analysis = result.body.choices[0]?.message?.content || "No analysis provided.";
  console.log("Coverage Analysis from Azure OpenAI:");
  console.log(analysis);
}

// Execute the coverage analysis and handle any errors.
analyzeCoverage().catch((err) => {
  console.error("The sample encountered an error:", err);
});
