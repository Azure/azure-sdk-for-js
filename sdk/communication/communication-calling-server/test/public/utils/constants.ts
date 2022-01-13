// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { base64encode } from "../../../src/utils/base64";

export const NAMESPACE_UUID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
export const InvalidServerId = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
export const InvalidDeleteUrl = "https://us-storage.asm.skype.com/v1/objects/0-wus-d10-00000000000000000000000000000000";
export const InvalidConnectionString = "endpoint=https://test.communication.azure.com/;accesskey=1234"
export const DeleteUrl = "https://us-storage.asm.skype.com/v1/objects/0-wus-d10-00000000000000000000000000000000";
export const CALLBACK_URL = "https://endpoint/callback";
export const App_Base_Url = "https://endpoint";
export const Audio_File_Name = "sample-message.wav";
export const Incoming_Request_Secret = "helloworld";
export const IncomingCallContext = "2sfssfs2ffef";
export const Audio_File_Url = 'https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav';
export const App_Callback_Url = `${App_Base_Url}/api/incident/callback?SecretKey=${base64encode(
  Incoming_Request_Secret
)}`;
