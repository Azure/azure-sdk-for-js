let nock = require('nock');

module.exports.hash = "4ed801897bd0eb9489e51a4d5b596662";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383024609403830","file":"file165383024636309237","testfile":"testfile165383024717706607"},"newDate":{"now":"2022-05-29T13:17:27.177Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024609403830')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:26 GMT',
  'ETag',
  '"0x8DA41759363DE7E"',
  'x-ms-request-id',
  '84b4a7d5-a01e-0003-4f5e-731608000000',
  'x-ms-client-request-id',
  'dcbe60ef-0168-428d-ab84-6e7334a57341',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024609403830/file165383024636309237')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:26 GMT',
  'ETag',
  '"0x8DA417593929172"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6e0-201f-0006-065e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'da103b9f-6bde-4286-ab88-7ee8c0e8ba24',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024609403830/file165383024636309237', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6e1-201f-0006-075e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd91ae6a5-6f72-4eae-a009-d4e550ce8d4a',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024609403830/file165383024636309237')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:27 GMT',
  'ETag',
  '"0x8DA417593E3111C"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6e2-201f-0006-085e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6d4fbf69-e625-4f5b-ad27-c78345d6080e',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024609403830/testfile165383024717706607')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:27 GMT',
  'ETag',
  '"0x8DA4175940B16EE"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6e3-201f-0006-095e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c47b56f3-acf0-4046-8f70-792e23aee13b',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383024609403830/testfile165383024717706607')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175940B16EE"',
  'x-ms-request-id',
  '84b4a7d7-a01e-0003-505e-731608000000',
  'x-ms-client-request-id',
  'b9a8b7ac-0a59-49f5-8cba-b6b5650a3d45',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:27 GMT',
  'x-ms-expiry-time',
  'Sun, 29 May 2022 13:17:47 GMT',
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
  'Sun, 29 May 2022 13:17:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383024609403830/testfile165383024717706607')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7e2-a01e-0003-515e-731608000000',
  'x-ms-client-request-id',
  '7a07bd8c-e92c-485d-aa0f-1ddffdde7b71',
  'x-ms-version',
  '2021-06-08',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383024609403830')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7e6-a01e-0003-535e-731608000000',
  'x-ms-client-request-id',
  '6f9a1b4a-0fe6-43dc-bf82-afc07d03fbd1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:47 GMT'
]);
