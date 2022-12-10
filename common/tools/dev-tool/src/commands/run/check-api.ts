import { leafCommand, makeCommandInfo } from "../../framework/command";

import tsMin from "@_ts/min";
import tsMax from "@_ts/max";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import path from "path";
import semver from "semver";
import micromatch from "micromatch";

export const commandInfo = makeCommandInfo(
  "check-api",
  "ensure API features are compatible with minimum supported TypeScript version",
  {}
);

const log = createPrinter("check-api");

// The following two subroutines have to be duplicated because the namespace of the TypeScript API is nearly impossible
// to calculate intersections, unions, etc. of. It's much easier in this case to just duplicate the code.

function testTsMax(filePaths: string[]): boolean {
  const options: tsMax.CompilerOptions = {
    moduleResolution: tsMax.ModuleResolutionKind.NodeJs,
    noEmit: true,
  };

  const host = tsMax.createCompilerHost(options);

  const program = tsMax.createProgram({
    rootNames: filePaths,
    host,
    options,
  });

  const diagnostics: tsMax.Diagnostic[] = [
    ...program.getGlobalDiagnostics(),
    ...program.getOptionsDiagnostics(),
    ...program.getSemanticDiagnostics(),
    ...program.getSyntacticDiagnostics(),
    ...program.getDeclarationDiagnostics(),
    ...program.getConfigFileParsingDiagnostics(),
  ];

  if (diagnostics.length > 0) {
    console.log(tsMax.formatDiagnosticsWithColorAndContext(diagnostics, host));
  }

  const hadError = diagnostics.some(
    (d) =>
      d.category == tsMax.DiagnosticCategory.Warning ||
      d.category === tsMax.DiagnosticCategory.Error
  );

  return !hadError;
}

function testTsMin(filePaths: string[]): boolean {
  const options: tsMin.CompilerOptions = {
    moduleResolution: tsMin.ModuleResolutionKind.NodeJs,
    noEmit: true,
  };

  const host = tsMin.createCompilerHost(options);

  const program = tsMin.createProgram({
    rootNames: filePaths,
    host,
    options,
  });

  const diagnostics: tsMin.Diagnostic[] = [
    ...program.getGlobalDiagnostics(),
    ...program.getOptionsDiagnostics(),
    ...program.getSemanticDiagnostics(),
    ...program.getSyntacticDiagnostics(),
    ...program.getDeclarationDiagnostics(),
    ...program.getConfigFileParsingDiagnostics(),
  ];

  if (diagnostics.length > 0) {
    console.log(tsMin.formatDiagnosticsWithColorAndContext(diagnostics, host));
  }

  const hadError = diagnostics.some(
    (d) =>
      d.category == tsMin.DiagnosticCategory.Warning ||
      d.category === tsMin.DiagnosticCategory.Error
  );

  return !hadError;
}

export default leafCommand(commandInfo, async () => {
  const projectInfo = await resolveProject(process.cwd());

  const defaultTypesFile = path.relative(
    process.cwd(),
    path.resolve(process.cwd(), projectInfo.packageJson.types)
  );

  console.log(defaultTypesFile);

  log.info("Testing TypeScript minimum version:", tsMin.version);
  const minResult = testTsMin(resolveTypes(tsMin.version, defaultTypesFile));
  if (minResult) {
    log.success(`TypeScript ${tsMin.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMin.version} FAILED. See diagnostics above.`);
  }

  log.info("Testing TypeScript maximum version:", tsMax.version);
  const maxResult = testTsMax(resolveTypes(tsMax.version, defaultTypesFile));
  if (maxResult) {
    log.success(`TypeScript ${tsMax.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMax.version} FAILED. See diagnostics above.`);
  }

  return minResult && maxResult;

  function resolveTypes(tsVersion: string, fileName: string): string[] {
    if (!projectInfo.packageJson.typesVersions) return [fileName];

    const firstMatchingVersion = Object.entries(projectInfo.packageJson.typesVersions!).find(
      ([v]) => semver.satisfies(tsVersion, v)
    );

    if (firstMatchingVersion === undefined) {
      log.info(`Package's 'typesVersions' did not match TypeScript version ${tsVersion}.`);
      log.info("Resolved types file:", fileName);
      return [fileName];
    }

    const [matchingSelector, versions] = firstMatchingVersion;

    const resultFiles = Object.entries(versions)
      .map(([pattern, entries]) => matchAndExpandMapping(fileName, pattern, entries))
      .find((results) => results !== null) as string[] | undefined;

    if (resultFiles === undefined) {
      log.warn(
        `Package's 'typesVersions' entry "${matchingSelector}" matched TypeScript version ${tsVersion},`,
        `but no pattern in this entry matched the file: ${fileName}`
      );
      log.info("Resolved types file:", fileName);
      return [fileName];
    }

    log.info(`Resolved file names: ${resultFiles.join(", ")}`);
    return resultFiles.map((resultFile) =>
      path.relative(process.cwd(), path.resolve(process.cwd(), resultFile))
    );
  }
});

function matchAndExpandMapping(
  candidate: string,
  pattern: string,
  results: string[]
): string[] | null {
  const patternSlug = pattern.split("*");

  let processed = candidate;
  const substitutionGroups: string[] = [];

  if (patternSlug.length === 1) {
    // Special case
    if (patternSlug[0] === processed) return results;

    return null;
  }

  if (!processed.startsWith(patternSlug[0])) return null;

  processed = processed.replace(patternSlug[0], "");

  for (const item of patternSlug.slice(1)) {
    const startIdx = item === "" ? processed.length : processed.indexOf(item);

    if (startIdx === -1) return null;

    const matchValue = processed.slice(0, startIdx);
    substitutionGroups.push(matchValue);

    processed = processed.slice(startIdx).replace(item, "");
  }

  return results.map((fn) => {
    for (const group of substitutionGroups) {
      fn = fn.replace("*", group);
    }

    return fn;
  });
}
