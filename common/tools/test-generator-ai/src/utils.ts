import * as fs from "fs";
import { spawn } from "child_process";

export function getProjectFolder(packageName: string): string | null {
  const projectFolders: Record<string, string> = {
    "app-configuration": "sdk/appconfiguration/app-configuration",
  };
  return projectFolders[packageName] || null;
}

export async function runCommandAndSaveOutput(
  command: string,
  outputFilePath: string,
  cwd: string,
): Promise<void> {
  if (!fs.existsSync(cwd)) {
    const errorMsg = `Working directory does not exist: ${cwd}`;
    fs.writeFileSync(outputFilePath, errorMsg, "utf-8");
    console.error(errorMsg);
    return;
  }

  console.log(`Executing command: "${command}" in directory: ${cwd}`);

  await new Promise<void>((resolve, reject) => {
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
        resolve();
      } else {
        const errorMsg = `Command exited with code ${code}. Output saved to ${outputFilePath}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    });

    child.on("error", (error) => {
      const errorMsg = `Error spawning command: ${error.message}`;
      outputStream.write(errorMsg);
      outputStream.end();
      console.error(errorMsg);
      reject(error);
    });
  });
}

export interface CoverageData {
  [filePath: string]: {
    statementMap: Record<string, { start: { line: number } }>;
    s: Record<string, number>;
  };
}

export function parseCoverageData(coverageFilePath: string): Record<string, number[]> {
  if (!fs.existsSync(coverageFilePath)) {
    throw new Error(`Coverage file not found: ${coverageFilePath}`);
  }

  const coverageData: CoverageData = JSON.parse(fs.readFileSync(coverageFilePath, "utf-8"));
  const uncoveredLines: Record<string, number[]> = {};

  for (const [filePath, fileCoverage] of Object.entries(coverageData)) {
    const uncovered = Object.entries(fileCoverage.statementMap)
      .filter(([stmtId]) => fileCoverage.s[stmtId] === 0)
      .map(([, stmt]) => stmt.start.line);

    if (uncovered.length > 0) {
      uncoveredLines[filePath] = uncovered;
    }
  }

  return uncoveredLines;
}
