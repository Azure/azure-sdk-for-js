// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable */
// tslint:disable
// @ts-nocheck
var ws = null;

if (typeof WebSocket !== "undefined") {
  ws = WebSocket;
} else if (typeof MozWebSocket !== "undefined") {
  ws = MozWebSocket;
} else if (typeof window !== "undefined") {
  ws = window.WebSocket || window.MozWebSocket;
}

module.exports = ws;
/* eslint-enable */
