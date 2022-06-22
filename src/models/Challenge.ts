import MySQL from '../db/MySQL';

export default class Challenge
{
    protected 'id_challenge' ? : number | null;
    public 'id_promo': number | null;
    public 'name_challenge': string;

    protected table: string = 'challenge';


    /**
     * Creates an instance of Personne.
     * @param {(Challenge(instance) | null)} id
     * @param {number} [id_promo='']
     * @param {string} [name_challenge='']
     * @memberof Challenge
     */

    constructor(
        challenge: Challenge | null, 
        id_promo: number = 1,
        name_challenge: string = '',
    ) {
        if (challenge === null) {
            this.id_promo = id_promo;
            this.name_challenge = name_challenge.trim();
        } else {
            this.id_challenge = challenge.id_challenge;
            this.id_promo = challenge.id_promo;
            this.name_challenge = challenge.name_challenge;
        }
    }


    /************************* GETTER *************************/


    get id(): number {
        return < number > this.id_challenge;
    }

    get idPromo(): number | null {
        return this.id_promo;
    }

    get name(): string {
        return this.name_challenge;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof Challenge
     */
    get attributInsert(): Array < string > {
        return ['id_challenge', 'id_promo', 'name_challenge']
    }

    /************************* METHOD *************************/

    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Personne
     */
    // save(): Promise < number > {
    //     return new Promise((resolve, reject) => {
    //         MySQL.insert(this.table, this).then((id: number) => {
    //             this.idpersonne = id;
    //             console.log(`Save ${this.table}`);
    //             resolve(id)
    //         }).catch((err) => {
    //             console.log(err);
    //             reject(false)
    //         })
    //     })
    // };

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
}