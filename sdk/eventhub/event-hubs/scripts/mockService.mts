// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MockEventHub, MockServerOptions } from "@azure/mock-hub";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { EVENTHUB_CONSUMER_GROUP_NAME, EVENTHUB_NAME } from "../test/utils/constants.js";

export function createMockServer(options: MockServerOptions = {}): MockEventHub {
  return new MockEventHub({
    name: EVENTHUB_NAME,
    consumerGroups: [EVENTHUB_CONSUMER_GROUP_NAME],
    partitionCount: 4,
    connectionInactivityTimeoutInMs: 300000, // 5 minutes
    port: 5671,
    tlsOptions: {
      cert: readFileSync(resolvePath(process.cwd(), "certs", "my-server.crt.pem")),
      key: readFileSync(resolvePath(process.cwd(), "certs", "my-server.key.pem")),
    },
    ...options,
  });
}

const server = createMockServer();
await server.start();
