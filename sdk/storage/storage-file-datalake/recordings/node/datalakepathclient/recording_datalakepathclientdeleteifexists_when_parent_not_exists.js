let nock = require('nock');

module.exports.hash = "f76819751c8a88b48250eee403d10603";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154833947302233","file":"file169154833959002566","dir":"dir169154833993207639"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833947302233')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'ETag',
  '"0x8DB9880DA59C704"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcbcc-601e-0046-6569-cacd86000000',
  'x-ms-client-request-id',
  '2ae0a9a3-1f4b-4ea7-ac8a-b01258127065',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833947302233/file169154833959002566')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:19 GMT',
  'ETag',
  '"0x8DB9880DA6CF769"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1f1-601f-0024-4069-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '480c6617-df1c-4b00-988c-8144f05a7e0f',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154833947302233/file169154833959002566', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1f2-601f-0024-4169-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c2ca875e-d812-4457-997a-6b3ef4aaba04',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154833947302233/file169154833959002566')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:19 GMT',
  'ETag',
  '"0x8DB9880DA8FFBA9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '0e7aa1f4-601f-0024-4369-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '392cf817-5fb1-4b95-aed0-d61bdef13ff2',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833947302233/dir169154833993207639/file169154833959002566')
  .query(true)
  .reply(404, {"error":{"code":"PathNotFound","message":"The specified path does not exist.\nRequestId:0e7aa1f5-601f-0024-4469-ca0fa1000000\nTime:2023-08-09T02:32:19.4463042Z"}}, [
  'Content-Length',
  '163',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathNotFound',
  'x-ms-request-id',
  '0e7aa1f5-601f-0024-4469-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '84786897-0651-470e-8e6b-77223bafdee3',
  'Date',
  'Wed, 09 Aug 2023 02:32:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833947302233')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcc10-601e-0046-2269-cacd86000000',
  'x-ms-client-request-id',
  'e1722780-ed32-417a-9587-07a8249e5742',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:19 GMT'
]);
