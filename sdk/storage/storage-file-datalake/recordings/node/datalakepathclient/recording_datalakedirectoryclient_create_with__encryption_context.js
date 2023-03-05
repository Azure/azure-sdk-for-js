let nock = require('nock');

module.exports.hash = "f6420bcbd9784d09c692d4ddb8a61e06";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167782474735306821","file":"file167782474763603350","testdir":"testdir167782474851902009"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474735306821')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'ETag',
  '"0x8DB1BB020A5B535"',
  'x-ms-request-id',
  '9c31818d-201e-0000-0a98-4de568000000',
  'x-ms-client-request-id',
  '98871fb3-0e6d-4d33-85ee-c4d441e72209',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:47 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474735306821/file167782474763603350')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:48 GMT',
  'ETag',
  '"0x8DB1BB020D49426"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f42-601f-0002-4b98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '16b3474e-05f9-4306-8635-53d0d0046d95',
  'Date',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474735306821/file167782474763603350', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f43-601f-0002-4c98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '282b21b1-c469-4308-b553-0ed82f169d7c',
  'Date',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474735306821/file167782474763603350')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:48 GMT',
  'ETag',
  '"0x8DB1BB0212DDA0E"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'b9fc0f44-601f-0002-4d98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '79bb38b2-4acb-4680-bdc7-f694fbe67573',
  'Date',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474735306821/testdir167782474851902009')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:49 GMT',
  'ETag',
  '"0x8DB1BB021578A38"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f45-601f-0002-4e98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'c5179564-bb12-4058-a2f7-02340cbdd25a',
  'Date',
  'Fri, 03 Mar 2023 06:25:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167782474735306821/testdir167782474851902009')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1BB021578A38"',
  'x-ms-request-id',
  '9c31818f-201e-0000-0b98-4de568000000',
  'x-ms-client-request-id',
  'b414eba6-b563-4d86-b02f-d46a2a3611dd',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Fri, 03 Mar 2023 06:25:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-context',
  'EncryptionContext',
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
  'Date',
  'Fri, 03 Mar 2023 06:25:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782474735306821')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9c318195-201e-0000-1198-4de568000000',
  'x-ms-client-request-id',
  '8a1ab8b7-8f81-45a2-a87c-f43a49477562',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:49 GMT'
]);
