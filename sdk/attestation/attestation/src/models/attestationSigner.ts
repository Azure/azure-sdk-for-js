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
            this.keyId = key.kid.toString();
        }

        this.certificates = key.x5C?.map(base64DecodeString) ?? []
    }

    keyId: string;
    certificates: Uint8Array[]
};
