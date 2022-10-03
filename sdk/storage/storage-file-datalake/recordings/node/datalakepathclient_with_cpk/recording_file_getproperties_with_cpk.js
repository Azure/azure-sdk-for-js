let nock = require('nock');

module.exports.hash = "93ce15b37af2c62cc60d4673c1edd1d0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664146507471","file":"file164864664174600146","dir":"dir164864664174703500"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664146507471')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:01 GMT',
  'ETag',
  '"0x8DA12508E2EBB89"',
  'x-ms-request-id',
  '601eaedf-e01e-0001-2f39-441b65000000',
  'x-ms-client-request-id',
  '0a638531-c9ae-421a-955a-95c1b34ceb84',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:01 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664146507471/file164864664174600146')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:02 GMT',
  'ETag',
  '"0x8DA12508E5DBC46"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4bb-a01f-0003-3939-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'accdfc5a-1ec2-4f14-9b6c-697369048eed',
  'Date',
  'Wed, 30 Mar 2022 13:24:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664146507471/file164864664174600146')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12508E5DBC46"',
  'x-ms-request-id',
  '601eaee1-e01e-0001-3039-441b65000000',
  'x-ms-client-request-id',
  '04c0c2bd-a235-4dd9-b9af-dcf455e12aa1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:02 GMT',
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
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664146507471')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaee3-e01e-0001-3139-441b65000000',
  'x-ms-client-request-id',
  '31c8684d-3aac-460c-a1a7-e1f49400fb23',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:02 GMT'
]);
