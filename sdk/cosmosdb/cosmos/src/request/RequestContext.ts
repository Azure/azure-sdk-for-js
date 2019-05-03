import { ClientContext } from "../ClientContext";
import { LocationRouting } from "./LocationRouting";

export interface RequestContext {
  path?: string;
  operationType?: string;
  client?: ClientContext;
  retryCount?: number;
  resourceType?: string;
  locationRouting?: LocationRouting;
}
