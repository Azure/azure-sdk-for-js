let nock = require('nock');

module.exports.hash = "6822ea4489dc148fe8ffad7a20806d2e";

module.exports.testInfo = {"uniqueName":{"sessionId":"sessionId162100057722809393"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 14 May 2021 13:56:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'StoLqdra6E6J9q/Z6klbQw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393', {"maxLeaseTimeMinutes":4,"size":"Standard"})
  .query(true)
  .reply(201, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 14 May 2021 13:56:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'v/hmx7jChUekfRnVpoUcvA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393')
  .query(true)
  .reply(200, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":4,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 14 May 2021 13:56:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'NwwLFYnb8kGLLuWCZe1cwg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .patch('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393', {"maxLeaseTimeMinutes":5})
  .query(true)
  .reply(200, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 14 May 2021 13:56:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'rjw2qlWGKUCwlg+i+P2Hfg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393')
  .query(true)
  .reply(200, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 14 May 2021 13:56:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '649zDlT9Y0uItMTv2mQeKQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393')
  .query(true)
  .reply(200, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","elapsedTimeMinutes":0,"maxLeaseTimeMinutes":5,"size":"Standard","status":"Starting"}, [
  'Date',
  'Fri, 14 May 2021 13:59:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '172',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '7uCLGpQpS0mJfSX3mT3XKA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393')
  .query(true)
  .reply(200, {"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","arrInspectorPort":50830,"handshakePort":61353,"elapsedTimeMinutes":0,"hostname":"1362320837-4b5f741c-707f-43fd-87dc-3e048677f9b8.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}, [
  'Date',
  'Fri, 14 May 2021 13:59:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '343',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'w+ckxqtEPkOyRAm+4uq6Rg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/sessions')
  .query(true)
  .reply(200, {"sessions":[{"id":"sessionId162100057722809393","creationTime":"2021-05-14T13:56:19.7826038+00:00","arrInspectorPort":50830,"handshakePort":61353,"elapsedTimeMinutes":0,"hostname":"1362320837-4b5f741c-707f-43fd-87dc-3e048677f9b8.remoterendering.vm.eastus2.mixedreality.azure.com","maxLeaseTimeMinutes":5,"size":"Standard","status":"Ready","teraflops":8.1}]}, [
  'Date',
  'Fri, 14 May 2021 13:59:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '358',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'iXCkt2k7zkeXydGX34/J1A.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .post('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId162100057722809393/:stop')
  .query(true)
  .reply(204, "", [
  'Date',
  'Fri, 14 May 2021 13:59:12 GMT',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'H9Zlro+/A02pHNmVJtrnJg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
