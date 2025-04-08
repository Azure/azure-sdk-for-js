import * as fs from "fs";
import * as path from "path";
import { inferenceClient } from "./azureOpenAIClient";
import { ChatRequestMessage, isUnexpected } from "@azure-rest/ai-inference";
import { parseCoverageData } from "./utils";

export async function analyzeCoverage(coverageFilePath: string): Promise<void> {
  if (!fs.existsSync(coverageFilePath)) {
    console.error(`Coverage file not found: ${coverageFilePath}`);
    return;
  }

  // const uncoveredLines = parseCoverageData(coverageFilePath);
  const uncoveredLines = parseCoverageData(coverageFilePath);
  console.log("Uncovered lines of code:", {
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/appConfigCredential.ts': [
      21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 33,
      34, 37, 42
    ],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/appConfigurationClient.ts': [255, 353, 356],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/featureFlag.ts': [62, 63, 67, 96, 97, 106],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/secretReference.ts': [36, 37, 63, 64],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/generated/src/appConfiguration.ts': [
      101, 104, 109, 139, 169,
      177, 197, 254, 277, 406,
      427, 471, 483, 498, 513,
      528, 543, 558
    ],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/internal/helpers.ts': [
      67, 217, 218,
      342, 344, 345,
      443, 450
    ],
    '/home/codespace/workspace/sdk/appconfiguration/app-configuration/src/internal/synctokenpolicy.ts': [141]
  });


  const prompt = `
    Given the following uncovered lines of code from a test coverage report, help me understand which branches or scenarios these uncovered lines correspond to:

    ${JSON.stringify(uncoveredLines, null, 2)}

    Provide a concise analysis.
  `;

  const messages: ChatRequestMessage[] = [
    {
      role: "system",
      content: "You are an expert software engineer helping analyze test coverage.",
    },
    { role: "user", content: prompt },
  ];

  const result = await inferenceClient.path("/chat/completions").post({
    body: {
      messages,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: process.env.AZURE_OPENAI_DEPLOYMENT
    },
  });

  if (isUnexpected(result)) {
    console.error(`Unexpected response here: ${result.status} - ${result.body}`);
    return;
  }

  console.log("Response from Azure OpenAI:", JSON.stringify(result.body));
  const analysis = result.body.choices[0]?.message?.content || "No analysis provided.";

  console.log("Coverage Analysis from Azure OpenAI:");
  console.log(analysis);

  const analysisOutputPath = path.resolve(path.dirname(coverageFilePath), "coverage-analysis.txt");
  fs.writeFileSync(analysisOutputPath, analysis, "utf-8");
  console.log(`Analysis saved to ${analysisOutputPath}`);
}
