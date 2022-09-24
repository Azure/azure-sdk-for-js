let nock = require('nock');

module.exports.hash = "2bd868d76632368d016ca96c0084fc4f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383026971402751","file":"file165383027000103073","testdir":"testdir165383027079803377"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383026971402751')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:50 GMT',
  'ETag',
  '"0x8DA4175A177CC3A"',
  'x-ms-request-id',
  '84b4a7eb-a01e-0003-565e-731608000000',
  'x-ms-client-request-id',
  'd2d4c19d-5fb8-4330-adbe-0f418c2bd343',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383026971402751/file165383027000103073')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:50 GMT',
  'ETag',
  '"0x8DA4175A1A737FF"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f3-201f-0006-0d5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6c241ad2-e246-4854-bbba-c1b05d1e3ead',
  'Date',
  'Sun, 29 May 2022 13:17:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383026971402751/file165383027000103073', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f4-201f-0006-0e5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'a9ce9962-c71f-427d-af11-81d059ff57e1',
  'Date',
  'Sun, 29 May 2022 13:17:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383026971402751/file165383027000103073')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:51 GMT',
  'ETag',
  '"0x8DA4175A1F79BE3"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6f5-201f-0006-0f5e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5107a952-34fc-4f89-978a-52f76adb7bb1',
  'Date',
  'Sun, 29 May 2022 13:17:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383026971402751/testdir165383027079803377')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:51 GMT',
  'ETag',
  '"0x8DA4175A21DCC86"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f6-201f-0006-105e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '57549416-ff8e-42d3-a54c-aeaba5d5b312',
  'Date',
  'Sun, 29 May 2022 13:17:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383026971402751/testdir165383027079803377')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175A21DCC86"',
  'x-ms-request-id',
  '84b4a7ef-a01e-0003-575e-731608000000',
  'x-ms-client-request-id',
  '3b7d20c1-dd1c-415f-81d5-6dcabd866fa6',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:51 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
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
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383026971402751')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7f0-a01e-0003-585e-731608000000',
  'x-ms-client-request-id',
  'b0e87273-829c-428a-97b3-451b18379fe2',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:51 GMT'
]);
