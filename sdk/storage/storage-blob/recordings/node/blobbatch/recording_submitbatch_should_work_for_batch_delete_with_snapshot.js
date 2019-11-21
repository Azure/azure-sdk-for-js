let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309445509359"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309445509359')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:54 GMT',
  'ETag',
  '"0x8D768B50324E456"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e9d7155-601e-0066-289d-9ad4a6000000',
  'x-ms-client-request-id',
  'eef9210a-7321-4c7e-bb4f-3723c728de31',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:54 GMT' ]);
