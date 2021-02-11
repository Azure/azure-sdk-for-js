let nock = require('nock');

module.exports.hash = "2d36176c6aba868830066e958bdda721";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f9e9c7e7afce9c9dec1d3d37bc7bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe6eae97d5f27af145b6c288beff4b467650d955de548b7c9937cdf3fc322f6938de109f566b204300b89b00337f8882e0c611cadfde00e5031e9f42fc5919e02c6fa675b16a8b6a49e3f0c6169d3e41ca1f9ae2b6716cdac61b9c7ef243185d9b156543a3f04676522d5665feee0d3e21ac7a8c4cf2e2bd715295653e057db6f0b290e50e7d2fb8c97864c43e5de493f7248bb4f859a28a4f9779319be5cbefe6c5c5bca5a1e85031beb3657b6f8f3e923e042dc5c51f9e7e148c4f3fdb3440fde4676b84f451a0acf8e3d147f459f325b3387da0afae2f2e48cde5357d822606b4fed9566ff365d1f9fb198f5f3f21dad4c107f9725a5f7327bf1746a7dd148ba2cc6ae8e34756d12bb57ffc8b625a574d75de8e8f7fb0aef3f16b1ef4f8c9177bf75fbbf7885abb06dc447ef925bfe4ff018fd4194e35060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6A6C28DE3A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f46fccb6-3b29-4a59-af9f-a20e8d58f6b6',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:12:40 GMT',
  'Content-Length',
  '662'
]);
