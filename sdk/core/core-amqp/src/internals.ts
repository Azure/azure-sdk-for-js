// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenProvider, TokenProvider, createTokenProvider } from "./auth/tokenProvider";
import {
  isCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenProvider
} from "./util/typeGuards";

export {
  SasTokenProvider,
  TokenProvider,
  createTokenProvider,
  isCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenProvider
};
