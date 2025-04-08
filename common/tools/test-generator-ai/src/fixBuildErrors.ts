import * as fs from "fs";
import * as path from "path";
import { runCommandAndSaveOutput } from "./utils";
import { inferenceClient } from "./azureOpenAIClient";
import { ChatRequestMessage, isUnexpected } from "@azure-rest/ai-inference";

/**
 * Parses TypeScript errors from the build output.
 */
function parseTypeScriptErrors(buildOutput: string): Record<string, string[]> {
  const errorRegex = /(test\/[^\s]+\.ts)\((\d+),(\d+)\): error TS\d+: (.+)/g;
  const errorsByFile: Record<string, string[]> = {};
  let match;

  while ((match = errorRegex.exec(buildOutput)) !== null) {
    const [_, file, line, col, message] = match;
    if (!errorsByFile[file]) errorsByFile[file] = [];
    errorsByFile[file].push(`Line ${line}:${col} - ${message}`);
  }

  return errorsByFile;
}

/**
 * Uses Azure OpenAI to fix TypeScript errors in the provided source file content.
 */
async function fixErrorsWithAI(filePath: string, fileContent: string, errors: string[]): Promise<string> {
  const prompt = `
You are an expert TypeScript developer. The following file contains TypeScript errors. Fix the errors in the file while adhering to the provided error messages and TypeScript type definitions.

### File Path:
${filePath}

### Errors:
${errors.join("\n")}

### File Content:
\`\`\`typescript
${fileContent}
\`\`\`

Provide only the corrected file content as valid TypeScript code.
`;

  const messages: ChatRequestMessage[] = [
    { role: "system", content: "You are an expert TypeScript developer fixing TypeScript errors." },
    { role: "user", content: prompt },
  ];

  const result = await inferenceClient.path("/chat/completions").post({
    body: {
      messages,
      temperature: 0.3, // Lower temperature for deterministic results
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
    },
  });

  if (isUnexpected(result)) {
    throw new Error(`Unexpected response: ${result.status} - ${result.body}`);
  }

  return result.body.choices[0]?.message?.content || fileContent;
}

/**
 * Main function to run the build command and fix TypeScript errors.
 */
async function runBuildAndFixErrors(): Promise<void> {
  const projectDir = path.resolve(__dirname, "../../../../sdk/appconfiguration/app-configuration");
  const outputFilePath = path.join(__dirname, "../outputs/build-output.log");

  console.log(`Running npx tsc --project ./tsconfig.test.json in ${projectDir}`);

  try {
    await runCommandAndSaveOutput("npx tsc --project ./tsconfig.test.json", outputFilePath, projectDir);
    console.log("Build succeeded without errors.");
    return;
  } catch (error) {
    console.error("Build errors detected. Attempting to fix...");
  }

  const buildOutput = await fs.promises.readFile(outputFilePath, "utf-8");
  const errorsByFile = parseTypeScriptErrors(buildOutput);

  for (const [relativeFilePath, errors] of Object.entries(errorsByFile)) {
    const absoluteFilePath = path.join(projectDir, relativeFilePath);
    const fileContent = await fs.promises.readFile(absoluteFilePath, "utf-8");

    console.log(`Fixing errors in ${absoluteFilePath}`);

    const fixedContent = await fixErrorsWithAI(absoluteFilePath, fileContent, errors);

    await fs.promises.writeFile(absoluteFilePath, fixedContent, "utf-8");
    console.log(`Fixed errors in ${absoluteFilePath}`);
  }

  console.log("Re-running npx tsc --project ./tsconfig.test.json to verify fixes...");
  try {
    await runCommandAndSaveOutput("npx tsc --project ./tsconfig.test.json", outputFilePath, projectDir);
    console.log("Build succeeded after fixes.");
  } catch (error) {
    console.error("Build failed again after fixes. Please check the output log for details.");
  }
}

// Execute the build and fix process
runBuildAndFixErrors().catch((err) => {
  console.error("Error during build and fix process:", err);
});
