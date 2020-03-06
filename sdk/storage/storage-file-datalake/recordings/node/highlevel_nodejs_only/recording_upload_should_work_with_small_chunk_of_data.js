let nock = require('nock');

module.exports.hash = "167a550975081905922a71a3bb731e2e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350564477001287","file":"file158350564511207905"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350564477001287')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:40:44 GMT',
  'ETag',
  '"0x8D7C1DC5A5BF289"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd14fbb-001e-0026-7ec5-f3de2a000000',
  'x-ms-client-request-id',
  '0c17c105-ac8c-42e9-b956-e93cb121731c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:40:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350564477001287/file158350564511207905')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 06 Mar 2020 14:40:45 GMT',
  'ETag',
  '"0x8D7C1DC5A94230D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '625eea50-301f-006a-39c5-f31935000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '6869d239-bb23-4882-9d0b-6eb3a65c3d8c',
  'Date',
  'Fri, 06 Mar 2020 14:40:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158350564477001287/file158350564511207905', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9a70c5bb-b01f-0016-5cc5-f38400000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'edfc96bc-68fc-4154-b0fe-6dc408f1e53b',
  'Date',
  'Fri, 06 Mar 2020 14:41:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158350564477001287/file158350564511207905')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:05 GMT',
  'ETag',
  '"0x8D7C1DC66E1FCB6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9a70c5be-b01f-0016-5fc5-f38400000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '6e4f9b3f-09a7-4f30-961f-a76d9abcda34',
  'Date',
  'Fri, 06 Mar 2020 14:41:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158350564477001287/file158350564511207905')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C1DC66E1FCB6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd1816d-001e-0026-73c5-f3de2a000000',
  'x-ms-client-request-id',
  'ee624760-e6d6-4e70-8593-2ab58e49e292',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Fri, 06 Mar 2020 14:40:45 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Mar 2020 14:41:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350564477001287')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd1823d-001e-0026-2dc5-f3de2a000000',
  'x-ms-client-request-id',
  '036832cd-1203-4911-84a3-90a9953db9b4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:06 GMT'
]);
