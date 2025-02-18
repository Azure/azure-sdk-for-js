// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import net from "node:net";

export function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(() => resolve(port));
    });
    server.on("error", (err) => reject(err));
  });
}
