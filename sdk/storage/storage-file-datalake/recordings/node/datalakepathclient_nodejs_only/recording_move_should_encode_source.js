let nock = require('nock');

module.exports.hash = "bbbe3478a6107a88f4363774690113fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819432408614","file":"file160875819442107627"," a+'%20%2F%2B%27%%25%2520.txt":" a+'%20%2F%2B%27%%25%2520.txt160875819471100791"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819432408614')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'ETag',
  '"0x8D8A78806C5CBEF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592344-301e-0070-4870-d9b64b000000',
  'x-ms-client-request-id',
  '014ae343-33e7-428f-9ff6-060644ede402',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819432408614/file160875819442107627')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'ETag',
  '"0x8D8A78806D64C17"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93cf-c01f-0008-2f70-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'f9c00f3e-9dcd-4347-9ae9-303fb11b23e0',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819432408614/file160875819442107627', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93d0-c01f-0008-3070-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'c9047658-b2f1-49b2-b2a9-d4f7da2fdf1f',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819432408614/file160875819442107627')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'ETag',
  '"0x8D8A78806F2E99F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93d1-c01f-0008-3170-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '95ab52a1-959d-454f-bea1-1e0a7a713bd7',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819432408614/%20a%2B%27%2520%252F%252B%2527%25%2525%252520.txt160875819471100791')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93d2-c01f-0008-3270-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'b4b95a75-a284-4dd7-99e3-ab5965563275',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819432408614/%20a%2B%27%2520%252F%252B%2527%25%2525%252520.txt160875819471100791')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A78806F2E99F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f5923e9-301e-0070-6070-d9b64b000000',
  'x-ms-client-request-id',
  '367ea14e-3d40-4351-8f82-48ee8dceed20',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:34 GMT',
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
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819432408614/file160875819442107627')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93d3-c01f-0008-3370-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'e28ccf19-ae51-4a13-ad9f-151d665216ac',
  'Date',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819432408614/file160875819442107627')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A78806F2E99F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f59242c-301e-0070-1770-d9b64b000000',
  'x-ms-client-request-id',
  '94981e80-d0e7-463c-b061-8633fa6fb70d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:34 GMT',
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
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819432408614')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592440-301e-0070-2970-d9b64b000000',
  'x-ms-client-request-id',
  '50ab0d3a-cdd7-4dfa-b141-50cb323ec39d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT'
]);
