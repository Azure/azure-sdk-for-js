let nock = require('nock');

module.exports.hash = "fe0332bff0674345ac91aadc97fedd08";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600130020103704","file":"file166600130171104062","tempfile2":"tempfile2166600130369006261"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600130020103704')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:21 GMT',
  'ETag',
  '"0x8DAB02785A2F435"',
  'x-ms-request-id',
  'a1080152-201e-0006-5e10-e203a9000000',
  'x-ms-client-request-id',
  '0df9d93f-1625-4294-b255-10f347a73b53',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:08:21 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600130020103704/file166600130171104062')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'ETag',
  '"0x8DAB027868A2928"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9557-701f-0008-4610-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ac015947-ccd9-4649-adfb-58f1ffbab72f',
  'Date',
  'Mon, 17 Oct 2022 10:08:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600130020103704/file166600130171104062', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9558-701f-0008-4710-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'bb2d8d82-196e-42ff-93f7-b87582fb1a9a',
  'Date',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600130020103704/file166600130171104062')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'ETag',
  '"0x8DAB02786E33C5A"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a9559-701f-0008-4810-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '52a7fb32-a19c-4d49-8911-deec40cdc88d',
  'Date',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600130020103704/tempfile2166600130369006261')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:24 GMT',
  'ETag',
  '"0x8DAB027870D5B24"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a955a-701f-0008-4910-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'b71782b8-44a2-4a28-95d5-d22f72d7d204',
  'Date',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600130020103704/tempfile2166600130369006261', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a955b-701f-0008-4a10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'b442e1a2-cbb2-4ddd-9197-cabd3c21b063',
  'Date',
  'Mon, 17 Oct 2022 10:08:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600130020103704/tempfile2166600130369006261', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:294a955c-701f-0008-4b10-e2c247000000\nTime:2022-10-17T10:08:24.7709199Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '294a955c-701f-0008-4b10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c8b2a4fe-04fa-4a69-bba2-c74bcb147af2',
  'Date',
  'Mon, 17 Oct 2022 10:08:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600130020103704/tempfile2166600130369006261', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:25 GMT',
  'ETag',
  '"0x8DAB02787880BDC"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a955d-701f-0008-4c10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '6893feb1-016c-43bd-8659-2837b713b6eb',
  'Date',
  'Mon, 17 Oct 2022 10:08:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600130020103704/tempfile2166600130369006261')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB02787880BDC"',
  'x-ms-request-id',
  'a1080158-201e-0006-6010-e203a9000000',
  'x-ms-client-request-id',
  '05705d3e-d40c-471b-b836-5de3de6acd4b',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:08:24 GMT',
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
  'Mon, 17 Oct 2022 10:08:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600130020103704/tempfile2166600130369006261')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a9565-701f-0008-4e10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '43e6e8c8-d27b-4213-bcaf-950549470883',
  'Date',
  'Mon, 17 Oct 2022 10:08:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600130020103704')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a1080169-201e-0006-6310-e203a9000000',
  'x-ms-client-request-id',
  '79c75d68-816d-40bf-a58f-7d3d3082e4ef',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:08:40 GMT'
]);
