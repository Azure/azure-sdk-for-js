let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem-with-dash":"filesystem-with-dash157534997537102135","Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'":"Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'157534997651703310"},"newDate":{"now":"2019-12-03T05:12:55.371Z","tmr":"2019-12-03T05:12:55.371Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem-with-dash157534997537102135')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:58 GMT',
  'ETag',
  '"0x8D777AE9F861733"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18055473-e01e-008d-7c97-a90938000000',
  'x-ms-client-request-id',
  'd081d2d6-2b3e-4e3b-9447-07d9b4e7671f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:57 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem-with-dash157534997537102135/Upper%20file%20empty%20another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534997651703310')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 05:06:59 GMT',
  'ETag',
  '"0x8D777AEA03635E9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94933029-d01f-0049-2697-a976fe000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '23883389-34ef-472a-b5b9-8fcbc7910b25',
  'Date',
  'Tue, 03 Dec 2019 05:06:58 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem-with-dash157534997537102135/Upper%20file%20empty%20another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534997651703310')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '0',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777AEA03635E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '413654a5-001e-002d-4697-a9c65e000000',
  'x-ms-client-request-id',
  'dd47b67c-8100-4c03-8c38-31dcd5f46cb1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 05:06:59 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:07:00 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem-with-dash157534997537102135')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '180559a9-e01e-008d-3997-a90938000000',
  'x-ms-client-request-id',
  '5cad47cf-7743-4888-86be-f1ee7fd5093f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:07:00 GMT' ]);
