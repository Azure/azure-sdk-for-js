// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType, ResourceType } from "../common";

/**
 * @ignore
 */
export interface SessionContext {
  resourceId?: string;
  resourceAddress?: string;
  resourceType?: ResourceType;
  isNameBased?: boolean;
  operationType?: OperationType;
}
