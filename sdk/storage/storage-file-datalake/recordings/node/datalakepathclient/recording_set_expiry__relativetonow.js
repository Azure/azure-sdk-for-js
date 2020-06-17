let nock = require('nock');

module.exports.hash = "467b8949d463ba1672545a960ddb55f6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159239945575909565","file":"file159239945703903977"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239945575909565')
  .query(true)
  .reply(201, "", [
  'content-length',
  '0',
  'last-modified',
  'Wed, 17 Jun 2020 13:10:56 GMT',
  'etag',
  '"0x8D812BFDF61261F"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa7be809-801e-0086-5ea8-44e910000000',
  'x-ms-client-request-id',
  '73a305bb-2423-4a0e-82d9-9b5a6e923c9a',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:10:56 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239945575909565/file159239945703903977')
  .query(true)
  .reply(201, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:10:58 GMT',
  'etag',
  '"0x8D812BFE025413F"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17388a44-b01f-0024-05a8-44d309000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '431da46e-4d53-445e-96bc-bd9e72097660',
  'date',
  'Wed, 17 Jun 2020 13:10:57 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239945575909565/file159239945703903977', "Hello World")
  .query(true)
  .reply(202, "", [
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6537fd99-101f-0060-72a8-445936000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '464c3c5a-5c81-44ec-837d-d70d2fb3d0b6',
  'date',
  'Wed, 17 Jun 2020 13:10:59 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159239945575909565/file159239945703903977')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:00 GMT',
  'etag',
  '"0x8D812BFE1A11618"',
  'server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'c56765cc-e01f-0029-74a8-441bdd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '12df6492-2972-462b-8ff9-60e9da609576',
  'date',
  'Wed, 17 Jun 2020 13:11:00 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159239945575909565/file159239945703903977')
  .query(true)
  .reply(200, "", [
  'last-modified',
  'Wed, 17 Jun 2020 13:11:00 GMT',
  'etag',
  '"0x8D812BFE1A11618"',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81073540-201e-006b-31a8-44a25d000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7da99d40-d104-4c9b-a015-35459916c145',
  'date',
  'Wed, 17 Jun 2020 13:11:01 GMT',
  'connection',
  'close',
  'content-length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159239945575909565/file159239945703903977')
  .reply(404, "", [
  'transfer-encoding',
  'chunked',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a5898ed-c01e-005c-0da8-4470f1000000',
  'x-ms-client-request-id',
  '3d373b58-5883-40d4-a760-11f376c471a5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'access-control-expose-headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'access-control-allow-origin',
  '*',
  'date',
  'Wed, 17 Jun 2020 13:11:04 GMT',
  'connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159239945575909565')
  .query(true)
  .reply(202, "", [
  'content-length',
  '0',
  'server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e472747-001e-0053-1ba8-44069d000000',
  'x-ms-client-request-id',
  '4781be70-a006-42ea-8c66-eacef2b25831',
  'x-ms-version',
  '2019-12-12',
  'date',
  'Wed, 17 Jun 2020 13:11:05 GMT',
  'connection',
  'close'
]);
