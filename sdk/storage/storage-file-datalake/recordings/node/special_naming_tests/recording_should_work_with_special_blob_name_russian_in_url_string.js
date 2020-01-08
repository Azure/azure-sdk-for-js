let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534398611408580","ру́сский язы́к":"ру́сский язы́к157534398726301366"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534398611408580')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:08 GMT',
  'ETag',
  '"0x8D777A0ADA20467"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f972fcd9-301e-006a-2789-a91935000000',
  'x-ms-client-request-id',
  '3f99d85e-980a-486b-881e-de51ff198774',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:08 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534398611408580/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA157534398726301366')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:09 GMT',
  'ETag',
  '"0x8D777A0AE539D2B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a7016e2-401f-0047-3989-a99af5000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8cfb88c1-53f8-4291-ab91-6cf198dbf097',
  'Date',
  'Tue, 03 Dec 2019 03:27:08 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534398611408580/%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA157534398726301366')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0AE539D2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8234c841-201e-0057-2889-a9ac13000000',
  'x-ms-client-request-id',
  '46ed06ab-8658-4a19-a1e8-902a269a95a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:09 GMT',
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
  'Tue, 03 Dec 2019 03:27:10 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534398611408580')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0AE539D2B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:09 GMT","name":"ру́сский язы́к157534398726301366","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8554fc11-101f-0076-2b89-a9c122000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bce162d7-b3f5-4e6a-a671-bc8916d55045',
  'Date',
  'Tue, 03 Dec 2019 03:27:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534398611408580')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9730750-301e-006a-5e89-a91935000000',
  'x-ms-client-request-id',
  '97e735be-ba50-432b-b4ac-0a5f0e803d25',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:12 GMT' ]);
