import { EntraIdAssignment } from "../operationsInterfaces/index.js";
import { IdentityRestClient } from "../identityRestClient.js";
import { EntraIdAssignmentGetOptionalParams, EntraIdAssignmentGetResponse, EntraPrincipalType, EntraIdAssignmentUpsertOptionalParams, EntraIdAssignmentUpsertResponse, EntraIdAssignmentDeleteOptionalParams } from "../models/index.js";
/** Class containing EntraIdAssignment operations. */
export declare class EntraIdAssignmentImpl implements EntraIdAssignment {
    private readonly client;
    /**
     * Initialize a new instance of the class EntraIdAssignment class.
     * @param client Reference to the service client
     */
    constructor(client: IdentityRestClient);
    /**
     * Get Entra access assignment by object id.
     * @param objectId objectId we want to get the assignment for. AcsResourceId is taken from
     *                 authentication.
     * @param options The options parameters.
     */
    get(objectId: string, options?: EntraIdAssignmentGetOptionalParams): Promise<EntraIdAssignmentGetResponse>;
    /**
     * Creates or replaces an Entra access assignment.
     * @param objectId objectId we want to update the assignment for.
     * @param tenantId
     * @param principalType
     * @param clientIds Array of EntraAssignmentCreateOrUpdateRequestClientIdsItem
     * @param options The options parameters.
     */
    upsert(objectId: string, tenantId: string, principalType: EntraPrincipalType, clientIds: string[], options?: EntraIdAssignmentUpsertOptionalParams): Promise<EntraIdAssignmentUpsertResponse>;
    /**
     * Removes an Entra access assignment.
     * @param objectId objectId we want to remove the assignment for. AcsResourceId is taken from
     *                 authentication.
     * @param options The options parameters.
     */
    delete(objectId: string, options?: EntraIdAssignmentDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=entraIdAssignment.d.ts.map