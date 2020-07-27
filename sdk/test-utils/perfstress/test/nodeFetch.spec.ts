// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "../src";

import fetch from "node-fetch";
import * as http from "http";

type OptionNames = "url";

export class NodeFetchTest extends PerfStressTest<string> {
  private static fetchOptions = {
    agent: new http.Agent({ keepAlive: true })
  };

  private url: string = "";

  public options: PerfStressOptionDictionary<OptionNames> = {
    url: {
      required: true,
      description: "Required option",
      shortName: "u"
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
