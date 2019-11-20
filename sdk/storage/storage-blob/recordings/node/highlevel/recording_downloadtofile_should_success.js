let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434467908955","blob":"blob157370434502509739"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434467908955')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:44 GMT',
  'ETag',
  '"0x8D768B7EC56D780"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5d9e9e8-601e-0022-33a0-9a08ca000000',
  'x-ms-client-request-id',
  '336ce286-a2dc-49a2-bb7a-66ae32b660a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:44 GMT' ]);
