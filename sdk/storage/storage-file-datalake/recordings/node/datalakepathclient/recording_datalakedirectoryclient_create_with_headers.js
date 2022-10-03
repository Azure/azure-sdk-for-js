let nock = require('nock');

module.exports.hash = "a05f2d88b7446354ddb0e130e3cc0d03";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383027548706179","file":"file165383027576309717","testdir":"testdir165383027729900586"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027548706179')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:56 GMT',
  'ETag',
  '"0x8DA4175A4E899A2"',
  'x-ms-request-id',
  '84b4a7f9-a01e-0003-5e5e-731608000000',
  'x-ms-client-request-id',
  'fbe57a1e-b259-4da4-9f84-963c9274ef24',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:55 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027548706179/file165383027576309717')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:57 GMT',
  'ETag',
  '"0x8DA4175A5863C99"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96ce-201f-0000-4a5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd7c64eb2-b2af-4e04-84ba-3750e3f8990c',
  'Date',
  'Sun, 29 May 2022 13:17:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027548706179/file165383027576309717', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96cf-201f-0000-4b5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f2a39850-791d-4434-8d9b-ce4b282d2268',
  'Date',
  'Sun, 29 May 2022 13:17:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027548706179/file165383027576309717')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:57 GMT',
  'ETag',
  '"0x8DA4175A5D7E26E"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96d0-201f-0000-4c5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '01de2741-065f-4dac-8117-9d749c835bd6',
  'Date',
  'Sun, 29 May 2022 13:17:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027548706179/testdir165383027729900586')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:57 GMT',
  'ETag',
  '"0x8DA4175A5FE6805"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d1-201f-0000-4d5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'def7b490-22c9-462b-abc6-cc5e85bc1f02',
  'Date',
  'Sun, 29 May 2022 13:17:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383027548706179/testdir165383027729900586')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175A5FE6805"',
  'x-ms-request-id',
  '84b4a7fd-a01e-0003-615e-731608000000',
  'x-ms-client-request-id',
  'bd3e02f1-4da9-4da3-a5ec-2d5123a6fea2',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383027548706179')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7ff-a01e-0003-625e-731608000000',
  'x-ms-client-request-id',
  '789da49e-0cd6-4318-890a-862dafd877af',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:57 GMT'
]);
