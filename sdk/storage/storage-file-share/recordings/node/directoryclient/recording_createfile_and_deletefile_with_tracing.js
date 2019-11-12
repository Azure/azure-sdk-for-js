let nock = require('nock');

module.exports.testInfo = {"share":"share157008893947504191","dir":"dir157008894411606682","directory":"directory157008894430509739","file":"file157008894445507000"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008893947504191')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:49:03 GMT',
  'ETag',
  '"0x8D747D6292EE866"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd04570cb-201a-0073-71bf-79a09e000000',
  'x-ms-client-request-id',
  '21b69fb7-5d9d-4541-a538-d888dd26a605',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:49:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008893947504191/dir157008894411606682')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:49:03 GMT',
  'ETag',
  '"0x8D747D629549DE8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7da158c1-e01a-007c-57bf-79d6f2000000',
  'x-ms-client-request-id',
  '052fcf14-449e-41b4-80ce-f697a881f7c9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-03T07:49:03.8199272Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:49:03.8199272Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:49:03.8199272Z',
  'x-ms-file-permission-key',
  '10601938801812273194*18156966929047809955',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 03 Oct 2019 07:49:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008893947504191/dir157008894411606682/directory157008894430509739')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:49:03 GMT',
  'ETag',
  '"0x8D747D6296EE156"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f835ce09-301a-0022-48bf-793d12000000',
  'x-ms-client-request-id',
  'd53a7bcf-1f40-4e72-bcae-d5373abe72ab',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-03T07:49:03.9920470Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:49:03.9920470Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:49:03.9920470Z',
  'x-ms-file-permission-key',
  '10601938801812273194*18156966929047809955',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 03 Oct 2019 07:49:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008893947504191/dir157008894411606682/directory157008894430509739/file157008894445507000')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:49:04 GMT',
  'ETag',
  '"0x8D747D62986652B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df180c40-b01a-002c-15bf-7914a2000000',
  'x-ms-client-request-id',
  'beb21b28-59f0-41ac-b789-29fc4c04a426',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-permission-key',
  '6006229023213291309*18156966929047809955',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835093239654252544',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 03 Oct 2019 07:49:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157008893947504191/dir157008894411606682/directory157008894430509739/file157008894445507000')
  .reply(200, "", [ 'Content-Length',
  '256',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:49:04 GMT',
  'ETag',
  '"0x8D747D62986652B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f37a0db-901a-00ad-1ebf-79b478000000',
  'x-ms-client-request-id',
  'efd6e38c-260f-4053-9d61-60e0ae6e8791',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:49:04.1461547Z',
  'x-ms-file-permission-key',
  '6006229023213291309*18156966929047809955',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835093239654252544',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 03 Oct 2019 07:49:03 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157008893947504191/dir157008894411606682/directory157008894430509739/file157008894445507000')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9107695a-c01a-007b-51bf-79ba91000000',
  'x-ms-client-request-id',
  '7e2d3fc5-728f-4061-98ac-1817d4a4cbd4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:49:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157008893947504191/dir157008894411606682/directory157008894430509739/file157008894445507000')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94c5f31d-501a-00c0-12bf-790033000000',
  'x-ms-client-request-id',
  '24a2c7d0-7570-4852-b8b7-7f9b88a5b653',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 03 Oct 2019 07:49:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157008893947504191/dir157008894411606682/directory157008894430509739')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf33ca75-a01a-0052-43bf-7984e5000000',
  'x-ms-client-request-id',
  'd5dc9f3b-1281-4c69-9ae1-74066a917b08',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:49:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157008893947504191')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cdc89a58-b01a-00e7-05bf-7917f7000000',
  'x-ms-client-request-id',
  'f0d46034-6432-4710-8428-175c60a44254',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:49:05 GMT' ]);

