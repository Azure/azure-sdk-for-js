let nock = require('nock');

module.exports.hash = "a283a1c3b7c8000ed5c09e2e619619c7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '194b9d08-8275-4a2c-9820-0cf78baed300',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArwhLeOjxZZNvJSRbv8LZsxz_bg1AQAAAERJdNcOAAAA; expires=Thu, 21-Jan-2021 20:08:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:08:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/sentiment', {"documents":[{"id":"0","text":"The food was unacceptable","language":"en"},{"id":"1","text":"The rooms were beautiful. The AC was good and quiet.","language":"en"},{"id":"2","text":"The breakfast was good, but the toilet was smelly.","language":"en"},{"id":"3","text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","language":"en"},{"id":"4","text":"I had a great unobstructed view of the Microsoft campus.","language":"en"},{"id":"5","text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","language":"en"},{"id":"6","text":"The toilet smelled.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","aspects":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"opinion","ref":"#/documents/0/sentences/0/opinions/0"}]}],"opinions":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"opinion","ref":"#/documents/1/sentences/0/opinions/0"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"opinion","ref":"#/documents/1/sentences/1/opinions/0"},{"relationType":"opinion","ref":"#/documents/1/sentences/1/opinions/1"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"opinion","ref":"#/documents/2/sentences/0/opinions/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"opinion","ref":"#/documents/2/sentences/0/opinions/1"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/0"},{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/1"},{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/3"},{"relationType":"opinion","ref":"#/documents/3/sentences/0/opinions/2"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"opinion","ref":"#/documents/4/sentences/0/opinions/0"},{"relationType":"opinion","ref":"#/documents/4/sentences/0/opinions/1"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","aspects":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"opinion","ref":"#/documents/5/sentences/0/opinions/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"opinion","ref":"#/documents/5/sentences/0/opinions/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"opinion","ref":"#/documents/5/sentences/0/opinions/2"}]}],"opinions":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","aspects":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"opinion","ref":"#/documents/6/sentences/0/opinions/0"}]}],"opinions":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=7',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  'a42999a6-0c53-4567-9b61-d2a9b7ef6562',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:36 GMT'
]);
