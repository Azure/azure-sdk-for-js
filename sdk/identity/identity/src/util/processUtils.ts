// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import internalCommandExists from "command-exists";

/**
 * @internal
 */
export const processUtils = {
  /**
   * Mockable reference of commandExists
   * @internal
   */
  async exists(cmd: string): Promise<string> {
    return internalCommandExists(cmd);
  }
};
