let nock = require('nock');

module.exports.hash = "73b0974f129ce6b9294d339d9061160b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158377020856302855","file":"file158377020859701689"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020856302855')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C4445696298B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991b85-001e-0069-082d-f61a32000000',
  'x-ms-client-request-id',
  'b3514f98-b05b-45ca-820b-5c1bb313b4d7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020856302855/file158377020859701689')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C44456ABE173"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2e47246-601f-001f-7f2d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '17c640ea-18d1-401c-bc16-9feaa26034b1',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158377020856302855/file158377020859701689', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2e47247-601f-001f-802d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '72431171-50a0-4eb0-b061-842d87796ad7',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158377020856302855/file158377020859701689')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C44456B3A84E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2e47248-601f-001f-012d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'fabe9e00-27af-47e5-a890-5530aa93e838',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158377020856302855/file158377020859701689')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C44456B3A84E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991c5b-001e-0069-522d-f61a32000000',
  'x-ms-client-request-id',
  '2dffca9e-5029-4a0e-8448-a1e6d4be8088',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Mon, 09 Mar 2020 16:10:08 GMT',
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
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158377020856302855')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991c9a-001e-0069-0c2d-f61a32000000',
  'x-ms-client-request-id',
  'cd281c5c-60ca-4cdd-bb51-106e26e35b6a',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);
