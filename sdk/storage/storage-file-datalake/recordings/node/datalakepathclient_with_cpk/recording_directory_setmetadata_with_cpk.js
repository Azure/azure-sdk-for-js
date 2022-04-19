let nock = require('nock');

module.exports.hash = "0c27bb3dd159b0d467e721c2f3fb5d9e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666699302047","file":"file164864666727501948","dir":"dir164864666727600268"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666699302047')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:27 GMT',
  'ETag',
  '"0x8DA12509D65CA67"',
  'x-ms-request-id',
  '601eaf41-e01e-0001-6f39-441b65000000',
  'x-ms-client-request-id',
  '77400937-5384-408f-86e3-c111446e3444',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666699302047/dir164864666727600268')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:27 GMT',
  'ETag',
  '"0x8DA12509D928B9B"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4dd-a01f-0003-5939-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '270d7d2a-e71a-4c09-a841-0ca14f85af01',
  'Date',
  'Wed, 30 Mar 2022 13:24:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666699302047/dir164864666727600268')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:27 GMT',
  'ETag',
  '"0x8DA12509DB9C8F5"',
  'x-ms-request-id',
  '601eaf43-e01e-0001-7039-441b65000000',
  'x-ms-client-request-id',
  '27105b24-2efc-481d-9777-3b74b4b9c957',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 30 Mar 2022 13:24:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666699302047/dir164864666727600268')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12509DB9C8F5"',
  'x-ms-request-id',
  '601eaf44-e01e-0001-7139-441b65000000',
  'x-ms-client-request-id',
  'a78547b2-b84e-4f7c-a852-e7027d3aaf42',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:27 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666699302047')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf45-e01e-0001-7239-441b65000000',
  'x-ms-client-request-id',
  '5f04d44c-7e59-4254-8a50-eb31927f059f',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:27 GMT'
]);
