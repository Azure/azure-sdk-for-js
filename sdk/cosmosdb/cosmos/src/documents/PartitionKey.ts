// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Point, Range } from "../range";
import { PartitionKeyDefinition } from "./PartitionKeyDefinition";

export type PartitionKey = PartitionKeyDefinition | Point | Range | {};
