let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534404772906141","file":"file157534404887108861"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534404772906141')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:10 GMT',
  'ETag',
  '"0x8D777A0D25AEF56"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf67d240-e01e-000e-4589-a9a995000000',
  'x-ms-client-request-id',
  '9d7d3cca-108c-49d5-a736-8d6fa834b1d0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:10 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534404772906141/file157534404887108861')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:11 GMT',
  'ETag',
  '"0x8D777A0D30D177B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a701709-401f-0047-4a89-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ab9b0696-3cd0-4bca-87d6-3b6b3106843e',
  'Date',
  'Tue, 03 Dec 2019 03:28:11 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404772906141/file157534404887108861', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0a70170a-401f-0047-4b89-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7230a8fd-cb92-499e-b4e8-3ae79f1f0912',
  'Date',
  'Tue, 03 Dec 2019 03:28:11 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404772906141/file157534404887108861')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:12 GMT',
  'ETag',
  '"0x8D777A0D3674987"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0a70170b-401f-0047-4c89-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '54308a99-93bc-4331-baba-054e4a27689d',
  'Date',
  'Tue, 03 Dec 2019 03:28:12 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404772906141/file157534404887108861')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:12 GMT',
  'ETag',
  '"0x8D777A0D3674987"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '0a70170c-401f-0047-4d89-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fdbfd4bc-ce52-46f3-baad-3cf2c119a57f',
  'Date',
  'Tue, 03 Dec 2019 03:28:12 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534404772906141/file157534404887108861')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:12 GMT',
  'ETag',
  '"0x8D777A0D3674987"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-x-wt',
  'x-ms-acl',
  'user::rw-,group::r-x,other::-wx',
  'x-ms-request-id',
  '0a70170e-401f-0047-4e89-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6c0d5bc7-e1f2-4bc8-b05c-6bc06a4a1565',
  'Date',
  'Tue, 03 Dec 2019 03:28:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534404772906141')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf67d738-e01e-000e-4089-a9a995000000',
  'x-ms-client-request-id',
  '48b2ee7c-acc0-4fd2-bdfe-5e8e9b4be29d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:12 GMT' ]);
