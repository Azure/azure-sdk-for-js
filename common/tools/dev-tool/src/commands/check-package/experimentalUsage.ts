// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import * as path from "node:path";
import { ProjectInfo } from "../../util/resolveProject";
import { Project } from "ts-morph";
import { Printer } from "../../util/printer";

export function* checkExperimentalApiUsage(
  packageInfo: ProjectInfo,
  _log: Printer,
): Generator<Issue> {
  const version = packageInfo.packageJson.version;
  const versionMatch = version.match(/^(0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(.+)|$)/);
  if (versionMatch) {
    const issueLevel: IssueLevel = versionMatch[2]?.match(/^(alpha|beta)(.*)/) ? "warn" : "error";
    const project = new Project({
      tsConfigFilePath: path.join(packageInfo.path, "tsconfig.json"),
    });
    for (const sourceFile of project.getSourceFiles()) {
      const filePath = sourceFile.getFilePath();
      if (filePath.endsWith(".d.ts")) {
        continue;
      }
      for (const importStatement of sourceFile.getImportDeclarations()) {
        const moduleText = importStatement.getModuleSpecifier().getText();
        if (!moduleText.startsWith(`"@azure`)) {
          continue;
        }
        if (
          /^"@azure(-[a-z]+)?\/([a-z]+-)*[a-z]+\/experimental/.test(moduleText) &&
          !moduleText.startsWith(`"${packageInfo.packageJson.name}`)
        ) {
          yield {
            level: issueLevel,
            message: `Using experimental Apis from ${moduleText}`,
            filepath: filePath,
          };
        }
      }
    }
  }
}
