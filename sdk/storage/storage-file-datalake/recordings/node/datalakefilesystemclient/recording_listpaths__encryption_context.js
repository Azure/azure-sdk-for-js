let nock = require('nock');

module.exports.hash = "abdb3a72a29ed2da2a03386e3d4da38e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167782473777600474","filesystem167782473777600474":"filesystem167782473777600474167782473928703780","file":"file167782473956401754","dir":"dir167782474095606783"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782473777600474')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:39 GMT',
  'ETag',
  '"0x8DB1BB01B9B3EAF"',
  'x-ms-request-id',
  '9c31817a-201e-0000-0198-4de568000000',
  'x-ms-client-request-id',
  '681bf013-9019-483a-82e5-3ac79c956cf5',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782473777600474167782473928703780')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:39 GMT',
  'ETag',
  '"0x8DB1BB01BD64C39"',
  'x-ms-request-id',
  '9c31817e-201e-0000-0298-4de568000000',
  'x-ms-client-request-id',
  'e933e1ed-b9c7-483e-b266-e0e36110e08d',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782473777600474167782473928703780/file167782473956401754')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:41 GMT',
  'ETag',
  '"0x8DB1BB01CADA888"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '73489dca-601f-0004-7298-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '0fa5f16d-eb30-4c1c-9960-0e1461940bd2',
  'Date',
  'Fri, 03 Mar 2023 06:25:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782473777600474167782473928703780/dir167782474095606783')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:41 GMT',
  'ETag',
  '"0x8DB1BB01CD78D07"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '73489dcb-601f-0004-7398-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '93c5037a-2560-4c0c-9f12-ee8888e2d22b',
  'Date',
  'Fri, 03 Mar 2023 06:25:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167782473777600474167782473928703780')
  .query(true)
  .reply(200, {"paths":[{"EncryptionContext":"EncryptionContext","contentLength":"0","creationTime":"133222983415139591","etag":"0x8DB1BB01CD78D07","expiryTime":"0","group":"$superuser","lastModified":"Fri, 03 Mar 2023 06:25:41 GMT","name":"dir167782474095606783","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionContext":"EncryptionContext","contentLength":"0","creationTime":"133222983412394120","etag":"0x8DB1BB01CADA888","expiryTime":"0","group":"$superuser","lastModified":"Fri, 03 Mar 2023 06:25:41 GMT","name":"file167782473956401754","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-request-id',
  '73489dcc-601f-0004-7498-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'd81bc0f2-cef1-483a-9a6d-437f56a0bb03',
  'Date',
  'Fri, 03 Mar 2023 06:25:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782473777600474167782473928703780/file167782473956401754')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '73489dce-601f-0004-7598-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '7ac7d27c-05d9-476c-868d-6bebf275abf5',
  'Date',
  'Fri, 03 Mar 2023 06:25:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782473777600474167782473928703780/dir167782474095606783')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '73489dcf-601f-0004-7698-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'ed7eef23-0f6e-4038-8994-1f0bc3f53c82',
  'Date',
  'Fri, 03 Mar 2023 06:25:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782473777600474')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9c318181-201e-0000-0398-4de568000000',
  'x-ms-client-request-id',
  '1e1ee626-fa02-44e8-aa45-ddda1dc01f02',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:41 GMT'
]);
