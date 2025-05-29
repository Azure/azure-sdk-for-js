// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { logger } from "./log.js";
import { WellKnownIssuerNames, DefaultCertificatePolicy, LATEST_API_VERSION, KnownCertificateKeyCurveNames, KnownCertificateKeyTypes, KnownKeyUsageTypes, } from "./certificatesModels.js";
import { KnownDeletionRecoveryLevel as KnownDeletionRecoveryLevels, } from "./generated/models/index.js";
import { KeyVaultClient } from "./generated/keyVaultClient.js";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";
import { CreateCertificatePoller } from "./lro/create/poller.js";
import { CertificateOperationPoller } from "./lro/operation/poller.js";
import { DeleteCertificatePoller } from "./lro/delete/poller.js";
import { RecoverDeletedCertificatePoller } from "./lro/recover/poller.js";
import { parseCertificateBytes } from "./utils.js";
import { parseKeyVaultCertificateIdentifier } from "./identifier.js";
import { coreContactsToCertificateContacts, getCertificateFromCertificateBundle, getCertificateOperationFromCoreOperation, getCertificateWithPolicyFromCertificateBundle, getDeletedCertificateFromDeletedCertificateBundle, getDeletedCertificateFromItem, getPropertiesFromCertificateBundle, mapPagedAsyncIterable, toCoreAttributes, toCorePolicy, toPublicIssuer, toPublicPolicy, } from "./transformations.js";
import { tracingClient } from "./tracing.js";
import { bearerTokenAuthenticationPolicyName } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "./constants.js";
export { parseKeyVaultCertificateIdentifier, DefaultCertificatePolicy, WellKnownIssuerNames as WellKnownIssuer, logger, KnownCertificateKeyCurveNames, KnownDeletionRecoveryLevels, KnownCertificateKeyTypes, KnownKeyUsageTypes, };
/**
 * The client to interact with the KeyVault certificates functionality
 */
export class CertificateClient {
    /**
     * Creates an instance of CertificateClient.
     * @param vaultUrl - the base URL to the vault. You should validate that this URL references a valid Key Vault resource. See https://aka.ms/azsdk/blog/vault-uri for details.
     * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param clientOptions - Pipeline options used to configure Key Vault API requests.
     *                          Omit this parameter to use the default pipeline configuration.
     */
    constructor(vaultUrl, credential, clientOptions = {}) {
        var _a;
        this.vaultUrl = vaultUrl;
        const internalClientPipelineOptions = Object.assign(Object.assign({}, clientOptions), { apiVersion: clientOptions.serviceVersion || LATEST_API_VERSION, userAgentOptions: {
                userAgentPrefix: `${(_a = clientOptions.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix} azsdk-js-keyvault-certificates/${SDK_VERSION}`,
            }, loggingOptions: {
                logger: logger.info,
                additionalAllowedHeaderNames: [
                    "x-ms-keyvault-region",
                    "x-ms-keyvault-network-info",
                    "x-ms-keyvault-service-version",
                ],
            } });
        this.client = new KeyVaultClient(this.vaultUrl, credential, internalClientPipelineOptions);
        this.client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
        this.client.pipeline.addPolicy(keyVaultAuthenticationPolicy(credential, clientOptions));
        // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
        this.client.pipeline.addPolicy({
            name: "ContentTypePolicy",
            sendRequest(request, next) {
                var _a;
                const contentType = (_a = request.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "";
                if (contentType.startsWith("application/json")) {
                    request.headers.set("Content-Type", "application/json");
                }
                return next(request);
            },
        });
    }
    /**
     * Iterates the latest version of all certificates in the vault.  The full certificate identifier and attributes are provided
     * in the response. No values are returned for the certificates. This operations requires the certificates/list permission.
     *
     * Example usage:
     * ```ts snippet:IndexListCertificates
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * // All in one call
     * for await (const certificateProperties of client.listPropertiesOfCertificates()) {
     *   console.log(certificateProperties);
     * }
     *
     * // By pages
     * for await (const page of client.listPropertiesOfCertificates().byPage()) {
     *   for (const certificateProperties of page) {
     *     console.log(certificateProperties);
     *   }
     * }
     * ```
     * List all versions of the specified certificate.
     * @param options - The optional parameters
     */
    listPropertiesOfCertificates(options = {}) {
        return mapPagedAsyncIterable(this.client.getCertificates(options), getPropertiesFromCertificateBundle);
    }
    /**
     * Returns the versions of a certificate in the specified key
     * vault. This operation requires the certificates/list permission.
     *
     * Example usage:
     * ```ts snippet:IndexListCertificateVersions
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
     *   "MyCertificate",
     * )) {
     *   console.log(certificateProperties.version!);
     * }
     * ```
     * List the versions of a certificate.
     * @param certificateName - The name of the certificate.
     * @param options - The optional parameters
     */
    listPropertiesOfCertificateVersions(certificateName, options = {}) {
        return mapPagedAsyncIterable(this.client.getCertificateVersions(certificateName, options), getPropertiesFromCertificateBundle);
    }
    /**
     * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a certificate.
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
     *
     * This operation requires the certificates/delete permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleDeleteCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * const certificateName = "MyCertificate";
     *
     * const poller = await client.beginDeleteCertificate(certificateName);
     *
     * // You can use the deleted certificate immediately:
     * const deletedCertificate = poller.getResult();
     *
     * // The certificate is being deleted. Only wait for it if you want to restore it or purge it.
     * await poller.pollUntilDone();
     *
     * // You can also get the deleted certificate this way:
     * await client.getDeletedCertificate(certificateName);
     *
     * // Deleted certificates can also be recovered or purged.
     *
     * // recoverDeletedCertificate returns a poller, just like beginDeleteCertificate.
     * // const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
     * // await recoverPoller.pollUntilDone();
     *
     * // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
     * await client.purgeDeletedCertificate(certificateName);
     * ```
     * Deletes a certificate from a specified key vault.
     * @param certificateName - The name of the certificate.
     * @param options - The optional parameters
     */
    async beginDeleteCertificate(certificateName, options = {}) {
        const poller = new DeleteCertificatePoller(Object.assign(Object.assign({ certificateName, client: this.client, vaultUrl: this.vaultUrl }, options), { operationOptions: options }));
        // This will initialize the poller's operation (the deletion of the secret).
        await poller.poll();
        return poller;
    }
    /**
     * Deletes all of the certificate contacts. This operation requires the certificates/managecontacts permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientDeleteContacts
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.deleteContacts();
     * ```
     * Deletes all of the certificate contacts
     * @param options - The optional parameters
     */
    deleteContacts(options = {}) {
        let parsedBody;
        return tracingClient.withSpan("CertificateClient.deleteContacts", options, async (updatedOptions) => {
            await this.client.deleteCertificateContacts(Object.assign(Object.assign({}, updatedOptions), { onResponse: (response) => {
                    parsedBody = response.parsedBody;
                } }));
            return coreContactsToCertificateContacts(parsedBody);
        });
    }
    /**
     * Sets the certificate contacts for the key vault. This operation requires the certificates/managecontacts permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientSetContacts
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.setContacts([
     *   {
     *     email: "b@b.com",
     *     name: "b",
     *     phone: "222222222222",
     *   },
     * ]);
     * ```
     * Sets the certificate contacts.
     * @param contacts - The contacts to use
     * @param options - The optional parameters
     */
    setContacts(contacts, options = {}) {
        const coreContacts = contacts.map((x) => ({
            emailAddress: x ? x.email : undefined,
            name: x ? x.name : undefined,
            phone: x ? x.phone : undefined,
        }));
        return tracingClient.withSpan("CertificateClient.setContacts", options, async (updatedOptions) => {
            const response = await this.client.setCertificateContacts({ contactList: coreContacts }, updatedOptions);
            return coreContactsToCertificateContacts(response);
        });
    }
    /**
     * Returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetContacts
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * const contacts = await client.getContacts();
     * for (const contact of contacts) {
     *   console.log(contact);
     * }
     * ```
     * Sets the certificate contacts.
     * @param options - The optional parameters
     */
    getContacts(options = {}) {
        return tracingClient.withSpan("CertificateClient.getContacts", options, async (updatedOptions) => {
            const result = await this.client.getCertificateContacts(updatedOptions);
            return coreContactsToCertificateContacts(result);
        });
    }
    /**
     * Returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientListIssuers
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.createIssuer("IssuerName", "Test");
     *
     * // All in one call
     * for await (const issuerProperties of client.listPropertiesOfIssuers()) {
     *   console.log(issuerProperties);
     * }
     *
     * // By pages
     * for await (const page of client.listPropertiesOfIssuers().byPage()) {
     *   for (const issuerProperties of page) {
     *     console.log(issuerProperties);
     *   }
     * }
     * ```
     * List the certificate issuers.
     * @param options - The optional parameters
     */
    listPropertiesOfIssuers(options = {}) {
        return this.client.getCertificateIssuers(options);
    }
    /**
     * The createIssuer operation adds or updates the specified certificate issuer. This
     * operation requires the certificates/setissuers permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientCreateIssuer
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.createIssuer("IssuerName", "Test");
     * ```
     * Sets the specified certificate issuer.
     * @param issuerName - The name of the issuer.
     * @param provider - The issuer provider.
     * @param options - The optional parameters
     */
    createIssuer(issuerName, provider, options = {}) {
        return tracingClient.withSpan("CertificateClient.createIssuer", options, async (updatedOptions) => {
            const { accountId, password } = updatedOptions;
            const parameters = {
                credentials: {
                    accountId,
                    password,
                },
                provider,
            };
            if (updatedOptions.organizationId ||
                (updatedOptions.administratorContacts && updatedOptions.administratorContacts.length)) {
                parameters.organizationDetails = {
                    id: updatedOptions.organizationId,
                    adminDetails: updatedOptions.administratorContacts
                        ? updatedOptions.administratorContacts.map((x) => ({
                            emailAddress: x.email,
                            phone: x.phone,
                            firstName: x.firstName,
                            lastName: x.lastName,
                        }))
                        : undefined,
                };
            }
            if (updatedOptions.enabled !== undefined) {
                parameters.attributes = {
                    enabled: updatedOptions.enabled,
                };
            }
            const response = await this.client.setCertificateIssuer(issuerName, parameters, updatedOptions);
            return toPublicIssuer(response);
        });
    }
    /**
     * The updateIssuer operation performs an update on the specified certificate issuer
     * entity. This operation requires the certificates/setissuers permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientUpdateIssuer
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.updateIssuer("IssuerName", {
     *   provider: "Provider2",
     * });
     * ```
     * Updates the specified certificate issuer.
     * @param issuerName - The name of the issuer.
     * @param options - The optional parameters
     */
    async updateIssuer(issuerName, options = {}) {
        return tracingClient.withSpan("CertificateClient.updateIssuer", options, async (updatedOptions) => {
            const { accountId, password } = options;
            const parameters = {
                credentials: {
                    accountId,
                    password,
                },
            };
            if (updatedOptions.provider) {
                parameters.provider = updatedOptions.provider;
            }
            if (updatedOptions.organizationId ||
                (updatedOptions.administratorContacts && updatedOptions.administratorContacts.length)) {
                parameters.organizationDetails = {
                    id: updatedOptions.organizationId,
                    adminDetails: updatedOptions.administratorContacts
                        ? updatedOptions.administratorContacts.map((x) => ({
                            emailAddress: x.email,
                            phone: x.phone,
                            firstName: x.firstName,
                            lastName: x.lastName,
                        }))
                        : undefined,
                };
            }
            if (updatedOptions.enabled) {
                parameters.attributes = {
                    enabled: updatedOptions.enabled,
                };
            }
            const response = await this.client.updateCertificateIssuer(issuerName, parameters, updatedOptions);
            return toPublicIssuer(response);
        });
    }
    /**
     * The getIssuer operation returns the specified certificate issuer resources in the
     * specified key vault. This operation requires the certificates/manageissuers/getissuers
     * permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetIssuer
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * const certificateIssuer = await client.getIssuer("IssuerName");
     * console.log(certificateIssuer);
     * ```
     * Gets he specified certificate issuer.
     * @param issuerName - The name of the issuer.
     * @param options - The optional parameters
     */
    getIssuer(issuerName, options = {}) {
        return tracingClient.withSpan("CertificateClient.getIssuer", options, async (updatedOptions) => {
            const response = await this.client.getCertificateIssuer(issuerName, Object.assign({}, updatedOptions));
            return toPublicIssuer(response);
        });
    }
    /**
     * The deleteIssuer operation permanently removes the specified certificate issuer from
     * the vault. This operation requires the certificates/manageissuers/deleteissuers permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientDeleteIssuer
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * await client.deleteIssuer("IssuerName");
     * ```
     * Deletes the specified certificate issuer.
     * @param issuerName - The name of the issuer.
     * @param options - The optional parameters
     */
    deleteIssuer(issuerName, options = {}) {
        return tracingClient.withSpan("CertificateClient.deleteIssuer", options, async (updatedOptions) => {
            const response = await this.client.deleteCertificateIssuer(issuerName, updatedOptions);
            return toPublicIssuer(response);
        });
    }
    /**
     * Creates a new certificate. If this is the first version, the certificate resource is created.
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
     *
     * **Note:** Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
     *
     * This operation requires the certificates/create permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateCertificatePoller
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const certificateName = "MyCertificateName";
     * const certificatePolicy = {
     *   issuerName: "Self",
     *   subject: "cn=MyCert",
     * };
     *
     * const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);
     *
     * // You can use the pending certificate immediately:
     * const pendingCertificate = poller.getResult();
     *
     * // Or you can wait until the certificate finishes being signed:
     * const keyVaultCertificate = await poller.pollUntilDone();
     * console.log(keyVaultCertificate);
     * ```
     * Creates a certificate
     * @param certificateName - The name of the certificate
     * @param certificatePolicy - The certificate's policy
     * @param options - Optional parameters
     */
    async beginCreateCertificate(certificateName, policy, options = {}) {
        const poller = new CreateCertificatePoller({
            vaultUrl: this.vaultUrl,
            client: this.client,
            certificateName,
            certificatePolicy: policy,
            createCertificateOptions: options,
            operationOptions: options,
            intervalInMs: options.intervalInMs,
            resumeFrom: options.resumeFrom,
        });
        // This will initialize the poller's operation (the creation of the secret).
        await poller.poll();
        return poller;
    }
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(keyVaultUrl, credential);
     *
     * const certificateName = "MyCertificate";
     *
     * const result = await client.getCertificate(certificateName);
     * console.log(result.name);
     * ```
     * Retrieves a certificate from the certificate's name (includes the certificate policy)
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    getCertificate(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.getCertificate", options, async (updatedOptions) => {
            const result = await this.client.getCertificate(certificateName, "", updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(result);
        });
    }
    /**
     * Gets information about a specific certificate on a specific version. It won't return the certificate's policy. This operation requires the certificates/get permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetCertificateVersion
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const certificateName = "MyCertificateName";
     *
     * const latestCertificate = await client.getCertificate(certificateName);
     * console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
     * const specificCertificate = await client.getCertificateVersion(
     *   certificateName,
     *   latestCertificate.properties.version,
     * );
     * console.log(
     *   `The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `,
     *   specificCertificate,
     * );
     * ```
     * Retrieves a certificate from the certificate's name and a specified version
     * @param certificateName - The name of the certificate
     * @param version - The specific version of the certificate
     * @param options - The optional parameters
     */
    getCertificateVersion(certificateName, version, options = {}) {
        return tracingClient.withSpan("CertificateClient.getCertificateVersion", options, async (updatedOptions) => {
            if (!version) {
                throw new Error("The 'version' cannot be empty.");
            }
            const result = await this.client.getCertificate(certificateName, version, updatedOptions);
            return getCertificateFromCertificateBundle(result);
        });
    }
    /**
     * Imports an existing valid certificate, containing a private key, into Azure Key Vault. The certificate to be imported can be in either PFX or PEM format.
     * If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. This operation requires the certificates/import permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientImportCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     * import { SecretClient } from "@azure/keyvault-secrets";
     * import { isNodeLike } from "@azure/core-util";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     * const secretClient = new SecretClient(url, credential);
     *
     * const certificateSecret = await secretClient.getSecret("MyCertificate");
     * const base64EncodedCertificate = certificateSecret.value!;
     *
     * const buffer = isNodeLike
     *   ? Buffer.from(base64EncodedCertificate, "base64")
     *   : Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
     * await client.importCertificate("MyCertificate", buffer);
     * ```
     * Imports a certificate from a certificate's secret value
     * @param certificateName - The name of the certificate
     * @param certificateBytes - The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
     * @param options - The optional parameters
     */
    importCertificate(certificateName, certificateBytes, options = {}) {
        return tracingClient.withSpan("CertificateClient.importCertificate", options, async (updatedOptions) => {
            var _a;
            const base64EncodedCertificate = parseCertificateBytes(certificateBytes, (_a = updatedOptions.policy) === null || _a === void 0 ? void 0 : _a.contentType);
            const result = await this.client.importCertificate(certificateName, Object.assign({ base64EncodedCertificate, preserveCertOrder: updatedOptions.preserveCertificateOrder }, updatedOptions), updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(result);
        });
    }
    /**
     * The getCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetCertificatePolicy
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const policy = await client.getCertificatePolicy("MyCertificate");
     * console.log(policy);
     * ```
     * Gets a certificate's policy
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    getCertificatePolicy(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.getCertificatePolicy", options, async (updatedOptions) => {
            const response = await this.client.getCertificatePolicy(certificateName, updatedOptions);
            return toPublicPolicy(response);
        });
    }
    /**
     * Updates the certificate policy for the specified certificate. This operation requires the certificates/update permission.
     * Gets a certificate's policy
     * @param certificateName - The name of the certificate
     * @param policy - The certificate policy
     * @param options - The optional parameters
     */
    updateCertificatePolicy(certificateName, policy, options = {}) {
        let parsedBody;
        return tracingClient.withSpan("CertificateClient.updateCertificatePolicy", options, async (updatedOptions) => {
            const corePolicy = toCorePolicy(undefined, policy);
            await this.client.updateCertificatePolicy(certificateName, corePolicy, updatedOptions);
            return toPublicPolicy(parsedBody);
        });
    }
    /**
     * Applies the specified update on the given certificate; the only elements updated are the
     * certificate's attributes. This operation requires the certificates/update permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientUpdateCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * // You may pass an empty string for version which will update
     * // the latest version of the certificate
     * await client.updateCertificateProperties("MyCertificate", "", {
     *   tags: {
     *     customTag: "value",
     *   },
     * });
     * ```
     * Updates a certificate
     * @param certificateName - The name of the certificate
     * @param version - The version of the certificate to update (an empty string will update the latest version)
     * @param options - The options, including what to update
     */
    updateCertificateProperties(certificateName, version, options = {}) {
        return tracingClient.withSpan("CertificateClient.updateCertificateProperties", options, async (updatedOptions) => {
            const response = await this.client.updateCertificate(certificateName, version, {
                certificateAttributes: toCoreAttributes(options),
                tags: options.tags,
            }, updatedOptions);
            return getCertificateFromCertificateBundle(response);
        });
    }
    /**
     * Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission.
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetCertificateOperation
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const createPoller = await client.beginCreateCertificate("MyCertificate", {
     *   issuerName: "Self",
     *   subject: "cn=MyCert",
     * });
     *
     * const poller = await client.getCertificateOperation("MyCertificate");
     * const pendingCertificate = poller.getResult();
     *
     * const certificateOperation = poller.getOperationState().certificateOperation;
     * console.log(certificateOperation);
     * ```
     * Gets a certificate's poller operation
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    async getCertificateOperation(certificateName, options = {}) {
        const poller = new CertificateOperationPoller({
            certificateName,
            client: this.client,
            vaultUrl: this.vaultUrl,
            intervalInMs: options.intervalInMs,
            resumeFrom: options.resumeFrom,
            operationOptions: options,
        });
        // This will initialize the poller's operation, which pre-populates some necessary properties.
        await poller.poll();
        return poller;
    }
    /**
     * Deletes the creation operation for a specified certificate that is in the process of being created.
     * The certificate is no longer created. This operation requires the certificates/update permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientDeleteCertificateOperation
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * await client.beginCreateCertificate("MyCertificate", {
     *   issuerName: "Self",
     *   subject: "cn=MyCert",
     * });
     * await client.deleteCertificateOperation("MyCertificate");
     *
     * await client.getCertificateOperation("MyCertificate");
     * ```
     * Delete a certificate's operation
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    deleteCertificateOperation(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.deleteCertificateOperation", options, async (updatedOptions) => {
            const operation = await this.client.deleteCertificateOperation(certificateName, updatedOptions);
            return getCertificateOperationFromCoreOperation(certificateName, operation);
        });
    }
    /**
     * Performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientMergeCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     * import { writeFileSync, readFileSync } from "node:fs";
     * import { execSync } from "node:child_process";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * await client.beginCreateCertificate("MyCertificate", {
     *   issuerName: "Unknown",
     *   subject: "cn=MyCert",
     * });
     * const poller = await client.getCertificateOperation("MyCertificate");
     * const { csr } = poller.getOperationState().certificateOperation!;
     * const base64Csr = Buffer.from(csr!).toString("base64");
     * const wrappedCsr = [
     *   "-----BEGIN CERTIFICATE REQUEST-----",
     *   base64Csr,
     *   "-----END CERTIFICATE REQUEST-----",
     * ].join("\n");
     *
     * writeFileSync("test.csr", wrappedCsr);
     *
     * // Certificate available locally made using:
     * //   openssl genrsa -out ca.key 2048
     * //   openssl req -new -x509 -key ca.key -out ca.crt
     * // You can read more about how to create a fake certificate authority here: https://gist.github.com/Soarez/9688998
     *
     * execSync("openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt");
     * const base64Crt = readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");
     *
     * await client.mergeCertificate("MyCertificate", [Buffer.from(base64Crt)]);
     * ```
     * Merges a signed certificate request into a pending certificate
     * @param certificateName - The name of the certificate
     * @param x509Certificates - The certificate(s) to merge
     * @param options - The optional parameters
     */
    mergeCertificate(certificateName, x509Certificates, options = {}) {
        return tracingClient.withSpan("CertificateClient.mergeCertificate", options, async (updatedOptions) => {
            const response = await this.client.mergeCertificate(certificateName, { x509Certificates }, updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(response);
        });
    }
    /**
     * Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded.
     * This operation requires the certificates/backup permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientBackupCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * await client.beginCreateCertificate("MyCertificate", {
     *   issuerName: "Self",
     *   subject: "cn=MyCert",
     * });
     * const backup = await client.backupCertificate("MyCertificate");
     * ```
     * Generates a backup of a certificate
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    backupCertificate(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.backupCertificate", options, async (updatedOptions) => {
            const response = await this.client.backupCertificate(certificateName, updatedOptions);
            return response.value;
        });
    }
    /**
     * Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientRestoreCertificateBackup
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * await client.beginCreateCertificate("MyCertificate", {
     *   issuerName: "Self",
     *   subject: "cn=MyCert",
     * });
     * const backup = await client.backupCertificate("MyCertificate");
     *
     * const poller = await client.beginDeleteCertificate("MyCertificate");
     * await poller.pollUntilDone();
     *
     * // Some time is required before we're able to restore the certificate
     * await client.restoreCertificateBackup(backup!);
     * ```
     * Restores a certificate from a backup
     * @param backup - The back-up certificate to restore from
     * @param options - The optional parameters
     */
    restoreCertificateBackup(backup, options = {}) {
        return tracingClient.withSpan("CertificateClient.restoreCertificateBackup", options, async (updatedOptions) => {
            const response = await this.client.restoreCertificate({ certificateBundleBackup: backup }, updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(response);
        });
    }
    /**
     * Retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific
     * information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults.
     *
     * Example usage:
     * ```ts snippet:CertificateClientListDeletedCertificates
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * for await (const deletedCertificate of client.listDeletedCertificates()) {
     *   console.log(deletedCertificate);
     * }
     *
     * for await (const page of client.listDeletedCertificates().byPage()) {
     *   for (const deletedCertificate of page) {
     *     console.log(deletedCertificate);
     *   }
     * }
     * ```
     * Lists deleted certificates
     * @param options - The optional parameters
     */
    listDeletedCertificates(options = {}) {
        return mapPagedAsyncIterable(this.client.getDeletedCertificates(options), getDeletedCertificateFromItem);
    }
    /**
     * retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
     * current deletion recovery level. This operation requires the certificates/get permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientGetDeletedCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const deletedCertificate = await client.getDeletedCertificate("MyDeletedCertificate");
     * console.log("Deleted certificate:", deletedCertificate);
     * ```
     * Gets a deleted certificate
     * @param certificateName - The name of the certificate
     * @param options - The optional parameters
     */
    getDeletedCertificate(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.getDeletedCertificate", options, async (updatedOptions) => {
            const response = await this.client.getDeletedCertificate(certificateName, updatedOptions);
            return getDeletedCertificateFromDeletedCertificateBundle(response);
        });
    }
    /**
     * Performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the
     * recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientPurgeDeletedCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const deletePoller = await client.beginDeleteCertificate("MyCertificate");
     * await deletePoller.pollUntilDone();
     *
     * // Deleting a certificate takes time, make sure to wait before purging it
     * client.purgeDeletedCertificate("MyCertificate");
     * ```
     * Gets a deleted certificate
     * @param certificateName - The name of the deleted certificate to purge
     * @param options - The optional parameters
     */
    async purgeDeletedCertificate(certificateName, options = {}) {
        return tracingClient.withSpan("CertificateClient.purgeDeletedCertificate", options, async (updatedOptions) => {
            await this.client.purgeDeletedCertificate(certificateName, updatedOptions);
            return null;
        });
    }
    /**
     * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
     *
     * This operation requires the certificates/recover permission.
     *
     * Example usage:
     * ```ts snippet:CertificateClientRecoverDeletedCertificate
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { CertificateClient } from "@azure/keyvault-certificates";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new CertificateClient(url, credential);
     *
     * const deletePoller = await client.beginDeleteCertificate("MyCertificate");
     * await deletePoller.pollUntilDone();
     *
     * const recoverPoller = await client.beginRecoverDeletedCertificate("MyCertificate");
     *
     * // Waiting until it's done
     * const certificate = await recoverPoller.pollUntilDone();
     * console.log(certificate);
     * ```
     * Recovers a deleted certificate
     * @param certificateName - The name of the deleted certificate
     * @param options - The optional parameters
     */
    async beginRecoverDeletedCertificate(certificateName, options = {}) {
        const poller = new RecoverDeletedCertificatePoller(Object.assign(Object.assign({ certificateName, client: this.client, vaultUrl: this.vaultUrl }, options), { operationOptions: options }));
        // This will initialize the poller's operation (the recovery of the deleted secret).
        await poller.poll();
        return poller;
    }
}
//# sourceMappingURL=index.js.map