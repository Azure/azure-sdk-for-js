import { runSinglePass } from "./src/runner.ts";

async function main() {
  const packageDir = "/home/dealmaha/py2/sdk/ml/azure-ai-ml";
  const activate = ". /tmp/aml-cov/bin/activate";

  const result = await runSinglePass({
    packageDir,
    skipMeasureIfCached: true,
    config: {
      runner: {
        command: `${activate} && python -m pytest tests/*/unittests/ --cov=azure.ai.ml --cov-branch --cov-report=json:coverage.json --ignore=tests/dsl/unittests/test_dsl_fl.py --ignore=tests/pipeline_job/unittests/test_private_preview_disabled.py -q --timeout=120`,
        coveragePath: "coverage.json",
        coverageFormat: "coveragepy",
        runSingle: `${activate} && python -m pytest $FILE -x -q --timeout=60 -W ignore --tb=short`,
        coverageDbPath: ".coverage",
        timeout: 3_600_000,
        testOutputPatterns: [
          { pattern: /^\s*(>|E)\s+/, label: "pytest marker" },
          { pattern: /FAILED\s+.*::/, label: "pytest FAILED" },
          { pattern: /short test summary/i, label: "pytest summary" },
        ],
        placeholderPattern: /pytest\.skip\(.*(placeholder|replace)/i,
        unitTestMockInstructions: "You MAY use mocking (unittest.mock, MagicMock, monkeypatch) for these tests ONLY.",
      },
      paths: {
        testDir: "tests",
        sourcePrefix: "azure/ai/ml/",
        sourceExclusions: [
          "_restclient", "_vendor", "_generated", "__pycache__", ".pyc",
          "_autogen_entities", "_arm_deployments",
          "identity/"
        ],
        testExtensions: [".py"],
        specSuffix: ".py",
        specExclusions: ["__pycache__", "conftest", "live", "e2etests", "recordings"],
      },
      language: {
        testFramework: "pytest",
        outputExtension: ".py",
      },
      llm: {
        model: "gpt-5-mini",
      },
      loop: {
        maxGapFiles: 20,
        gapBatchSize: 10,
        fixMaxIterations: 5,
        maxBatchesPerFile: 5,
      },
    },
    onProgress: console.log,
  });

  console.log(`\n━━━ Final Results ━━━`);
  console.log(`Coverage: ${result.initialBranchCoverage?.toFixed(1)}% → ${result.finalBranchCoverage?.toFixed(1)}%`);
  console.log(`Generated: ${result.generatedFiles?.length ?? 0} files`);
  console.log(`LLM calls: ${result.llmCalls ?? "N/A"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
