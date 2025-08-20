// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { NotificationHubsClientContext } from "$internal/api/index.js";
import { createClientContext } from "$internal/api/index.js";
import { vi } from "vitest";

const replaceableVariables: { [k: string]: string } = {
  // Used in record and playback modes
  // 1. The key-value pairs will be used as the environment variables in playback mode
  // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
  NOTIFICATION_HUB_CONNECTION_STRING:
    "Endpoint=sb://azsdktestns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=foobarbaz=",
  NOTIFICATION_HUB_NAME: "hub_name",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    uriSanitizers: [
      {
        regex: true,
        target: `https://(.*).servicebus.windows.net`,
        value: "https://azsdktestns.servicebus.windows.net",
      },
    ],
  },
};

export async function createRecordedClientContext(
  recorder: Recorder,
): Promise<NotificationHubsClientContext> {
  // The following hardcoded timestamps are used to ensure deterministic playback in tests.
  // [0]: "2024-04-16T22:06:17.401Z" is used for API responses that include milliseconds in the timestamp.
  // [1]: "2024-04-16T22:06:17Z" is used for API responses that omit milliseconds.
  // These values were chosen arbitrarily and do not correspond to any specific event; they simply provide a fixed reference time for playback mode.
  const dummyTimeForPlayback = ["2024-04-16T22:06:17.401Z", "2024-04-16T22:06:17Z"];
  if (isPlaybackMode()) {
    // In playback mode, we need to set the system time to a fixed value to ensure consistent results
    // This is because the src code uses new Date().toISOString(), to set current time
    vi.useFakeTimers();
    vi.setSystemTime(new Date(dummyTimeForPlayback[0])); // for the first request that is made in the test
  }
  await recorder.start(recorderOptions);
  await recorder.addSanitizers(
    {
      headerSanitizers: [
        {
          key: "x-ms-azsdk-telemetry",
          value: "class=REDACTED",
        },
      ],
      bodySanitizers: [
        {
          // "Sanitizing the updated time in the response body",
          regex: true,
          target: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
          value: dummyTimeForPlayback[0],
        },
        {
          // "Sanitizing the updated time in the response body",
          regex: true,
          target: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z",
          value: dummyTimeForPlayback[1],
        },
      ],
      generalSanitizers: [
        // looks like the registration id is dynamic, redacting it instead
        {
          regex: true,
          target: "registrations/(?<secret>.*?)?api-version=",
          value: "registration-id-redacted",
          groupForReplace: "secret",
        },
      ],
    },
    ["record", "playback"],
  );

  if (!env.NOTIFICATION_HUB_CONNECTION_STRING || !env.NOTIFICATION_HUB_NAME) {
    throw new Error(
      "Notification Hub connection string and hub name must be specified. Make sure NOTIFICATION_HUB_CONNECTION_STRING and NOTIFICATION_HUB_NAME are defined",
    );
  }
  return createClientContext(
    env.NOTIFICATION_HUB_CONNECTION_STRING,
    env.NOTIFICATION_HUB_NAME,
    recorder.configureClientOptions({}),
  );
}
