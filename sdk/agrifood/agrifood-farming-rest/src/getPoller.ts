// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller, PollerLike, PollOperationState } from "@azure-rest/core-client-lro";
import { HttpResponse } from "@azure-rest/core-client";
import { FarmBeatsRestClient } from "./farmBeats";

/**
 * Gets a poller object to help polling for a long running operation status.
 * @param client - FarmBeats Rest Client.
 * @param initialResponse - Initial response for the operation that needs to be polled.
 * @returns - Gets a poller that can be run on demand or automatically awaited until the operation is completed.
 */
export function getPoller<TResult extends HttpResponse>(
  client: FarmBeatsRestClient,
  initialResponse: TResult
): PollerLike<PollOperationState<TResult>, TResult> {
  return getLongRunningPoller(client, initialResponse);
}
