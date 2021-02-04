let nock = require('nock');

module.exports.hash = "7542f6e3b6da8bb981da0db36214ab67";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161068978171001194","directory":"directory161068978289702419","file":"file161068978420308044"},"newDate":{"now":"2021-01-15T05:49:45.398Z","tmr":"2021-01-15T05:49:45.398Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068978171001194')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:42 GMT',
  'ETag',
  '"0x8D8B9195B1DB5BD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54e0c4dc-c01e-00b8-5702-eba76d000000',
  'x-ms-client-request-id',
  'bab112db-77c3-49ff-8b58-199f8ca5f6d0',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:42 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068978171001194/directory161068978289702419')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:44 GMT',
  'ETag',
  '"0x8D8B9195BE5E20E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0242bfe2-c01f-0012-5002-eb7182000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '772bcae8-8675-4fca-afb9-4a910e3c6906',
  'Date',
  'Fri, 15 Jan 2021 05:49:43 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068978171001194/directory161068978289702419/file161068978420308044')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:45 GMT',
  'ETag',
  '"0x8D8B9195C9D1410"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '998333ca-401f-0003-1502-eb4699000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '2cfb3beb-48d4-4c6f-ae83-ce45780a94f0',
  'Date',
  'Fri, 15 Jan 2021 05:49:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068978171001194', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2021-01-15T05:39:45.3980000Z</Start><Expiry>2021-01-25T05:49:45.3980000Z</Expiry><Permission>racwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:46 GMT',
  'ETag',
  '"0x8D8B9195D50B2CA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc1c8884-401e-00a9-4502-eb9076000000',
  'x-ms-client-request-id',
  '4296c8f7-f6f1-4c36-a769-51f419af6b94',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:46 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161068978171001194/directory161068978289702419/file161068978420308044')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8B9195C9D1410"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3cef8fe-401e-008b-4b02-ebfe40000000',
  'x-ms-client-request-id',
  'dc4eaee1-3cbd-4a6d-ba85-efecd78243c0',
  'x-ms-version',
  '2020-04-08',
  'x-ms-creation-time',
  'Fri, 15 Jan 2021 05:49:45 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 05:49:46 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161068978171001194')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df82fc23-601e-0014-0402-eb86fa000000',
  'x-ms-client-request-id',
  '7b31202d-bf55-4eb5-94bb-8d9295d7223d',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:48 GMT',
  'Connection',
  'close'
]);
