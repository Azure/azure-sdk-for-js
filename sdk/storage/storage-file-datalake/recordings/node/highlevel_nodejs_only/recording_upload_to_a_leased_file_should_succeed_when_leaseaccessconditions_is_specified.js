let nock = require('nock');

module.exports.hash = "dd69dc0fa7ab4a5a12e2dd6bbf2fabc6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240246909021","file":"file158368240250108056"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240246909021')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E6144A2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2d8c-601e-0014-4660-f586fa000000',
  'x-ms-client-request-id',
  '89cad07e-3902-43db-b4d5-64ad7e70ec1e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240246909021/file158368240250108056')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E6197EE2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e6c-401f-0021-1c60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '57519e04-9fa9-498a-8450-21a312fabca0',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240246909021/file158368240250108056', "aaa")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e6f-401f-0021-1f60-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '1be34fa4-da33-47fe-a7f3-f9d4825e897c',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240246909021/file158368240250108056')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E61F8600"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e71-401f-0021-2160-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '16d1befe-0ec2-4d9f-b402-e5e4eb422f3b',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240246909021/file158368240250108056')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E61F8600"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2db6-601e-0014-6b60-f586fa000000',
  'x-ms-client-request-id',
  '347f8dbc-b688-43df-a0a9-0996bc5ffb1c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-lease-id',
  '45c33ec9-e7c7-4216-a928-632ffda8f184',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158368240246909021/file158368240250108056')
  .reply(200, "", [
  'Content-Length',
  '3',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E61F8600"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2dbc-601e-0014-7160-f586fa000000',
  'x-ms-client-request-id',
  '8c68640e-07cc-4470-9e49-ad527da6f4f5',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240246909021/file158368240250108056')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E6279776"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e72-401f-0021-2260-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '84c55a29-75d0-4be8-9dda-d1ef0744c40e',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240246909021/file158368240250108056', "bb")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e73-401f-0021-2360-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '61b0bb76-7bda-45eb-b223-e1ad356c81a9',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158368240246909021/file158368240250108056')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E62D1B42"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '14400e74-401f-0021-2460-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '07359b49-39cb-45ea-a8f4-75bd63cf51ca',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240246909021/file158368240250108056')
  .reply(200, "bb", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E62D1B42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2ddc-601e-0014-0e60-f586fa000000',
  'x-ms-client-request-id',
  '8bae2c42-60df-4b6a-b777-1b7c4061a2c1',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240246909021')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2de5-601e-0014-1760-f586fa000000',
  'x-ms-client-request-id',
  '4b01ea55-76eb-4bab-8a85-2b22f5df7fe2',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
