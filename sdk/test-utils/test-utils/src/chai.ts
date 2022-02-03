import chai from "chai";
import { chaiAzure } from "./chaiAzure";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAzure);
chai.use(chaiAsPromised);
const assert = chai.assert;

export { chai, assert };
