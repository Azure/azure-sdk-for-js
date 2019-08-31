let nock = require('nock');

module.exports.testInfo = {"container":"container156711934468905568"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711934468905568')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:55:45 GMT',
  'ETag',
  '"0x8D72CD4068CA0FE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd76fed1-001e-00c0-41bc-5ef0d5000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:55:44 GMT',
  'Connection',
  'close' ]);

