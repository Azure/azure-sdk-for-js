let nock = require('nock');

module.exports.testInfo = {"share":"share156758473717006093","dir":"dir156758473761609394"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758473717006093')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:17 GMT',
  'ETag',
  '"0x8D7310F9A01E398"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2af92776-001a-0083-30f8-62e9e1000000',
  'x-ms-client-request-id',
  '6d3fe5f8-6fd3-41dd-8875-dad08819165a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758473717006093/dir156758473761609394')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:17 GMT',
  'ETag',
  '"0x8D7310F9A4E36D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5fb36df-b01a-00cb-39f8-62f4d6000000',
  'x-ms-client-request-id',
  '669b7ce1-e2ac-4166-b4d1-2e22c9afb87d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:17.9302104Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:17.9302104Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:17.9302104Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758473717006093/dir156758473761609394')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba25ad8a-b01a-00a9-2bf8-6236f1000000',
  'x-ms-client-request-id',
  'a8222c22-4bb4-4391-944d-acdfd59c192c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 04 Sep 2019 08:12:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758473717006093')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '113929b9-601a-00ba-01f8-6212fd000000',
  'x-ms-client-request-id',
  '4b4652f6-30bc-4e1d-a605-74cbeecfbd13',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:18 GMT',
  'Connection',
  'close' ]);

