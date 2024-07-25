// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { main as sendMessages } from "./sbSendMessages";
import { main as sendEvents } from "./ehSendEvents";
import { main as sbReceiveMessages } from "./sbReceiveMessages";
import { main as ehReceiveEvents } from "./ehReceiveEvents";

export async function testSDK(selectedId: string) {
  switch (selectedId) {
    case "sb-send-msgs":
      await sendMessages();
      break;
    case "eh-send-msgs":
      await sendEvents();
      break;
    case "sb-receive-msgs":
      await sbReceiveMessages();
      break;
    case "eh-receive-msgs":
      await ehReceiveEvents();
      break;
    default:
      console.warn("Please select a scenario");
      break;
  }
}
