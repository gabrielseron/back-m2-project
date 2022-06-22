import MySQL from '../db/MySQL';

export default class User
{
    protected id_user ? : number | null;
    public email: string;
    public password: string;
    public verified_email ? : boolean | false;
    public id_promo ? : number;
    public is_admin ? : boolean | false;
    public refresh_token ? : string | null;

    protected table: string = 'user';

    /**
     * Creates an instance of Personne.
     * @param {(Personne(instance) | null)} id
     * @param {string} [email='']
     * @param {string} [password='']
     * @param {string} [verified_email='false']
     * @param {number} [id_promo='']
     * @param {string} [is_admin='false']
     * @param {string} [refresh_token='']
     * @memberof Personne
     */

    constructor(
        user: User | null, 
        email: string = '',
        password: string = '',
        verified_email : boolean = false,
        id_promo : number = 1,
        is_admin : boolean = false,
        refresh_token : string = ""
    ) {
        if (user === null) {
            this.email = email.trim();
            this.password = password;
            this.verified_email = verified_email;
            this.id_promo = id_promo;
            this.is_admin = is_admin;
            this.refresh_token = refresh_token;
        } else {
            this.id_user = user.id_user;
            this.email = user.email;
            this.password = user.password;
            this.verified_email = user.verified_email;
            this.id_promo = user.id_promo;
            this.is_admin = user.is_admin;
            this.refresh_token = user.refresh_token;
        }
    }


    /************************* GETTER *************************/


    get id(): number {
        return < number > this.id_user;
    }

    get emailUser(): string {
        return this.email;
    }

    get isAdmin(): boolean {
        return this.is_admin || false;
    }

    get isVerified(): boolean {
        return this.verified_email || false;
    }

    get idPromo(): number | undefined {
        return this.id_promo;
    }

    get refreshToken(): string | null | undefined {
        return this.refresh_token;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof User
     */
    get attributInsert(): Array < string > {
        return ['email', 'password', 'verified_email', 'id_promo', 'is_admin', 'refresh_token']
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