import { leafCommand, makeCommandInfo } from "../../framework/command";

import tsMin from "@_ts/min";
import tsMax from "@_ts/max";
import { createPrinter } from "../../util/printer";

export const commandInfo = makeCommandInfo(
  "check-api",
  "ensure API features are compatible with minimum supported TypeScript version",
  {}
);

const log = createPrinter("check-api");

// The following two subroutines have to be duplicated because the namespace of the TypeScript API is nearly impossible
// to calculate intersections, unions, etc. of. It's much easier in this case to just duplicate the code.

function testTsMax(): boolean {
  const options: tsMax.CompilerOptions = {
    moduleResolution: tsMax.ModuleResolutionKind.NodeJs,
    noEmit: true,
  };

  const host = tsMax.createCompilerHost(options);

  const program = tsMax.createProgram({
    rootNames: ["./my.d.ts"],
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

function testTsMin(): boolean {
  const options: tsMin.CompilerOptions = {
    moduleResolution: tsMin.ModuleResolutionKind.NodeJs,
    noEmit: true,
  };

  const host = tsMin.createCompilerHost(options);

  const program = tsMin.createProgram({
    rootNames: ["./my.d.ts"],
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
  log.info("Testing TypeScript minimum version:", tsMin.version);
  const minResult = testTsMin();
  if (minResult) {
    log.success(`TypeScript ${tsMin.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMin.version} FAILED. See diagnostics above.`);
  }

  log.info("Testing TypeScript maximum version:", tsMin.version);
  const maxResult = testTsMax();
  if (maxResult) {
    log.success(`TypeScript ${tsMax.version} OK.`);
  } else {
    log.error(`TypeScript ${tsMax.version} FAILED. See diagnostics above.`);
  }

  return minResult && maxResult;
});
