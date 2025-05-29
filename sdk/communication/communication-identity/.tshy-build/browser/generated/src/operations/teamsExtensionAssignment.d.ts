import { TeamsExtensionAssignment } from "../operationsInterfaces/index.js";
import { IdentityRestClient } from "../identityRestClient.js";
import { TeamsExtensionAssignmentGetOptionalParams, TeamsExtensionAssignmentGetResponse, TeamsExtensionPrincipalType, TeamsExtensionAssignmentUpsertOptionalParams, TeamsExtensionAssignmentUpsertResponse, TeamsExtensionAssignmentDeleteOptionalParams } from "../models/index.js";
/** Class containing TeamsExtensionAssignment operations. */
export declare class TeamsExtensionAssignmentImpl implements TeamsExtensionAssignment {
    private readonly client;
    /**
     * Initialize a new instance of the class TeamsExtensionAssignment class.
     * @param client Reference to the service client
     */
    constructor(client: IdentityRestClient);
    /**
     * Get Teams Phone access assignment by object id.
     * @param tenantId Tenant Id we want to get the assignment for.
     * @param objectId Object Id we want to get the assignment for.
     * @param options The options parameters.
     */
    get(tenantId: string, objectId: string, options?: TeamsExtensionAssignmentGetOptionalParams): Promise<TeamsExtensionAssignmentGetResponse>;
    /**
     * Creates or replaces a Teams Phone access assignment.
     * @param tenantId Tenant Id we want to update the assignment for.
     * @param objectId Object Id we want to update the assignment for.
     * @param principalType The type of principal the assignment is for.
     * @param options The options parameters.
     */
    upsert(tenantId: string, objectId: string, principalType: TeamsExtensionPrincipalType, options?: TeamsExtensionAssignmentUpsertOptionalParams): Promise<TeamsExtensionAssignmentUpsertResponse>;
    /**
     * Removes a Teams Phone access assignment.
     * @param tenantId Tenant Id we want to remove the assignment for.
     * @param objectId Object Id we want to remove the assignment for.
     * @param options The options parameters.
     */
    delete(tenantId: string, objectId: string, options?: TeamsExtensionAssignmentDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=teamsExtensionAssignment.d.ts.map