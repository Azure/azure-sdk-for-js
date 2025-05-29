import type { CertificateOperation, CertificateIssuer, CertificatePolicy, CertificateProperties, DeletedCertificate, KeyVaultCertificate, KeyVaultCertificateWithPolicy, CertificateContact } from "./certificatesModels.js";
import type { CertificateAttributes, CertificateBundle, CertificatePolicy as CoreCertificatePolicy, DeletedCertificateBundle, DeletedCertificateItem, IssuerBundle, CertificateOperation as CoreCertificateOperation, Contacts as CoreContacts } from "./generated/models/index.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
export declare function toCoreAttributes(properties: CertificateProperties): CertificateAttributes;
export declare function toCorePolicy(id: string | undefined, policy: CertificatePolicy, attributes?: CertificateAttributes): CoreCertificatePolicy;
export declare function toPublicPolicy(policy?: CoreCertificatePolicy): CertificatePolicy;
export declare function toPublicIssuer(issuer?: IssuerBundle): CertificateIssuer;
export declare function getCertificateFromCertificateBundle(certificateBundle: CertificateBundle): KeyVaultCertificate;
export declare function getCertificateWithPolicyFromCertificateBundle(certificateBundle: CertificateBundle): KeyVaultCertificateWithPolicy;
export declare function getDeletedCertificateFromDeletedCertificateBundle(certificateBundle: DeletedCertificateBundle): DeletedCertificate;
export declare function getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate;
export declare function getCertificateOperationFromCoreOperation(certificateName: string, operation: CoreCertificateOperation): CertificateOperation;
export declare function coreContactsToCertificateContacts(contacts: CoreContacts): CertificateContact[];
export declare function getPropertiesFromCertificateBundle(certificateBundle: CertificateBundle): CertificateProperties;
export declare function mapPagedAsyncIterable<T, U>(iter: PagedAsyncIterableIterator<T>, mapper: (x: T) => U): PagedAsyncIterableIterator<U>;
//# sourceMappingURL=transformations.d.ts.map