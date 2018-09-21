export interface SessionContext {
  resourceId?: string;
  resourceAddress?: string;
  resourceType?: string; // TODO: enum
  isNameBased?: boolean;
  operationType?: string; // TODO: enum
}
