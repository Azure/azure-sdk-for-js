let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309803804156"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309803804156')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:58 GMT',
  'ETag',
  '"0x8D768B50547D5AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8f1e501-301e-0057-559d-9a8f71000000',
  'x-ms-client-request-id',
  'd81411be-4557-4b61-b8d1-d32a22b5f1a9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:57 GMT' ]);
