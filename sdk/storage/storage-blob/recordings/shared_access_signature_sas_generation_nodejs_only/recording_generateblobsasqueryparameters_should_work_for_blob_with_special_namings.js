let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-30T22:41:12.007Z","tmr":"2019-04-30T22:41:12.007Z","container-with-dash":"container-with-dash155666407200803484","////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'155666407241609001"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash155666407200803484')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'ETag',
  '"0x8D6CDBCF266A1CA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '782e6665-901e-007f-72a5-ff036a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash155666407200803484/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C%2F%27155666407241609001')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'ETag',
  '"0x8D6CDBCF2A56FD3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2efa292e-e01e-001d-37a5-ff44b2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container-with-dash155666407200803484/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C%2F%27155666407241609001')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-30T22%3A36%3A12Z","se":"2019-05-01T22%3A41%3A12Z","sip":"0.0.0.0-255.255.255.255","sr":"b","sp":"racwd","sig":"iQUpDoaU1WVnqcFemkxrO2vTWoh9T70BeaanPzFotjA%3D","rscc":"cache-control-override","rscd":"content-disposition-override","rsce":"content-encoding-override","rscl":"content-language-override","rsct":"content-type-override"})
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6CDBCF2A56FD3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a0cb4c4-501e-004b-24a5-ffacc2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container-with-dash155666407200803484')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fb19426-801e-0006-04a5-ff6a20000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:12 GMT',
  'Connection',
  'close' ]);

