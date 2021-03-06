import MySQL from '../db/MySQL';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';

export default class User
{
    protected id_user ? : number | null;
    public email: string;
    public password: string;
    public verified_email ? : boolean;
    public id_promo ? : number;
    public is_admin ? : boolean;
    public refresh_token ? : string | null;

    protected table: string = 'user';

    /**
     * Creates an instance of User.
     * @param {(User(instance) | null)} id
     * @param {string} [email='']
     * @param {string} [password='']
     * @param {boolean} [verified_email=false]
     * @param {number} [id_promo=1]
     * @param {boolean} [is_admin=false]
     * @param {string} [refresh_token='']
     * @memberof User
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
     * @memberof User
     */
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.id_user = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    };

    setToken(user: User, token: any): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.update('user', user, token).then((id: number) => {
                this.id_user = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    }

    verifEmail(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.update('user', {id_user: this.id}, {verified_email: 1}).then((id: number) => {
                this.id_user = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    }

    changePassword(password: string): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.update('user', {email: this.email}, {password}).then((id: number) => {
                this.id_user = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    }

    /************************* STATIC METHOD *************************/

    static select(where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', where).then((arrayUser: Array < any > ) => {
                let data: Array < User > = [];
                console.log(data);
                for (const user of arrayUser) {
                    user.id = user.id_user;
                    data.push(new User(user, user.email, user.password, user?.verified_email, user.id_promo, user?.id_admin, user?.refresh_token));
                }
                resolve(data)
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static leftJoin(table: listeTables, fk: any, where: any) {
        return new Promise((resolve, reject) => {
            MySQL.leftJoin('user', table, fk, where).then((arrayUser: any) => {
                let data: any = [];
                console.log(data);
                for (const user of arrayUser) {
                    user.id = user.id_user;
                    data.push(user);
                }
                resolve(data)
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static delete(mail: string)
    {
        return new Promise((resolve, reject) =>
        {
            MySQL.delete('user', { email: mail }).then(() =>
            {
                resolve(true)
            }).catch((err: any) =>
            {
                console.log(err);
                reject(false)
            });
        })
    }

    static isExiste(mail: string)
    {
        return new Promise((resolve, reject) =>
        {
            MySQL.select('user', { email: mail }).then((arrayUser: Array < any > ) =>
            {
                resolve((arrayUser.length > 0))
            }).catch((err: any) =>
            {
                console.log(err);
                reject(false)
            });
        })
    }

    static selectAll(id: number, where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', where).then((arrayUser: Array < any > ) => {
                let data: Array < any > = [];
                console.log(data);
                for (const user of arrayUser) {
                    user.id = user.id_user;
                    data.push({
                        id_user: user.id_user,
                        email: user.email,
                        verified_email: user.verified_email ? true : false,
                        id_promo: user.id_promo
                    })
                }
                resolve(data)
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }
}