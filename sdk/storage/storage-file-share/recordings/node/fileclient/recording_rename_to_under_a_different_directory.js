let nock = require('nock');

module.exports.hash = "0500430200786faa9c8faf58fc2d5391";

module.exports.testInfo = {"uniqueName":{"share":"share166538340684001774","dir":"dir166538340798608973","file":"file166538340811101483","sourcedir":"sourcedir166538340811507665","sourcefile":"sourcefile166538340822604209","destdir":"destdir166538340834002730","destfile":"destfile166538340845307815"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E04F628F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16aa-601a-0073-6471-dcfd88000000',
  'x-ms-client-request-id',
  '2ed38835-96ff-4289-b1e9-3cd50349249a',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 10 Oct 2022 06:30:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774/dir166538340798608973')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E066A4D7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16af-601a-0073-6571-dcfd88000000',
  'x-ms-client-request-id',
  'a3101ee9-6e4c-4df0-ad43-bba0ba727978',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.3443927Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.3443927Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.3443927Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774/sourcedir166538340811507665')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E07855AD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16b1-601a-0073-6671-dcfd88000000',
  'x-ms-client-request-id',
  '5e6c1f43-9da5-4a2a-bd09-07e34b53a015',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.4603309Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.4603309Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.4603309Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774/sourcedir166538340811507665/sourcefile166538340822604209')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E089B871"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16b2-601a-0073-6771-dcfd88000000',
  'x-ms-client-request-id',
  '9280b81a-c704-40bd-b9b6-a6dbd3712caf',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774/destdir166538340834002730')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E09AA61B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16b3-601a-0073-6871-dcfd88000000',
  'x-ms-client-request-id',
  'f872e67e-2932-4d10-97f2-eaa679012256',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.6852123Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.6852123Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.6852123Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166538340684001774/destdir166538340834002730/destfile166538340845307815')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E0B6199E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16b4-601a-0073-6971-dcfd88000000',
  'x-ms-client-request-id',
  'e49ea9f1-3670-4ec9-821c-dde7af0293b8',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.8651166Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share166538340684001774/destdir166538340834002730/destfile166538340845307815')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 Oct 2022 06:30:08 GMT',
  'ETag',
  '"0x8DAAA88E0B6199E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16c5-601a-0073-7871-dcfd88000000',
  'x-ms-client-request-id',
  'ef71f9c3-ab40-48fe-8d44-1f79bfee2e62',
  'x-ms-version',
  '2021-08-06',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-10-10T06:30:08.8651166Z',
  'x-ms-file-last-write-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-creation-time',
  '2022-10-10T06:30:08.5742705Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share166538340684001774/sourcedir166538340811507665/sourcefile166538340822604209')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16c6-601a-0073-7971-dcfd88000000',
  'x-ms-client-request-id',
  'db4a793e-1710-4ffa-87e5-b83d57275517',
  'x-ms-version',
  '2021-08-06',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166538340684001774')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6c16c7-601a-0073-7a71-dcfd88000000',
  'x-ms-client-request-id',
  '9ee4c3a0-3ed9-4be8-bb75-e2f0e0e9da66',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Mon, 10 Oct 2022 06:30:08 GMT'
]);
