let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434433406198","blob":"blob157370434467405893"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434433406198')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:44 GMT',
  'ETag',
  '"0x8D768B7EC21557B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be66ef93-901e-001e-55a0-9abc11000000',
  'x-ms-client-request-id',
  '4ccfb7fe-0034-4bab-b816-3cb9b441e86b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:44 GMT' ]);
