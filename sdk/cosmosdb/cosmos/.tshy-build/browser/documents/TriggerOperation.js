// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Enum for trigger operation values.
 * specifies the operations on which a trigger should be executed.
 */
export var TriggerOperation;
(function (TriggerOperation) {
    /** All operations. */
    TriggerOperation["All"] = "all";
    /** Create operations only. */
    TriggerOperation["Create"] = "create";
    /** Update operations only. */
    TriggerOperation["Update"] = "update";
    /** Delete operations only. */
    TriggerOperation["Delete"] = "delete";
    /** Replace operations only. */
    TriggerOperation["Replace"] = "replace";
})(TriggerOperation || (TriggerOperation = {}));
//# sourceMappingURL=TriggerOperation.js.map