// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "@azure/ai-projects";
import {
  createLiveE2EObservation,
  exerciseLiveE2E,
  liveE2ETimeouts,
  recordLiveE2EFailure,
  requireLiveE2E,
} from "../e2eTypes.js";
import type { BrowserLiveE2EInput, LiveE2EObservation } from "../e2eTypes.js";

let observation: LiveE2EObservation | undefined;

export function snapshot(): LiveE2EObservation | undefined {
  return observation;
}

export async function run(input: BrowserLiveE2EInput): Promise<LiveE2EObservation> {
  const current = createLiveE2EObservation("chromium", input.flow);
  observation = current;
  try {
    const nativeWebSocket: unknown = Reflect.get(globalThis, "WebSocket");
    current.diagnostics.nativeBrowserWebSocket =
      typeof nativeWebSocket === "function" &&
      Function.prototype.toString.call(nativeWebSocket).includes("[native code]");
    requireLiveE2E(
      current.diagnostics.nativeBrowserWebSocket,
      "non_native_browser_websocket",
      "browser-transport",
    );
    const project = new AIProjectClient(
      input.endpoint,
      {
        getToken: async () => ({
          token: input.token,
          expiresOnTimestamp: input.expiresOnTimestamp,
        }),
      },
      {
        liveOptions: {
          credentialScopes: ["https://ai.azure.com/.default"],
          connectionTimeoutInMs: liveE2ETimeouts.connection,
          sessionTimeoutInMs: liveE2ETimeouts.session,
          closeTimeoutInMs: liveE2ETimeouts.close,
        },
      },
    );
    current.diagnostics.stage = "browser-connect";
    const connection = await project.beta.voiceAgents.live.connect(input.agentName, {
      store: false,
    });
    current.diagnostics.browserSocketOpened = 1;
    await exerciseLiveE2E(connection, input.flow, new Uint8Array(input.pcm), current);
  } catch (error) {
    // Never let Playwright serialize an exception containing the credential-bearing handshake.
    recordLiveE2EFailure(current, error);
  }
  return current;
}
