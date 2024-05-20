// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";

export const baseUri = "https://contoso.api.fake";

export const MOCK_ENDPOINT = "https://REDACTED.communication.azure.com/";
export const MOCK_CONNECTION_STRING = `endpoint=${MOCK_ENDPOINT};accesskey=eyJhbG`;
export const CALL_CONNECTION_ID = "callConnectionId";
export const CALL_SERVER_CALL_ID = "serverCallId";
export const CALL_CALLER_ID = "callerId";
export const CALL_CALLER_DISPLAY_NAME = "callerDisplayName";
export const CALL_TARGET_ID = "targetId";
export const CALL_TARGET_ID_2 = "targetId2";
export const CALL_CONNECTION_STATE = "connected";
export const CALL_SUBJECT = "subject";
export const CALL_CALLBACK_URL = "https://REDACTED.com/events";
export const CALL_INCOMING_CALL_CONTEXT = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.REDACTED";
export const CALL_OPERATION_CONTEXT = "operationContext";
export const RECORDING_ID = "recordingId";
export const RECORDING_STATE = "active";
export const MEDIA_UR_MP3 = "https://example.com/audio.mp3";
export const MEDIA_URL_WAV = "https://example.com/audio/test.wav";

declare function btoa(stringToEncode: string): string;

export const generateToken = (): string => {
  const validForMinutes = 60;
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = isNode ? Buffer.from(tokenString).toString("base64") : btoa(tokenString);
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};
