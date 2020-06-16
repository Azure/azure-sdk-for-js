let nock = require('nock');

module.exports.hash = "42d8a1eca14d1c1e1994260e2a4470a2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159230253581308327","file":"file159230253610604414"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253581308327')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:35 GMT',
  'ETag',
  '"0x8D811DE35F39D82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363672f-001e-000e-74c7-430c19000000',
  'x-ms-client-request-id',
  '343391cc-8295-4a8b-9543-590e310a179f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:35 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253581308327/file159230253610604414')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'ETag',
  '"0x8D811DE361F51F4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '386419f0-101f-005f-49c7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '75efe0eb-0e57-4d0e-afbb-dc06561768b9',
  'Date',
  'Tue, 16 Jun 2020 10:15:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253581308327/file159230253610604414', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '386419f1-101f-005f-4ac7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '68bb9321-3070-4ef4-b985-701b4ec2efec',
  'Date',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230253581308327/file159230253610604414')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'ETag',
  '"0x8D811DE3676F29D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '386419f2-101f-005f-4bc7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '795305b1-a7ce-42d7-92aa-e231caec9f67',
  'Date',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253581308327/file159230253610604414')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'ETag',
  '"0x8D811DE3676F29D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236367a4-001e-000e-58c7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0ada7442-83e6-4843-ae2f-06ee5591295b',
  'Date',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230253581308327/file159230253610604414')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811DE3676F29D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236367c3-001e-000e-70c7-430c19000000',
  'x-ms-client-request-id',
  'f6fb06f1-9141-4a5d-8cb5-0a76aad9725d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'x-ms-expiry-time',
  'Tue, 16 Jun 2020 11:15:36 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 16 Jun 2020 10:15:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230253581308327/file159230253610604414')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'ETag',
  '"0x8D811DE3676F29D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236367d4-001e-000e-7dc7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'c65fb85a-e5ca-4904-a837-81c85b70e9c3',
  'Date',
  'Tue, 16 Jun 2020 10:15:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230253581308327/file159230253610604414')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811DE3676F29D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236367e2-001e-000e-09c7-430c19000000',
  'x-ms-client-request-id',
  '9fb848f2-09c8-4422-9e18-79ecb31d6e1c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 16 Jun 2020 10:15:36 GMT',
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
  'Tue, 16 Jun 2020 10:15:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159230253581308327')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236367f5-001e-000e-1ac7-430c19000000',
  'x-ms-client-request-id',
  '5987a26d-8e0f-4748-a01b-800aef01d5ef',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:37 GMT'
]);
