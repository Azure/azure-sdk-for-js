import { MultiRegionWriteScenario } from "./MultiRegionWriteScenario";

// tslint:disable:no-console
async function run() {
  const scenarios = new MultiRegionWriteScenario();
  await scenarios.init();

  await scenarios.runBasic();
  await scenarios.runManualConflict();
  await scenarios.runLWW();
  await scenarios.runUDP();
}

run()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    console.log("Complete!");
    process.exit(0);
  });
