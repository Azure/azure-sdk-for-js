let nock = require('nock');

module.exports.hash = "2d927746e4033def90897ad31daa1e76";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154833838107193","file":"file169154833850708620","dir":"dir169154833890902637"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833838107193')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'ETag',
  '"0x8DB9880D9B317FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcb51-601e-0046-7a69-cacd86000000',
  'x-ms-client-request-id',
  '473a885b-ed6c-496c-899d-7854db0ab432',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833838107193/file169154833850708620')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'ETag',
  '"0x8DB9880D9C7C614"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1e9-601f-0024-3869-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '25bc762a-e554-438e-a1dd-e54c147f0be1',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154833838107193/file169154833850708620', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1eb-601f-0024-3a69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2430b4e9-7c71-4207-89c8-0287c5393038',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154833838107193/file169154833850708620')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'ETag',
  '"0x8DB9880D9F0E358"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '0e7aa1ec-601f-0024-3b69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0f2b9d2f-f3bf-4361-bc0b-511423777bbf',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833838107193/dir169154833890902637')
  .query(true)
  .reply(404, {"error":{"code":"PathNotFound","message":"The specified path does not exist.\nRequestId:0e7aa1ed-601f-0024-3c69-ca0fa1000000\nTime:2023-08-09T02:32:18.4228884Z"}}, [
  'Content-Length',
  '163',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathNotFound',
  'x-ms-request-id',
  '0e7aa1ed-601f-0024-3c69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'eccba1bd-252a-4e70-927f-ad9c99a6bf93',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833838107193/dir169154833890902637')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'ETag',
  '"0x8DB9880DA1AE08F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1ef-601f-0024-3e69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1299ae25-f13f-43be-8680-0adca27d5390',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833838107193/dir169154833890902637')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219386820737',
  'x-ms-request-id',
  '0e7aa1f0-601f-0024-3f69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0ed83cca-0fb2-4113-bbd4-20d8793c8c5e',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833838107193')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcbc2-601e-0046-5d69-cacd86000000',
  'x-ms-client-request-id',
  '18a4d205-b996-4d17-8037-709223add13a',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT'
]);
