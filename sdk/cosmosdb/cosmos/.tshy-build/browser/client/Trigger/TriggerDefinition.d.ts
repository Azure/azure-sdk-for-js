import type { TriggerOperation, TriggerType } from "../../documents/index.js";
export interface TriggerDefinition {
    /** The id of the trigger. */
    id?: string;
    /** The body of the trigger, it can also be passed as a stringifed function */
    body: (() => void) | string;
    /** The type of the trigger, should be one of the values of {@link TriggerType}. */
    triggerType: TriggerType;
    /** The trigger operation, should be one of the values of {@link TriggerOperation}. */
    triggerOperation: TriggerOperation;
}
//# sourceMappingURL=TriggerDefinition.d.ts.map