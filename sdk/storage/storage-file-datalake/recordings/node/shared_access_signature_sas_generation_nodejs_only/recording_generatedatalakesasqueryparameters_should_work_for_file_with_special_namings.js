let nock = require('nock');

module.exports.hash = "21772d933644970480a88067591fa4b1";

module.exports.testInfo = {"uniqueName":{"filesystem-with-dash":"filesystem-with-dash167703368376300652","./a/../Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'":"./a/../Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'167703368437006071"},"newDate":{"now":"2023-02-22T02:41:23.762Z","tmr":"2023-02-22T02:41:23.763Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem-with-dash167703368376300652')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:24 GMT',
  'ETag',
  '"0x8DB147E4A14706C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64d93-f01e-0019-4b67-4679ba000000',
  'x-ms-client-request-id',
  '3ee00018-4df1-463c-8da5-8ea4708ef218',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem-with-dash167703368376300652/Upper%20file%20empty%20another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27167703368437006071')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'ETag',
  '"0x8DB147E4A75232F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966e3-501f-004d-3b67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '993da6c6-678a-44b8-8b56-ed8958a25482',
  'Date',
  'Wed, 22 Feb 2023 02:41:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem-with-dash167703368376300652/Upper%20file%20empty%20another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27167703368437006071')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
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
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB147E4A75232F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64e25-f01e-0019-4d67-4679ba000000',
  'x-ms-client-request-id',
  'abb17774-51d7-4603-a410-00667a23911d',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 22 Feb 2023 02:41:25 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem-with-dash167703368376300652')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64e3c-f01e-0019-6167-4679ba000000',
  'x-ms-client-request-id',
  '68d1cbfe-070f-4a86-95dd-3ecc9a7cb063',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:24 GMT'
]);
