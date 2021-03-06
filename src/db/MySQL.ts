import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
import User from '../models/User';
import Promo from '../models/Promo';
import Challenge from '../models/Challenge';
import Exercise from '../models/Exercise';
import Results from '../models/Results';


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
 *  Class CRUD to database MySql/MariaDB
 * @export
 * @class MySQL
 */
export default abstract class MySQL {

    /**
     *
     * Insertion of any defined entity
     * @static
     * @param {string} table
     * @param {(Client | Personne)} insert
     * @returns {Promise < number >}
     * @memberof MySQL
     */
    static insert(table: string, instance: User | Challenge | Exercise | Promo | Results): Promise < number > {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"

            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let parameters = "";

            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attributInsert.indexOf(key) !== -1) { // Check to property to the key array because the children Object will acces property parent
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value)
                }
            }
            columns = columns.slice(0, -1); // delete the last carac.
            parameters = parameters.slice(0, -1);

            bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                console.log(results);
                    resolve(results.insertId); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

    /**
     *
     * 
     * @static
     * @param {('client' | 'personne')} table
     * @param {*} [where]
     * @returns {*}
     * @memberof MySQL
     */
    static select(table: listeTables, where ? : any): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }


            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

    /**
     *
     *
     * @static
     * @param {listeTables} table
     * @param {Array < jointureInterface >} join
     * @param {*} [where]
     * @returns {*}
     * @memberof MySQL
     */
    static selectJoin(table: listeTables, join: Array < jointureInterface > , where ? : any): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionJoin = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            for (let i = 0; i < join.length; i++) {
                let nameTable = join[i].table
                conditionJoin += `${join[i].type} JOIN ${join[i].table} ON ${join[i].where.table}.${join[i].where.foreignKey} = ${join[i].table}.${listAttributSelect[nameTable].primaryKey} `;
                for (const champs of listAttributSelect[nameTable].attribut) {
                    columns += "`" + nameTable + "`.`" + champs + "`,";
                }
            }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} ${conditionJoin} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

    static leftJoin(table: listeTables, outerTable: listeTables, fk: any, where: any) {
        return new Promise((resolve, reject) => {
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })

            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let fkString = '';
            let conditionWhere = '';

            Object.keys(fk).forEach(element => {
                fkString += element + " = " + fk[element];
            });

            Object.keys(where).forEach(element => {
                conditionWhere += element + " = '" + where[element] + "'";
            });


            const query = bdd.query(`SELECT * FROM ${table} LEFT JOIN ${outerTable} ON ${fkString} WHERE ${conditionWhere}`, (error, results, fields) => {
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            })
        })
    }

    static delete(table: listeTables, where ? : any) {
        return new Promise((resolve, reject) => {
            //
        })
    }

    static getAll(table: listeTables): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";

            let parameters = "";

            const key = listAttributSelect[table].attribut // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table};`, (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

    static update(table: listeTables, where ? : any, val ? : any): Promise < number > {
        return new Promise((resolve, reject) => {
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let set = '';
            let conditionWhere = '';
            let tab = "`" + table + "`"
            for (const [key, value] of Object.entries(val)) { // Convert the properties of our objects to an array
                set += "`" + key + "` = '" + value + "'"
            }

            for (const [key, value] of Object.entries(where)) { // Convert the properties of our objects to an array
                if (typeof value === 'number') {
                    conditionWhere += "`" + key + "` = " + value
                } else
                {
                    conditionWhere += "`" + key + "` = '" + value + "'"
                }
            }

            bdd.query(`UPDATE ${tab} SET ${set} WHERE ${conditionWhere} `, (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                console.log(results);
                    resolve(results.insertId); // Reponse promise true => then or await
                bdd.end(); // Close database
            });
        })
    }


}