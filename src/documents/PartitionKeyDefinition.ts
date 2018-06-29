import { PartitionKind } from "./documents";

export interface PartitionKeyDefinition {
    paths: string[];
    kind: PartitionKind;
}
