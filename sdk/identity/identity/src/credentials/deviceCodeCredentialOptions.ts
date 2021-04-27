// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Provides the user code and verification URI where the code must be
 * entered.  Also provides a message to display to the user which
 * contains an instruction with these details.
 */
export interface DeviceCodeInfo {
  /**
   * The device code that the user must enter into the verification page.
   */
  userCode: string;

  /**
   * The verification URI to which the user must navigate to enter the device
   * code.
   */
  verificationUri: string;

  /**
   * A message that may be shown to the user to instruct them on how to enter
   * the device code in the page specified by the verification URI.
   */
  message: string;
}

/**
 * Defines the signature of a callback which will be passed to
 * DeviceCodeCredential for the purpose of displaying authentication
 * details to the user.
 */
export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;

/**
 * Defines options for the InteractiveBrowserCredential class for NodeJS.
 */
export interface DeviceCodeCredentialOptions extends TokenCredentialOptions {}
