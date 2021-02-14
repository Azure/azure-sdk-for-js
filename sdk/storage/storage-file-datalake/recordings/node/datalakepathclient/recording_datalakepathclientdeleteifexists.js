let nock = require('nock');

module.exports.hash = "17316020828266734478147489dea269";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158977961561501572","file":"file158977961591704183","dir":"dir158977961681406305"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961561501572')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:53 GMT',
  'ETag',
  '"0x8D7FAEC1344D59F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4be8fe-a01e-002b-3dd4-2c3126000000',
  'x-ms-client-request-id',
  'f1176dc0-3ffd-4118-9b61-164c76a56860',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961561501572/file158977961591704183')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:54 GMT',
  'ETag',
  '"0x8D7FAEC1375B2EC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4cd-b01f-0070-3dd4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'eee57c09-aea5-46d0-aff0-aaa15e70f68f',
  'Date',
  'Mon, 18 May 2020 05:26:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961561501572/file158977961591704183', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4ce-b01f-0070-3ed4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '775db9f4-4231-48e3-a5ae-d45f2ff2a9ff',
  'Date',
  'Mon, 18 May 2020 05:26:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158977961561501572/file158977961591704183')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:54 GMT',
  'ETag',
  '"0x8D7FAEC13CFFE23"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2823e4d1-b01f-0070-41d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '03756e83-5941-4605-8a82-9a8c20c4f0f9',
  'Date',
  'Mon, 18 May 2020 05:26:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977961561501572/dir158977961681406305')
  .reply(404, {"error":{"code":"PathNotFound","message":"The specified path does not exist.\nRequestId:2823e4d8-b01f-0070-48d4-2c365a000000\nTime:2020-05-18T05:26:55.0795499Z"}}, [
  'Content-Length',
  '163',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathNotFound',
  'x-ms-request-id',
  '2823e4d8-b01f-0070-48d4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '86eeec30-ee07-4e10-8706-1e07424755b2',
  'Date',
  'Mon, 18 May 2020 05:26:54 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977961561501572/dir158977961681406305')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 18 May 2020 05:26:55 GMT',
  'ETag',
  '"0x8D7FAEC1429C71F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4dd-b01f-0070-4cd4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '76f58d30-797e-4cf0-8fe4-f4b783b9f5a3',
  'Date',
  'Mon, 18 May 2020 05:26:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977961561501572/dir158977961681406305')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2823e4e0-b01f-0070-4fd4-2c365a000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'f3557731-2ac0-4591-8099-e4690aed2662',
  'Date',
  'Mon, 18 May 2020 05:26:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977961561501572')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bed2c-a01e-002b-25d4-2c3126000000',
  'x-ms-client-request-id',
  '3ddc4336-029d-484f-a62d-6935bc1ccd54',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:55 GMT'
]);
