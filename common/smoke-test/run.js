// Runs smoke tests from manifest
async function main() {
  // Read manifest
  const manifest = require("./run-manifest.json");

  let exitCode = 0;
  let samplesToExecute = [];
  let failures = [];

  // Bring all samples and includes into memory
  for (let entry of manifest) {
    for (let targetSample of entry.targetSamples) {
      const sampleModule = require(`../../${entry.path}/${targetSample}`);
      samplesToExecute.push({
        entrypoint: sampleModule.main,
        name: entry.name,
        sampleFile: targetSample,
      });
    }
  }

  // Run all samples
  for (let sample of samplesToExecute) {
    let result = await executeSample(sample);

    if (!result.success) {
      exitCode = 1;
      failures.push({
        sample,
        result,
      });
    }
  }

  console.log("SMOKE TEST FAILURES");
  if (failures.length > 0) {
    for (let failure of failures) {
      console.error(
        `Test Failed: ${failure.sample.name}\nException: ${failure.exception}`
      );
    }
  }

  // TODO: Don't do it this way if possible?
  process.exit(exitCode);
}

async function executeSample(sample) {
  console.log("============== SMOKE TESTS ==============");
  console.log(`Sample Name: ${sample.name}`);
  console.log(`Sample File: ${sample.sampleFile}`);

  let result = {
    success: true,
  };

  try {
    await sample.entrypoint();
  } catch (exception) {
    console.log("FAILURE");
    result = {
      success: false,
      exception,
    };
  }

  console.log("=========================================");

  return result;
}

// If command line parameter `--devops-logging` is set, then have console.error
// logs error messages.
if (process.argv[2] == "--devops-logging") {
  const oldConsoleError = console.error;
  console.error = function() {
    // Mutate arguments to use new warning format
    arguments[0] = `##vso[task.logissue type=error]${arguments[0]}`;
    oldConsoleError.call(this, ...arguments);
  };
}

main().catch((err) => {
  console.log("[smoke-tests] Error:", err);
  process.exit(1);
});
