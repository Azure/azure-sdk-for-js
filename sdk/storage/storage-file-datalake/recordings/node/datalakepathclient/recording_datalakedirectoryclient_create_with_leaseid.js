let nock = require('nock');

module.exports.hash = "19c155eca6f07f82fdbf48155e034fe4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383027812703215","file":"file165383027840004427","testdir":"testdir165383027922902964"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027812703215')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:58 GMT',
  'ETag',
  '"0x8DA4175A67B9CF9"',
  'x-ms-request-id',
  '84b4a800-a01e-0003-635e-731608000000',
  'x-ms-client-request-id',
  'd997e16b-af64-4c2b-8a66-64b9a3d8719f',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027812703215/file165383027840004427')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:58 GMT',
  'ETag',
  '"0x8DA4175A6AAB5F9"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d2-201f-0000-4e5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5d028716-81e5-472b-9fe6-cd589dba9a26',
  'Date',
  'Sun, 29 May 2022 13:17:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027812703215/file165383027840004427', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d3-201f-0000-4f5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '45a8f150-997e-4e0d-9154-a8e37548b09a',
  'Date',
  'Sun, 29 May 2022 13:17:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027812703215/file165383027840004427')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:59 GMT',
  'ETag',
  '"0x8DA4175A6FCFA30"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96d4-201f-0000-505e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1bc18442-2413-4a86-ba3c-e3edaaf49f9d',
  'Date',
  'Sun, 29 May 2022 13:17:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027812703215/testdir165383027922902964')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:59 GMT',
  'ETag',
  '"0x8DA4175A724994A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96d5-201f-0000-515e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '62719c45-417a-4b8d-874e-95d58bc7c18c',
  'Date',
  'Sun, 29 May 2022 13:17:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383027812703215/testdir165383027922902964')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175A724994A"',
  'x-ms-request-id',
  '84b4a802-a01e-0003-645e-731608000000',
  'x-ms-client-request-id',
  'a344cce5-34a4-42a1-9f74-621ae251e864',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:59 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383027812703215')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a803-a01e-0003-655e-731608000000',
  'x-ms-client-request-id',
  'bdf7e522-d829-4f34-8e50-4d3d2b09b70b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:59 GMT'
]);
