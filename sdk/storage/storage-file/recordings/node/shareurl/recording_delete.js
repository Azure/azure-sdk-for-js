let nock = require('nock');

module.exports.testInfo = {"share":"share156758483156204110"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758483156204110')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:51 GMT',
  'ETag',
  '"0x8D7310FD242EF6B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a10bd87a-601a-004e-64f8-62d90b000000',
  'x-ms-client-request-id',
  'd9f1454d-4578-4634-b6f4-f1f58a7ca8b5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758483156204110')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf565ec4-601a-002c-33f8-621b2c000000',
  'x-ms-client-request-id',
  'cbb77df0-1743-42c7-8e81-820b98756311',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:51 GMT',
  'Connection',
  'close' ]);

