let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534997919101488","file":"file157534998034506784"},"newDate":{"now":"2019-12-03T05:12:59.191Z","tmr":"2019-12-03T05:12:59.191Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534997919101488')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:01 GMT',
  'ETag',
  '"0x8D777AEA1CD1048"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71849569-d01e-0085-3197-a9124b000000',
  'x-ms-client-request-id',
  'ac05d325-48f0-417f-8a45-7bd8a2ece9b7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:00 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534997919101488/file157534998034506784')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 05:07:03 GMT',
  'ETag',
  '"0x8D777AEA27EB057"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5a4cba4-b01f-003f-6e97-a9f242000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a782b7a9-406d-4c3e-9ef9-308c107d5a30',
  'Date',
  'Tue, 03 Dec 2019 05:07:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534997919101488', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-12-03T05:02:59.1910000Z</Start><Expiry>2019-12-13T05:12:59.1910000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:03 GMT',
  'ETag',
  '"0x8D777AEA2AA52DF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71849743-d01e-0085-5a97-a9124b000000',
  'x-ms-client-request-id',
  '1a4503cf-6880-4643-9045-0a8ac204c295',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:02 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534997919101488/file157534998034506784')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:07:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777AEA27EB057"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e19b3393-401e-00a2-4697-a98802000000',
  'x-ms-client-request-id',
  'bb6b88b6-9f41-400f-b975-5bc3c47c03a8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 05:07:03 GMT',
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
  'Tue, 03 Dec 2019 05:07:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534997919101488')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71849999-d01e-0085-7a97-a9124b000000',
  'x-ms-client-request-id',
  '45848b57-e507-4097-a490-3a6f59b31e99',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:03 GMT' ]);
