let nock = require('nock');

module.exports.hash = "9fcd161fbe0ffde62b0b60e1266f81f9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167703501463206781","file":"file167703501534205590","directory":"directory167703501679303339"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703501463206781')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:03:35 GMT',
  'ETag',
  '"0x8DB1481636637AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e006902-501e-005d-356a-46f385000000',
  'x-ms-client-request-id',
  'a392173b-30ff-4dff-af70-a77210dfb815',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:03:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703501463206781/file167703501534205590')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'ETag',
  '"0x8DB148163D92A1B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '30a27573-e01f-003a-7e6a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '9398e2b8-9ee5-4851-b70e-aa839e393be3',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703501463206781/file167703501534205590')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133215086163197351',
  'x-ms-request-id',
  '30a27574-e01f-003a-7f6a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'a6ed6bef-82a1-404d-ade1-b922236a0c61',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703501463206781/file167703501534205590')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e0069d7-501e-005d-726a-46f385000000',
  'x-ms-client-request-id',
  '97a93faa-fb47-4a7c-9edc-4bb43e22ccfc',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Date',
  'Wed, 22 Feb 2023 03:03:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167703501463206781/file167703501534205590')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB148163D92A1B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e0069ef-501e-005d-086a-46f385000000',
  'x-ms-client-request-id',
  'f9fab2fa-b495-426b-8678-cf46926523ca',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 22 Feb 2023 03:03:36 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703501463206781/file167703501534205590')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133215086168415484',
  'x-ms-request-id',
  '30a27579-e01f-003a-046a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '29d623cc-0d00-468b-adc5-8373e27d740f',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703501463206781/directory167703501679303339')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 03:03:37 GMT',
  'ETag',
  '"0x8DB1481645D0B78"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '30a2757b-e01f-003a-056a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f8ed2d6e-e959-4b30-a08b-762eb3a1de11',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703501463206781/directory167703501679303339')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133215086171643507',
  'x-ms-request-id',
  '30a2757c-e01f-003a-066a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'aa6cefab-d456-40ec-aff6-1fdfd27906d8',
  'Date',
  'Wed, 22 Feb 2023 03:03:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703501463206781/directory167703501679303339')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e006a6a-501e-005d-756a-46f385000000',
  'x-ms-client-request-id',
  '83397481-31a8-47bf-93a4-01fcb141f76c',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Wed, 22 Feb 2023 03:03:37 GMT',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167703501463206781/directory167703501679303339')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:03:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1481645D0B78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e006a90-501e-005d-196a-46f385000000',
  'x-ms-client-request-id',
  '535952f0-1e2b-4801-9757-4c8a95cb9d8c',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 22 Feb 2023 03:03:37 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:03:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703501463206781/directory167703501679303339')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133215086176360075',
  'x-ms-request-id',
  '30a27582-e01f-003a-0c6a-46e379000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '97494a2a-924b-4f00-b94d-ee9ffff5aa3e',
  'Date',
  'Wed, 22 Feb 2023 03:03:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703501463206781')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e006ac3-501e-005d-4a6a-46f385000000',
  'x-ms-client-request-id',
  '6262ac1b-1308-4848-bd01-66c73511f89b',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:03:37 GMT'
]);
