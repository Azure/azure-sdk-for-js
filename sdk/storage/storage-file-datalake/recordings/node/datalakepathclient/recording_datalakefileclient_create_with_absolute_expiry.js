let nock = require('nock');

module.exports.hash = "693b4b2dc0842def4114781e6ead54f4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383021001902113","file":"file165383021029203263","testfile":"testfile165383021109907976"},"newDate":{"now":"2022-05-29T13:16:51.099Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383021001902113')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:50 GMT',
  'ETag',
  '"0x8DA41757DE3C6F2"',
  'x-ms-request-id',
  '84b4a79a-a01e-0003-265e-731608000000',
  'x-ms-client-request-id',
  '10afa0c5-bbe2-433c-a59a-2bd003344aa5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383021001902113/file165383021029203263')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:50 GMT',
  'ETag',
  '"0x8DA41757E11101A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db20-a01f-0005-595e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7aecf5ff-7768-4d01-b500-4e3f8203b887',
  'Date',
  'Sun, 29 May 2022 13:16:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383021001902113/file165383021029203263', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db21-a01f-0005-5a5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b3ab2c43-db00-4c85-9156-d243401838d3',
  'Date',
  'Sun, 29 May 2022 13:16:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383021001902113/file165383021029203263')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:51 GMT',
  'ETag',
  '"0x8DA41757E62C3B7"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db22-a01f-0005-5b5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '45888b04-8b3e-4106-a1ae-230aa31c96bf',
  'Date',
  'Sun, 29 May 2022 13:16:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383021001902113/testfile165383021109907976')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:51 GMT',
  'ETag',
  '"0x8DA41757E8B0491"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db24-a01f-0005-5d5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'bc4a28c1-6a73-4580-8d10-8f178a6b67ba',
  'Date',
  'Sun, 29 May 2022 13:16:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383021001902113/testfile165383021109907976')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41757E8B0491"',
  'x-ms-request-id',
  '84b4a79c-a01e-0003-275e-731608000000',
  'x-ms-client-request-id',
  '19390056-edc5-403d-bf33-40f42f66086d',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:16:51 GMT',
  'x-ms-expiry-time',
  'Sun, 29 May 2022 13:17:11 GMT',
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
  'Sun, 29 May 2022 13:16:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383021001902113/testfile165383021109907976')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7a2-a01e-0003-2c5e-731608000000',
  'x-ms-client-request-id',
  '22596cd5-d9dc-408f-b961-f7cfb4b0f603',
  'x-ms-version',
  '2021-06-08',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383021001902113')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7a5-a01e-0003-2d5e-731608000000',
  'x-ms-client-request-id',
  '4da1637c-43f2-45e4-8ec4-a73378cc61fa',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:12 GMT'
]);
