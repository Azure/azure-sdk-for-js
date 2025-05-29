/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from beginning of time.
 */
export class ChangeFeedStartFromBeginning {
    constructor(cfResource) {
        this.cfResource = cfResource;
    }
    getCfResource() {
        return this.cfResource;
    }
}
//# sourceMappingURL=ChangeFeedStartFromBeginning.js.map