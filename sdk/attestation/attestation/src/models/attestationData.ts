// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

/**
 * AttestationData represents either the initTime or runtimeData presented
 * to the attestation service.
 *
 */
export class AttestationData {
  /**
   *
   * @param data - Data to send to the attestation service.
   * @param isJson - If true, specifies that the data should be treated as JSON
   *     by the attestation service. If not specified, the AttestationData
   *     constructor will attempt to parse the data to determine if it is JSON.
   */
  constructor(data: Uint8Array, isJson?: boolean) {
    this.data = data;
    if (isJson !== undefined) {
      this.isJson = isJson;
    } else {
      // The caller didn't specify isJson, so we want to try to
      // guess the value from the input JSON.
      try {
        JSON.parse(data.toString());
        this.isJson = true;
      } catch (e) {
        this.isJson = false;
      }
    }
  }

  /**
   * data - Represents the data being transmitted to the attestation service.
   */
  data: Uint8Array;
  /**
   * isJson - True if the service should treat the data as JSON.
   */
  isJson: boolean;
}
