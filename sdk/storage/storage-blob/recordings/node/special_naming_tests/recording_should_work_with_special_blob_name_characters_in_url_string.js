let nock = require('nock');

module.exports.testInfo = {"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'155666305709607693"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash155666304622705418/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27155666305709607693', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:24:17 GMT',
  'ETag',
  '"0x8D6CDBA9578F245"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59391cd6-501e-008c-35a3-ffd003000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 22:24:16 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash155666304622705418/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27155666305709607693')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:24:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6CDBA9578F245"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37b4bea0-601e-006a-4fa3-ffc1f3000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Tue, 30 Apr 2019 22:24:17 GMT',
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
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:24:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash155666304622705418')
  .query({"prefix":"%E6%B1%89%E5%AD%97.%20special%20~%21%40%23%24%25%5E%26%2A%28%29_%2B%601234567890-%3D%7B%7D%7C%5B%5D%2F%3A%22%3B%27%3C%3E%3F%2C%2F%27155666305709607693","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"1container-with-dash155666304622705418\"><Prefix>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'155666305709607693</Prefix><Blobs><Blob><Name>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'155666305709607693</Name><Properties><Creation-Time>Tue, 30 Apr 2019 22:24:17 GMT</Creation-Time><Last-Modified>Tue, 30 Apr 2019 22:24:17 GMT</Last-Modified><Etag>0x8D6CDBA9578F245</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7317e6c-901e-0074-07a3-ff1b1e000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:24:18 GMT',
  'Connection',
  'close' ]);

