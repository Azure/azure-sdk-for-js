import * as msRest from '../../../../../lib/msRest';
import * as models from './index';
/**
 * @class
 * Initializes a new instance of the Dog class.
 * @constructor
 * @member {string} [food]
 *
 */
export declare class Dog extends models.Pet {
    /**
     * Defines the metadata of Dog
     *
     * @returns {object} metadata of Dog
     *
     */
    mapper(): msRest.CompositeMapper;
}
