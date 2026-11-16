// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native's global WebSocket is browser-compatible, so reuse that transport as-is
// (same pattern as get-binary-stream-response-react-native.mts).
export * from "./webSocketTransport-browser.mjs";
