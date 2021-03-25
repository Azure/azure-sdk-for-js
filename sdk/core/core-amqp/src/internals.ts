// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NamedKeyTokenProvider,
  SharedAccessSignatureTokenProvider,
  TokenProvider,
  createTokenProvider
} from "./auth/tokenProvider";
import {
  isCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenProvider
} from "./util/typeGuards";

export {
  NamedKeyTokenProvider,
  SharedAccessSignatureTokenProvider,
  TokenProvider,
  createTokenProvider,
  isCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenProvider
};
