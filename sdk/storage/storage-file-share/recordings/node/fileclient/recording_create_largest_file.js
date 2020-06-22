let nock = require('nock');

module.exports.hash = "60b311a9da34394d5deb32f8e27a78eb";

module.exports.testInfo = {"uniqueName":{"share":"share159256179930406953","dir":"dir159256180063107425","file":"file159256180107703922"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159256179930406953')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:39 GMT',
  'ETag',
  '"0x8D81439DB0EA7D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba8a-601a-001e-5e22-46da94000000',
  'x-ms-client-request-id',
  '142546bf-2119-4a2f-aa72-df26a9de8fb4',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 19 Jun 2020 10:16:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159256179930406953/dir159256180063107425')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:39 GMT',
  'ETag',
  '"0x8D81439DB572DB3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba8e-601a-001e-5f22-46da94000000',
  'x-ms-client-request-id',
  '7aa26ff4-af76-4308-84c4-e89df4977ab6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-file-change-time',
  '2020-06-19T10:16:39.8540211Z',
  'x-ms-file-last-write-time',
  '2020-06-19T10:16:39.8540211Z',
  'x-ms-file-creation-time',
  '2020-06-19T10:16:39.8540211Z',
  'x-ms-file-permission-key',
  '4512302258392269635*6216600178912236746',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 19 Jun 2020 10:16:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159256179930406953')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:40 GMT',
  'ETag',
  '"0x8D81439DB8A677D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba8f-601a-001e-6022-46da94000000',
  'x-ms-client-request-id',
  'bffc2cb5-6d3c-438b-8667-6164c474d3e1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 19 Jun 2020 10:16:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159256179930406953/dir159256180063107425/file159256180107703922')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:40 GMT',
  'ETag',
  '"0x8D81439DBECAC66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba91-601a-001e-6122-46da94000000',
  'x-ms-client-request-id',
  '02f5d8e0-a1d3-4fa5-bd94-9f0d66f6c8cb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-file-change-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-last-write-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-creation-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-permission-key',
  '18367126982671236164*6216600178912236746',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 19 Jun 2020 10:16:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159256179930406953/dir159256180063107425/file159256180107703922')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:41 GMT',
  'ETag',
  '"0x8D81439DC521155"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba9c-601a-001e-6222-46da94000000',
  'x-ms-client-request-id',
  'a7100e5a-efea-477c-9245-10d9ea199980',
  'x-ms-version',
  '2019-12-12',
  'x-ms-file-change-time',
  '2020-06-19T10:16:41.4982485Z',
  'x-ms-file-last-write-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-creation-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-permission-key',
  '18367126982671236164*6216600178912236746',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 19 Jun 2020 10:16:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share159256179930406953/dir159256180063107425/file159256180107703922')
  .reply(200, "", [
  'Content-Length',
  '4398046511104',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 19 Jun 2020 10:16:41 GMT',
  'ETag',
  '"0x8D81439DC521155"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba9d-601a-001e-6322-46da94000000',
  'x-ms-client-request-id',
  '4ddc70bb-8b55-4416-b05d-e7235b377ce7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-06-19T10:16:41.4982485Z',
  'x-ms-file-last-write-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-creation-time',
  '2020-06-19T10:16:40.8337510Z',
  'x-ms-file-permission-key',
  '18367126982671236164*6216600178912236746',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Fri, 19 Jun 2020 10:16:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159256179930406953')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61abba9e-601a-001e-6422-46da94000000',
  'x-ms-client-request-id',
  'fdd48eba-1b54-4aba-8f28-900a3a7747e0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 19 Jun 2020 10:16:42 GMT'
]);
