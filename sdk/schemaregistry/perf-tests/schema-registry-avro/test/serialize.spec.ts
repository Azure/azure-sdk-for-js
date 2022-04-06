// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroSerializerTest } from "./avroSerializerTest.spec";
import { PerfOptionDictionary } from "@azure/test-utils-perf";

interface SerializePerfTestOptions {
  "items-count": number;
}

export class SerializeTest extends AvroSerializerTest<SerializePerfTestOptions> {
  options: PerfOptionDictionary<SerializePerfTestOptions> = {
    "items-count": {
      required: false,
      description: "Number of array items",
      shortName: "n",
      longName: "items-count",
      defaultValue: 1000,
    },
  };
  array: number[];

  constructor() {
    super();
    this.options = this.parsedOptions;
    this.array = [...Array(this.options["items-count"].value).keys()];
  }

  async run(): Promise<void> {
    await this.serializer.serialize(
      {
        name: "test",
        favoriteNumbers: this.array,
      },
      AvroSerializerTest.schema
    );
  }
}
