let nock = require('nock');

module.exports.hash = "e8426a2f38a60f2e96f178aea82427b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '19225b6f-7db1-4eb2-9f42-a531bba0bb00',
  'x-ms-ests-server',
  '2.1.11829.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlmSS2z-YcFBjjkcYPTP9Kt4ycTJAQAAAAsKZNgOAAAA; expires=Thu, 22-Jul-2021 16:42:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Jun 2021 16:42:52 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes')
  .query(true)
  .reply(200, ["1f8b0800000000000403e4974d6ac3301085ef6268575122c9f96b209436a5ab180ac9aa5d04c51ec76a6cc948b243137af78ebd6828f6014a045a48f346d2fb062d4697a0167905c1e2e312d81814bc08075b596024e094534239e10f5b4a17ed780f064169742d13309811c9d868ab538761ab2b1337db36a09c5490eff86ecd9f50918538c0abccc1b6d7a4385b4b75c4d4ccb9d22e46239b1c89038bdb0ee4145796b0612a4cb107e1ec509c2b0343056ed41ab4a3449f54ae45d21ef9284a496a30566ab544c78cd090848c94066a09a7fbe6b637e1b2e5afd73b9efeb58801671da3a1d209e0e233dbeb4a25c27c5d63d75a6002c5b23403a7715eec181d3a9922a8126ddd56eb081706acce2b87b6820566d0efc125b829f4443851087becf0374284820f45b071dee1dfacd63ea0ef29efa03f53ee077ad8831efa813eee411ffb813ee9419ff8813eed419ffa813eeb419ff9813eef419f7b813e175df479d3cdde7c5fb767ac8bce981fe83d2d0df3a2a5693e4b6750d2650508d579008dfcdeca11cafff72dfc000000ffff","ecd8cd0a82401405e077699d300d8ee652824068d1c26d8b51c7904cc112a2a7ef8cda0fde6c55abdbc6c55c1d3897b3f1fbde9f9d4dacafc5b1fdb091b09f7359c9a9adfa8ae86a8fbf795212ccfb8e84dd9c434b107928c9f44e8696f0594aa90bd28d4d1871e803a2bf3511c49f2291dd5dc8eae6a8cf50b1385a63556959b7d9aa066d6d0d60ad3a03d1ac248192e633e0d4615b5c4cf93aeb2677ba8a32dc44240bf75a58334d377eaa17ce0bfb419e64819041ea04c6771de5b9a9a372b9747c21955e2a4f2c9204ef9a58eff1367c50a85c5b0ab31ee6752886872732b9907e628f67d6bd2665d1fdcbe243165dbeb2388ace5316474be0248ba3e89c649144e7238b243a1f5924d1f9c82289ce471649743eb248a2ff48166f000000ffff","ecdab11180300c43d1895c048203e340b0f61f818a46a1a3819347f8ba54cff9e0c598d3856491d385647148d791454a4f597c18445d16699294459bc649521679142559a4f7f073599cdbb2fb09378f1ed6aa870168b63a10e5ecb51e41b2182f64b1e49f45dcb258365959e4744959e411846491d38564714c5790c50b0000ffff","ecdbcb0d80201045d18a2641248394a37cfa2f415c69e6b17361cca3844b420287a13f4379c1741a59c4741a59c4741a59c4741a59c4741a5984741e5984741e59c4741a59b4e9f4b2385a107259b44b3265118ec37366717047209245bb457e2e8b256a289a9c44cd5edce676d156b368acc7d2c931a4f5faa8f49c592c6f6471ce2cdeb2688cfafbdfd027000000ffff","ecdba11100200cc5d08910ecbf1c3e41834847c8777d777df608be91de94458c509245a4976451e91d59547a471695de9145a5776451e91d59547a4716991e9245a6876451e91d5944fac8e26590ba2c629291c5c523f8bf2c1e000000ffff","ecdc4b0a80300c45d1151592c64fba9c6271ff4bb04e44f2104782f25cc20d747248fa822fe2e2509864313c918fcb623f865ebda8a541274d2df74368cda3a545ccbc15779bf73fbfceb2582f65b1de5e43cbbfb378c8a2f0ee2cc6744a598c432092c5984e248b984e238b984e238b984e238b984e238b984e238b984e238b90ce238b90ce238b98fe942c6e000000ffff","ecddbb0d80300c84e1892c99004a18270fd87f0442053abba3015d46f8affc14cce70ec6633abd2c7a8390cb224e3264519c49c6d7d0380a912c3ae97fbeb3b8d4186ade9a9416b3e81aba311e5a24cd7b8a79ea6718f5faa1c85316eb1b591c6f166f5904a3267ab3a890ce298b3002932c423a932c9a741e5934e93cb268d27964d1a453c8e2090000ffff","026dff47afe6920c46cec82246ac8f9c914574af8fa0914574af8fa091450caf8f9c914534af8f8e2c620990913eb2881624a3238b18ad83d1358b589a4c236964112d8b0cf1358b291686e6c916a996ba4946a696ba8916a949ba2969c616bac9a04dd2c986a6a646e6a00bfc90471693088d2cc6d602000000ffff","0300432371a4277a0000"], [
  'Date',
  'Tue, 22 Jun 2021 16:42:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM9KPK8BCNOV:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '35',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
