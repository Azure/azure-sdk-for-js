let nock = require('nock');

module.exports.hash = "66adaceb231b274d32766add9cd22d95";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864663727201814","file":"file164864663881907495","dir":"dir164864663882306972"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864663727201814')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:23:58 GMT',
  'ETag',
  '"0x8DA12508C64F09E"',
  'x-ms-request-id',
  '601eaed9-e01e-0001-2c39-441b65000000',
  'x-ms-client-request-id',
  '1d207d89-1340-4669-ad20-7ce7a0580653',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:23:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864663727201814/file164864663881907495')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'ETag',
  '"0x8DA12508D51FAE5"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4b8-a01f-0003-3639-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fe06359c-7024-4b44-8571-41e1b428dfc3',
  'Date',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864663727201814/file164864663881907495', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4b9-a01f-0003-3739-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4d9b1cd7-d85e-4971-994e-634ad95d34bd',
  'Date',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864663727201814/file164864663881907495')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'ETag',
  '"0x8DA12508DA3A05A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4ba-a01f-0003-3839-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c81e216d-3686-4f5a-b87a-77e0fdffb266',
  'Date',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164864663727201814/file164864663881907495')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12508DA3A05A"',
  'x-ms-request-id',
  '601eaedd-e01e-0001-2d39-441b65000000',
  'x-ms-client-request-id',
  '2d764488-90b1-4535-9634-7d9fb1481f52',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:00 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864663727201814')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaede-e01e-0001-2e39-441b65000000',
  'x-ms-client-request-id',
  '4686bb0b-3136-4ed2-acae-ef6ab2f8849e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:00 GMT'
]);
