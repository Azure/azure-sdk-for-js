let nock = require('nock');

module.exports.hash = "ebee6be9a05a9f7ccb5d41991d4746d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.post.search', {"count":true,"queryType":"semantic","search":"luxury","queryLanguage":"en-us","skip":0,"top":5})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cadd6cbf6a347bba38f2eb3729d7ff4e87bf4559367f5743e6ea6554d9fec8eefddbfbfb3f77064bfa8f33a5bbecdebd7d260677c70b077f0e983bd87f70e1e1eecec7eba47e04cdb69b66a8b6ad930e4367f479d7df42c5b4eafd3d76d763d4e9fe44d9bceab362fd36299b6d5d5322dced3eb6a9d96c5db3c2dd7efd6f5b53468c6e99b794e7f6497799a2dd36c91fda0585ed07be7c5b268afd3555595a3344b9b55463f9633fab5ceb3b2a457f27275be2ed369b59c16797d9133a8b4aca619b04b8b265de5f5793e6dd3ededb42e2ee66d3a235c80cf289d965593136e29c14a5b7aafadd6754178676d5b67534020dcbe9ba7737a917aabf369b558e484403b27c88cfc789c7e91176599afeb74fefbae7776cef7e9d3345fa697f8346d8af4b25a3769562cf21fa4654eafd9564d3a235cd7ef08eb33faa35ab6e97a99a78bec62599c17bf689da7aba29916f4115ec977d219ff7c38a9ea594e78b4236a0faaa439de745448db9a5b1e34e9ba2d4a82fffce37cb12ab329bf96626e56597d9e152d81dedbd9bd078457654e5335a506753ea2cf09c04ebaaaab77c5a268f9cf87409888d4d23030148f4ef818b403da44b41718b3d08b260cdf9f57752bbd4f095b470422e07366868f461f319de9ff2db1d5725d96bfe4fbf419a87c3623f6da450bfcf5225b107b7aec465fccf2665a17cc93f4d5cf1bee0b47feaca6b1ff881d8970f818c404da44c5f76047a2284d5f7e5111473efac8b2669b5d10537eef237003fd7959e457f4e38a08433fec483f2286a591bc25063a5b4ecbf52c27c63dcfca261f7dd42c2a7c7e5c96d595f7719935edab7c595d32cf3ca5aea95ba2c1cef6cea7db7b0fdeec3c78b4b343fffb29eaa7a636cb8b8f1edd1fefd08bca661f3d22057cbdc26b2fab82b43ef0a1292996040b386fefeeed8d77efedde7ff060b4ff60fce98383fb07bb84e8b4a66fedbb4b0815615f57c4b36d81377fb17cf8e8a3d397af3f7fb47f6fefd38f7ec92ff925a38fb2d9acce1b6a001925acaa6a417f7ceffbbfe4fbbfe4ff01223678c081060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=none',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd5c8cba4-053f-40b4-bdd4-5bbb80b6a77b',
  'elapsed-time',
  '100',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 13 Apr 2021 06:09:38 GMT',
  'Content-Length',
  '881'
]);
