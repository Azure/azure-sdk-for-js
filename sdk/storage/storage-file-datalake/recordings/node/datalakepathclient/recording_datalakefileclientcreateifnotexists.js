let nock = require('nock');

module.exports.hash = "1811b46713226bbde364c95d60a8ea4e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158977961377602903","file":"file158977961409907239"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961377602903')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:52 GMT',
  'ETag',
  '"0x8D7FAEC122C2572"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4be52f-a01e-002b-41d4-2c3126000000',
  'x-ms-client-request-id',
  'a6024aa2-65f7-462d-943c-8c4e9b66d7b7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961377602903/file158977961409907239')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:52 GMT',
  'ETag',
  '"0x8D7FAEC12608474"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4c9-b01f-0070-39d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '3eb0261a-53de-401f-b7bd-a1f56115bd5d',
  'Date',
  'Mon, 18 May 2020 05:26:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961377602903/file158977961409907239', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4ca-b01f-0070-3ad4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'e7b78740-0a29-4920-b6a3-20b7fcfe4617',
  'Date',
  'Mon, 18 May 2020 05:26:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961377602903/file158977961409907239')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:52 GMT',
  'ETag',
  '"0x8D7FAEC12BD0C71"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4cb-b01f-0070-3bd4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '4c1d3f4c-d135-417a-bcff-598df8be3f99',
  'Date',
  'Mon, 18 May 2020 05:26:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961377602903/file158977961409907239')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:2823e4cc-b01f-0070-3cd4-2c365a000000\nTime:2020-05-18T05:26:53.2810660Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '2823e4cc-b01f-0070-3cd4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '6ccdf7be-52c6-4fa4-a3f8-8053c55146c6',
  'Date',
  'Mon, 18 May 2020 05:26:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977961377602903')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4be885-a01e-002b-4ad4-2c3126000000',
  'x-ms-client-request-id',
  'b2fd7748-868c-491a-9452-071f5fd652d3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:53 GMT'
]);
