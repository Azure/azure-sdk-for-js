// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict";

import * as fs from "fs";
import * as url from "url";
import * as localFetchers from "./localModelFetchers";
import * as remoteFetchers from "./remoteModelFetchers";

function isLocalPath(p: string): boolean {
  if (p.startsWith("https://") || p.startsWith("http://")) {
    return false;
  } else if (p.startsWith("file://")) {
    return true;
  } else {
    try {
      fs.accessSync(p);
      return true;
    } catch {
      return false;
    }
  }
}

export async function modelFetcher(
  dtmi: string,
  endpoint: string,
  resolveDependencies: boolean,
  tryFromExpanded: boolean
): Promise<{ [dtmi: string]: JSON | Array<JSON> }> {
  if (isLocalPath(endpoint)) {
    const formattedDirectory = endpoint.includes("file://")
      ? url.fileURLToPath(endpoint)
      : endpoint;
    if (tryFromExpanded || resolveDependencies) {
      return localFetchers.recursiveFetcher(dtmi, formattedDirectory, tryFromExpanded);
    } else {
      console.log(`Fetching: ${dtmi}`);
      return localFetchers.fetcher(dtmi, formattedDirectory, false);
    }
  } else {
    if (tryFromExpanded || resolveDependencies) {
      return remoteFetchers.recursiveFetcher(dtmi, endpoint, tryFromExpanded);
    }
    console.log(`Fetching: ${dtmi}`);
    return remoteFetchers.fetcher(dtmi, endpoint, false);
  }
}
