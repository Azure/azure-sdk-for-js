/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a particular point of time.
 */
export class ChangeFeedStartFromTime {
    constructor(startTime, cfResource) {
        this.startTime = startTime;
        this.cfResource = cfResource;
    }
    getCfResource() {
        return this.cfResource;
    }
    getStartTime() {
        return this.startTime;
    }
}
//# sourceMappingURL=ChangeFeedStartFromTime.js.map