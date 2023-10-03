// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as avro from "avsc/";
import { env } from "@azure-tools/test-recorder";
import { DateType } from "../../../src/logicalTypes";

export const testSchemaObject: avro.schema.RecordType = {
  type: "record",
  name: "AvroUser",
  namespace: "com.azure.schemaregistry.samples",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "favoriteNumber",
      type: "int",
    },
  ],
};

export const testGroup = env.SCHEMA_REGISTRY_GROUP || "azsdk_js_test_group";

export const testSchemaIds = [
  "{773E17BE-793E-40B0-98F1-0A6EA3C11895}",
  "{DC7EF290-CDB1-4245-8EE8-3DD52965866E}",
].map((x) => x.replace(/[{\-}]/g, ""));

export const testSchema = JSON.stringify(testSchemaObject);
export const testValue = { name: "Nick", favoriteNumber: 42 };
export const testAvroType = avro.Type.forSchema(testSchemaObject, { omitRecordMethods: true });
export const testDateSchemaObject: avro.schema.RecordType = {
  type: "record",
  name: "AvroUser",
  namespace: "com.azure.schemaregistry.samples",
  fields: [
    { name: "amount", type: "int" },
    { name: "time", type: { type: "long", logicalType: "timestamp-millis" } },
  ],
};
export const testDateSchema = JSON.stringify(testDateSchemaObject);
export const testTransaction = {
  amount: 32,
  time: new Date("Thu Nov 05 2015 11:38:05 GMT-0800 (PST)"),
};
export const testAvroDateType = avro.Type.forSchema(testDateSchemaObject, {
  omitRecordMethods: true,
  logicalTypes: { "timestamp-millis": DateType },
});
