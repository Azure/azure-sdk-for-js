// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SasTokenProvider,
  SasTokenProviderImpl,
  createSasTokenProvider
} from "./auth/tokenProvider";
import { isCredential, isSasTokenProvider } from "./util/typeGuards";

export {
  SasTokenProvider,
  SasTokenProviderImpl,
  createSasTokenProvider,
  isCredential,
  isSasTokenProvider
};
