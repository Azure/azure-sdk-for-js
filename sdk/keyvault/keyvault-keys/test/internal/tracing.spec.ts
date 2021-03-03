import { OperationOptions } from "@azure/core-http";
import { instrument } from "../../src/tracing";

describe.only("tracing", () => {
  class Stub {
    fn(a: string, b: number, options?: OperationOptions) {
      console.log(a, b, options);
    }
  }
  class Test {
    constructor(public myStub: any) {}

    // reqOptionsBase(a: string, b: number, options: RequestOptionsBase) {

    // }

    operationOptions(a: string, b: number, options?: OperationOptions) {
      console.log("a", a);
      console.log("b", b);
      console.log("options", options);
    }
  }
  instrument(Test);

  it("can instrument correctly", () => {
    const stub = new Stub();
    const subject = new Test(stub);
    subject.operationOptions("abc", 5, { requestOptions: { timeout: 5 } });
  });
});
