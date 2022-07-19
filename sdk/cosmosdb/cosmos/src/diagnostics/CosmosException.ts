
import { jsonStringifyAndEscapeNonASCII } from "../common";
import { getCosmosDiagnostics, recordDiagnostics } from "./CosmosDiagnostics";

export class CosmosException extends Error{
  constructor(m: string | any) {
        super(jsonStringifyAndEscapeNonASCII(m));
        Object.setPrototypeOf(this, CosmosException.prototype);
    }

    static getDiagnostics() {
        return getCosmosDiagnostics();
    }

     static record(m: string){
      recordDiagnostics(m);
      return new CosmosException(m);
     }
}

export interface DiagnosticSpan {
  [key: string]: string | boolean | number | any;
}
