import * as fs from "fs";
import * as path from "path";
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
 * Reads the entire content of a source file.
 *
 * @param filePath - Path to the source file.
 * @returns The content of the file as a string.
 */
function readSourceFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Generates a detailed prompt for Azure OpenAI to create tests based on existing test examples,
 * coverage analysis insights, and the full source file content.
 */
function generateTestGenerationPrompt(
  coverageAnalysis: string,
  sourceFileContent: string,
  sourceFileName: string,
): string {
  const guidelines = `
You are an expert software engineer tasked with generating unit tests in TypeScript using Vitest. Follow these guidelines strictly:

- Use Vitest's describe/it structure clearly.
- Use assertions from Vitest's assert module (assert.equal, assert.deepEqual, assert.isDefined, assert.ok, assert.throws).
- Clearly structure tests with setup (beforeEach) and teardown (afterEach) hooks when necessary.
- Follow the style and conventions demonstrated in the provided examples below.

Examples from existing tests:

### Example from featureFlag.spec.ts:
\`\`\`typescript
describe("AppConfigurationClient - FeatureFlag", () => {
  describe("FeatureFlag configuration setting", () => {
    beforeEach(async (ctx) => {
      recorder = await startRecorder(ctx);
      client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
      // setup code...
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("can add and get FeatureFlag", async () => {
      const response = await client.getConfigurationSetting({ key: baseSetting.key });
      assert.isDefined(response);
      assert.equal(response.key, baseSetting.key);
    });
  });
});
\`\`\`

### Example from helpers.spec.ts:
\`\`\`typescript
describe("helper methods", () => {
  it("checkAndFormatIfAndIfNoneMatch", () => {
    const result = checkAndFormatIfAndIfNoneMatch({ key: "testKey" }, {});
    assert.deepEqual(result, { ifMatch: undefined, ifNoneMatch: undefined });
  });
});
\`\`\`

Based on the following coverage analysis insights and the provided source file content, generate appropriate tests to cover the uncovered scenarios:

### Coverage Analysis Insights:
${coverageAnalysis}

### Source File Content (${sourceFileName}):
\`\`\`typescript
${sourceFileContent}
\`\`\`

Provide only the complete test file content in your response, formatted as valid TypeScript code.
`;

  return guidelines;
}

/**
 * Main function to analyze coverage and generate tests.
 */
export async function analyzeCoverageAndGenerateTests(): Promise<void> {
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

  const coveragePrompt = `
Given the following uncovered lines of code along with their surrounding context, identify specific scenarios, edge cases, or error conditions that would trigger these uncovered lines. Provide concrete test scenarios or inputs for each uncovered line.

${JSON.stringify(uncoveredLinesWithContext, null, 2)}
`;

  const coverageMessages: ChatRequestMessage[] = [
    { role: "system", content: "You are an expert software engineer helping analyze test coverage." },
    { role: "user", content: coveragePrompt },
  ];

  const coverageResult = await inferenceClient.path("/chat/completions").post({
    body: {
      messages: coverageMessages,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
    },
  });

  if (isUnexpected(coverageResult)) {
    console.error(`Unexpected response: ${coverageResult.status} - ${coverageResult.body}`);
    return;
  }

  const coverageAnalysis = coverageResult.body.choices[0]?.message?.content || "No analysis provided.";
  console.log(coverageAnalysis)
  // Dynamically read the full source file content based on uncoveredLines
  // TODO: [0] works because we only have one file, but this should be improved to handle multiple files
  // and their respective uncovered lines.
  // For now, we will just read the first file in the uncoveredLines object
  // and use it for test generation.
  const sourceFilePath = Object.keys(uncoveredLines)[0];
  const sourceFileContent = readSourceFile(sourceFilePath);
  const sourceFileName = path.basename(sourceFilePath);

  // Generate prompt for test generation based on coverage analysis and full source file content
  const testGenerationPrompt = generateTestGenerationPrompt(
    coverageAnalysis,
    sourceFileContent,
    sourceFileName,
  );

  const testGenerationMessages: ChatRequestMessage[] = [
    { role: "system", content: "You are an expert software engineer generating unit tests." },
    { role: "user", content: testGenerationPrompt },
  ];

  const testGenerationResult = await inferenceClient.path("/chat/completions").post({
    body: {
      messages: testGenerationMessages,
      temperature: 0.3, // Lower temperature for more deterministic test generation
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
    },
  });

  if (isUnexpected(testGenerationResult)) {
    console.error(`Unexpected response: ${testGenerationResult.status} - ${testGenerationResult.body}`);
    return;
  }

  const generatedTests = testGenerationResult.body.choices[0]?.message?.content || "";

  // Write generated tests to a new file
  const outputPath = path.join(__dirname, `../outputs/generated-${sourceFileName.replace(".ts", ".spec.ts")}`);
  fs.writeFileSync(outputPath, generatedTests);
  console.log(`Generated tests written to ${outputPath}`);
}

// Execute the analysis and test generation
analyzeCoverageAndGenerateTests().catch((err) => {
  console.error("Error during analysis and test generation:", err);
});
