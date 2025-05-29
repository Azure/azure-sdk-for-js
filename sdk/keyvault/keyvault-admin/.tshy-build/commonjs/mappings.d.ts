import type { OperationOptions } from "@azure-rest/core-client";
import type { KeyVaultRoleAssignment, KeyVaultRoleDefinition } from "./accessControlModels.js";
import type { PagedAsyncIterableIterator } from "./generated/index.js";
import type { RoleAssignment, RoleDefinition } from "./generated/models/index.js";
export declare const mappings: {
    roleAssignment: {
        generatedToPublic(roleAssignment: RoleAssignment): KeyVaultRoleAssignment;
    };
    roleDefinition: {
        generatedToPublic(roleDefinition: RoleDefinition): KeyVaultRoleDefinition;
    };
    folderUriParts(folderUri: string): {
        folderName: string;
        folderUri: string;
    };
};
/**
 * A helper supporting compatibility between modular and legacy paged async iterables.
 *
 * Provides the following compatibility:
 * 1. Maps the values of the paged async iterable using the provided mapper function.
 * 2. Supports `maxPageSize` operation on the paged async iterable.
 *
 * TODO: move this to keyvault-common once everything is merged.
 */
export declare function mapPagedAsyncIterable<TGenerated, TPublic, TOptions extends OperationOptions & {
    maxresults?: number;
}>(options: TOptions, operation: (options: TOptions) => PagedAsyncIterableIterator<TGenerated>, mapper: (x: TGenerated) => TPublic): PagedAsyncIterableIterator<TPublic>;
//# sourceMappingURL=mappings.d.ts.map