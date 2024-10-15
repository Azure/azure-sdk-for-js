// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare module "../models.js" {
  interface PeekMessagesOptions {
    /**
     * (Experimental for diagnostic purpose) Specifies whether to omit the body when peeking messages. Default value `false`.
     */
    omitMessageBody?: boolean;
  }
}
