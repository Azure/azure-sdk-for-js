import { Point, Range } from "../range";
import { PartitionKeyDefinition } from "./PartitionKeyDefinition";

export type PartitionKey = PartitionKeyDefinition | Point | Range;
