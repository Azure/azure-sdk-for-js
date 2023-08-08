let nock = require('nock');

module.exports.hash = "1a6c64013301e8265b063ca18ed4ffb5";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154756169804461","file":"file169154756183309779","tempfile2":"tempfile2169154756226108836"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756169804461')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'ETag',
  '"0x8DB987F0AC16C76"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27c1f-101e-002e-4b67-caab16000000',
  'x-ms-client-request-id',
  '2a8f810f-94fb-419d-90aa-2068f789f5ca',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756169804461/file169154756183309779')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'ETag',
  '"0x8DB987F0AD73ED3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167498c-f01f-0054-4867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '24899d60-0ae4-4750-afcd-8733152b5c2f',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756169804461/file169154756183309779', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674993-f01f-0054-4f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '45997f78-cc1e-483c-b2e0-e7955d92ebfc',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756169804461/file169154756183309779')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'ETag',
  '"0x8DB987F0B0337AA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674996-f01f-0054-5267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '05029c79-7f07-4cac-a891-6262d35ba66a',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154756169804461/tempfile2169154756226108836')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'ETag',
  '"0x8DB987F0B18620D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167499d-f01f-0054-5967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b88dcdcd-00bc-42de-bba1-ffab1562becc',
  'Date',
  'Wed, 09 Aug 2023 02:19:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756169804461/tempfile2169154756226108836', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16749a2-f01f-0054-5e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'f3516c6f-31fd-455d-9b3a-4b7294d1c3d0',
  'Date',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756169804461/tempfile2169154756226108836', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16749a7-f01f-0054-6367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '062ba40d-5313-49bf-a1d2-76ea47b2a6a0',
  'Date',
  'Wed, 09 Aug 2023 02:19:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154756169804461/tempfile2169154756226108836')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'ETag',
  '"0x8DB987F14496427"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674a23-f01f-0054-5567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '76a957c5-964f-45ff-820a-ac2c5aba1e10',
  'Date',
  'Wed, 09 Aug 2023 02:19:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756169804461/tempfile2169154756226108836')
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:f1674a25-f01f-0054-5767-cab656000000\nTime:2023-08-09T02:19:37.3235654Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  'f1674a25-f01f-0054-5767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5d60be72-2e57-443f-9b61-d77bbd8a751a',
  'Date',
  'Wed, 09 Aug 2023 02:19:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154756169804461/tempfile2169154756226108836')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F14496427"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c281d4-101e-002e-0867-caab16000000',
  'x-ms-client-request-id',
  '4f2a21d8-e4a8-4cfe-99a6-ab2903c60c61',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:21 GMT',
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
  'Wed, 09 Aug 2023 02:19:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756169804461/tempfile2169154756226108836')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211775569974',
  'x-ms-request-id',
  'f1674a2d-f01f-0054-5f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e7df9b07-6e5f-442f-bab2-d29bbde69bc8',
  'Date',
  'Wed, 09 Aug 2023 02:19:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154756169804461')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c281e9-101e-002e-1967-caab16000000',
  'x-ms-client-request-id',
  'c8ae4b88-e30e-4642-a461-5f42535de159',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:36 GMT'
]);
