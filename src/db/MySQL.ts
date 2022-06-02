import { createConnection, Connection } from 'mysql2';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
import User from '../models/User';

export interface jointureInterface {
    type: 'LEFT' | 'RIGHT' | 'FULL' | 'INNER';
    where: {
        table: listeTables;
        foreignKey: string;
    }
    table: listeTables;
}

/**
*
* @export
* @class MySQL
*/
export default abstract class MySQL
{
    /**
     *
     * Insertion of any defined entity
     * @static
     * @param {string} table
     * @param {(User)} insert
     * @returns {Promise < number >}
     * @memberof MySQL
     */
}