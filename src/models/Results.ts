import MySQL from '../db/MySQL';

export default class Results
{
    public id_challenge : number;
    public result ? : number;
    public id_user: number;

    protected table: string = 'results';

    /**
     * Creates an instance of Personne.
     * @param {number} [id_challenge=1]
     * @param {number} [result=0]
     * @param {number} [id_user=1]
     * @memberof results
     */

    constructor(
        id_challenge: number = 1,
        result: number = 0,
        id_user: number = 1
    ) {
        this.id_challenge = id_challenge;
        this.result = result;
        this.id_user = id_user;
    }

    /************************* GETTER *************************/


    get note(): number {
        return < number > this.result;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof User
     */
    get attributInsert(): Array < string > {
        return ['id_challenge', 'result', 'id_user']
    }

    /************************* METHOD *************************/

    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Results
     */
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.id_challenge = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    };

    /************************* STATIC METHOD *************************/

    // static select(where: any) {
    //     return new Promise((resolve, reject) => {
    //         MySQL.select('personne', where).then((arrayPersonne: Array < any > ) => {
    //                 let data: Array < Personne > = [];
    //                 for (const personne of arrayPersonne) {
    //                     personne.dateNaiss = new String(personne.dateNaiss)
    //                     personne.id = personne.idpersonne;
    //                     data.push(new Personne(personne));
    //                 }
    //                 console.log(data);
    //                 resolve(data)
    //             })
    //             .catch((err: any) => {
    //                 console.log(err);
    //                 reject(false)
    //             });
    //     })
    // }

    static isExiste(id: any)
    {
        return new Promise((resolve, reject) =>
        {
            MySQL.select('results', { id_user: id }).then((arrayUser: Array < any > ) =>
            {
                resolve((arrayUser.length > 0))
            }).catch((err: any) =>
            {
                console.log(err);
                reject(false)
            });
        })
    }

    static setScore(results: any, score: any): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.update('results', results, score).then((id: number) => {
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    }
}