let nock = require('nock');

module.exports.hash = "475e5d2209f8f7efd2758da203615628";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383024420707330","file":"file165383024448306075","testfile":"testfile165383024529005861"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024420707330')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:24 GMT',
  'ETag',
  '"0x8DA41759244AD78"',
  'x-ms-request-id',
  '84b4a7c4-a01e-0003-3f5e-731608000000',
  'x-ms-client-request-id',
  '40ec880f-ee41-4409-9923-41e2d54d3a2e',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024420707330/file165383024448306075')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:25 GMT',
  'ETag',
  '"0x8DA41759271CA62"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6db-201f-0006-025e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1f800998-3352-4c15-baa6-414f6da0286e',
  'Date',
  'Sun, 29 May 2022 13:17:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024420707330/file165383024448306075', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6dc-201f-0006-035e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '86ac54f8-6a9a-4f6b-89c1-593eade17e3b',
  'Date',
  'Sun, 29 May 2022 13:17:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383024420707330/file165383024448306075')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:25 GMT',
  'ETag',
  '"0x8DA417592C3CD0D"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6dd-201f-0006-045e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '489face1-ae0b-4fae-a258-c969ecfcd033',
  'Date',
  'Sun, 29 May 2022 13:17:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383024420707330/testfile165383024529005861')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:25 GMT',
  'ETag',
  '"0x8DA417592EAC690"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6de-201f-0006-055e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '256e5efa-3ec6-4fdc-a03c-d570785046a0',
  'Date',
  'Sun, 29 May 2022 13:17:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383024420707330/testfile165383024529005861')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA417592EAC690"',
  'x-ms-request-id',
  '84b4a7d1-a01e-0003-4b5e-731608000000',
  'x-ms-client-request-id',
  '06870ab8-db5a-48b2-9e6c-79c20c983f05',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:25 GMT',
  'x-ms-expiry-time',
  'Sun, 29 May 2022 14:17:25 GMT',
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
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383024420707330')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7d4-a01e-0003-4e5e-731608000000',
  'x-ms-client-request-id',
  '5a8824da-0b6e-4e90-8b90-9d53d9793e9a',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:26 GMT'
]);
