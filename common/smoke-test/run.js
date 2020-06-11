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
        result
      });
    }
  }

  if (failures.length > 0) {
    for (let failure of failures) {
      console.log(`Test: ${failure.sample.name}`);
      console.log(`Exception: ${failure.exception}`)
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
    success: true
  };

  try {
    await sample.entrypoint();
  } catch (exception) {
    console.log("FAILURE");
    result = {
      success: false,
      exception
    };
  }

  console.log("=========================================");

  return result;

}

main().catch((err) => {
  console.log("[smoke-tests] Error:", err);
  process.exit(1);
});
