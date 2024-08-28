// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "node:path";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { Project } from "ts-morph";
import { DiagnosticCategory } from "typescript";

const log = createPrinter("typecheck");

export const commandInfo = makeCommandInfo(
  "typecheck",
  "typecheck typescript code files that are not part of tshy build",
  {
    paths: {
      kind: "string",
      description:
        "comma-separated relative path patterns of additional files not included in tsconfig.json to check for compilation errors. Examples: '--paths samples-dev/**/*.ts,test/**/*.ts'.",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  log.info(`type-checking...`);
  const { path: projPath } = await resolveProject(process.cwd());

  const project = new Project({
    tsConfigFilePath: path.join(projPath, "tsconfig.json"),
  });

  if (options.paths) {
    const patterns = options.paths.split(",");
    for (const pattern of patterns) {
      const fullPaths = `${projPath}/${pattern}`;
      log.info(`  adding additional files at ${fullPaths}`);
      project.addSourceFilesAtPaths(fullPaths);
    }
  }

  const diagnostics = project.getPreEmitDiagnostics();
  const hasError = diagnostics.some((d) => d.getCategory() === DiagnosticCategory.Error);
  if (hasError) {
    log.error(
      project.formatDiagnosticsWithColorAndContext(
        diagnostics.filter((d) => d.getCategory() === DiagnosticCategory.Error),
      ),
    );
  }
  return !hasError;
});
