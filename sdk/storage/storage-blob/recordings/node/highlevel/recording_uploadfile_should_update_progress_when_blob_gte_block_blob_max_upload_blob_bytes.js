let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433796201411","blob":"blob157370433829603053"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433796201411')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:38 GMT',
  'ETag',
  '"0x8D768B7E853E9C2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb6a5ca0-b01e-0009-12a0-9a7c72000000',
  'x-ms-client-request-id',
  'c2f25f66-fb9b-4a56-b260-485354b79add',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:37 GMT' ]);
