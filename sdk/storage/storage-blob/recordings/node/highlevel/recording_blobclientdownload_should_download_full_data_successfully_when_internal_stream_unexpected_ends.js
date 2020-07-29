let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434327803600","blob":"blob157370434362003320"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434327803600')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:43 GMT',
  'ETag',
  '"0x8D768B7EB8064EF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2f709b91-501e-0021-5ea0-9a0bcd000000',
  'x-ms-client-request-id',
  '080cf8b4-37b5-4c3d-9f53-ef3a2fe76255',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:42 GMT' ]);
