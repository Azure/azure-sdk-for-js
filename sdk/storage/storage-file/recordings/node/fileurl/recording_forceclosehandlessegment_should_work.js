let nock = require('nock');

module.exports.testInfo = {"share":"share156758480239208338","dir":"dir156758480279401216","file":"file156758480320605674"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480239208338')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:22 GMT',
  'ETag',
  '"0x8D7310FC0DE0629"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '82a21deb-901a-0108-2af8-621381000000',
  'x-ms-client-request-id',
  '5273527f-6881-4c4b-a15a-fcdf45c5c911',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480239208338/dir156758480279401216')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:23 GMT',
  'ETag',
  '"0x8D7310FC11C8E01"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06cbc39a-001a-003a-44f8-62edfb000000',
  'x-ms-client-request-id',
  '8c502764-f524-4a14-9b90-79b3a6cb9272',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:23.0359041Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:23.0359041Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:23.0359041Z',
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
  'Wed, 04 Sep 2019 08:13:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480239208338/dir156758480279401216/file156758480320605674')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:23 GMT',
  'ETag',
  '"0x8D7310FC159A5E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf565e99-601a-002c-26f8-621b2c000000',
  'x-ms-client-request-id',
  '6b133629-730b-4ec3-b32b-83ca8afa5902',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:23.4362856Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:23.4362856Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:23.4362856Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:13:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480239208338/dir156758480279401216/file156758480320605674')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7041ab8f-901a-0127-09f8-621e4a000000',
  'x-ms-client-request-id',
  'bb235fb7-6ef3-4f00-9201-4616ec1f2da3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 04 Sep 2019 08:13:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758480239208338')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab5181a2-701a-015d-5df8-62030a000000',
  'x-ms-client-request-id',
  '011ce786-5ce2-4504-aeec-a8019ed25096',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:23 GMT',
  'Connection',
  'close' ]);

