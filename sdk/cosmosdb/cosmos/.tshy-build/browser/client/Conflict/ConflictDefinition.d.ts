import type { OperationType, ResourceType } from "../../common/index.js";
export interface ConflictDefinition {
    /** The id of the conflict */
    id?: string;
    /** Source resource id */
    resourceId?: string;
    resourceType?: ResourceType;
    operationType?: OperationType;
    content?: string;
}
//# sourceMappingURL=ConflictDefinition.d.ts.map