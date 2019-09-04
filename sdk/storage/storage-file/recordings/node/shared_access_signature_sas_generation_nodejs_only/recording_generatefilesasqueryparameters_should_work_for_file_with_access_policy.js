let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-04T08:14:46.696Z","share":"share156758488669608537","dir":"dir156758488713202202","file":"file156758488770008913"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758488669608537')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:46 GMT',
  'ETag',
  '"0x8D7310FF3208557"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c04f2438-901a-0038-2bf8-625343000000',
  'x-ms-client-request-id',
  '1581fb70-c41c-4d54-b953-aedf90dcd956',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758488669608537/dir156758488713202202')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:47 GMT',
  'ETag',
  '"0x8D7310FF37904F8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4b9567-101a-009f-5bf8-62bb81000000',
  'x-ms-client-request-id',
  'ec847ded-d7ed-465a-a72a-02abc67b0c09',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:14:47.5279608Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:14:47.5279608Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:14:47.5279608Z',
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
  'Wed, 04 Sep 2019 08:14:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758488669608537/dir156758488713202202/file156758488770008913')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:47 GMT',
  'ETag',
  '"0x8D7310FF3B6E064"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '279e2aa4-801a-00ef-29f8-620276000000',
  'x-ms-client-request-id',
  '125680d6-0b91-437d-adfd-8532c6045b10',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:14:47.9333476Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:14:47.9333476Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:14:47.9333476Z',
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
  'Wed, 04 Sep 2019 08:14:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758488669608537', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-04T08:09:46.6960000Z</Start><Expiry>2019-09-05T08:14:46.6960000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:48 GMT',
  'ETag',
  '"0x8D7310FF3FC783D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a82c728-101a-0054-21f8-62b8d4000000',
  'x-ms-client-request-id',
  '0a9f5cdc-1e4c-4963-b3f1-077bee81dae9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758488669608537/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156758488669608537\" DirectoryPath=\"\"><Entries><Directory><Name>dir156758488713202202</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85c5371e-e01a-013d-2ff8-627f95000000',
  'x-ms-client-request-id',
  '02bf3b22-13e5-479b-8e90-c385a353f837',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:14:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758488669608537')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b4c81fd-c01a-00fe-72f8-6298c2000000',
  'x-ms-client-request-id',
  '27923b3b-35f4-4bbe-b03b-9bde6cd17dc3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:48 GMT',
  'Connection',
  'close' ]);

