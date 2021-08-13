// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { MultiRegionWriteScenario } from "./MultiRegionWriteScenario";

async function run(): Promise<void> {
  const scenarios = new MultiRegionWriteScenario();
  await scenarios.init();

  await scenarios.runBasic();
  await scenarios.runManualConflict();
  await scenarios.runLWW();
  await scenarios.runUDP();
}

run() // eslint-disable-line promise/catch-or-return
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    console.log("Complete!");
    return;
  });
