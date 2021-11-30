let nock = require('nock');

module.exports.hash = "acef1917e9635185f91a50bd8cf382ef";

module.exports.testInfo = {"uniqueName":{"sessionId":"sessionId161979114585506877"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 30 Apr 2021 13:59:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'EYS/fr9qGECyJWUZ+i/4aw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/sessions/sessionId161979114585506877', {"maxLeaseTimeMinutes":-4,"size":"Standard"})
  .query(true)
  .reply(400, {"error":{"code":"BadRequest","message":"The maxLeaseTimeMinutes value cannot be negative."}}, [
  'Date',
  'Fri, 30 Apr 2021 13:59:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '93',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'yWZb5GN80UC+N/AhYPyjpg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
