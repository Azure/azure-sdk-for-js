let nock = require('nock');

module.exports.testInfo = {"share":"share156816827645504230"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827645504230')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:56 GMT',
  'ETag',
  '"0x8D7365E4293FC3E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c45926e3-101a-002d-0c47-68e53c000000',
  'x-ms-client-request-id',
  'ffebf7db-3b44-4131-a227-1aa9a3fc367d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:56 GMT' ]);

