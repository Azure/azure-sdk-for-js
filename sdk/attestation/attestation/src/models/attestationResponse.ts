/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { Mapper, Serializer } from "@azure/core-client";
import { AttestationToken } from "./attestationToken";

/**
 * An AttestationResponse represents the response from the Microsoft Azure
 * Attestation service. It has two properties:
 * 
 * - token: The attestation token returned from the attestation service.
 * - value: The body of the token returned by the attestation service.
 * 
 * @hideconstructor
 */
 export class AttestationResponse<T>
 {
     constructor(token: AttestationToken, serializer: Serializer, bodyMapper: Mapper, bodyTypeName: string) {
        this.token = token;
        this.value = serializer.deserialize(
            bodyMapper,
            token.get_body(),
            bodyTypeName
          );
     }
 
     /**
      * The Attestation Token returned from the attestation service.
      */
     token: AttestationToken;
 
     /**
      * The value of the response from the attestation service.
      */
 
     value: T;
 };
 