let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434363604628","blob":"blob157370434397908488"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434363604628')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:43 GMT',
  'ETag',
  '"0x8D768B7EBB7679A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ea361d2-601e-0066-7fa0-9ad4a6000000',
  'x-ms-client-request-id',
  '9c535e33-4987-41bf-bb49-b2ea0ab14f76',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:43 GMT' ]);
