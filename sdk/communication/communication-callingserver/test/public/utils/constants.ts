// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { base64encode } from "../../../src/utils/base64";

export const NAMESPACE_UUID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
export const CALLBACK_URI = "https://endpoint/callback";
export const App_Base_Url = "https://endpoint";
export const Audio_File_Name = "sample-message.wav";
export const Incoming_Request_Secret = "helloworld";
export const Audio_File_Url = `${App_Base_Url}/audio/${Audio_File_Name}`;
export const App_Callback_Url = `${App_Base_Url}/api/incident/callback?SecretKey=${
  base64encode(Incoming_Request_Secret)
}`;
