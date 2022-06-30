// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { TrunkStatus } from "../../../src/models";

export function getTrunkStatus(): TrunkStatus {
  return isPlaybackMode() ? defaultTrunkStatus() : trunkStatusEnvironment();
}

function defaultTrunkStatus(): TrunkStatus {
  return {
    fqdn: "testfqdn.test.com",
    tls: "OK",
    ping: "OK",
    trunkOverallStatus: "Active",
    lastUpdateTime: new Date("2022-06-17T13:59:44+02:00"),
  };
}

function trunkStatusEnvironment(): TrunkStatus {
  return {
    fqdn: env.AZURE_TRUNK_STATUS_FQDN,
    tls: env.AZURE_TRUNK_STATUS_TLS,
    ping: env.AZURE_TRUNK_STATUS_PING,
    trunkOverallStatus: env.AZURE_TRUNK_STATUS_OVERALL,
    lastUpdateTime: env.AZURE_TRUNK_STATUS_LAST_UPDATE_TIME,
  };
}
