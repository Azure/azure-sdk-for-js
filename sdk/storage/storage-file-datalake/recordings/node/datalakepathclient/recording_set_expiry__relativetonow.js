let nock = require('nock');

module.exports.hash = "aa31142aac524d8a8eb54f92c1ecb113";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159230253075403698","file":"file159230253105003427"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253075403698')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:30 GMT',
  'ETag',
  '"0x8D811DE32EFF9B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636568-001e-000e-6ac7-430c19000000',
  'x-ms-client-request-id',
  '1e68953f-b938-4e39-8231-8fb2589e8cf4',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253075403698/file159230253105003427')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:31 GMT',
  'ETag',
  '"0x8D811DE331C0AB0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '386419e5-101f-005f-42c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '683ad088-f1fc-4db6-912c-d33840538525',
  'Date',
  'Tue, 16 Jun 2020 10:15:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253075403698/file159230253105003427', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '386419e6-101f-005f-43c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '040db930-b254-498a-a34b-b4bc59a3e714',
  'Date',
  'Tue, 16 Jun 2020 10:15:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253075403698/file159230253105003427')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:31 GMT',
  'ETag',
  '"0x8D811DE3373AF8C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '386419e7-101f-005f-44c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6fe4f10c-6202-452f-bdfc-b51defaa88eb',
  'Date',
  'Tue, 16 Jun 2020 10:15:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253075403698/file159230253105003427')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:31 GMT',
  'ETag',
  '"0x8D811DE3373AF8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236365b7-001e-000e-28c7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '5d84bbb2-2b0c-413e-a4f8-0a6b5ccfe3c1',
  'Date',
  'Tue, 16 Jun 2020 10:15:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230253075403698/file159230253105003427')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636610-001e-000e-6dc7-430c19000000',
  'x-ms-client-request-id',
  '3501caeb-9111-4366-93f2-f32ab87629cd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 16 Jun 2020 10:15:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159230253075403698')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363662c-001e-000e-08c7-430c19000000',
  'x-ms-client-request-id',
  'fef97ac3-3944-497c-9866-a0257b6c8810',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:33 GMT'
]);
