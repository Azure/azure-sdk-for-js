let nock = require('nock');

module.exports.hash = "84c54831694ae9a2dada1c3679c10ac6";

module.exports.testInfo = {"uniqueName":{"container-with-dash":"container-with-dash165899712335902552","////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'165899712346201288"},"newDate":{"now":"2022-07-28T08:32:03.359Z","tmr":"2022-07-28T08:32:03.359Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash165899712335902552')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:03 GMT',
  'ETag',
  '"0x8DA7073A6154ABC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569076d5-201e-0032-785c-a2e4ce000000',
  'x-ms-client-request-id',
  'fa6a3be0-ba26-4e2e-9938-ae991b7bc285',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash165899712335902552/////Upper/blob/empty%20/another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27165899712346201288')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:03 GMT',
  'ETag',
  '"0x8DA7073A6275028"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569076e9-201e-0032-095c-a2e4ce000000',
  'x-ms-client-request-id',
  'bcfe34a8-ce94-40c5-8d11-a9e4c84adf83',
  'x-ms-version',
  '2021-08-06',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container-with-dash165899712335902552/////Upper/blob/empty%20/another%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27165899712346201288')
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
  'Thu, 28 Jul 2022 08:32:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A6275028"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690770b-201e-0032-265c-a2e4ce000000',
  'x-ms-client-request-id',
  '2e8d3c94-bbbe-457b-ad3d-faf5c7b58d71',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:32:03 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container-with-dash165899712335902552')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907721-201e-0032-3b5c-a2e4ce000000',
  'x-ms-client-request-id',
  '0b45a2f4-7d59-4421-8e22-28300fa3869d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);
