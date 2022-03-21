let nock = require('nock');

module.exports.hash = "f3ac268036d904cbb46dd6cc18e77a88";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665657405606","file":"file164864665685607652","dir":"dir164864665685700546"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665657405606')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:16 GMT',
  'ETag',
  '"0x8DA1250973054EF"',
  'x-ms-request-id',
  '601eaf11-e01e-0001-5039-441b65000000',
  'x-ms-client-request-id',
  '2d72986b-086e-4b07-be39-473c417e19a3',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665657405606/file164864665685607652')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:17 GMT',
  'ETag',
  '"0x8DA1250975E9412"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4d2-a01f-0003-4f39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f6bca280-1259-4f1a-be5d-2a373b682ad4',
  'Date',
  'Wed, 30 Mar 2022 13:24:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665657405606/file164864665685607652')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:17 GMT',
  'ETag',
  '"0x8DA1250978E99F0"',
  'x-ms-request-id',
  '601eaf13-e01e-0001-5139-441b65000000',
  'x-ms-client-request-id',
  '9c8f58e3-1f95-4fee-b420-159a7dec86d5',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 30 Mar 2022 13:24:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864665657405606/file164864665685607652')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1250978E99F0"',
  'x-ms-request-id',
  '601eaf15-e01e-0001-5239-441b65000000',
  'x-ms-client-request-id',
  '142c1216-6509-43aa-b007-3b5a06bdc8a4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:17 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665657405606')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf1d-e01e-0001-5339-441b65000000',
  'x-ms-client-request-id',
  'b68fd962-0daf-4fa2-b813-4623946adcb8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:17 GMT'
]);
