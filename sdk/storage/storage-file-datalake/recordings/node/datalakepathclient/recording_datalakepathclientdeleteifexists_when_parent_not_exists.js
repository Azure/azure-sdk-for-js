let nock = require('nock');

module.exports.hash = "69b806d69ad5d690e7501f1440e3e33e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160387578762205286","file":"file160387578901403556","dir":"dir160387579107901889"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160387578762205286')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Oct 2020 09:03:08 GMT',
  'ETag',
  '"0x8D87B204A497E4D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b0523b0f-401e-0008-4a09-ad5eed000000',
  'x-ms-client-request-id',
  'eb23b3e6-527c-4f5d-bfaf-d85debae3d71',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 09:03:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160387578762205286/file160387578901403556')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 28 Oct 2020 09:03:10 GMT',
  'ETag',
  '"0x8D87B204B28E7A4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87ecf284-701f-0088-1c09-adfd47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'c3d5c9a3-2c6a-4176-b1ac-afcb9ec51b5e',
  'Date',
  'Wed, 28 Oct 2020 09:03:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160387578762205286/file160387578901403556', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '87ecf28a-701f-0088-2109-adfd47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f8c0f381-35d5-4139-8dc9-73283fd07ec1',
  'Date',
  'Wed, 28 Oct 2020 09:03:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160387578762205286/file160387578901403556')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 28 Oct 2020 09:03:10 GMT',
  'ETag',
  '"0x8D87B204B891C7F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '87ecf28f-701f-0088-2609-adfd47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '30048bbc-4f0e-4b6f-9689-b18095a0839d',
  'Date',
  'Wed, 28 Oct 2020 09:03:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160387578762205286/dir160387579107901889/file160387578901403556')
  .reply(404, {"error":{"code":"PathNotFound","message":"The specified path does not exist.\nRequestId:87ecf290-701f-0088-2709-adfd47000000\nTime:2020-10-28T09:03:11.2599218Z"}}, [
  'Content-Length',
  '163',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathNotFound',
  'x-ms-request-id',
  '87ecf290-701f-0088-2709-adfd47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd1e144e5-b794-44f2-9896-976fc57aa240',
  'Date',
  'Wed, 28 Oct 2020 09:03:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160387578762205286')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b052409b-401e-0008-2709-ad5eed000000',
  'x-ms-client-request-id',
  '95e02543-2d8e-44d0-87cf-ea1a04e96331',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 09:03:10 GMT'
]);
