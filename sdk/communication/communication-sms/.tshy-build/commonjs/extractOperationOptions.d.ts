import type { OperationOptions } from "@azure/core-client";
export declare const extractOperationOptions: <T extends OperationOptions>(obj: T) => {
    operationOptions: OperationOptions;
    restOptions: Pick<T, Exclude<keyof T, keyof OperationOptions>>;
};
//# sourceMappingURL=extractOperationOptions.d.ts.map