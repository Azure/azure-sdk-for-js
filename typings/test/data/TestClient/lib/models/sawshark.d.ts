import * as msRest from '../../../../../lib/msRest';
import * as models from './index';
/**
 * @class
 * Initializes a new instance of the Sawshark class.
 * @constructor
 * @member {buffer} [picture]
 *
 */
export declare class Sawshark extends models.Shark {
    /**
     * Defines the metadata of Sawshark
     *
     * @returns {object} metadata of Sawshark
     *
     */
    mapper(): msRest.CompositeMapper;
}
