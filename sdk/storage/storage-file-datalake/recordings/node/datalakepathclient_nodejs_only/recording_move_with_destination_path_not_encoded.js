let nock = require('nock');

module.exports.hash = "3e63ab31929aa58368977c22a06c7673";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166538975981201547","file":"file166538975992806514","dest file with & and 2/char":"dest file with & and 2/char166538976036604897"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975981201547')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'ETag',
  '"0x8DAAA97AA5709A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63a00-201e-001a-4580-dc98de000000',
  'x-ms-client-request-id',
  '615163c3-d2cf-445b-b10c-f05a7bd4db6b',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975981201547/file166538975992806514')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'ETag',
  '"0x8DAAA97AA6B4335"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5ae-601f-0046-1780-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'c97c005f-33fb-4eb5-915a-3638e5ce6cbc',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975981201547/file166538975992806514', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5af-601f-0046-1880-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '90346648-1c82-488b-8489-05697afc05e9',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538975981201547/file166538975992806514')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'ETag',
  '"0x8DAAA97AA8C62F8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6bfef5b0-601f-0046-1980-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '16d8642b-10ee-47ad-bd25-3bace9dfb85e',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975981201547/dest%20file%20with%20%26%20and%202')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'ETag',
  '"0x8DAAA97AA9BF83E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6bfef5b1-601f-0046-1a80-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'a9880d4a-d32f-4972-9325-7b2b38273fab',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538975981201547/dest%20file%20with%20%26%20and%202/char166538976036604897')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'ETag',
  '"0x8DAAA97AA8C62F8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bfef5b5-601f-0046-1e80-dccd86000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '409b7787-ff0e-4eba-934f-75c1e5599410',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166538975981201547/dest%20file%20with%20%26%20and%202/char166538976036604897')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:16:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAAA97AA8C62F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63a8c-201e-001a-4b80-dc98de000000',
  'x-ms-client-request-id',
  'd1124520-6647-44a6-9ea9-ac856f59d75e',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 Oct 2022 08:16:00 GMT',
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
  'Mon, 10 Oct 2022 08:15:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166538975981201547')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d63aa4-201e-001a-6380-dc98de000000',
  'x-ms-client-request-id',
  'b915fdcb-4c07-4295-ba79-d2f11abf9a1b',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:15:59 GMT'
]);
