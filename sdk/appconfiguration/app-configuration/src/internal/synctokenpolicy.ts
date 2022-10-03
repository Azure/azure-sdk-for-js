// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * The sync token header, as described here:
 * https://docs.microsoft.com/azure/azure-app-configuration/rest-api-consistency
 * @internal
 */
export const SyncTokenHeaderName = "sync-token";

/**
 * A policy factory for injecting sync tokens properly into outgoing requests.
 * @param syncTokens - the sync tokens store to be used across requests.
 * @internal
 */
export function syncTokenPolicy(syncTokens: SyncTokens): PipelinePolicy {
  return {
    name: "Sync Token Policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const syncTokenHeaderValue = syncTokens.getSyncTokenHeaderValue();

      if (syncTokenHeaderValue) {
        request.headers.set(SyncTokenHeaderName, syncTokenHeaderValue);
      }

      const response = await next(request);
      syncTokens.addSyncTokenFromHeaderValue(response.headers.get(SyncTokenHeaderName));
      return response;
    },
  };
}

/**
 * Sync token tracker (allows for real-time consistency, even in the face of
 * caching and load balancing within App Configuration).
 *
 * (protocol and format described here)
 * https://docs.microsoft.com/azure/azure-app-configuration/rest-api-consistency
 *
 * @internal
 */
export class SyncTokens {
  private _currentSyncTokens = new Map<string, SyncToken>();

  /**
   * Takes the value from the header named after the constant `SyncTokenHeaderName`
   * and adds it to our list of accumulated sync tokens.
   *
   * If given an empty value (or undefined) it clears the current list of sync tokens.
   * (indicates the service has properly absorbed values into the cluster).
   *
   * @param syncTokenHeaderValue - The full value of the sync token header.
   */
  addSyncTokenFromHeaderValue(syncTokenHeaderValue: string | undefined): void {
    if (syncTokenHeaderValue == null || syncTokenHeaderValue === "") {
      // eventually everything gets synced up and we don't have to track
      // these headers anymore
      this._currentSyncTokens.clear();
      return;
    }

    const newTokens = syncTokenHeaderValue.split(",").map(parseSyncToken);

    for (const newToken of newTokens) {
      const existingToken = this._currentSyncTokens.get(newToken.id);

      if (!existingToken || existingToken.sequenceNumber < newToken.sequenceNumber) {
        this._currentSyncTokens.set(newToken.id, newToken);
        continue;
      }
    }
  }

  /**
   * Gets a properly formatted SyncToken header value.
   */
  getSyncTokenHeaderValue(): string | undefined {
    if (this._currentSyncTokens.size === 0) {
      return undefined;
    }

    const syncTokenStrings = [];

    for (const syncToken of this._currentSyncTokens.values()) {
      // note that you don't include the 'sn' field here - that's only
      // used for internal tracking of the 'version' for the token itself
      syncTokenStrings.push(`${syncToken.id}=${syncToken.value}`);
    }

    return syncTokenStrings.join(",");
  }
}

// An example sync token (from their documentation):
//
// jtqGc1I4=MDoyOA==;sn=28
//
// Which breaks down to:
// id: jtqGc1I4
// value: MDoyOA==
// sequence number: 28
const syncTokenRegex = /^([^=]+)=([^;]+);sn=(\d+)$/;

interface SyncToken {
  id: string;
  value: string;
  sequenceNumber: number;
}

/**
 * Parses a single sync token into it's constituent parts.
 *
 * @param syncToken - A single sync token.
 *
 * @internal
 */
export function parseSyncToken(syncToken: string): SyncToken {
  const matches = syncToken.match(syncTokenRegex);

  if (matches == null) {
    throw new Error(
      `Failed to parse sync token '${syncToken}' with regex ${syncTokenRegex.source}`
    );
  }

  const sequenceNumber = parseInt(matches[3], 10);

  if (isNaN(sequenceNumber)) {
    // this should be impossible since our regex restricts to just digits
    // but there's nothing wrong with being thorough.
    throw new Error(`${syncToken}: The sequence number value '${matches[3]}' wasn't a number`);
  }

  return {
    id: matches[1],
    value: matches[2],
    sequenceNumber,
  };
}
