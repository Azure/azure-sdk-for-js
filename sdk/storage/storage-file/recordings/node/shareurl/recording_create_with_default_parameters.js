let nock = require('nock');

module.exports.testInfo = {"share":"share156758482909305822"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758482909305822')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:49 GMT',
  'ETag',
  '"0x8D7310FD0C8AD1D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ff434d8-701a-0089-3df8-624d56000000',
  'x-ms-client-request-id',
  '08f261b9-61b6-4af0-bc8a-8cbf20e8c923',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758482909305822')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e53e9aed-c01a-0105-0df8-62db55000000',
  'x-ms-client-request-id',
  'fee7e003-e94e-4707-b018-27f12f636b79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:49 GMT',
  'Connection',
  'close' ]);

