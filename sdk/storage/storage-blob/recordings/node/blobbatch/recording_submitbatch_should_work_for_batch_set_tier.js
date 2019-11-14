let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309515400166"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309515400166')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:55 GMT',
  'ETag',
  '"0x8D768B50390D1BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be60a16d-901e-001e-149d-9abc11000000',
  'x-ms-client-request-id',
  '6635f1d5-b302-47fd-819d-47f6c0bc99f1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:54 GMT' ]);
