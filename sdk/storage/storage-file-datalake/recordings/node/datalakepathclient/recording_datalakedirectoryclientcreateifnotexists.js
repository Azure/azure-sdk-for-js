let nock = require('nock');

module.exports.hash = "720d743ded24f582eadd4ae8659a2dac";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158977961057503329","file":"file158977961087608276","dir":"dir158977961287500504"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961057503329')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:48 GMT',
  'ETag',
  '"0x8D7FAEC1043EB89"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdec0-a01e-002b-55d4-2c3126000000',
  'x-ms-client-request-id',
  '00321166-23da-4020-933d-48e55bea3769',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:48 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961057503329/file158977961087608276')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:50 GMT',
  'ETag',
  '"0x8D7FAEC111932E9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4c4-b01f-0070-34d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '40831bcb-20fe-4ac8-86ac-37c5114c8a58',
  'Date',
  'Mon, 18 May 2020 05:26:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961057503329/file158977961087608276', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4c5-b01f-0070-35d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'c6847254-86cc-45cf-a643-9f2809ffc38b',
  'Date',
  'Mon, 18 May 2020 05:26:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961057503329/file158977961087608276')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:50 GMT',
  'ETag',
  '"0x8D7FAEC1176AF33"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4c6-b01f-0070-36d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'c94ddeea-b53d-42d7-8cf2-99cc40847db2',
  'Date',
  'Mon, 18 May 2020 05:26:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961057503329/dir158977961287500504')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:51 GMT',
  'ETag',
  '"0x8D7FAEC11A5403D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4c7-b01f-0070-37d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'b59ba02f-cd21-4ac7-a31e-03ff0a9dd896',
  'Date',
  'Mon, 18 May 2020 05:26:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961057503329/dir158977961287500504')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:2823e4c8-b01f-0070-38d4-2c365a000000\nTime:2020-05-18T05:26:51.4395475Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '2823e4c8-b01f-0070-38d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'd8f499fe-b4f6-4ffa-95ca-9e5f4f4dcbd9',
  'Date',
  'Mon, 18 May 2020 05:26:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977961057503329')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4be47a-a01e-002b-1ad4-2c3126000000',
  'x-ms-client-request-id',
  '334ae9bc-1126-4104-857a-7a8b8475a696',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:51 GMT'
]);
