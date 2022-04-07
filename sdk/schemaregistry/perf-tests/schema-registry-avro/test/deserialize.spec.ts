// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroSerializerTest } from "./avroSerializerTest.spec";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MessageContent } from "@azure/schema-registry-avro";

interface SerializePerfTestOptions {
  "items-count": number;
}

export class DeserializeTest extends AvroSerializerTest<SerializePerfTestOptions> {
  options: PerfOptionDictionary<SerializePerfTestOptions> = {
    "items-count": {
      required: false,
      description: "Number of array items",
      shortName: "n",
      longName: "items-count",
      defaultValue: 1000,
    },
  };
  private serialized: MessageContent | undefined;

  constructor() {
    super();
    this.options = this.parsedOptions;
  }

  async setup(): Promise<void> {
    this.serialized = await this.serializer.serialize(
      {
        name: "test",
        favoriteNumbers: [...Array(this.options["items-count"].value).keys()],
      },
      AvroSerializerTest.schema
    );
  }

  async run(): Promise<void> {
    await this.serializer.deserialize(this.serialized!);
  }
}
