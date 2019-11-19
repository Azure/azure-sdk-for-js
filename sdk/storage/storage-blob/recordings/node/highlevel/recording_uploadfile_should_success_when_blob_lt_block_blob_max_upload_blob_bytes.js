let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433638804320","blob":"blob157370433672508468"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433638804320')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:36 GMT',
  'ETag',
  '"0x8D768B7E764A3B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb6a5a5e-b01e-0009-72a0-9a7c72000000',
  'x-ms-client-request-id',
  '0bcbb0eb-50ec-40c6-8617-b4f31a519d10',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:35 GMT' ]);
