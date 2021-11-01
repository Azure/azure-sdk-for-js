// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalRequestParameters } from "../sendRequest";
import { StreamType } from "./getClientHelpers";

export function getOptionsForStream(
  options: InternalRequestParameters,
  streamType?: StreamType
): InternalRequestParameters {
  if (streamType === "NodeJS") {
    return { ...options, responseAsStream: true };
  }
  return options;
}
