let nock = require('nock');

module.exports.hash = "f54e217505937fb499be1d5204a37c94";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061905327801297","file":"file162061905358900745","directory":"directory162061905494507485"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905327801297')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:33 GMT',
  'ETag',
  '"0x8D91367BDD7707E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d40c-801e-0045-6e50-459843000000',
  'x-ms-client-request-id',
  'e791bdd2-e7a5-46cb-a035-9badbc940cf7',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905327801297/file162061905358900745')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:34 GMT',
  'ETag',
  '"0x8D91367BE08CB88"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f940a-201f-0073-1750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7d441e88-6001-40b3-8d5a-05e49040f00c',
  'Date',
  'Mon, 10 May 2021 03:57:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905327801297/file162061905358900745')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926544226506',
  'x-ms-request-id',
  '6d9f940c-201f-0073-1850-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '8615108a-f6d7-40b7-81ed-58513d0407af',
  'Date',
  'Mon, 10 May 2021 03:57:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905327801297/file162061905358900745')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d462-801e-0045-3050-459843000000',
  'x-ms-client-request-id',
  '9d6c22de-b5ba-4ecd-a1f9-6a47f347e7a9',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:34 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061905327801297/file162061905358900745')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367BE08CB88"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d470-801e-0045-3b50-459843000000',
  'x-ms-client-request-id',
  '1453f6c1-a2be-45a5-bd04-8d090b153675',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:34 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905327801297/directory162061905494507485')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:35 GMT',
  'ETag',
  '"0x8D91367BED83DF8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f940d-201f-0073-1950-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '0610d45e-32fd-4643-8993-a7fe58d26109',
  'Date',
  'Mon, 10 May 2021 03:57:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905327801297/directory162061905494507485')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926557047198',
  'x-ms-request-id',
  '6d9f940e-201f-0073-1a50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '0a7a82a0-266f-4e57-b5c2-22176f1b9779',
  'Date',
  'Mon, 10 May 2021 03:57:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061905327801297/directory162061905494507485')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d4bb-801e-0045-6f50-459843000000',
  'x-ms-client-request-id',
  'e099596e-8c3d-416c-888c-e70898f7f16d',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:35 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061905327801297/directory162061905494507485')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367BED83DF8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d4d3-801e-0045-0150-459843000000',
  'x-ms-client-request-id',
  '168c3ea1-4a53-4d0e-9e33-6cbfd54f4b95',
  'x-ms-version',
  '2020-06-12',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:35 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061905327801297')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d4e2-801e-0045-0d50-459843000000',
  'x-ms-client-request-id',
  '01938b9d-b7cc-4865-bb32-1cfa0fd96d0c',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:35 GMT'
]);
