let nock = require('nock');

module.exports.hash = "6c802beb498c53d2993fd44c05d6a315";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350563186608305","file":"file158350563220309723","newFile":"newFile158350563546308333","newDirectory":"newDirectory158350563580102309"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350563186608305')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:40:32 GMT',
  'ETag',
  '"0x8D7C1DC52AAB3B9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd132a0-001e-0026-1bc5-f3de2a000000',
  'x-ms-client-request-id',
  'f9195139-7cbd-42b7-80fa-29097f8f66c1',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:40:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350563186608305/file158350563220309723')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 06 Mar 2020 14:40:32 GMT',
  'ETag',
  '"0x8D7C1DC52E0C2E2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '625ee6f0-301f-006a-5ec5-f31935000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'fb789e3e-25c7-4109-b99d-5a5ffe7e9847',
  'Date',
  'Fri, 06 Mar 2020 14:40:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158350563186608305/file158350563220309723', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '625ee756-301f-006a-44c5-f31935000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '1fea972d-5735-4281-91dd-23fbcbf93cd5',
  'Date',
  'Fri, 06 Mar 2020 14:40:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158350563186608305/file158350563220309723')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 06 Mar 2020 14:40:34 GMT',
  'ETag',
  '"0x8D7C1DC54368948"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '625ee76a-301f-006a-57c5-f31935000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '8a1ac6f2-2925-4a28-b087-2094177e5f67',
  'Date',
  'Fri, 06 Mar 2020 14:40:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158350563186608305/newFile158350563546308333')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd13b15-001e-0026-0dc5-f3de2a000000',
  'x-ms-client-request-id',
  'dc500122-1e5c-4fee-be78-0de5e418a010',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Mar 2020 14:40:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158350563186608305/newDirectory158350563580102309')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd13c02-001e-0026-68c5-f3de2a000000',
  'x-ms-client-request-id',
  '62f79030-b30b-44f0-9b5f-240c67388e7f',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Mar 2020 14:40:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350563186608305')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd13d00-001e-0026-50c5-f3de2a000000',
  'x-ms-client-request-id',
  'fbd4ce82-461b-4c5e-ad9e-c9abc31d361a',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:40:36 GMT'
]);
