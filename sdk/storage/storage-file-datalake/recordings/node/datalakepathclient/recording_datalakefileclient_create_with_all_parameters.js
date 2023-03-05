let nock = require('nock');

module.exports.hash = "154e5736c8f1222181d1491bbf75618c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167782474240006248","file":"file167782474267809056","testfile":"testfile167782474351307497"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474240006248')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:42 GMT',
  'ETag',
  '"0x8DB1BB01DB19E94"',
  'x-ms-request-id',
  '9c318182-201e-0000-0498-4de568000000',
  'x-ms-client-request-id',
  'd396b7c8-4880-4e41-8a47-03e7f94ea077',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474240006248/file167782474267809056')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:43 GMT',
  'ETag',
  '"0x8DB1BB01DDF1DDA"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '73489dd0-601f-0004-7798-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'ac9c4dbe-16e3-4804-870b-7846b9a52196',
  'Date',
  'Fri, 03 Mar 2023 06:25:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474240006248/file167782474267809056', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '73489dd1-601f-0004-7898-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'd92ff710-7bd3-46ce-bd3f-836741a83746',
  'Date',
  'Fri, 03 Mar 2023 06:25:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474240006248/file167782474267809056')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:43 GMT',
  'ETag',
  '"0x8DB1BB01E34C60F"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '73489dd2-601f-0004-7998-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '4c687b12-79e8-4795-ab77-9f5f81253b80',
  'Date',
  'Fri, 03 Mar 2023 06:25:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474240006248/testfile167782474351307497')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:44 GMT',
  'ETag',
  '"0x8DB1BB01E5E13DC"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '73489dd3-601f-0004-7a98-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'de0dcdf1-ec50-43ef-93e2-40949df1b86d',
  'Date',
  'Fri, 03 Mar 2023 06:25:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167782474240006248/testfile167782474351307497')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1BB01E5E13DC"',
  'x-ms-request-id',
  '9c318185-201e-0000-0598-4de568000000',
  'x-ms-client-request-id',
  'fde119d1-ab8c-4d5d-9681-0481b587be2b',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Fri, 03 Mar 2023 06:25:44 GMT',
  'x-ms-expiry-time',
  'Fri, 03 Mar 2023 06:26:44 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-context',
  'EncryptionContext',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'Date',
  'Fri, 03 Mar 2023 06:25:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167782474240006248/testfile167782474351307497')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:44 GMT',
  'ETag',
  '"0x8DB1BB01E5E13DC"',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  '73489dd4-601f-0004-7b98-4d0ec4000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '190cfc69-eaef-411b-b8e1-b1e0ca2574ea',
  'Date',
  'Fri, 03 Mar 2023 06:25:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782474240006248')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9c318186-201e-0000-0698-4de568000000',
  'x-ms-client-request-id',
  '7e74ecfb-545f-41f2-942e-8dcd973666c3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:44 GMT'
]);
