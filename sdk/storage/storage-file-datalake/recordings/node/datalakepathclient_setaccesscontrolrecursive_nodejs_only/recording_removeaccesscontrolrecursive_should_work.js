let nock = require('nock');

module.exports.hash = "58002ae506fe252a2994f2ba7154920f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242186122909357","file":"file160242186152903731","directory":"directory160242186242404657","subdirectory1":"subdirectory1160242186242404941","fileName1":"fileName1160242186242406524","fileName2":"fileName2160242186242403741","subdirectory2":"subdirectory2160242186242401269","fileName3":"fileName3160242186242407717","fileName4":"fileName4160242186242403760"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:03 GMT',
  'ETag',
  '"0x8D86DE6D390DB80"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7618693b-601e-006a-57cf-9ffd81000000',
  'x-ms-client-request-id',
  '8696e700-b2c5-4ddd-9946-19e348765515',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:09:02 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/file160242186152903731')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:03 GMT',
  'ETag',
  '"0x8D86DE6D3BFB470"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6df-a01f-0017-4fcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '0653089e-5583-4360-bbfa-b800e3a7532c',
  'Date',
  'Sun, 11 Oct 2020 13:09:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186122909357/file160242186152903731', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a6e4-a01f-0017-54cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '56d18754-bb54-4553-bc12-a42e8182540e',
  'Date',
  'Sun, 11 Oct 2020 13:09:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186122909357/file160242186152903731')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'ETag',
  '"0x8D86DE6D41AC281"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a6e9-a01f-0017-59cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '70631e58-31db-4c0b-9c10-6a262599e089',
  'Date',
  'Sun, 11 Oct 2020 13:09:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'ETag',
  '"0x8D86DE6D448F80D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6ee-a01f-0017-5ecf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'de508a91-02e3-42b8-acaa-0438939bb9f5',
  'Date',
  'Sun, 11 Oct 2020 13:09:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory1160242186242404941')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'ETag',
  '"0x8D86DE6D4758AAA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6f2-a01f-0017-62cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd4849733-34e2-4489-8098-6f9fbf0d3e5e',
  'Date',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory2160242186242401269')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'ETag',
  '"0x8D86DE6D4A28620"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6f7-a01f-0017-67cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'dd5acf10-1ec3-4c93-9d9d-2b83279281c6',
  'Date',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory1160242186242404941/fileName1160242186242406524')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'ETag',
  '"0x8D86DE6D4CFC4FA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6fd-a01f-0017-6dcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '64c5d52b-0104-4a6d-b4de-eca06e43aa44',
  'Date',
  'Sun, 11 Oct 2020 13:09:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory1160242186242404941/fileName2160242186242403741')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'ETag',
  '"0x8D86DE6D4FCB578"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a701-a01f-0017-70cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'dd0f95d3-1a44-4701-b0aa-360a335739a1',
  'Date',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory2160242186242401269/fileName3160242186242407717')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'ETag',
  '"0x8D86DE6D529FF38"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a703-a01f-0017-72cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f1b2aeb3-17d1-4987-9d53-d08415f7e971',
  'Date',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186122909357/directory160242186242404657/subdirectory2160242186242401269/fileName4160242186242403760')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:06 GMT',
  'ETag',
  '"0x8D86DE6D556F2DA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a706-a01f-0017-75cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '4436b130-1271-4903-ac76-da180f218fec',
  'Date',
  'Sun, 11 Oct 2020 13:09:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186122909357/directory160242186242404657')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a709-a01f-0017-78cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '4103e281-1727-48b6-b8a3-9d9ce4efd9b8',
  'Date',
  'Sun, 11 Oct 2020 13:09:05 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186122909357/directory160242186242404657')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a70d-a01f-0017-7ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '440f3792-c3b4-46c4-90be-521be2f2f137',
  'Date',
  'Sun, 11 Oct 2020 13:09:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242186122909357')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186a3e-601e-006a-33cf-9ffd81000000',
  'x-ms-client-request-id',
  'd90a9784-d6d6-4692-86ac-8fa8e864bb38',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:09:06 GMT'
]);
