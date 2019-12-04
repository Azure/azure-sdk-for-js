import * as dotenv from "dotenv";
dotenv.config();

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