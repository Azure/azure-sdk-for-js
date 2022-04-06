const fs = require("fs");

// Runs smoke tests from manifest
async function main() {
  // Read manifest
  const manifest = require("./run-manifest.json");

  const samplesToExecute = [];
  const failures = [];

  // Bring all samples and includes into memory
  for (const entry of manifest) {
    console.log(`Gathering samples for ${entry.Name}...`);

    // Read configuration from package.json's //sampleConfiguration field
    const packageJson = require(`${entry.PackageDirectory}/package.json`);
    const smokeTestConfig = packageJson["//sampleConfiguration"] || {};

    if (smokeTestConfig.skipFolder) {
      continue;
    }

    const skipFiles = smokeTestConfig.skip || [];
    const jsFiles = fs
      .readdirSync(entry.SamplesDirectory)
      .filter((name) => name.endsWith(".js"))
      .filter((name) => !skipFiles.includes(name));

    for (const targetSample of jsFiles) {
      samplesToExecute.push({
        name: entry.Name,
        sampleFile: targetSample,
        directory: entry.SamplesDirectory,
      });
    }
  }

  // Run all samples
  for (const sample of samplesToExecute) {
    const result = await executeSample(sample);

    if (!result.success) {
      failures.push({
        sample,
        result,
      });
    }
  }

  if (failures.length > 0) {
    console.log("SMOKE TEST FAILURES");
    for (const failure of failures) {
      console.error(
        `Test Failed - Package: ${failure.sample.name} - Sample File:${failure.sample.sampleFile}`
      );
      console.log(`Exception: ${failure.result.exception}`);
      console.log(failure);
    }
    process.exit(1);
  }

  // TODO: Don't do it this way if possible?
  process.exit();
}

async function executeSample(sample) {
  const { name, sampleFile, directory } = sample;
  console.log("============== SMOKE TESTS ==============");
  console.log(`  Sample Name: ${name}`);
  console.log(`  Sample File: ${sampleFile}`);

  const currentDir = process.cwd();

  try {
    // Set the process directory to the sample's directory because some samples
    // use file paths relative to the sample's directory.
    process.chdir(directory);
    const entryPoint = require(`${directory}/${sampleFile}`).main;
    await entryPoint();
  } catch (exception) {
    console.log("  FAILURE");
    return {
      success: false,
      exception,
    };
  } finally {
    // Reset the working directory to the root directory after execution
    process.chdir(currentDir);
  }

  console.log("=========================================");

  return { success: true };
}

// If command line parameter `--devops-logging` is set, then have console.error
// logs error messages.
if (process.argv[2] == "--devops-logging") {
  const oldConsoleError = console.error;
  console.error = function () {
    // Mutate arguments to use new warning format
    arguments[0] = `##vso[task.logissue type=error]${arguments[0]}`;
    oldConsoleError.call(this, ...arguments);
  };
}

main().catch((err) => {
  console.log("[smoke-tests] Error:", err);
  process.exit(1);
});
