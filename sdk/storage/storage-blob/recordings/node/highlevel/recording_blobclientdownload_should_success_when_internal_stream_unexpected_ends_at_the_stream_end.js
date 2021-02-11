let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434292403687","blob":"blob157370434327207978"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434292403687')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:43 GMT',
  'ETag',
  '"0x8D768B7EB4AFA19"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c296d4e5-501e-0047-80a0-9ab997000000',
  'x-ms-client-request-id',
  '1f9db87a-1081-4a2b-b527-a5251cec87fb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:42 GMT' ]);
