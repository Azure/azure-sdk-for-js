let nock = require('nock');

module.exports.testInfo = {"share":"share156758489360100293"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758489360100293')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:53 GMT',
  'ETag',
  '"0x8D7310FF73ED9C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2168da35-401a-00bd-21f8-627e9e000000',
  'x-ms-client-request-id',
  'e1975f68-d4e9-4a0b-adf4-3658e6bc93c0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758489360100293')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '064912cd-001a-002a-7bf8-622893000000',
  'x-ms-client-request-id',
  '6f8a779c-4455-47b3-b8ed-1c8706b8400d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:54 GMT',
  'Connection',
  'close' ]);

