let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309584709110"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309584709110')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:56 GMT',
  'ETag',
  '"0x8D768B503F9F593"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a43e0ce4-f01e-0005-779d-9a9283000000',
  'x-ms-client-request-id',
  '7605b5db-6de9-41a2-882b-15878b1258cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:55 GMT' ]);
