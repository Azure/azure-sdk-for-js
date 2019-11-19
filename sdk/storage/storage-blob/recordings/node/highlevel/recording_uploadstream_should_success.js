let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433863309933","blob":"blob157370433896407056"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433863309933')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:38 GMT',
  'ETag',
  '"0x8D768B7E8B9E1FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99d40ae9-b01e-0002-80a0-9a6406000000',
  'x-ms-client-request-id',
  '49441e21-5afb-4ca8-8a4a-a49a89936d94',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:38 GMT' ]);
