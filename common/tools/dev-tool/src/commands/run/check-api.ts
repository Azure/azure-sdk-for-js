// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import tsMin from "@_ts/min";
import tsMax from "@_ts/max";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import path from "node:path";
import semver from "semver";

export const commandInfo = makeCommandInfo(
  "check-api",
  "ensure API features are compatible with minimum supported TypeScript version",
  {},
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
      d.category === tsMax.DiagnosticCategory.Error,
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
    // No special logging here, just dump the diagnostics to the console as they are already formatted.
    console.log(tsMin.formatDiagnosticsWithColorAndContext(diagnostics, host));
  }

  const hadError = diagnostics.some(
    (d) =>
      d.category == tsMin.DiagnosticCategory.Warning ||
      d.category === tsMin.DiagnosticCategory.Error,
  );

  return !hadError;
}

export default leafCommand(commandInfo, async () => {
  const projectInfo = await resolveProject(process.cwd());

  const defaultTypesFile = path.relative(
    process.cwd(),
    path.resolve(process.cwd(), projectInfo.packageJson.types),
  );

  log.info("Testing TypeScript minimum version:", tsMin.version);
  const minResult = testTsMin(resolveTypes(tsMin.version));
  if (minResult) {
    log.success(`TypeScript ${tsMin.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMin.version} FAILED. See diagnostics above.`);
  }

  log.info("Testing TypeScript maximum version:", tsMax.version);
  const maxResult = testTsMax(resolveTypes(tsMax.version));
  if (maxResult) {
    log.success(`TypeScript ${tsMax.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMax.version} FAILED. See diagnostics above.`);
  }

  return minResult && maxResult;

  // Inline helper function to pick a types file for a given version of TypeScript
  function resolveTypes(tsVersion: string): string[] {
    // No typesVersions
    if (!projectInfo.packageJson.typesVersions) return [defaultTypesFile];

    // Look for an entry with a key that our version of TS satisfies
    const firstMatchingVersion = Object.entries(projectInfo.packageJson.typesVersions).find(([v]) =>
      semver.satisfies(tsVersion, v),
    );

    if (firstMatchingVersion === undefined) {
      log.info(`Package's 'typesVersions' did not match TypeScript version ${tsVersion}.`);
      log.info("Resolved types file:", defaultTypesFile);
      return [defaultTypesFile];
    }

    const [matchingSelector, versions] = firstMatchingVersion;

    // Now try to match and expand the matching typesVersions mapping using the default file as an input, then pick the
    // first one that actually matched.
    const resultFiles = Object.entries(versions)
      .map(([pattern, entries]) => matchAndExpandMapping(defaultTypesFile, pattern, entries))
      .find((results) => results !== null) as string[] | undefined;

    if (resultFiles === undefined) {
      log.warn(
        `Package's 'typesVersions' entry "${matchingSelector}" matched TypeScript version ${tsVersion},`,
        `but no pattern in this entry matched the file: ${defaultTypesFile}`,
      );
      log.info("Resolved types file:", defaultTypesFile);
      return [defaultTypesFile];
    }

    log.info(`Resolved file names: ${resultFiles.join(", ")}`);
    return resultFiles.map((resultFile) =>
      path.relative(process.cwd(), path.resolve(process.cwd(), resultFile)),
    );
  }
});

/**
 * Implements a best-effort matching and expansion of `typesVersions` from package.json.
 *
 * This implementation may not be exactly correct, but it's close to what the TypeScript compiler does and definitely
 * works for basic typesVersions entries like what we use in the Azure SDK for JavaScript.
 *
 * This is similar to a very basic implementation of regular expression capture groups, and an alternative could be to
 * translate the typesVersions patterns into regular expressions with capture groups.
 *
 * @param candidate - the string to match the mapping against (i.e. the types file the downstream package tried to load)
 * @param pattern - the typesVersions pattern, a key in the typesVersions map for a particular version selector
 * @param targets - the typesVersions values for a particular version selector, which will have their asterisks replaced
 * @returns null if the candidate does not match the pattern, otherwise the `targets` with asterisks substituted for
 *          sequential match groups in the candidate
 */
function matchAndExpandMapping(
  candidate: string,
  pattern: string,
  targets: string[],
): string[] | null {
  // The basic structure of this algorithm is to split the input pattern by "*", then sequentially remove each split
  // fragment from the candidate. The parts that aren't matched by split fragments in the candidate are then stored
  // in an array as substitution values to be used later when processing the results.
  const patternGroups = pattern.split("*");

  let remainder = candidate;
  const substitutionGroups: string[] = [];

  // Special case, no "*" in pattern and nothing to expand.
  if (patternGroups.length === 1) {
    // The pattern matches the candidate exactly
    if (patternGroups[0] === remainder) return targets;

    // Doesn't match, so no results.
    return null;
  }

  // We need to bootstrap the algorithm by checking the first entry. We special-cased length = 1 above so we know there
  // is at least one fragment.

  // Bootstrapping is required because the pattern has odd parity. The interpretation of the pattern is an array of
  // strings that must match exactly interspersed by capture groups. This will always be an odd number of total
  // elements. We either need to special-case the first element and then iteratively handle capture groups then
  // elements or special case the last element and iteratively handle elements then capture groups. I've chosen to do
  // the former because it seems more straightforward for the basic case of a single element.

  // If there was a prefix, remove it from the remainder and consider it "matched". The loop below starts with
  if (!remainder.startsWith(patternGroups[0])) return null;
  remainder = remainder.replace(patternGroups[0], "");

  for (const item of patternGroups.slice(1)) {
    // Find the location of the pattern fragment in the remainder. If it isn't found (-1), the pattern doesn't match.
    const startIdx = item === "" ? remainder.length : remainder.indexOf(item);
    if (startIdx === -1) return null;

    // If we found a match for the pattern fragment, we use its index to slice the substitution group out. The
    // substitution value appears _before_ the pattern fragment does. Wherever the fragment appears, the text that
    // appears in front of it is the substitution value.
    const matchValue = remainder.slice(0, startIdx);
    substitutionGroups.push(matchValue);

    // Finally, get rid of the substitution group (slice from the pattern fragment index) and remove the pattern
    // fragment itself (replace it with an empty string).
    remainder = remainder.slice(startIdx).replace(item, "");
  }

  // Now that we have the substitutionGroups, substituting them into the targets is easy. We won't account for malformed
  // entries here. We'll just iteratively replace asterisks in the name with substitution groups. By this point we are
  // done checking for a match, so we just return the result value. The function is infallible from here.
  return targets.map((fn) => {
    for (const group of substitutionGroups) {
      fn = fn.replace("*", group);
    }

    return fn;
  });
}
