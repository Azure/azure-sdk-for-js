import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { EntraIdAssignments } from "../operationsInterfaces/index.js";
import { IdentityRestClient } from "../identityRestClient.js";
import { EntraAssignment, EntraAssignmentCreateOrUpdateRequest, EntraIdAssignmentsUpdateOptionalParams, EntraIdAssignmentsListOptionalParams, EntraIdAssignmentsListResponse } from "../models/index.js";
/** Class containing EntraIdAssignments operations. */
export declare class EntraIdAssignmentsImpl implements EntraIdAssignments {
    private readonly client;
    /**
     * Initialize a new instance of the class EntraIdAssignments class.
     * @param client Reference to the service client
     */
    constructor(client: IdentityRestClient);
    /**
     * Updates Entra access assignments in bulk.
     * @param body Set of assignments to be added, updated or removed.
     * @param options The options parameters.
     */
    listUpdate(body: {
        [propertyName: string]: EntraAssignmentCreateOrUpdateRequest;
    }, options?: EntraIdAssignmentsUpdateOptionalParams): PagedAsyncIterableIterator<EntraAssignment>;
    private updatePagingPage;
    private updatePagingAll;
    /**
     * Updates Entra access assignments in bulk.
     * @param body Set of assignments to be added, updated or removed.
     * @param options The options parameters.
     */
    private _update;
    /**
     * Lists Entra access assignments.
     * @param options The options parameters.
     */
    list(options?: EntraIdAssignmentsListOptionalParams): Promise<EntraIdAssignmentsListResponse>;
    /**
     * UpdateNext
     * @param body Set of assignments to be added, updated or removed.
     * @param nextLink The nextLink from the previous successful call to the Update method.
     * @param options The options parameters.
     */
    private _updateNext;
}
//# sourceMappingURL=entraIdAssignments.d.ts.map