// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { main as sbReceiveMessages } from "./sbReceiveMessages";
import { main as sendMessages } from "./sbSendMessages";

export async function testSDK(selectedId: string) {
  switch (selectedId) {
    case "sb-send-msgs":
      await sendMessages();
      break;
    case "eh-send-msgs":
      //await sendEvents();
      break;
    case "sb-receive-msgs":
      await sbReceiveMessages();
      break;
    case "eh-receive-msgs":
      //await ehReceiveEvents();
      break;
  }
}
