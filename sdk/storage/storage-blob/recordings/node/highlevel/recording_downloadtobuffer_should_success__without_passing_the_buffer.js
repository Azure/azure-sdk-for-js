let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433995707146","blob":"blob157370434029402880"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433995707146')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:40 GMT',
  'ETag',
  '"0x8D768B7E9852C2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99eae5c3-201e-002e-2da0-9ae63b000000',
  'x-ms-client-request-id',
  '417b4617-3747-4308-a796-e5a456c96ca6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:40 GMT' ]);
