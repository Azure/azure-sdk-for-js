import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import { config } from "dotenv";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load environment variables from .env file
config();

// Azure OpenAI setup
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureOpenAIKey = process.env.AZURE_OPENAI_KEY;
const azureOpenAIDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;

if (!azureOpenAIEndpoint || !azureOpenAIKey || !azureOpenAIDeployment) {
  throw new Error("Azure OpenAI credentials are not fully configured in .env file.");
}

const openAIClient = new OpenAIClient(azureOpenAIEndpoint, new AzureKeyCredential(azureOpenAIKey));

// Function to get project folder from hardcoded mapping
function getProjectFolder(packageName: string): string | null {
  const projectFolders: Record<string, string> = {
    "app-configuration": "sdk/appconfiguration/app-configuration",
  };

  return projectFolders[packageName] || null;
}

// Function to run a command and save its output to a file
async function runCommandAndSaveOutput(command: string, outputFilePath: string, cwd: string) {
  if (!fs.existsSync(cwd)) {
    const errorMsg = `Working directory does not exist: ${cwd}`;
    fs.writeFileSync(outputFilePath, errorMsg, "utf-8");
    console.error(errorMsg);
    return;
  }

  console.log(`Executing command: "${command}" in directory: ${cwd}`);

  const child = spawn(command, { cwd, shell: "/bin/bash" });

  const outputStream = fs.createWriteStream(outputFilePath, { encoding: "utf-8" });

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
    outputStream.write(data);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(data);
    outputStream.write(data);
  });

  child.on("close", (code) => {
    outputStream.end();
    if (code === 0) {
      console.log(`Command completed successfully. Output saved to ${outputFilePath}`);
    } else {
      console.error(`Command exited with code ${code}. Output saved to ${outputFilePath}`);
    }
  });

  child.on("error", (error) => {
    const errorMsg = `Error spawning command: ${error.message}`;
    outputStream.write(errorMsg);
    outputStream.end();
    console.error(errorMsg);
  });
}

async function analyzeCoverage(coverageFilePath: string): Promise<void> {
  if (!fs.existsSync(coverageFilePath)) {
    console.error(`Coverage file not found: ${coverageFilePath}`);
    return;
  }

  const coverageData = JSON.parse(fs.readFileSync(coverageFilePath, "utf-8"));
  const uncoveredLines: Record<string, number[]> = {};

  for (const [filePath, fileCoverage] of Object.entries<any>(coverageData)) {
    const uncovered = Object.entries(fileCoverage.statementMap)
      .filter(([stmtId]) => fileCoverage.s[stmtId] === 0)
      .map(([, stmt]) => stmt.start.line);

    if (uncovered.length > 0) {
      uncoveredLines[filePath] = uncovered;
    }
  }

  const prompt = `
    Given the following uncovered lines of code from a test coverage report, help me understand which branches or scenarios these uncovered lines correspond to:

    ${JSON.stringify(uncoveredLines, null, 2)}

    Provide a concise analysis.
  `;

  const result = await openAIClient.getChatCompletions(azureOpenAIDeployment, [
    { role: "system", content: "You are an expert software engineer helping analyze test coverage." },
    { role: "user", content: prompt },
  ]);

  const analysis = result.choices[0]?.message?.content || "No analysis provided.";

  console.log("Coverage Analysis from Azure OpenAI:");
  console.log(analysis);

  // Optionally save analysis to a file
  const analysisOutputPath = path.resolve(path.dirname(coverageFilePath), "coverage-analysis.txt");
  fs.writeFileSync(analysisOutputPath, analysis, "utf-8");
  console.log(`Analysis saved to ${analysisOutputPath}`);
}

// Main execution wrapped in async IIFE
(async () => {
  const args = process.argv.slice(2);
  const packageNameArgIndex = args.indexOf("--package");

  if (packageNameArgIndex !== -1 && args[packageNameArgIndex + 1]) {
    const packageName = args[packageNameArgIndex + 1];
    const projectFolder = getProjectFolder(packageName);

    if (projectFolder) {
      const projectPath = path.resolve(__dirname, "../../../../", projectFolder);
      const outputFilePath = path.resolve(__dirname, `../${packageName}-test-output.log`);

      console.log(`Running tests for package: ${packageName}`);
      await runCommandAndSaveOutput("rushx unit-test:node", outputFilePath, projectPath);

      // After tests, analyze coverage
      const coverageFilePath = path.resolve(projectPath, "coverage/coverage-final.json");
      await analyzeCoverage(coverageFilePath);
    } else {
      console.error(`Package ${packageName} not found.`);
    }
  } else {
    console.error("Usage: ts-node main.ts --package <package-name>");
  }
})();
