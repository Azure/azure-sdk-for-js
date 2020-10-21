let nock = require('nock');

module.exports.hash = "bbbe3478a6107a88f4363774690113fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160318532322204557","file":"file160318532455004626"," a+'%20%2F%2B%27%%25%2520.txt":" a+'%20%2F%2B%27%%25%2520.txt160318532815701593"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160318532322204557')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 20 Oct 2020 09:15:24 GMT',
  'ETag',
  '"0x8D874D8AD65A86C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22bb9b3a-b01e-007b-01c1-a62e2e000000',
  'x-ms-client-request-id',
  '8e5f4f06-577c-4878-987b-c29fd3ddbc1a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 20 Oct 2020 09:15:23 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160318532322204557/file160318532455004626')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 20 Oct 2020 09:15:25 GMT',
  'ETag',
  '"0x8D874D8AE222DBC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e360084-501f-003e-09c1-a6f3bf000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8a786d95-38f8-407a-95db-41e06c97a24d',
  'Date',
  'Tue, 20 Oct 2020 09:15:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160318532322204557/file160318532455004626', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'feb52e7f-c01f-003b-5ac1-a607c0000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '64176e06-eac8-42b1-98e5-e562e7c6e330',
  'Date',
  'Tue, 20 Oct 2020 09:15:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160318532322204557/file160318532455004626')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 20 Oct 2020 09:15:28 GMT',
  'ETag',
  '"0x8D874D8AF8F67AF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '513eca8b-401f-0047-1cc1-a69af5000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'afd40587-f931-45d4-85ce-b341e85390bc',
  'Date',
  'Tue, 20 Oct 2020 09:15:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160318532322204557/%20a%2B%27%2520%252F%252B%2527%25%2525%252520.txt160318532815701593')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a0fd376-901f-004e-4ac1-a6807b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '64bb370c-313e-4ab4-a8cf-56ba1007d8cb',
  'Date',
  'Tue, 20 Oct 2020 09:15:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160318532322204557/%20a%2B%27%2520%252F%252B%2527%25%2525%252520.txt160318532815701593')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 20 Oct 2020 09:15:28 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D874D8AF8F67AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5824d59c-c01e-0012-1fc1-a67182000000',
  'x-ms-client-request-id',
  '3f8a9cde-c2e0-4085-b4ec-849312e2af7c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 20 Oct 2020 09:15:25 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 20 Oct 2020 09:15:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160318532322204557/file160318532455004626')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6894d585-f01f-001a-2dc1-a66af1000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8ffd2798-7a49-447f-92c3-1d037ab47811',
  'Date',
  'Tue, 20 Oct 2020 09:15:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160318532322204557/file160318532455004626')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 20 Oct 2020 09:15:28 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D874D8AF8F67AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3f3f99d-201e-009b-75c1-a6c8a6000000',
  'x-ms-client-request-id',
  '13ef6b73-6f66-42e0-9f44-efb230fb2066',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 20 Oct 2020 09:15:25 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 20 Oct 2020 09:15:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160318532322204557')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91264918-301e-000c-60c1-a6ab6f000000',
  'x-ms-client-request-id',
  '43782b12-8a00-4c33-ad3d-7ded2369bc3a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 20 Oct 2020 09:15:34 GMT',
  'Connection',
  'close'
]);
