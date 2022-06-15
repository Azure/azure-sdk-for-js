let nock = require('nock');

module.exports.hash = "fc953a753de23b2368fb4d237c6d6d9b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165569024994407468","dir":"dir165569025025206885"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165569024994407468')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:30 GMT',
  'ETag',
  '"0x8DA52603C0CD62E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1ab9fcf-901e-0014-5849-84be4e000000',
  'x-ms-client-request-id',
  'a7b5b0b7-974e-4b1d-ab55-a97af13ff3b5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:57:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165569024994407468/dir165569025025206885')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:30 GMT',
  'ETag',
  '"0x8DA52603C3C65AE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'a5b9b449-c01f-0009-0449-84b3f2000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'f03bc20b-e90f-4aeb-aef7-590c5136a5a2',
  'Date',
  'Mon, 20 Jun 2022 01:57:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165569024994407468/dir165569025025206885')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA52603C3C65AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1aba056-901e-0014-3549-84be4e000000',
  'x-ms-client-request-id',
  '8a180706-f971-4e3d-bc9b-571505ed2f25',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 20 Jun 2022 01:57:30 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-scope,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 20 Jun 2022 01:57:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165569024994407468')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1aba0bb-901e-0014-7849-84be4e000000',
  'x-ms-client-request-id',
  'd38ce16d-e6b9-4ae2-8278-611253791b18',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:57:30 GMT'
]);
