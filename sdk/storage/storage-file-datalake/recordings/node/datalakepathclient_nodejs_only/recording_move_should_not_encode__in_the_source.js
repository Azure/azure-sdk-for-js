let nock = require('nock');

module.exports.hash = "3bcd53491ad6f1166db79b00530c6c6b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166538975667307857","file":"file166538975732909813","path/slash":"path/slash166538975826307780"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975667307857')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'ETag',
  '"0x8DAAA97A8C6438A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d6391a-201e-001a-7e80-dc98de000000',
  'x-ms-client-request-id',
  '6d74a04e-2786-430c-a319-c66901167637',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:56 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975667307857/file166538975732909813')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'ETag',
  '"0x8DAAA97A925BCEE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef581-601f-0046-6b80-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'f5796238-480e-4bd5-8fc3-b7a4ce929a69',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975667307857/file166538975732909813', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef587-601f-0046-7180-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'c4a2e94f-ea73-4fbc-8435-af10c3c4bef2',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975667307857/file166538975732909813')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'ETag',
  '"0x8DAAA97A9496A7D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6bfef58f-601f-0046-7980-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '533fdce8-fec5-4db3-8808-eb1e7b0a9433',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975667307857/path')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'ETag',
  '"0x8DAAA97A95A8418"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef597-601f-0046-0180-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '82771bb1-717c-4ad0-903e-0d7258f59ecc',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975667307857/path%2Fslash166538975826307780')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'ETag',
  '"0x8DAAA97A9496A7D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bfef5a3-601f-0046-0d80-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'c24c1b51-2df1-4308-b0da-84cd750c41aa',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166538975667307857/path/slash166538975826307780')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAAA97A9496A7D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63966-201e-001a-3a80-dc98de000000',
  'x-ms-client-request-id',
  '840aeac1-9847-4674-9b77-bb6e76bae27a',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 Oct 2022 08:15:58 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975667307857/file166538975732909813')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'ETag',
  '"0x8DAAA97A9496A7D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bfef5a4-601f-0046-0e80-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '10a91f26-16c6-44cf-b871-950ca9abec0f',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166538975667307857/file166538975732909813')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAAA97A9496A7D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63985-201e-001a-5680-dc98de000000',
  'x-ms-client-request-id',
  'b7c50201-87c5-4c1e-96e6-4dcca2788807',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 Oct 2022 08:15:58 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 Oct 2022 08:15:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166538975667307857')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63995-201e-001a-6680-dc98de000000',
  'x-ms-client-request-id',
  '6125b200-e55b-4560-9ed9-efd69341cf0f',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT'
]);
