let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434398409011","blob":"blob157370434433000692"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434398409011')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:44 GMT',
  'ETag',
  '"0x8D768B7EBECFCCC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e97ce89-d01e-0012-6da0-9a52e0000000',
  'x-ms-client-request-id',
  'f7113140-e88f-4fce-9b22-2cbf39f33d42',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:44 GMT' ]);
