import { runSinglePass } from "./src/runner.ts";
async function main() {
  const packageDir = "/home/dealmaha/py2/sdk/ml/azure-ai-ml";
  const activate = ". /tmp/aml-cov/bin/activate";
  let passed = 0, total = 0;
  await runSinglePass({
    packageDir,
    skipMeasureIfCached: true,
    skipFullSuiteValidation: true,
    config: {
      runner: {
        command: activate + " && python -m pytest tests/*/unittests/ --cov=azure.ai.ml --cov-branch --cov-report=json:coverage.json -q --timeout=120",
        coveragePath: "coverage.json",
        coverageFormat: "coveragepy",
        runSingle: activate + " && python -m pytest $FILE -x -q --timeout=60 -W ignore --tb=short",
        coverageDbPath: ".coverage",
        timeout: 3_600_000,
      },
      paths: {
        testDir: "tests",
        sourcePrefix: "azure/ai/ml/",
        sourceExclusions: ["_restclient", "_vendor", "_generated", "__pycache__", ".pyc", "_autogen_entities", "_arm_deployments", "identity/"],
        testExtensions: [".py"],
        specSuffix: ".py",
        specExclusions: ["__pycache__", "conftest", "live", "e2etests", "recordings"],
      },
      language: { testFramework: "pytest", outputExtension: ".py" },
      llm: { model: "gpt-5.1" },
      loop: { maxGapFiles: 1, gapBatchSize: 5, fixMaxIterations: 3, maxBatchesPerFile: 3 },
    },
    onProgress: console.log,
  });
  console.log(`\n🏁 RESULT: done`);
}
main().catch((err) => { console.error(err); process.exit(1); });
