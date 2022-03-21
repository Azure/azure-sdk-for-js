let nock = require('nock');

module.exports.hash = "3778c479b8ef2577d339ad51fe57181e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666026604538","file":"file164864666054702449","dir":"dir164864666054804378"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666026604538')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:20 GMT',
  'ETag',
  '"0x8DA125099636ADF"',
  'x-ms-request-id',
  '601eaf28-e01e-0001-5c39-441b65000000',
  'x-ms-client-request-id',
  '006e8a94-55f4-4516-9769-d2339348b02e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666026604538/dir164864666054804378')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:20 GMT',
  'ETag',
  '"0x8DA12509991014E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4d6-a01f-0003-5239-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ddb46b9b-77a3-42e7-bcbc-7eabb2069dbd',
  'Date',
  'Wed, 30 Mar 2022 13:24:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666026604538/dir164864666054804378')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12509991014E"',
  'x-ms-request-id',
  '601eaf2a-e01e-0001-5d39-441b65000000',
  'x-ms-client-request-id',
  '8be3dafb-48cf-43ee-8a21-27ed8b426fe2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:20 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666026604538')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf2b-e01e-0001-5e39-441b65000000',
  'x-ms-client-request-id',
  'c7a1071a-baf6-477c-95f9-c80baeae5957',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:21 GMT'
]);
