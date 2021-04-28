let nock = require('nock');

module.exports.hash = "acef1917e9635185f91a50bd8cf382ef";

module.exports.testInfo = {"uniqueName":{"sessionId":"sessionId161960654135800182"},"newDate":{}}

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .post('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960634870200973/:stop')
  .query(true)
  .reply(204, "", [
  'Date',
  'Wed, 28 Apr 2021 10:42:21 GMT',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'A0gcQVT0R0+Pbh9xuXFZvQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:21 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '57zI/Ts+iE6hhCpqbdzpxw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161960654135800182', {"maxLeaseTimeMinutes":-4,"size":"Standard"})
  .query(true)
  .reply(400, {"error":{"code":"BadRequest","message":"The maxLeaseTimeMinutes value cannot be negative."}}, [
  'Date',
  'Wed, 28 Apr 2021 10:42:21 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '93',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'a9opucZKg0O3VdjuvuGnGg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
