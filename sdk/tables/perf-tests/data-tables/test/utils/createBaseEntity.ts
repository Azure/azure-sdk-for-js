import {v4 as uuid} from "uuid"

export function createBaseEntity() {
    const dateProperty = new Date("1970-10-04T00:00:00+00:00");

    return {
      partitionKey: "simpleEntity",
      rowKey: uuid(),
      stringTypeProperty: "This is a string",
      datetimeTypeProperty: dateProperty,
      GuidTypeProperty: "c9da6455-213d-42c9-9a79-3e9149a57833",
      BinaryTypeProperty: new Uint8Array([66, 97, 114]),
      Int64TypeProperty: BigInt("4294967297"),
      DoubleTypeProperty: 1234.5,
      IntTypeProperty: 1234
    }
}