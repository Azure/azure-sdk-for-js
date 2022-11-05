// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import { getRootAndProjectPaths } from "./relativePathCalculator";
import path from "path";
import https, { Agent } from "https";

let _agent: Agent | undefined;

export function getCertOptions(): https.AgentOptions {
  const list = (process.env.NODE_EXTRA_CA_CERTS || "dotnet-devcert.crt,dotnet-devcert.pfx").split(
    ","
  );
  const additionalCerts = list.map((extraCert) =>
    // Cerificates Path
    fs.readFileSync(
      path.join(getRootAndProjectPaths().rootPath, "eng/common/testproxy", extraCert),
      "utf-8"
    )
  );
  return {
    ca: additionalCerts,
  };
}

export function getHttpsAgent() {
  if (!_agent) _agent = new Agent({ ca: getCertOptions().ca });
  return _agent;
}
