import { v4 as uuid } from "uuid";
import { TableEntity } from "@azure/data-tables";

const stringValue = "This is a string";
const dateProperty = new Date("1970-10-04T00:00:00+00:00");

export function createSimpleEntity(): TableEntity {
  return {
    partitionKey: "simpleEntity",
    rowKey: "03590009-4169-46ce-9e33-d011dbaf308c", //uuid(),
    stringTypeProperty1: stringValue,
    stringTypeProperty2: stringValue,
    stringTypeProperty3: stringValue,
    stringTypeProperty4: stringValue,
    stringTypeProperty5: stringValue,
    stringTypeProperty6: stringValue,
    stringTypeProperty7: stringValue
  };
}

export function createComplexEntity(): TableEntity {
  return {
    partitionKey: "complexEntity",
    rowKey: uuid(),
    stringTypeProperty: stringValue,
    datetimeTypeProperty: dateProperty,
    GuidTypeProperty: "c9da6455-213d-42c9-9a79-3e9149a57833",
    BinaryTypeProperty: new Uint8Array([66, 97, 114]),
    Int64TypeProperty: BigInt("4294967297"),
    DoubleTypeProperty: 1234.5,
    IntTypeProperty: 1234
  };
}
