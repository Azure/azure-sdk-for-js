import { v4 as uuid } from "uuid";
import { TableEntity, TransactionAction } from "@azure/data-tables";

const stringValue = "This is a string";
const dateProperty = new Date("1970-10-04T00:00:00+00:00");

export function createSimpleEntity(): TableEntity {
  return {
    partitionKey: "simpleEntity",
    rowKey: uuid(),
    stringTypeProperty1: stringValue,
    stringTypeProperty2: stringValue,
    stringTypeProperty3: stringValue,
    stringTypeProperty4: stringValue,
    stringTypeProperty5: stringValue,
    stringTypeProperty6: stringValue,
    stringTypeProperty7: stringValue,
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
    IntTypeProperty: 1234,
  };
}

export type EntityType = "complex" | "simple";

export function createEntities(entityType: EntityType, entityCount = 1): TableEntity[] {
  const entities: TableEntity[] = [];
  const createEntity = entityType === "complex" ? createComplexEntity : createSimpleEntity;

  for (let i = 0; i < entityCount; i++) {
    entities.push(createEntity());
  }

  return entities;
}

export function createBatch(entityType: EntityType, batchSize: number): TransactionAction[][] {
  let currentElement = 0;
  const batches: TransactionAction[][] = [];
  const entities = createEntities(entityType, batchSize);

  const maxBatchSize = 100;
  const batchCount = Math.ceil(entities.length / maxBatchSize);

  for (let i = 0; i < batchCount; i++) {
    const lastItem = (currentElement + 1) * maxBatchSize;
    const entityChunk = entities.slice(currentElement, lastItem);
    currentElement = currentElement + maxBatchSize;
    batches.push(entityChunk.map<TransactionAction>((entity) => ["create", entity]));
  }
  return batches;
}
