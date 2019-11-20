let nock = require('nock');

module.exports.testInfo = {"share":"share157426859357802080","dir":"dir157426859397200911","file":"file157426859408000225"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157426859357802080')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:53 GMT',
  'ETag',
  '"0x8D76DD9AADAD44B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1649edef-401a-0034-7dc2-9f4c97000000',
  'x-ms-client-request-id',
  '10000eaf-3a51-486b-8393-37a352d6cd55',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157426859357802080/dir157426859397200911')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:54 GMT',
  'ETag',
  '"0x8D76DD9AB02257D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d629985-301a-003e-76c2-9fe820000000',
  'x-ms-client-request-id',
  '0433ae0a-312a-4acc-9701-09dde85dba65',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T16:49:54.0589949Z',
  'x-ms-file-last-write-time',
  '2019-11-20T16:49:54.0589949Z',
  'x-ms-file-creation-time',
  '2019-11-20T16:49:54.0589949Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157426859357802080/dir157426859397200911/file157426859408000225')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:54 GMT',
  'ETag',
  '"0x8D76DD9AB0F44EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41dde938-701a-0062-4ec2-9fbd78000000',
  'x-ms-client-request-id',
  '75786127-8e19-440f-ba87-69664b24e487',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T16:49:54.1449967Z',
  'x-ms-file-last-write-time',
  '2019-11-20T16:49:54.1449967Z',
  'x-ms-file-creation-time',
  '2019-11-20T16:49:54.1449967Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157426859357802080/dir157426859397200911/file157426859408000225')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:54 GMT',
  'ETag',
  '"0x8D76DD9AB13D8D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41dde93a-701a-0062-4fc2-9fbd78000000',
  'x-ms-client-request-id',
  '1bd2887d-6494-4d56-8a62-d446201a903b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-last-write-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-creation-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157426859357802080/dir157426859397200911/file157426859408000225', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:54 GMT',
  'ETag',
  '"0x8D76DD9AB170D34"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41dde93b-701a-0062-50c2-9fbd78000000',
  'x-ms-client-request-id',
  '2d561b88-42e4-4f3a-9bb0-d373d93f023e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157426859357802080/dir157426859397200911/file157426859408000225')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 20 Nov 2019 16:49:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D76DD9AB170D34"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41dde93c-701a-0062-51c2-9fbd78000000',
  'x-ms-client-request-id',
  '1711bc0c-396f-4fc8-99da-1d774ed7a7a5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-last-write-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-creation-time',
  '2019-11-20T16:49:54.1749974Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 20 Nov 2019 16:49:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157426859357802080')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1649edf2-401a-0034-7ec2-9f4c97000000',
  'x-ms-client-request-id',
  'f39e1491-61fa-407f-a6a4-0f91d50ee836',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 16:49:54 GMT'
]);
