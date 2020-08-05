// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MockEventHub } from "../src/services/eventHubs";

async function run() {
  const service = new MockEventHub({
    name: "mock-hub",
    partitionCount: 4,
    consumerGroups: ["foo"],
  });

  service.start({
    port: 5671,
  });
}

run();
