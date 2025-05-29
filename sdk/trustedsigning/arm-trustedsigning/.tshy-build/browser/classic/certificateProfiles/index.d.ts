import { CodeSigningContext } from "../../api/codeSigningContext.js";
import { CertificateProfile, RevokeCertificate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { CertificateProfilesGetOptionalParams, CertificateProfilesCreateOptionalParams, CertificateProfilesDeleteOptionalParams, CertificateProfilesListByCodeSigningAccountOptionalParams, CertificateProfilesRevokeCertificateOptionalParams } from "../../models/options.js";
/** Interface representing a CertificateProfiles operations. */
export interface CertificateProfilesOperations {
    /** Get details of a certificate profile. */
    get: (resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesGetOptionalParams) => Promise<CertificateProfile>;
    /** Create a certificate profile. */
    create: (resourceGroupName: string, accountName: string, profileName: string, resource: CertificateProfile, options?: CertificateProfilesCreateOptionalParams) => PollerLike<OperationState<CertificateProfile>, CertificateProfile>;
    /** Delete a certificate profile. */
    /**
     *  @fixme delete is a reserved word that cannot be used as an operation name.
     *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
     *         to the operation to override the generated name.
     */
    delete: (resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    /** List certificate profiles under a trusted signing account. */
    listByCodeSigningAccount: (resourceGroupName: string, accountName: string, options?: CertificateProfilesListByCodeSigningAccountOptionalParams) => PagedAsyncIterableIterator<CertificateProfile>;
    /** Revoke a certificate under a certificate profile. */
    revokeCertificate: (resourceGroupName: string, accountName: string, profileName: string, body: RevokeCertificate, options?: CertificateProfilesRevokeCertificateOptionalParams) => Promise<void>;
}
export declare function getCertificateProfiles(context: CodeSigningContext, subscriptionId: string): {
    get: (resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesGetOptionalParams) => Promise<CertificateProfile>;
    create: (resourceGroupName: string, accountName: string, profileName: string, resource: CertificateProfile, options?: CertificateProfilesCreateOptionalParams) => PollerLike<OperationState<CertificateProfile>, CertificateProfile>;
    delete: (resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    listByCodeSigningAccount: (resourceGroupName: string, accountName: string, options?: CertificateProfilesListByCodeSigningAccountOptionalParams) => PagedAsyncIterableIterator<CertificateProfile, CertificateProfile[], import("../../static-helpers/pagingHelpers.js").PageSettings>;
    revokeCertificate: (resourceGroupName: string, accountName: string, profileName: string, body: RevokeCertificate, options?: CertificateProfilesRevokeCertificateOptionalParams) => Promise<void>;
};
export declare function getCertificateProfilesOperations(context: CodeSigningContext, subscriptionId: string): CertificateProfilesOperations;
//# sourceMappingURL=index.d.ts.map