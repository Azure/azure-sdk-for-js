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

  private url: string = "";

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

  public setup() {
    this.url = this.options.url.value as string;
  }

  async runAsync(): Promise<void> {
    const response = await fetch(this.url, NodeFetchTest.fetchOptions);
    await response.text();
  }
}
