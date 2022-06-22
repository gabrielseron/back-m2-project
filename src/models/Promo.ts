import MySQL from '../db/MySQL';

export default class Promo
{
    protected id_promo ? : number | null;
    private name_promo: string;

    protected table: string = 'promo';

    /**
     * Creates an instance of Personne.
     * @param {(promo(instance) | null)} id
     * @param {string} [name_promo='']
     * @memberof promo
     */


    constructor(
        promo: Promo | null, 
        name_promo: string = '',
    ) {
        if (promo === null) {
            this.name_promo = name_promo.trim();
        } else {
            this.id_promo = promo.id_promo;
            this.name_promo = promo.name_promo;
        }
    }

/************************* GETTER *************************/


get id(): number {
    return < number > this.id_promo;
}

get name(): string {
    return this.name_promo;
}


/**
 *
 * Return the attribut for the register property in the MySQL Class
 * @readonly
 * @type {Array < string >}
 * @memberof User
 */
get attributInsert(): Array < string > {
    return ['name_promo']
}

/************************* METHOD *************************/

/**
 *
 * Save to the property in database
 * @returns {Promise < number >}
 * @memberof Promo
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