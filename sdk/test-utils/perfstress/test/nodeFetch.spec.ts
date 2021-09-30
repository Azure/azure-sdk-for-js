// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "../src";

import fetch from "node-fetch";
import * as http from "http";

interface NodeFetchOptions {
  url: string;
}

export class NodeFetchTest extends PerfStressTest<NodeFetchOptions> {
  private static fetchOptions = {
    agent: new http.Agent({ keepAlive: true })
  };

  public options: PerfStressOptionDictionary<NodeFetchOptions> = {
    url: {
      required: true,
      description: "Required option",
      shortName: "u",
      longName: "url",
      defaultValue: "http://www.example.org",
      value: "http://www.example.org"
    }
  };

  async runAsync(): Promise<void> {
    const response = await fetch(this.parsedOptions.url.value as string, NodeFetchTest.fetchOptions);
    await response.text();
  }
}
