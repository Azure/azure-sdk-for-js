let nock = require('nock');

module.exports.hash = "ac768dafb4fc8749662101e1ba90833a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160714668350507432"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160714668350507432')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 05:38:04 GMT',
  'ETag',
  '"0x8D898DFF02ABB17"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f162f88e-701e-0029-76c8-ca33dc000000',
  'x-ms-client-request-id',
  'e8a4d2d3-c044-4bd0-a000-0f6c2c771872',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 05:38:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160714668350507432')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 05:38:04 GMT',
  'ETag',
  '"0x8D898DFF02ABB17"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f162f937-701e-0029-0ac8-ca33dc000000',
  'x-ms-client-request-id',
  '7dd8df78-e37c-426a-a400-02a02d4ddc0d',
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
  'Sat, 05 Dec 2020 05:38:04 GMT'
]);
