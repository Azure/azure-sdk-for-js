import * as should from "should";
import { responseToBody, HttpOperationResponse, HttpHeaders, WebResource } from "../../lib/msRest";

const response: HttpOperationResponse = { status: 200, headers: new HttpHeaders(), parsedBody: { foo: 42 }, request: new WebResource() };

describe("responseToBody", function() {
    it("should pass arguments", function() {
        let r1 = false;
        let r2 = 0;
        let r3: { [key: string]: string } = {};
        const responseMethod = (p1: boolean, p2: number, opts: {}) => {
            r1 = p1;
            r2 = p2;
            r3 = opts;
            return Promise.resolve(response);
        };
        responseToBody(responseMethod, true, 123, { opt: "hello" }, undefined);
        r1.should.equal(true);
        r2.should.equal(123);
        r3.opt.should.equal("hello");
    });

    it("should return a promise when no callback is provided", function() {
        const result = responseToBody(() => Promise.resolve(response));
        result!.should.be.instanceof(Promise);
    });

    it("should call the callback in the last argument", function(done) {
        const response: HttpOperationResponse = { status: 200, headers: new HttpHeaders(), parsedBody: { foo: 42 }, request: new WebResource() };
        const responseMethod = () => {
            return Promise.resolve(response);
        };

        const result = responseToBody(responseMethod, (err: any, body: any, request: WebResource, innerResponse: HttpOperationResponse) => {
            should(err).equal(null);
            body.foo.should.equal(42);
            request.should.equal(response.request);
            innerResponse.should.equal(response);
            done();
        });
        should(result).equal(undefined);
    });

    it("should call the callback in the second to last argument", function(done) {
        let response: HttpOperationResponse = { status: 200, headers: new HttpHeaders(), parsedBody: { foo: 42 }, request: new WebResource() };
        const responseMethod = () => {
            return Promise.resolve(response);
        };

        const result = responseToBody(responseMethod, (err: any, body: any, request: WebResource, innerResponse: HttpOperationResponse) => {
            should(err).equal(null);
            body.foo.should.equal(42);
            request.should.equal(response.request);
            innerResponse.should.equal(response);
            done();
        }, undefined);
        should(result).equal(undefined);
    });

    it("should pass errors to the callback", function(done) {
        const responseMethod = () => {
            return Promise.reject(new Error());
        };

        responseToBody(responseMethod, (err: Error) => {
            err.should.be.instanceof(Error);
            done();
        });
    });
});