let nock = require('nock');

module.exports.hash = "1c45f3e2538cb040f48f05c5638d6507";

module.exports.testInfo = {"uniqueName":{"container-with-dash":"container-with-dash167517606846205067","////Upper/blob/empty /adir/./adir1/../another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"////Upper/blob/empty /adir/./adir1/../another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'167517606911802581"},"newDate":{"now":"2023-01-31T14:41:08.461Z","tmr":"2023-01-31T14:41:08.462Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash167517606846205067')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 31 Jan 2023 14:41:09 GMT',
  'ETag',
  '"0x8DB03993125B66F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc70a0d-b01e-006d-3682-3550f2000000',
  'x-ms-client-request-id',
  'd62ebec5-1324-422c-8ee1-3a1b182bd7a9',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 31 Jan 2023 14:41:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash167517606846205067/////Upper/blob/empty%20/adir/another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27167517606911802581')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 31 Jan 2023 14:41:09 GMT',
  'ETag',
  '"0x8DB039931391F77"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc70a2a-b01e-006d-4f82-3550f2000000',
  'x-ms-client-request-id',
  '33fc5583-f70d-47c6-85a7-10bee44a2e59',
  'x-ms-version',
  '2021-10-04',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2023-01-31T14:41:09.3763959Z',
  'Date',
  'Tue, 31 Jan 2023 14:41:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container-with-dash167517606846205067/////Upper/blob/empty%20/adir/another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27167517606911802581')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
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
  'Tue, 31 Jan 2023 14:41:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB039931391F77"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc70a44-b01e-006d-6782-3550f2000000',
  'x-ms-client-request-id',
  '3d3038e8-86ca-4748-a389-8ac4ce4f73e6',
  'x-ms-version',
  '2021-10-04',
  'x-ms-version-id',
  '2023-01-31T14:41:09.3763959Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 31 Jan 2023 14:41:09 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 31 Jan 2023 14:41:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container-with-dash167517606846205067')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc70a57-b01e-006d-7582-3550f2000000',
  'x-ms-client-request-id',
  'a016461e-302e-4f5f-bf5d-109dcd1115b5',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 31 Jan 2023 14:41:09 GMT'
]);
