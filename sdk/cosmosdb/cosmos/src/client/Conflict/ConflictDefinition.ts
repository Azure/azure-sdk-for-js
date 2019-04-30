import { ItemDefinition } from "../Item";

export interface ConflictDefinition {
  /** The id of the conflict */
  id?: string;
  /** Source resource id */
  resourceId?: string;
  resourceType?: string;
  operationType?: string; // TODO: enum
  content?: string;
}
