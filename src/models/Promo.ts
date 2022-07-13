import MySQL from '../db/MySQL';

export default class Promo
{
    protected id_promo ? : number | null;
    private promo_name: string;

    protected table: string = 'promo';

    /**
     * Creates an instance of Personne.
     * @param {(promo(instance) | null)} id
     * @param {string} [promo_name='']
     * @memberof promo
     */


    constructor(
        promo: Promo | null, 
        promo_name: string = '',
    ) {
        if (promo === null) {
            this.promo_name = promo_name.trim();
        } else {
            this.id_promo = promo.id_promo;
            this.promo_name = promo.promo_name;
        }
    }

/************************* GETTER *************************/


get id(): number {
    return < number > this.id_promo;
}

get getname(): string {
    return this.promo_name;
}


/**
 *
 * Return the attribut for the register property in the MySQL Class
 * @readonly
 * @type {Array < string >}
 * @memberof User
 */
get attributInsert(): Array < string > {
    return ['promo_name']
}

/************************* METHOD *************************/

/**
 *
 * Save to the property in database
 * @returns {Promise < number >}
 * @memberof Promo
 */
save(): Promise < number > {
    return new Promise((resolve, reject) => {
        MySQL.insert(this.table, this).then((id: number) => {
            this.id_promo = id;
            console.log(`Save ${this.table}`);
            resolve(id)
        }).catch((err) => {
            console.log(err);
            reject(false)
        })
    })
};

/************************* STATIC METHOD *************************/

    static select(where?: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('promo', where).then((arrayPromo: Array < any > ) => {
                let data: Array < Promo > = [];
                for (const promo of arrayPromo) {
                    promo.id = promo.id_promo;
                    data.push(new Promo(promo, promo.promo_name));
                }
                console.log(data);
                resolve(data)
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static selectAll() {
        return new Promise((resolve, reject) => {
            MySQL.getAll('promo').then((arrayPromo: Array < any > ) => {
                let data: Array < any > = [];
                for (const promo of arrayPromo) {
                    promo.id = promo.id_promo;
                    promo.name = promo.promo_name
                    data.push({id: promo.id, name: promo.name});
                }
                resolve(data)
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static isExiste(key: string, value: string)
    {
        return new Promise((resolve, reject) =>
        {
            let param: any = {};
            param[key] = value;
            MySQL.select('promo', param).then((arrayPromo: Array < any > ) =>
            {
                resolve((arrayPromo.length > 0))
            }).catch((err: any) =>
            {
                console.log(err);
                reject(false)
            });
        })
    }
}