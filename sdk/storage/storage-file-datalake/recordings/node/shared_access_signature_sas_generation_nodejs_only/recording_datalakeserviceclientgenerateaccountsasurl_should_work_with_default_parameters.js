let nock = require('nock');

module.exports.hash = "a251032f68a3d6c498e647e59a7ef6fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160714896615505754"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160714896615505754')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 06:16:07 GMT',
  'ETag',
  '"0x8D898E540BE9871"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40a4acf4-501e-003e-61ce-caf3bf000000',
  'x-ms-client-request-id',
  'ff7b00fd-7bf2-413d-8da4-2f74001d13ca',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:16:06 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160714896615505754')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 06:16:07 GMT',
  'ETag',
  '"0x8D898E540BE9871"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4eebbe17-d01e-0060-4ece-ca00bc000000',
  'x-ms-client-request-id',
  '4977ce0f-0597-44f7-9d37-264fba7fcbde',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 05 Dec 2020 06:16:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160714896615505754')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4eebbe6b-d01e-0060-17ce-ca00bc000000',
  'x-ms-client-request-id',
  '14d9b5fb-a2a5-4b61-9a1d-271799b7fd51',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:16:08 GMT'
]);
