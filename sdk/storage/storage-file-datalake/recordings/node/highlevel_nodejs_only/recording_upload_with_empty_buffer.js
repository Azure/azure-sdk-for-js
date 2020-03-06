let nock = require('nock');

module.exports.hash = "a8c02d22b05835b831192b220986194e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350566680306122","file":"file158350566715307459"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350566680306122')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:06 GMT',
  'ETag',
  '"0x8D7C1DC677F4DF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd182fb-001e-0026-5dc5-f3de2a000000',
  'x-ms-client-request-id',
  'f98b8092-1acd-4db2-9d39-a7c538d7955c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350566680306122/file158350566715307459')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:07 GMT',
  'ETag',
  '"0x8D7C1DC67B5A6CC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a70c5cb-b01f-0016-6cc5-f38400000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'f4b16993-4bc2-452f-a11b-66d2b7d626e8',
  'Date',
  'Fri, 06 Mar 2020 14:41:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158350566680306122/file158350566715307459')
  .query(true)
  .reply(400, {"error":{"code":"InvalidHeaderValue","message":"The value for one of the HTTP headers is not in the correct format.\nRequestId:9a70c5cd-b01f-0016-6ec5-f38400000000\nTime:2020-03-06T14:41:07.6085342Z","detail":{"HeaderName":"Content-Length","HeaderValue":"0"}}}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'x-ms-request-id',
  '9a70c5cd-b01f-0016-6ec5-f38400000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '233d6eed-d259-4f20-b8fe-858b91ca9e04',
  'Date',
  'Fri, 06 Mar 2020 14:41:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350566680306122')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd1853b-001e-0026-6dc5-f3de2a000000',
  'x-ms-client-request-id',
  '1c0e5291-f196-400b-83f6-d6ca036e45bd',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:07 GMT'
]);
