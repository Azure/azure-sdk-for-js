let nock = require('nock');

module.exports.hash = "317a29501ad34bbbedc35c3dc7695de7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160403933726809292","file":"file160403933869909908"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160403933726809292')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:28:58 GMT',
  'ETag',
  '"0x8D87C9D157B615D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2801a26-b01e-009e-5885-ae3cd9000000',
  'x-ms-client-request-id',
  '4282d7df-5fac-4615-bd7c-abca6735fc6f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 30 Oct 2020 06:28:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:02 GMT',
  'ETag',
  '"0x8D87C9D18271DC3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3641220f-301f-000c-0185-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'ee028588-a40c-4355-a9eb-c84f4dcad62a',
  'Date',
  'Fri, 30 Oct 2020 06:29:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908', "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '36412214-301f-000c-0385-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1121a936-5a68-47cc-a8dd-d47678b8caab',
  'Date',
  'Fri, 30 Oct 2020 06:29:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:03 GMT',
  'ETag',
  '"0x8D87C9D188392B7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '36412217-301f-000c-0685-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'af3364e7-5345-44a8-8ecc-55f23e03b0f0',
  'Date',
  'Fri, 30 Oct 2020 06:29:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160403933726809292/file160403933869909908')
  .reply(200, "", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D188392B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2801fc7-b01e-009e-1485-ae3cd9000000',
  'x-ms-client-request-id',
  '1bf051c0-a500-4bad-9da3-ed93fbcbd483',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:02 GMT',
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
  'Fri, 30 Oct 2020 06:29:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160403933726809292/file160403933869909908')
  .reply(206, "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-9/10',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D188392B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2802033-b01e-009e-6985-ae3cd9000000',
  'x-ms-client-request-id',
  '9849968a-8e18-4b04-a7d1-750b33dfc62b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:02 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 30 Oct 2020 06:29:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:04 GMT',
  'ETag',
  '"0x8D87C9D190B4C8F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3641221c-301f-000c-0b85-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'bb4aeb34-077f-4a16-b407-0aef0b201028',
  'Date',
  'Fri, 30 Oct 2020 06:29:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908', "\u0001\u0002\u0003")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3641221e-301f-000c-0d85-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '45e87dca-c67e-484d-95e7-5bb11a54ade0',
  'Date',
  'Fri, 30 Oct 2020 06:29:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'ETag',
  '"0x8D87C9D1965D27D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '36412220-301f-000c-0f85-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5639daf2-b7e6-4603-be31-869ce2bc2086',
  'Date',
  'Fri, 30 Oct 2020 06:29:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160403933726809292/file160403933869909908')
  .reply(200, "", [
  'Content-Length',
  '3',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D1965D27D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2802180-b01e-009e-7d85-ae3cd9000000',
  'x-ms-client-request-id',
  '8588a60c-2aeb-4ba8-8d6b-12d40c0d56dc',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:04 GMT',
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
  'Fri, 30 Oct 2020 06:29:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160403933726809292/file160403933869909908')
  .reply(206, "\u0001\u0002\u0003", [
  'Content-Length',
  '3',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-2/3',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D1965D27D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b28021ee-b01e-009e-5785-ae3cd9000000',
  'x-ms-client-request-id',
  '52fd9f09-9026-4360-b6ea-5ff0a42ed288',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 30 Oct 2020 06:29:04 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'ETag',
  '"0x8D87C9D19F25943"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '36412221-301f-000c-1085-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'c0c72a6e-1228-44e4-a9ff-f8d50e2c21ea',
  'Date',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908', "\u0004\u0005\u0006\u0007")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '36412222-301f-000c-1185-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'fe79cef6-bd0d-4e3b-ab94-880362f18c09',
  'Date',
  'Fri, 30 Oct 2020 06:29:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160403933726809292/file160403933869909908')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:06 GMT',
  'ETag',
  '"0x8D87C9D1A4EDBF7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '36412223-301f-000c-1285-aeab6f000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6f10ae13-fc74-4973-a9b9-5ab39c914e17',
  'Date',
  'Fri, 30 Oct 2020 06:29:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160403933726809292/file160403933869909908')
  .reply(200, "", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D1A4EDBF7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b280232f-b01e-009e-7185-ae3cd9000000',
  'x-ms-client-request-id',
  '16ca66a1-b9ea-4491-8edd-3d0521fb768a',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:05 GMT',
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
  'Fri, 30 Oct 2020 06:29:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160403933726809292/file160403933869909908')
  .reply(206, "\u0004\u0005\u0006\u0007", [
  'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-3/4',
  'Last-Modified',
  'Fri, 30 Oct 2020 06:29:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87C9D1A4EDBF7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b28023a1-b01e-009e-5885-ae3cd9000000',
  'x-ms-client-request-id',
  'e028f6cf-73c1-4d02-be9e-f525c16e8606',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Fri, 30 Oct 2020 06:29:05 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 30 Oct 2020 06:29:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160403933726809292')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2802429-b01e-009e-4c85-ae3cd9000000',
  'x-ms-client-request-id',
  '31149b2f-23c7-443b-97b7-d19e9aa15c25',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 30 Oct 2020 06:29:07 GMT'
]);
