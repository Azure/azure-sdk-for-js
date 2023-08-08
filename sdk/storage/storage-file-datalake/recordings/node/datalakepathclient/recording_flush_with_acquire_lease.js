let nock = require('nock');

module.exports.hash = "7610c6b6e3dbb2a7a436aba2e4fbd99e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154756008404309","file":"file169154756023403095","tempfile2":"tempfile2169154756062807632"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756008404309')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'ETag',
  '"0x8DB987F09CB70FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27b78-101e-002e-4a67-caab16000000',
  'x-ms-client-request-id',
  '153781e3-15ae-4ec5-ab4e-cc0385ae77c0',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756008404309/file169154756023403095')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'ETag',
  '"0x8DB987F09E34304"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16748ef-f01f-0054-4d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '74a08b65-6531-44a3-babb-1d110f0d7038',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756008404309/file169154756023403095', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674900-f01f-0054-5e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'afdcc012-64e6-4e0d-9fae-a878e9a97741',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756008404309/file169154756023403095')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'ETag',
  '"0x8DB987F0A0B0AD8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f167491f-f01f-0054-6567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0b0bde9d-9957-4f79-b9a2-00db4bf451af',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756008404309/tempfile2169154756062807632')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'ETag',
  '"0x8DB987F0A1EE4F3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674931-f01f-0054-6e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd800100b-f9cf-44e6-aa4e-71ea201065b8',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756008404309/tempfile2169154756062807632', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674938-f01f-0054-7567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5379b14e-46e5-4e43-8d00-794cdd901b7d',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756008404309/tempfile2169154756062807632', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674946-f01f-0054-0367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8c4e8a52-5860-4771-ab04-f5b55521edd9',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756008404309/tempfile2169154756062807632')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'ETag',
  '"0x8DB987F0A574EC2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f167494f-f01f-0054-0c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5cd65678-2db0-4be1-b51c-691f6f22f311',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756008404309/tempfile2169154756062807632')
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:f167495e-f01f-0054-1b67-cab656000000\nTime:2023-08-09T02:19:20.6311517Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  'f167495e-f01f-0054-1b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5d4d42de-c091-4a49-95e9-39095b2ca8d1',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154756008404309/tempfile2169154756062807632')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F0A574EC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27bfe-101e-002e-3867-caab16000000',
  'x-ms-client-request-id',
  '946aa431-d607-46a1-8634-f7d337d60f9f',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756008404309/tempfile2169154756062807632')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211608987967',
  'x-ms-request-id',
  'f1674972-f01f-0054-2e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3bbad2e6-4278-4e6d-aee2-2388771a21af',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756008404309')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27c0b-101e-002e-4567-caab16000000',
  'x-ms-client-request-id',
  '8e746e25-13ec-464c-b086-9f5cb80b66ce',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT'
]);
