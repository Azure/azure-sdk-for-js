// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import { getRootAndProjectPaths } from "./relativePathCalculator";
import path from "path";
import https from "https";

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
