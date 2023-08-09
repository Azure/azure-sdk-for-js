let nock = require('nock');

module.exports.hash = "c95718218610fda05d8172cfa98bb9b8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751033208005","file0":"file0169154751046407423","file1":"file1169154751059801861"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751033208005')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'ETag',
  '"0x8DB987EEC238849"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c266ed-101e-002e-6667-caab16000000',
  'x-ms-client-request-id',
  'fbcddd5c-170a-46b2-8057-32116e2dd826',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751033208005/file0169154751046407423')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'ETag',
  '"0x8DB987EEC391AE9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d88-f01f-0054-3267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3f5b1299-b075-4d36-aa51-4dd08ba27bc8',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751033208005/file1169154751059801861')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'ETag',
  '"0x8DB987EEC4D24DE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d92-f01f-0054-3367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1c8df7fa-0b25-40a8-87b7-910b5f0b9557',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751033208005')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211099523817","etag":"0x8DB987EEC391AE9","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:29 GMT","name":"file0169154751046407423","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'VBbV9aHA3urI9a0BGGkYZC9lbW1hZGF0YWxha2UBMDFENkZBMDAwMTkxNjUzNy9maWxlc3lzdGVtMTY5MTU0NzUxMDMzMjA4MDA1ATAxRDlDQTY3QzlBQ0M2MjkvZmlsZTExNjkxNTQ3NTEwNTk4MDE4NjEWAAAA',
  'x-ms-request-id',
  'f1673d94-f01f-0054-3567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'bb1b246e-722d-4d01-9105-2566efde4492',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-continuation,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751033208005')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211100837086","etag":"0x8DB987EEC4D24DE","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:30 GMT","name":"file1169154751059801861","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d95-f01f-0054-3667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '74ad893a-8b9a-4148-9e35-50b5c48d572d',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751033208005/file0169154751046407423')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211104684098',
  'x-ms-request-id',
  'f1673d96-f01f-0054-3767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '50947a9a-7bd7-4a60-a1c9-641f733cec30',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751033208005/file1169154751059801861')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211106027006',
  'x-ms-request-id',
  'f1673d97-f01f-0054-3867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b462ea68-130d-44c8-8788-fb22c9e33849',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751033208005')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26746-101e-002e-2567-caab16000000',
  'x-ms-client-request-id',
  'a79bacab-ee3b-4a82-8e0c-a8a0b85aef74',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:29 GMT'
]);
