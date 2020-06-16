let nock = require('nock');

module.exports.hash = "b1249eef1fa1409ab21b6b727de24370";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159230252342904735","file":"file159230252372302428"},"newDate":{"now":"2020-06-16T10:15:24.591Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230252342904735')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:23 GMT',
  'ETag',
  '"0x8D811DE2E920360"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363630c-001e-000e-59c7-430c19000000',
  'x-ms-client-request-id',
  '84fc3c08-348d-4a0a-a1cd-82b3078b6c9b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230252342904735/file159230252372302428')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:23 GMT',
  'ETag',
  '"0x8D811DE2EBE3E66"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '386419d6-101f-005f-3cc7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'cbca7993-6c7c-43e4-9add-6f8a29bff846',
  'Date',
  'Tue, 16 Jun 2020 10:15:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230252342904735/file159230252372302428', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '386419d8-101f-005f-3ec7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '201cf66a-7bd2-43e5-ad55-677c53d4306e',
  'Date',
  'Tue, 16 Jun 2020 10:15:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159230252342904735/file159230252372302428')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:24 GMT',
  'ETag',
  '"0x8D811DE2F160E79"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '386419d9-101f-005f-3fc7-439195000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b71be4ca-2a5a-4475-a6e0-b5174f9b9ae4',
  'Date',
  'Tue, 16 Jun 2020 10:15:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159230252342904735/file159230252372302428')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:24 GMT',
  'ETag',
  '"0x8D811DE2F160E79"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636354-001e-000e-16c7-430c19000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'afdb0735-cbf1-4b15-bad9-427ef711d151',
  'Date',
  'Tue, 16 Jun 2020 10:15:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230252342904735/file159230252372302428')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 16 Jun 2020 10:15:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811DE2F160E79"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636369-001e-000e-29c7-430c19000000',
  'x-ms-client-request-id',
  'b3a39079-d0d7-4e45-b271-e2cd44389460',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Tue, 16 Jun 2020 10:15:23 GMT',
  'x-ms-expiry-time',
  'Tue, 16 Jun 2020 10:15:29 GMT',
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
  'Tue, 16 Jun 2020 10:15:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159230252342904735/file159230252372302428')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23636531-001e-000e-34c7-430c19000000',
  'x-ms-client-request-id',
  '4d20cd43-67a7-4c74-a316-99cb37e75f69',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 16 Jun 2020 10:15:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159230252342904735')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2363655d-001e-000e-5fc7-430c19000000',
  'x-ms-client-request-id',
  '8f4f42db-52f6-4415-a74d-c3fd0e735ade',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 16 Jun 2020 10:15:30 GMT'
]);
