export type PatchOperation = ExistingKeyOperation | RemoveOperation;
export declare const PatchOperationType: {
    readonly add: "add";
    readonly replace: "replace";
    readonly remove: "remove";
    readonly set: "set";
    readonly incr: "incr";
};
export type ExistingKeyOperation = {
    op: keyof typeof PatchOperationType;
    value: any;
    path: string;
};
export type RemoveOperation = {
    op: "remove";
    path: string;
};
export type PatchRequestBody = {
    operations: PatchOperation[];
    condition?: string;
} | PatchOperation[];
//# sourceMappingURL=patch.d.ts.map