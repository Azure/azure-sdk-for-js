// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { NotificationHubsClientContext, createClientContext } from "../../../src/api/index.js";
import { isBrowser } from "@azure/core-util";

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
  await recorder.start(recorderOptions);
  if (isBrowser) {
    // there are timestamps in the body, so do not match body
    await recorder.setMatcher("BodilessMatcher");
    await recorder.addSanitizers(
      {
        // looks like the registration id is dynamic, redacting it instead
        generalSanitizers: [
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
  }

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
