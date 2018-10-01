/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { parse } from "url";

export class ObjectIdentifier {
    /** The vault URI.
     * @member {string}
     */
    vault: string;

    /** The key name.
      * @member {string}
      */
    name: string;

    /** The key version. May be undefined.
     * @member {string}
     */
    version?: string;

    /** The base identifier (i.e. without the version).
     * @member {string}
     */
    baseIdentifier: any;

    /** The full identifier if a version was informed; otherwise is the same value of baseIdentifier.
     * @member {string}
     */
    identifier: any;

    /**
     * Creates an ObjectIdentifier object for a key.
     * @param {string} collection The collection name.
     * @param {string} vault The vault URI.
     * @param {string} name The key name.
     * @param {string} [version=undefined] The object version.
     * @return {ObjectIdentifier} An object that represents the key identifier.
     */
    constructor(collection: string, vault: string, name: string, version?: string) {
        this.vault = vault;
        this.name = name;
        this.version = version;
        this.baseIdentifier = `${vault}/${collection}/${name}`;
        this.identifier = version ? `${this.baseIdentifier}/${version}` : this.baseIdentifier;
    }

    static createObjectIdentifier(collection: string, vault: string, name: string, version?: string) {
        if (typeof collection != "string" || !(collection = collection.trim())) {
            throw new Error("Invalid collection argument");
        }

        if (typeof vault != "string" || !(vault = vault.trim())) {
            throw new Error("Invalid vault argument");
        }

        if (typeof name != "string" || !(name = name.trim())) {
            throw new Error("Invalid name argument");
        }

        if (version && typeof version != "string") {
            throw new Error("Invalid version argument");
        }

        if (version) {
            version = version.trim();
        }

        if (!version) {
            version = undefined;
        }

        var baseUri;
        try {
            baseUri = parse(vault, true, true);
        } catch (e) {
            throw new Error(`Invalid ${collection} identifier: ${vault}. Not a valid URI`);
        }

        var vault = `${baseUri.protocol}//${baseUri.host}`;
        return new ObjectIdentifier(collection, vault, name, version);
    }

    static parseObjectIdentifier(collection: string, identifier: string) {
        if (typeof collection != "string" || !(collection = collection.trim())) {
            throw new Error("Invalid collection argument");
        }

        if (typeof identifier != "string" || !(identifier = identifier.trim())) {
            throw new Error("Invalid identifier argument");
        }

        var baseUri;
        try {
            baseUri = parse(identifier, true, true);
        } catch (e) {
            throw new Error(`Invalid ${collection} identifier: ${identifier}. Not a valid URI`);
        }

        // Path is of the form "/collection/name[/version]"
        var segments = baseUri.pathname!.split("/");
        if (segments.length !== 3 && segments.length !== 4) {
            throw new Error(`Invalid ${collection} identifier: ${identifier}. Bad number of segments: ${segments.length}`);
        }

        if (collection !== segments[1]) {
            throw new Error(`Invalid ${collection} identifier: ${identifier}. segment [1] should be "${collection}", found "${segments[1]}"`);
        }

        var vault = `${baseUri.protocol}//${baseUri.host}`;
        var name = segments[2];
        var version = segments.length === 4 ? segments[3] : undefined;
        return new ObjectIdentifier(collection, vault, name, version);
    }
}

/** Creates an ObjectIdentifier object for a key.
 * @param {string} vault The vault URI.
 * @param {string} name The key name.
 * @param {string} [version=undefined] The object version.
 * @return {ObjectIdentifier} An object that represents the key identifier.
 */
export function createKeyIdentifier(vault: string, name: string, version?: string): ObjectIdentifier {
    return ObjectIdentifier.createObjectIdentifier("keys", vault, name, version);
};

/** Parses a string containing a key identifier and returns the ObjectIdentifier object.
 * @param {string} identifier The key identifier (an URI).
 * @return {ObjectIdentifier} An object that represents the key identifier.
 */
export function parseKeyIdentifier(identifier: string): ObjectIdentifier {
    return ObjectIdentifier.parseObjectIdentifier("keys", identifier);
};

/** Creates an ObjectIdentifier object for a secret.
 * @param {string} vault The vault URI.
 * @param {string} name The secret name.
 * @param {string} [version=undefined] The object version.
 * @return {ObjectIdentifier} An object that represents the secret identifier.
 */
export function createSecretIdentifier(vault: string, name: string, version?: string): ObjectIdentifier {
    return ObjectIdentifier.createObjectIdentifier("secrets", vault, name, version);
};

/** Parses a string containing a secret identifier and returns the ObjectIdentifier object.
 * @param {string} identifier The secret identifier (an URI).
 * @return {ObjectIdentifier} An object that represents the secret identifier.
 */
export function parseSecretIdentifier(identifier: string): ObjectIdentifier {
    return ObjectIdentifier.parseObjectIdentifier("secrets", identifier);
};

/** Creates an ObjectIdentifier object for a certificate.
 * @param {string} vault The vault URI.
 * @param {string} name The certificate name.
 * @param {string} [version=undefined] The object version.
 * @return {ObjectIdentifier} An object that represents the certificate identifier.
 */
export function createCertificateIdentifier(vault: string, name: string, version: string): ObjectIdentifier {
    return ObjectIdentifier.createObjectIdentifier("certificates", vault, name, version);
};

/** Parses a string containing a certificate identifier and returns the ObjectIdentifier object.
 * @param {string} identifier The certificate identifier (an URI).
 * @return {ObjectIdentifier} An object that represents the certificate identifier.
 */
export function parseCertificateIdentifier(identifier: string): ObjectIdentifier {
    return ObjectIdentifier.parseObjectIdentifier("certificates", identifier);
};

/** Creates an ObjectIdentifier object for a certificate operation.
 * @param {string} vault The vault URI.
 * @param {string} name The certificate name.
 * @return {ObjectIdentifier} An object that represents the certificate identifier.
 */
export function createCertificateOperationIdentifier(vault: string, name: string): ObjectIdentifier {
    var objId = ObjectIdentifier.createObjectIdentifier("certificates", vault, name, "pending");
    objId.baseIdentifier = objId.identifier;
    objId.version = undefined;
    return objId;
};

/** Parses a string containing a certificate identifier and returns the ObjectIdentifier object.
 * @param {string} identifier The certificate identifier (an URI).
 * @return {ObjectIdentifier} An object that represents the certificate identifier.
 */
export function parseCertificateOperationIdentifier(identifier: string): ObjectIdentifier {
    var objId = ObjectIdentifier.parseObjectIdentifier("certificates", identifier);
    objId.baseIdentifier = objId.identifier;
    objId.version = undefined;
    return objId;
};

/** Creates an ObjectIdentifier object for a certificate issuer.
 @param {string} vault The vault URI.
 @param {string} name The certificate issuer name.
 @return {ObjectIdentifier} An object that represents the certificate issuer identifier.
*/
export function createIssuerIdentifier(vault: string, name: string): ObjectIdentifier {
    return ObjectIdentifier.createObjectIdentifier("certificates/issuers", vault, name);
};

/** Parses a string containing a certificate issuer identifier and returns the ObjectIdentifier object.
 @param {string} identifier The certificate issuer identifier (an URI).
 @return {ObjectIdentifier} An object that represents the certificate issuer identifier.
*/
export function parseIssuerIdentifier(identifier: string): ObjectIdentifier {
    var baseUri;
    try {
        baseUri = parse(identifier, true, true);
    } catch (e) {
        throw new Error(`Invalid issuer identifier: ${identifier}. Not a valid URI`);
    }

    // Path is of the form "/certificate/issuer/name"
    var segments = baseUri.pathname!.split("/");
    if (segments.length !== 4) {
        throw new Error(`Invalid issuer identifier: ${identifier}. Bad number of segments: ${segments.length}`);
    }

    if ("certificates" !== segments[1]) {
        throw new Error(`Invalid issuer identifier: ${identifier}. segment [1] should be "certificates", found "${segments[1]}"`);
    }

    if ("issuers" !== segments[2]) {
        throw new Error(`Invalid issuer identifier: ${identifier}. segment [2] should be "issuers", found "${segments[1]}"`);
    }

    var vault = `${baseUri.protocol}//${baseUri.host}`;
    var name = segments[3];
    return new ObjectIdentifier("certificates/issuers", vault, name, undefined);
};
