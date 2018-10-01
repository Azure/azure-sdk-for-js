/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

/** Constants that identify encryption algorithms.
  * @enum
  */
export enum JsonWebKeyEncryptionAlgorithms {
    RSAOAEP = 'RSA-OAEP',
    RSA15 = 'RSA1_5'
}

/** Constants that identify signing algorithms.
  * @enum
  */
export enum JsonWebKeySignatureAlgorithms {
    RS256 = 'RS256',
    RS384 = 'RS384',
    RS512 = 'RS512',
    RSNULL = 'RSNULL'
}

/** Constants that identify JWK (Json Web Key) types.
  * @enum
  */
export enum JsonWebKeyType {
    EC = 'EC',
    RSA = 'RSA',
    RSAHSM = 'RSA-HSM',
    OCT = 'oct'
}
