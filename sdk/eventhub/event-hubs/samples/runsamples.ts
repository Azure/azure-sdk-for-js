// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as dotenv from "dotenv";

dotenv.config();

// don't have the samples execute - we'll run them manually in `main` below
process.env["DO_NOT_EXECUTE_SAMPLE"] = "1";

import { main as sendEventsMain } from "./sendEvents";
import { main as receiveEventsMain } from "./receiveEvents";
import { main as receiveEventsUsingCheckpointStoreMain } from "./receiveEventsUsingCheckpointStore";
import { main as useWithIotHubMain } from "./useWithIotHub";
import { main as usingAadAuthMain } from "./usingAadAuth";
import { main as websocketsMain } from "./websockets";

async function main() {
  await sendEventsMain();
  await receiveEventsMain();
  await receiveEventsUsingCheckpointStoreMain();
  await useWithIotHubMain();
  await usingAadAuthMain();
  await websocketsMain();
}

main().catch(err => {
  console.log(err);
  process.exit(1);
})