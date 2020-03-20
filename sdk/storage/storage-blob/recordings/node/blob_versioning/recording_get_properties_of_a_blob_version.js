let nock = require('nock');

module.exports.hash = "4b24b4a1e11b442fc2043f109ef51019";

module.exports.testInfo = {"uniqueName":{"container":"container158471766140306365","blob":"blob158471766287009243"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471766140306365')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:02 GMT',
  'ETag',
  '"0x8D7CCE24D48E710"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c208eb-401e-0057-54cb-fe74f1000000',
  'x-ms-client-request-id',
  '805351b3-3f19-42f5-b79b-4293254d9ebe',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 15:21:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471766140306365/blob158471766287009243', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'ETag',
  '"0x8D7CCE24D7741B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c20932-401e-0057-14cb-fe74f1000000',
  'x-ms-client-request-id',
  '6a6b94d9-8132-43ff-803d-81a3ed938dce',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T15:21:03.0550963Z',
  'Date',
  'Fri, 20 Mar 2020 15:21:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471766140306365/blob158471766287009243')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'ETag',
  '"0x8D7CCE24DA18DBC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c209b3-401e-0057-07cb-fe74f1000000',
  'x-ms-client-request-id',
  '2aa94c82-1371-4d31-9142-a3c1edbb75cb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T15:21:03.3342944Z',
  'Date',
  'Fri, 20 Mar 2020 15:21:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158471766140306365/blob158471766287009243')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCE24D7741B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c209f9-401e-0057-46cb-fe74f1000000',
  'x-ms-client-request-id',
  'c2338de4-c8cc-4603-a1cd-8d1b7a7a6059',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T15:21:03.0550963Z',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 15:21:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158471766140306365/blob158471766287009243')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCE24DA18DBC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c20a48-401e-0057-0ecb-fe74f1000000',
  'x-ms-client-request-id',
  '246a414f-85a1-42d0-a0de-95aefff02718',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T15:21:03.3342944Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 15:21:03 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 15:21:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471766140306365/blob158471766287009243')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Mar 2020 15:21:03 GMT',
  'ETag',
  '"0x8D7CCE24DA18DBC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2c20aa8-401e-0057-67cb-fe74f1000000',
  'x-ms-client-request-id',
  '85240d4c-8b59-42b5-aeef-7c730363375e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T15:21:04.1798954Z',
  'x-ms-snapshot',
  '2020-03-20T15:21:04.1788954Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 20 Mar 2020 15:21:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158471766140306365/blob158471766287009243')
  .query(true)
  .reply(400, "", [
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'MutuallyExclusiveQueryParameters',
  'x-ms-request-id',
  'b2c20ae3-401e-0057-1dcb-fe74f1000000',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 15:21:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158471766140306365')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76774d81-801e-0077-0acb-fe0f56000000',
  'x-ms-client-request-id',
  '66d2806b-755f-4825-ae9e-a10e82716a22',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 15:21:05 GMT'
]);
