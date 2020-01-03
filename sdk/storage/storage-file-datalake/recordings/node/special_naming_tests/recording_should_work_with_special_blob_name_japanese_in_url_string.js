let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534401611307523","にっぽんごにほんご":"にっぽんごにほんご157534401725409719"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534401611307523')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:38 GMT',
  'ETag',
  '"0x8D777A0BF829E63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed6696d0-a01e-002b-4089-a93126000000',
  'x-ms-client-request-id',
  'f7a911ec-571b-4a94-a498-cabd0768486c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:38 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534401611307523/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94157534401725409719')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:39 GMT',
  'ETag',
  '"0x8D777A0C0322556"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31fde780-901f-0082-0189-a9e4ce000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aaa5f570-0443-46eb-ab9b-d998470e783f',
  'Date',
  'Tue, 03 Dec 2019 03:27:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534401611307523/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94157534401725409719')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0C0322556"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcb2038a-601e-0014-5c89-a986fa000000',
  'x-ms-client-request-id',
  'abb418ae-be66-4c89-9074-9ab8087fdef9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:39 GMT',
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
  'Tue, 03 Dec 2019 03:27:40 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534401611307523')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0C0322556","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:39 GMT","name":"にっぽんごにほんご157534401725409719","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '340c8837-601f-005b-7689-a942e2000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ff459754-72ed-4038-a3ef-caf0e18b285c',
  'Date',
  'Tue, 03 Dec 2019 03:27:42 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534401611307523')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed66a02f-a01e-002b-4689-a93126000000',
  'x-ms-client-request-id',
  '4e0a8cd3-1645-41f3-8523-8195527e0bf0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:41 GMT' ]);
