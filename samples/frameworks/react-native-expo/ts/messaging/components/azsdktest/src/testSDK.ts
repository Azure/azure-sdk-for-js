// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { main as ehReceiveEvents } from "./ehReceiveEvents";
import { main as ehSendEvents } from "./ehSendEvents";
import { main as sbReceiveMessages } from "./sbReceiveMessages";
import { main as sbSendMessages } from "./sbSendMessages";

export async function testSDK(selectedId: string) {
  switch (selectedId) {
    case "sb-send-msgs":
      await sbSendMessages();
      break;
    case "eh-send-msgs":
      await ehSendEvents();
      break;
    case "sb-receive-msgs":
      await sbReceiveMessages();
      break;
    case "eh-receive-msgs":
      await ehReceiveEvents();
      break;
  }
}
