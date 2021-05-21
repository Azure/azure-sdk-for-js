/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import {JsonWebKey} from "../generated/models";
import {base64DecodeString} from "../utils/base64";

export class AttestationSigner
{
    constructor(key : JsonWebKey) {
        if (key.kid === null) {
            throw new Error("KeyID field in signer must not be null.")
        }
        else if (key.kid === undefined) {
            throw new Error("KeyID field in signer cannot be undefined.")
        }
        else
        {
            this.key_id = key.kid.toString();
        }

        this.certificates = new Array(key.x5C?.length)
        key.x5C?.forEach(cert => this.certificates.push(base64DecodeString(cert)));
    }

    key_id: string;
    certificates: Uint8Array[]
};
