import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { EntraAssignment, EntraAssignmentCreateOrUpdateRequest, EntraIdAssignmentsUpdateOptionalParams, EntraIdAssignmentsListOptionalParams, EntraIdAssignmentsListResponse } from "../models/index.js";
/** Interface representing a EntraIdAssignments. */
export interface EntraIdAssignments {
    /**
     * Updates Entra access assignments in bulk.
     * @param body Set of assignments to be added, updated or removed.
     * @param options The options parameters.
     */
    listUpdate(body: {
        [propertyName: string]: EntraAssignmentCreateOrUpdateRequest;
    }, options?: EntraIdAssignmentsUpdateOptionalParams): PagedAsyncIterableIterator<EntraAssignment>;
    /**
     * Lists Entra access assignments.
     * @param options The options parameters.
     */
    list(options?: EntraIdAssignmentsListOptionalParams): Promise<EntraIdAssignmentsListResponse>;
}
//# sourceMappingURL=entraIdAssignments.d.ts.map