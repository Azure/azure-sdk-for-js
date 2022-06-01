// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { AvroSerializer } from "@azure/schema-registry-avro";
import { SchemaRegistryClient } from "@azure/schema-registry";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
import { DefaultAzureCredential } from "@azure/identity";
dotenv.config();

export abstract class AvroSerializerTest<TOptions> extends PerfTest<TOptions> {
  static schema = JSON.stringify({
    type: "record",
    name: "AvroPerf",
    namespace: "performance",
    fields: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "favoriteNumbers",
        type: {
          type: "array",
          items: "int",
        },
      },
    ],
  });

  client: SchemaRegistryClient;
  serializer: AvroSerializer;
  groupName: string;

  constructor() {
    super();

    const credential = new DefaultAzureCredential();

    const fullyQualifiedNamespace = getEnvVar("SCHEMA_REGISTRY_ENDPOINT");
    this.groupName = getEnvVar("SCHEMA_REGISTRY_GROUP");

    this.client = new SchemaRegistryClient(fullyQualifiedNamespace, credential);
    this.serializer = new AvroSerializer(this.client, {
      groupName: this.groupName,
    });
  }

  public async globalSetup(): Promise<void> {
    const schemaObject = JSON.parse(AvroSerializerTest.schema);
    await this.client.registerSchema({
      definition: AvroSerializerTest.schema,
      format: "Avro",
      groupName: this.groupName,
      name: `${schemaObject.namespace}.${schemaObject.name}`,
    });
  }
}
