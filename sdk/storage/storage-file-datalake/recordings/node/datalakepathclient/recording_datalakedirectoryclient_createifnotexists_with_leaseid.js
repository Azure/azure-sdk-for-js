let nock = require('nock');

module.exports.hash = "7f31802d1b5d6971d11955be71241081";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383029168204180","file":"file165383029195108714","testdir":"testdir165383029275805783"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029168204180')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:12 GMT',
  'ETag',
  '"0x8DA4175AE8F7B47"',
  'x-ms-request-id',
  '84b4a81b-a01e-0003-775e-731608000000',
  'x-ms-client-request-id',
  '6db40026-770e-4dec-8255-ead0f9a4857a',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029168204180/file165383029195108714')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:12 GMT',
  'ETag',
  '"0x8DA4175AEBC627E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6d3-a01f-0003-065e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c1967479-e5b8-4d37-9e00-df51d0514e81',
  'Date',
  'Sun, 29 May 2022 13:18:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029168204180/file165383029195108714', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6d4-a01f-0003-075e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '39bbf485-b6d8-4e63-9d2d-c62887e97215',
  'Date',
  'Sun, 29 May 2022 13:18:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029168204180/file165383029195108714')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:13 GMT',
  'ETag',
  '"0x8DA4175AF0D4B0D"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6d5-a01f-0003-085e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b9c9e9f1-3774-4300-a7fb-7040ef10ff73',
  'Date',
  'Sun, 29 May 2022 13:18:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029168204180/testdir165383029275805783')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:13 GMT',
  'ETag',
  '"0x8DA4175AF352747"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6d9-a01f-0003-095e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3eb2698a-5082-467f-b34f-9aa9db3ca2a9',
  'Date',
  'Sun, 29 May 2022 13:18:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383029168204180/testdir165383029275805783')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175AF352747"',
  'x-ms-request-id',
  '84b4a81f-a01e-0003-795e-731608000000',
  'x-ms-client-request-id',
  'adacd1ff-2f07-41be-92fc-4855fefb1e88',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:18:13 GMT',
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
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:18:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383029168204180')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a821-a01e-0003-7a5e-731608000000',
  'x-ms-client-request-id',
  '5d568b52-675b-45c9-90c1-ee005969704c',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:13 GMT'
]);
