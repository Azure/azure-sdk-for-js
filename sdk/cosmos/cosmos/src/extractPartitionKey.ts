import { parsePath } from "./common";
import { PartitionKey, PartitionKeyDefinition } from "./documents";

export function extractPartitionKey(document: any, partitionKeyDefinition: PartitionKeyDefinition): PartitionKey[] {
  if (partitionKeyDefinition && partitionKeyDefinition.paths && partitionKeyDefinition.paths.length > 0) {
    const partitionKey: PartitionKey[] = [];
    partitionKeyDefinition.paths.forEach((path: string) => {
      const pathParts = parsePath(path);
      let obj = document;
      for (const part of pathParts) {
        if (!(typeof obj === "object" && part in obj)) {
          obj = {};
          break;
        }
        obj = obj[part];
      }
      partitionKey.push(obj);
    });
    return partitionKey;
  }
  return undefined;
}
