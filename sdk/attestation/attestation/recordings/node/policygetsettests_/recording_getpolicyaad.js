let nock = require('nock');

module.exports.hash = "702325e19e7ef33747a21a7630d61210";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('aad_attestation_url:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Access to /policies/SgxEnclave requires a valid JWT bearer token"}}, [
  'Connection',
  'close',
  'Date',
  'Thu, 10 Dec 2020 21:35:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'WWW-Authenticate',
  'Bearer authorization_uri="https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47", resource="https://attest.azure.net"',
  'x-ms-request-id',
  '00-79df7b492c582d60c85c418ee4c5807c-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01439.0001'
]);
