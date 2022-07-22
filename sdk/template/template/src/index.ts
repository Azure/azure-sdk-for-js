// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./configurationClient.js";

import { AppleInstallation } from "@azure/notification-hubs/models/installation";

const x: AppleInstallation = {
  platform: "apns",
  pushChannel: "abc",
  installationId: "abc",
};

console.log(x);
