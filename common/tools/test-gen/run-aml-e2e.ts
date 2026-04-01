import { runSinglePass, setVerboseLogPath } from "./src/runner.ts";
import { appendFileSync, writeFileSync } from "node:fs";

const PROGRESS_LOG = "/tmp/test-gen-progress.log";
const VERBOSE_LOG = "/tmp/test-gen-verbose.log";

function progressLog(msg: string) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try { appendFileSync(PROGRESS_LOG, line + "\n"); } catch {}
}

async function main() {
  writeFileSync(PROGRESS_LOG, `=== test-gen started ${new Date().toISOString()} ===\n`);
  setVerboseLogPath(VERBOSE_LOG);
  const packageDir = "/home/dealmaha/py2/sdk/ml/azure-ai-ml";
  const activate = ". /tmp/aml-cov/bin/activate && set -a && . /home/dealmaha/py2/sdk/ml/azure-ai-ml/.env && set +a && export AZURE_TEST_RUN_LIVE=true";

  const result = await runSinglePass({
    packageDir,
    skipFullSuiteValidation: true,
    config: {
      runner: {
        // Coverage from ALL tests in playback mode (no AZURE_TEST_RUN_LIVE) for speed
        command: `${activate} && unset AZURE_TEST_RUN_LIVE && python -m pytest tests/*/e2etests/ tests/*/unittests/ $(ls tests/test_*_gaps*.py 2>/dev/null) --cov=azure.ai.ml --cov-branch --cov-report=json:coverage.json -q --timeout=300 --ignore=tests/test_batch_deployment_operations_gaps_begin_create_or_update.py`,
        coveragePath: "coverage.json",
        coverageFormat: "coveragepy",
        runSingle: `${activate} && python -m pytest $FILE -x -q --timeout=600 -W ignore --tb=short`,
        coverageDbPath: ".coverage",
        timeout: 3_600_000,
        e2ePromptInstructions: [
          "## ⚠️ INTEGRATION TEST MODE — MANDATORY",
          "Tests MUST call real service endpoints. No mocking, stubbing, or faking of any kind.",
          "Do NOT construct internal objects directly — use the provided client fixture.",
          "Use the test base class and decorators shown in the existing test examples.",
          "Use the random-name fixture for unique resource names.",
        ].join("\n"),
        unitTestMockInstructions: "You MAY use mocking and stubbing for these tests ONLY.",
        publicApiHint: [
          "This file defines an operations class whose non-underscore methods are the public API.",
          "These methods are exposed on the service client as `client.<resource>.<method>()` (e.g., `client.models.create_or_update(...)`).",
          "ALL code inside these public methods is reachable — including branches, error handlers, validation, retry logic, and calls to private helpers.",
          "Private helpers (prefixed with `_`) called from public methods are also reachable through those callers.",
        ].join("\n"),
        finalCoverageCommand: [
          `${activate} &&`,
          // Run existing recorded tests in playback mode
          `unset AZURE_TEST_RUN_LIVE && python -m pytest tests/*/e2etests/ tests/*/unittests/ --cov=azure.ai.ml --cov-branch -q --timeout=300 --ignore=tests/test_batch_deployment_operations_gaps_begin_create_or_update.py ;`,
          // Run generated gap tests in live mode, appending coverage
          `export AZURE_TEST_RUN_LIVE=true && python -m pytest $(find tests -maxdepth 1 -name 'test_*_gaps*.py' 2>/dev/null) --cov=azure.ai.ml --cov-branch --cov-append -q --timeout=600 ;`,
          // Generate combined JSON report
          `coverage json -o coverage.json`,
        ].join(" "),
      },
      paths: {
        testDir: "tests",
        sourcePrefix: "azure/ai/ml/",
        sourceExclusions: [
          "_restclient", "_vendor", "_generated", "__pycache__", ".pyc",
          "_autogen_entities", "_arm_deployments",
          "identity/",
          "_run_history_constants",
          // Files that need hand-crafted tests (see HARD_TO_TEST_FILES.md)
          "_job_operations.py",
        ],
        // Target operations layer + MLClient (customization & public API)
        sourceInclusions: [
          "operations/",
          "_ml_client.py",
        ],
        testExtensions: [".py"],
        specSuffix: ".py",
        specExclusions: ["__pycache__", "conftest", "unittests", "recordings"],
        // All e2e test directories for style context
        testContextDirs: [
          "tests/model/e2etests",
          "tests/component/e2etests",
          "tests/dataset/e2etests",
          "tests/schedule/e2etests",
          "tests/batch_services/e2etests",
          "tests/job_common/e2etests",
          "tests/environment/e2etests",
          "tests/compute/e2etests",
          "tests/datastore/e2etests",
          "tests/online_services/e2etests",
          "tests/workspace/e2etests",
          "tests/connection/e2etests",
          "tests/code_asset/e2etests",
          "tests/index/e2etests",
        ],
        conftestPath: "/tmp/conftest-snippet.py",
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
        gapBatchSize: 5,
        fixMaxIterations: 5,
        maxBatchesPerFile: 5,
      },
    },
    onProgress: progressLog,
  });

  progressLog(`\n━━━ Final Results ━━━`);
  progressLog(`Coverage: ${result.initialBranchCoverage?.toFixed(1)}% → ${result.finalBranchCoverage?.toFixed(1)}%`);
  progressLog(`Generated: ${result.generatedFiles?.length ?? 0} files`);
  progressLog(`LLM calls: ${result.llmCalls ?? "N/A"}`);
}

main().catch((err) => {
  progressLog(`FATAL: ${err.message}\n${err.stack}`);
  console.error(err);
  process.exit(1);
});
