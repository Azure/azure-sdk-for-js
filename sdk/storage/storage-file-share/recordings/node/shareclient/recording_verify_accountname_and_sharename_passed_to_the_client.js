let nock = require('nock');

module.exports.testInfo = {"share":"share157022255738504102"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157022255738504102')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 20:55:57 GMT',
  'ETag',
  '"0x8D7490D416F718C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '970845bd-401a-0017-21f6-7aa69f000000',
  'x-ms-client-request-id',
  'f50cf77c-7ae5-4a34-9300-9d7b19dc0e27',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157022255738504102')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e108667f-701a-005b-39f6-7a6180000000',
  'x-ms-client-request-id',
  'c0540793-e744-42c7-a556-e4a01dc2e8b3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:57 GMT' ]);

