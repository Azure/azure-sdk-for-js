import { Instrumenter } from "./interfaces";

declare global {
  var instrumenterImplementation: Instrumenter;
}
