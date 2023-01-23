let nock = require('nock');

module.exports.hash = "3201b0370d46b37d61bffb81c1afef5e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166538975889208893","file":"file166538975901008026","dest file with & and 1/char":"dest file with & and 1/char166538975945401346"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975889208893')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'ETag',
  '"0x8DAAA97A9CABC7D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d6399d-201e-001a-6c80-dc98de000000',
  'x-ms-client-request-id',
  '854b75b4-35e4-47bf-9211-b80c8cc1ca9e',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975889208893/file166538975901008026')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'ETag',
  '"0x8DAAA97A9DDE6AB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5a7-601f-0046-1080-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '82bbe095-ac9f-4051-bfe4-a09e04db3e3f',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975889208893/file166538975901008026', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5a8-601f-0046-1180-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '916f80ba-2bb6-483c-8fcc-688ad9905397',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975889208893/file166538975901008026')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'ETag',
  '"0x8DAAA97AA002F94"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6bfef5a9-601f-0046-1280-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '1d2e1a70-5aa1-484f-9dd3-b9f9affc89a3',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975889208893/dest%20file%20with%20%26%20and%201')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'ETag',
  '"0x8DAAA97AA108429"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5aa-601f-0046-1380-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '5f503fdc-c769-4829-9625-a11bedccc255',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975889208893/dest%20file%20with%20%26%20and%201%2Fchar166538975945401346')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'ETag',
  '"0x8DAAA97AA002F94"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bfef5ab-601f-0046-1480-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '133a8b88-e419-4f9f-ae55-4401b9b47ccb',
  'Date',
  'Mon, 10 Oct 2022 08:15:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166538975889208893/dest%20file%20with%20%26%20and%201/char166538975945401346')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAAA97AA002F94"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d639bf-201e-001a-0480-dc98de000000',
  'x-ms-client-request-id',
  'ffa807e6-6fc5-4c4b-a9b8-69292b0eb570',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 Oct 2022 08:15:59 GMT',
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
  'Mon, 10 Oct 2022 08:15:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166538975889208893')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d639db-201e-001a-2080-dc98de000000',
  'x-ms-client-request-id',
  'df7f3ef3-6ff8-4f3f-ba66-4a5eba30bf9e',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT'
]);
