let nock = require('nock');

module.exports.hash = "42ea6f8cd24d4b0d44ffa4ddf236bf54";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159352492035906829","file":"file159352492196002191"},"newDate":{"now":"2020-06-30T13:48:43.836Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159352492035906829')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:48:41 GMT',
  'ETag',
  '"0x8D81CFC4C618ABE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0bc4ebc-201e-006b-19e5-4ea25d000000',
  'x-ms-client-request-id',
  '5a185975-5ccc-4798-8c9d-a4a24c8d81c0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:48:40 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159352492035906829/file159352492196002191')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 30 Jun 2020 13:48:42 GMT',
  'ETag',
  '"0x8D81CFC4D3A1C4B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7da89b3e-a01f-0028-24e5-4e4401000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '37091797-e064-4645-b3b5-52208ea00020',
  'Date',
  'Tue, 30 Jun 2020 13:48:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159352492035906829/file159352492196002191', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7da89b40-a01f-0028-25e5-4e4401000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '4732a7ac-1c45-4333-9b4f-7a209c4aca62',
  'Date',
  'Tue, 30 Jun 2020 13:48:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159352492035906829/file159352492196002191')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 30 Jun 2020 13:48:43 GMT',
  'ETag',
  '"0x8D81CFC4D9386C4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '7da89b42-a01f-0028-26e5-4e4401000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e7f455bd-2059-48d8-8d97-a80c99cb9aee',
  'Date',
  'Tue, 30 Jun 2020 13:48:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159352492035906829/file159352492196002191')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 30 Jun 2020 13:48:43 GMT',
  'ETag',
  '"0x8D81CFC4D9386C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0bc4f2d-201e-006b-6fe5-4ea25d000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '906a8309-f807-4cc5-9042-ffb24a2bfcfe',
  'Date',
  'Tue, 30 Jun 2020 13:48:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159352492035906829/file159352492196002191')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:48:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81CFC4D9386C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0bc4f3b-201e-006b-7ae5-4ea25d000000',
  'x-ms-client-request-id',
  '124b715a-dd1f-4b80-9da3-9d80039becab',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 30 Jun 2020 13:48:42 GMT',
  'x-ms-expiry-time',
  'Tue, 30 Jun 2020 13:48:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Jun 2020 13:48:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159352492035906829/file159352492196002191')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0bc504b-201e-006b-58e5-4ea25d000000',
  'x-ms-client-request-id',
  '8e7659fb-a4a0-4117-9022-1c32706231f2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Jun 2020 13:48:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159352492035906829')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0bc5055-201e-006b-5ee5-4ea25d000000',
  'x-ms-client-request-id',
  '645421a7-c602-4e6e-900d-df247bccd167',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:48:49 GMT'
]);
