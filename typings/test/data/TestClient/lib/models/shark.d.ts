import * as msRest from '../../../../../lib/msRest';
import * as models from './index';
/**
 * @class
 * Initializes a new instance of the Shark class.
 * @constructor
 * @member {number} [age]
 *
 * @member {date} birthday
 *
 */
export declare class Shark extends models.Fish {
    /**
     * Defines the metadata of Shark
     *
     * @returns {object} metadata of Shark
     *
     */
    mapper(): msRest.CompositeMapper;
}
