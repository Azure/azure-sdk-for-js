let nock = require('nock');

module.exports.hash = "f15c4ddfac4e94083a45e24c0a1b367e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071855824007261","file":"file162071855855104292","directory":"directory162071856038503053"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855824007261')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:58 GMT',
  'ETag',
  '"0x8D9144F6B42534F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c2ca-f01e-0012-4038-463670000000',
  'x-ms-client-request-id',
  '270a832a-d630-4044-a54d-b90e7858f69b',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855824007261/file162071855855104292')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:58 GMT',
  'ETag',
  '"0x8D9144F6B73CB78"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e8da-601f-0000-2338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9d30c75f-7b2a-407e-8470-f833738e001c',
  'Date',
  'Tue, 11 May 2021 07:35:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855824007261/file162071855855104292')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921590455926',
  'x-ms-request-id',
  '1270e8e3-601f-0000-2c38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e4a7d28c-2eab-48b2-b4b4-cc76b3b421ba',
  'Date',
  'Tue, 11 May 2021 07:35:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855824007261/file162071855855104292')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c30c-f01e-0012-6f38-463670000000',
  'x-ms-client-request-id',
  '689390ff-a283-4275-8c14-1c2477d5758d',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:35:58 GMT',
  'Date',
  'Tue, 11 May 2021 07:35:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071855824007261/file162071855855104292')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F6B73CB78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c323-f01e-0012-7d38-463670000000',
  'x-ms-client-request-id',
  '52c78202-6c48-4602-92ac-a1961e2820e8',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:35:58 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:59 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855824007261/file162071855855104292')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921602354229',
  'x-ms-request-id',
  '1270e94b-601f-0000-1238-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2730bd6f-1256-408c-a033-f4f9a0b2925d',
  'Date',
  'Tue, 11 May 2021 07:36:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855824007261/directory162071856038503053')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:00 GMT',
  'ETag',
  '"0x8D9144F6C8AB105"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e980-601f-0000-4738-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '4e615642-dacf-40ab-af05-c625c720883f',
  'Date',
  'Tue, 11 May 2021 07:36:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855824007261/directory162071856038503053')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921608620505',
  'x-ms-request-id',
  '1270e992-601f-0000-5938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f3dac230-d413-496b-b949-0b887d06b905',
  'Date',
  'Tue, 11 May 2021 07:36:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071855824007261/directory162071856038503053')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c3d6-f01e-0012-6938-463670000000',
  'x-ms-client-request-id',
  '1077817f-a373-4731-a704-8ac99f3a66e7',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:00 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071855824007261/directory162071856038503053')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F6C8AB105"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c3ef-f01e-0012-7838-463670000000',
  'x-ms-client-request-id',
  'a9146857-b1fb-4121-824f-af10c0bc697b',
  'x-ms-version',
  '2020-06-12',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:00 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:36:00 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855824007261/directory162071856038503053')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921618644069',
  'x-ms-request-id',
  '1270e9ac-601f-0000-7138-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '80df8598-75f5-4542-ac80-05d607b2e90b',
  'Date',
  'Tue, 11 May 2021 07:36:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071855824007261')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c43f-f01e-0012-3b38-463670000000',
  'x-ms-client-request-id',
  '5b4dca5d-d890-4016-97c0-91f8cbfc7cad',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:01 GMT'
]);
