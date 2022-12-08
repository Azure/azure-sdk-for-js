// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType, ResourceType } from "../../common";
import { WithRequired } from "../../utils/typeUtils";

export interface ConflictDefinition {
  /** The id of the conflict */
  id?: string;
  /** Source resource id */
  resourceId?: string;
  resourceType?: ResourceType;
  operationType?: OperationType;
  content?: string;
}

export type ConflictDefinitionResponse = WithRequired<ConflictDefinition, "resourceId" | "id" | "operationType" | "content" | "resourceType" >