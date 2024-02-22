// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MockEventHub, MockServerOptions } from "../../src";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";

export function createMockServer(options: MockServerOptions = {}): MockEventHub {
  const { EVENTHUB_NAME } = getEnvVars();
  return new MockEventHub({
    name: EVENTHUB_NAME,
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

// Updated code block
export function getEnvVars(): { EVENTHUB_CONNECTION_STRING: string, EVENTHUB_NAME: string } {
  return {
    EVENTHUB_CONNECTION_STRING: `Endpoint=sb://localhost/;SharedAccessKeyName=Foo;SharedAccessKey=Bar`,
    EVENTHUB_NAME: "mock-hub"
  };
}
