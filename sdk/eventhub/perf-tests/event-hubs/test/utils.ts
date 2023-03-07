// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MockEventHub, MockServerOptions } from "@azure/mock-hub";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { getEnvVar } from "@azure/test-utils-perf";

export function createMockServer(options: MockServerOptions = {}): MockEventHub {
  return new MockEventHub({
    name: getEnvVar("EVENTHUB_NAME"),
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
