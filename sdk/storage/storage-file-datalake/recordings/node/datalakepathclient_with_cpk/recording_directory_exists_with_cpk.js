let nock = require('nock');

module.exports.hash = "d79c3080c1561275e3d4f1ed4cb6b926";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666362302683","file":"file164864666389707783","dir":"dir164864666389800546"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666362302683')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:24 GMT',
  'ETag',
  '"0x8DA12509B63892D"',
  'x-ms-request-id',
  '601eaf35-e01e-0001-6639-441b65000000',
  'x-ms-client-request-id',
  '14c56fce-a3de-48b2-a928-646291c8ff02',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666362302683/dir164864666389800546')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:24 GMT',
  'ETag',
  '"0x8DA12509B91BFA0"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4da-a01f-0003-5639-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2625134c-f057-452c-8cdf-828e1dee927a',
  'Date',
  'Wed, 30 Mar 2022 13:24:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666362302683/dir164864666389800546')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12509B91BFA0"',
  'x-ms-request-id',
  '601eaf37-e01e-0001-6739-441b65000000',
  'x-ms-client-request-id',
  'e96d9e55-3bd3-461a-8bb9-4b38e8e456b2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:24 GMT',
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
  'Wed, 30 Mar 2022 13:24:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666362302683')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf38-e01e-0001-6839-441b65000000',
  'x-ms-client-request-id',
  '8399ac54-6f2c-494e-ac21-b0bfb74369c8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:24 GMT'
]);
