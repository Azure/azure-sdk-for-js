let nock = require('nock');

module.exports.hash = "ad8b0abe9c32f7756d2efdffd7d75e2b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383020812306955","file":"file165383020839605855","testfile":"testfile165383020921908053"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020812306955')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:48 GMT',
  'ETag',
  '"0x8DA41757CC24C08"',
  'x-ms-request-id',
  '84b4a794-a01e-0003-235e-731608000000',
  'x-ms-client-request-id',
  '08cfd11c-6257-40e3-8f24-07989bcd710e',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020812306955/file165383020839605855')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:48 GMT',
  'ETag',
  '"0x8DA41757CF32D41"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db1c-a01f-0005-555e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4b26d8b3-c209-4aff-a13e-a10f789a287f',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020812306955/file165383020839605855', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db1d-a01f-0005-565e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '8676fa1f-2455-422c-863b-3fbd3858e101',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020812306955/file165383020839605855')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:49 GMT',
  'ETag',
  '"0x8DA41757D443289"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db1e-a01f-0005-575e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b8415ffa-1271-4309-9380-63b0332974af',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020812306955/testfile165383020921908053')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:49 GMT',
  'ETag',
  '"0x8DA41757D6B0273"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db1f-a01f-0005-585e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9e7d9ae6-98d0-4a50-bec2-90db4bb1d1d0',
  'Date',
  'Sun, 29 May 2022 13:16:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383020812306955/testfile165383020921908053')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41757D6B0273"',
  'x-ms-request-id',
  '84b4a796-a01e-0003-245e-731608000000',
  'x-ms-client-request-id',
  '0e804fb7-f23c-4cf8-8bc6-aa020fe6ffdb',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:16:49 GMT',
  'x-ms-expiry-time',
  'Sun, 29 May 2022 14:16:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
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
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:16:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383020812306955')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a797-a01e-0003-255e-731608000000',
  'x-ms-client-request-id',
  'e5a02858-17c1-46a4-875c-773df4b0a100',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:49 GMT'
]);
