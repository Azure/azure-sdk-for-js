let nock = require('nock');

module.exports.hash = "d5c815d83a755e0215b6e1a48e06054e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600135616903820","file":"file166600135645300222","tempfile2":"tempfile2166600135726206109"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135616903820')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'ETag',
  '"0x8DAB027A651EB35"',
  'x-ms-request-id',
  'a108018d-201e-0006-7710-e203a9000000',
  'x-ms-client-request-id',
  '0d9b9368-67f3-4f3f-89e2-f2fa93d2e7b8',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135616903820/file166600135645300222')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'ETag',
  '"0x8DAB027A680404A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9581-701f-0008-5e10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '21ee5788-2776-4035-899a-38c974a79a00',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135616903820/file166600135645300222', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9582-701f-0008-5f10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1c361be3-ff06-4e42-b0a8-e7267699b7eb',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135616903820/file166600135645300222')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:17 GMT',
  'ETag',
  '"0x8DAB027A6D2597C"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a9583-701f-0008-6010-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c3d09b62-89de-4de1-a4c8-6c160e718033',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135616903820/tempfile2166600135726206109')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:17 GMT',
  'ETag',
  '"0x8DAB027A6FA7180"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9584-701f-0008-6110-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '5bdf39b3-8bf6-4160-8193-12bc55c54815',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135616903820/tempfile2166600135726206109', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9585-701f-0008-6210-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1e705593-8667-4d3b-b05f-5039a035618b',
  'Date',
  'Mon, 17 Oct 2022 10:09:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135616903820/tempfile2166600135726206109', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9586-701f-0008-6310-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '3eb0ca0f-7e2c-4ecf-88a4-3b62aeb16063',
  'Date',
  'Mon, 17 Oct 2022 10:09:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135616903820/tempfile2166600135726206109')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:18 GMT',
  'ETag',
  '"0x8DAB027A773F08D"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a9587-701f-0008-6410-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'cd286d99-8a49-4bd7-9684-6e7ee6fb4218',
  'Date',
  'Mon, 17 Oct 2022 10:09:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600135616903820/tempfile2166600135726206109')
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:294a9588-701f-0008-6510-e2c247000000\nTime:2022-10-17T10:09:18.8497084Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '294a9588-701f-0008-6510-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '9da2b48d-3cf4-4d2f-897b-ef8e412b6e2e',
  'Date',
  'Mon, 17 Oct 2022 10:09:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600135616903820/tempfile2166600135726206109')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB027A773F08D"',
  'x-ms-request-id',
  'a108018f-201e-0006-7810-e203a9000000',
  'x-ms-client-request-id',
  '9683f7d0-2d75-489c-b627-432149fe1270',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:09:17 GMT',
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
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Date',
  'Mon, 17 Oct 2022 10:09:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600135616903820/tempfile2166600135726206109')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a958e-701f-0008-6610-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e953be63-78c8-4c9e-95c3-5b9b6bb14dc1',
  'Date',
  'Mon, 17 Oct 2022 10:09:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600135616903820')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a10801a3-201e-0006-7c10-e203a9000000',
  'x-ms-client-request-id',
  '3e6b7eb8-cf7f-4ad2-9115-94790489ecdd',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:34 GMT'
]);
