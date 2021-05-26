/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { AttestationToken } from "./attestationToken";
import { Serializer, Mapper, HttpResponse } from "@azure/core-http";

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
     constructor(token: AttestationToken, serializer: Serializer, bodyMapper: Mapper, bodyTypeName: string, rawResult: any) {
        this.token = token;
        this.value = serializer.deserialize(
            bodyMapper,
            token.get_body(),
            bodyTypeName
          );
        this._response = rawResult._response;
     }
 
     /**
      * The Attestation Token returned from the attestation service.
      */
     token: AttestationToken;
 
     /**
      * The value of the response from the attestation service.
      */
 
     value: T;
    /**
     * The underlying HTTP response.
     */
      _response: HttpResponse & {
    /**
     * The response body as text (string format)
        */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: T;
    };
 };
 