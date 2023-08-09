let nock = require('nock');

module.exports.hash = "21abec70d9f4b7adf94bc16b5a9985fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750691400746","file":"file169154750705200474"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750691400746')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'ETag',
  '"0x8DB987EEA19D44E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c264b3-101e-002e-1967-caab16000000',
  'x-ms-client-request-id',
  'ae3426b9-5724-485b-99ee-bd1d3d01d742',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750691400746/file169154750705200474')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'ETag',
  '"0x8DB987EEA3026ED"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d50-f01f-0054-1467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'fb4d137d-2853-4568-b766-96097f3223b6',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750691400746/file169154750705200474', "Hello, World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d51-f01f-0054-1567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '948c1319-f652-4d99-b3eb-28faa7b5e158',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750691400746/file169154750705200474')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'ETag',
  '"0x8DB987EEA58E73B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1673d53-f01f-0054-1767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c78bed71-6705-4da0-9978-f8711f6572c1',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750691400746/file169154750705200474')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'ETag',
  '"0x8DB987EEA58E73B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c264f2-101e-002e-4a67-caab16000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8ca39246-99da-475c-9efc-fff101d233e2',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750691400746')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"133360211065382637","etag":"0x8DB987EEA58E73B","expiryTime":"133360211369380000","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:26 GMT","name":"file169154750705200474","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d54-f01f-0054-1867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '11342cc9-8355-4f36-a088-9cd0df32bcb7',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750691400746/file169154750705200474')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211072118935',
  'x-ms-request-id',
  'f1673d55-f01f-0054-1967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '56252c11-0968-49a3-a1a8-516653601573',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750691400746')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26532-101e-002e-6d67-caab16000000',
  'x-ms-client-request-id',
  '5c0c4715-2ec1-4426-850f-ed6c93bca355',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT'
]);
