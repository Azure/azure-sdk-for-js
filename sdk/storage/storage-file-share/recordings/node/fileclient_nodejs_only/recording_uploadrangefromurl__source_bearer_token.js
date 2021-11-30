let nock = require('nock');

module.exports.hash = "2967b7101d1c378913e626298c693466";

module.exports.testInfo = {"uniqueName":{"share":"share162548708720501318","dir":"dir162548708848407726","file":"file162548708964804407","container":"container162548708965104660","blockBlob":"blockBlob162548709082705215","file2":"file2162548709208001890"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162548708720501318')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:28 GMT',
  'ETag',
  '"0x8D93FAE04BFDC37"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95de86ca-c01a-0030-2796-71b723000000',
  'x-ms-client-request-id',
  '4059677f-8a2d-492b-b76c-29d4e991bddf',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 12:11:28 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162548708720501318/dir162548708848407726')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:29 GMT',
  'ETag',
  '"0x8D93FAE05734222"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee327ff6-001a-0007-1f96-71dd0f000000',
  'x-ms-client-request-id',
  'fe37c1aa-6966-4842-b275-00193bf1a459',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T12:11:29.7934882Z',
  'x-ms-file-last-write-time',
  '2021-07-05T12:11:29.7934882Z',
  'x-ms-file-creation-time',
  '2021-07-05T12:11:29.7934882Z',
  'x-ms-file-permission-key',
  '7735077018765312711*253227986890839374',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:11:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162548708965104660')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:30 GMT',
  'ETag',
  '"0x8D93FAE062661FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f095a078-801e-0016-4e96-71d1a1000000',
  'x-ms-client-request-id',
  '8c1d2fef-0681-41cc-99ed-971bcb8d1279',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 12:11:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162548708965104660/blockBlob162548709082705215', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'M7JgimpVGenaItzrpXsK3g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:32 GMT',
  'ETag',
  '"0x8D93FAE06E4628E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99c692f0-201e-000b-8096-71ae1b000000',
  'x-ms-client-request-id',
  '19b56f6d-097f-4980-a85f-5dc14def360e',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '1TZWfGM9BsA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:11:31 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162548708720501318/dir162548708848407726/file2162548709208001890')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:33 GMT',
  'ETag',
  '"0x8D93FAE079BC578"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22e2e1d0-301a-0017-5096-7136ed000000',
  'x-ms-client-request-id',
  'c9fca0e0-122e-4688-be75-cf0937f05874',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-last-write-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-creation-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:11:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162548708720501318/dir162548708848407726/file2162548709208001890')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:34 GMT',
  'ETag',
  '"0x8D93FAE0865AEEE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd27bcbce-201a-000b-7f96-71ae1b000000',
  'x-ms-client-request-id',
  '8d15b675-72a1-40f4-a9e4-e2d0af2b0f05',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:11:34 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162548708720501318/dir162548708848407726/file2162548709208001890')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:36 GMT',
  'ETag',
  '"0x8D93FAE09340493"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2f28f55-901a-0015-2996-710902000000',
  'x-ms-client-request-id',
  '61c2d004-867c-458f-8748-c75741e816d8',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'zGf3rvhKPeA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:11:36 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share162548708720501318/dir162548708848407726/file2162548709208001890')
  .reply(206, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-511/1024',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93FAE09340493"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8beaa51d-f01a-0001-6c96-719c3e000000',
  'x-ms-client-request-id',
  '332b913c-a921-4ec5-b427-185114e21aa8',
  'x-ms-version',
  '2020-10-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-last-write-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-creation-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 12:11:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share162548708720501318/dir162548708848407726/file2162548709208001890')
  .reply(206, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 512-1023/1024',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:11:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93FAE09340493"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e539ae95-801a-0009-4596-7191f4000000',
  'x-ms-client-request-id',
  '07b94a9c-7d83-470e-a535-8d6ef45569ee',
  'x-ms-version',
  '2020-10-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-last-write-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-creation-time',
  '2021-07-05T12:11:33.4144376Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 12:11:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162548708720501318')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2f28f5f-901a-0015-2e96-710902000000',
  'x-ms-client-request-id',
  '680b5283-7978-462f-a2ef-cba7ddaadfe0',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 12:11:39 GMT',
  'Connection',
  'close'
]);
