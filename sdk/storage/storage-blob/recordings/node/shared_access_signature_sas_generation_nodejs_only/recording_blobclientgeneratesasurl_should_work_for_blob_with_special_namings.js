let nock = require('nock');

module.exports.hash = "810db80746f4a77cac08867f6e6bcdf9";

module.exports.testInfo = {"uniqueName":{"container-with-dash":"container-with-dash160639564825600073","////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%":"////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%160639564966207887"},"newDate":{"tmr":"2020-11-26T13:00:48.254Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash160639564825600073')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:00:49 GMT',
  'ETag',
  '"0x8D8920B4C475195"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '187851c0-e01e-002b-3df4-c3d531000000',
  'x-ms-client-request-id',
  '1b054201-f23b-49c4-8b24-485009c9470d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 13:00:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container-with-dash160639564825600073/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C%2F%27%2B%252F%27%2525%25160639564966207887')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:00:49 GMT',
  'ETag',
  '"0x8D8920B4C79A092"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1878522e-e01e-002b-19f4-c3d531000000',
  'x-ms-client-request-id',
  '186f27de-6c86-4b7b-94b9-78fe0f1cc351',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T13:00:49.8260114Z',
  'Date',
  'Thu, 26 Nov 2020 13:00:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container-with-dash160639564825600073/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA%20%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89%20%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C%2F%27%2B%252F%27%2525%25160639564966207887')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 26 Nov 2020 13:00:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8920B4C79A092"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '187852a0-e01e-002b-7df4-c3d531000000',
  'x-ms-client-request-id',
  '47554349-2855-4267-858f-bb2bea14df32',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T13:00:49.8260114Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 13:00:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 13:00:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container-with-dash160639564825600073')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '187852ea-e01e-002b-3df4-c3d531000000',
  'x-ms-client-request-id',
  '038bb07d-c67a-406d-a5ee-3e0726eaa379',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 13:00:49 GMT'
]);
