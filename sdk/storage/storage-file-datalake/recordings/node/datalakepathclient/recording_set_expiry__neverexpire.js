let nock = require('nock');

module.exports.hash = "33a08e805863b09bea0c58f4b6a9ff0e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159230251915106669","file":"file159230252048904381"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230251915106669')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:20 GMT',
  'ETag',
  '"0x8D811DE2CA0DEBB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636232-001e-000e-24c7-430c19000000',
  'x-ms-client-request-id',
  '065023e5-4a0b-4c25-982b-8a073b52b17a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230251915106669/file159230252048904381')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:21 GMT',
  'ETag',
  '"0x8D811DE2D71C09D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '386419d2-101f-005f-39c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f476c69d-f3eb-4c55-8b20-f8816636eaee',
  'Date',
  'Tue, 16 Jun 2020 10:15:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230251915106669/file159230252048904381', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '386419d3-101f-005f-3ac7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7f1e8ba3-1b4c-4ab9-a536-4d66a64d9a15',
  'Date',
  'Tue, 16 Jun 2020 10:15:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230251915106669/file159230252048904381')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:22 GMT',
  'ETag',
  '"0x8D811DE2DDC2F0C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '386419d4-101f-005f-3bc7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd0d3832b-194a-4ee2-af22-b3c05cfc3f7a',
  'Date',
  'Tue, 16 Jun 2020 10:15:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230251915106669/file159230252048904381')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:22 GMT',
  'ETag',
  '"0x8D811DE2DDC2F0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236362c2-001e-000e-1ac7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1d23345b-3215-454d-8d74-b152770aca8a',
  'Date',
  'Tue, 16 Jun 2020 10:15:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230251915106669/file159230252048904381')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811DE2DDC2F0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236362e6-001e-000e-36c7-430c19000000',
  'x-ms-client-request-id',
  '318ee89c-e723-4467-b235-452a89f1f2fb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 16 Jun 2020 10:15:21 GMT',
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
  'Tue, 16 Jun 2020 10:15:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159230251915106669')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236362f8-001e-000e-47c7-430c19000000',
  'x-ms-client-request-id',
  '34e0af94-268c-42cc-afa9-26c1696501c2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:22 GMT'
]);
