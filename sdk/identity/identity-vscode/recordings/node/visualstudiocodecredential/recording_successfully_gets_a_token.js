let nock = require('nock');

module.exports.hash = "1c4d58b38fd9e805bcc6c90e143ce993";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/common/oauth2/v2.0/token', "grant_type=refresh_token&client_id=aebc6443-996d-45c2-90f0-388ff96faa56&refresh_token=refresh_token&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default%20offline_access")
  .reply(200, {"token_type":"Bearer","scope":"email openid profile https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Tasks.ReadWrite https://graph.microsoft.com/User.Read https://graph.microsoft.com/.default","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token","refresh_token":"refresh_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'd8a6162d-b070-4f8b-bcf6-34a6faee0600',
  'x-ms-ests-server',
  '2.1.11787.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=fpc;; expires=Thu, 15-Jul-2021 01:45:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Jun 2021 01:45:15 GMT',
  'Content-Length',
  '3657'
]);
