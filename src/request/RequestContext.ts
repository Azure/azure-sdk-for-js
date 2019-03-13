import { ClientContext } from "../ClientContext";
import { OperationType, ResourceType } from "../common";
import { LocationRouting } from "./LocationRouting";

export interface RequestContext {
  path?: string;
  operationType?: OperationType;
  client?: ClientContext;
  retryCount?: number;
  resourceType?: ResourceType;
  locationRouting?: LocationRouting;
}
