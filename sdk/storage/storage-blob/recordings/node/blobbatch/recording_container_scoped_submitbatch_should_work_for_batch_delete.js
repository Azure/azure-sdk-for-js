let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309354704777"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309354704777')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:53 GMT',
  'ETag',
  '"0x8D768B502B43FA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f759e738-601e-004f-249d-9aa2e4000000',
  'x-ms-client-request-id',
  '6297a95f-5fc6-4e24-9981-12fcdf930bd1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:53 GMT' ]);
