import { CertificateProfile, RevokeCertificate, _CertificateProfileListResult } from "../../models/models.js";
import { CodeSigningContext as Client } from "../index.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { CertificateProfilesGetOptionalParams, CertificateProfilesCreateOptionalParams, CertificateProfilesDeleteOptionalParams, CertificateProfilesListByCodeSigningAccountOptionalParams, CertificateProfilesRevokeCertificateOptionalParams } from "../../models/options.js";
export declare function _getSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<CertificateProfile>;
/** Get details of a certificate profile. */
export declare function get(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesGetOptionalParams): Promise<CertificateProfile>;
export declare function _createSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, resource: CertificateProfile, options?: CertificateProfilesCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<CertificateProfile>;
/** Create a certificate profile. */
export declare function create(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, resource: CertificateProfile, options?: CertificateProfilesCreateOptionalParams): PollerLike<OperationState<CertificateProfile>, CertificateProfile>;
export declare function _$deleteSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Delete a certificate profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, options?: CertificateProfilesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _listByCodeSigningAccountSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CertificateProfilesListByCodeSigningAccountOptionalParams): StreamableMethod;
export declare function _listByCodeSigningAccountDeserialize(result: PathUncheckedResponse): Promise<_CertificateProfileListResult>;
/** List certificate profiles under a trusted signing account. */
export declare function listByCodeSigningAccount(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CertificateProfilesListByCodeSigningAccountOptionalParams): PagedAsyncIterableIterator<CertificateProfile>;
export declare function _revokeCertificateSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, body: RevokeCertificate, options?: CertificateProfilesRevokeCertificateOptionalParams): StreamableMethod;
export declare function _revokeCertificateDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Revoke a certificate under a certificate profile. */
export declare function revokeCertificate(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, profileName: string, body: RevokeCertificate, options?: CertificateProfilesRevokeCertificateOptionalParams): Promise<void>;
//# sourceMappingURL=index.d.ts.map