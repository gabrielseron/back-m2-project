import MySQL from '../db/MySQL';

export default class Exercise
{
    protected id_exercise ? : number | null;
    private name_exercise: string;
    private question_exercise: string;
    private request_exercise: string;
    private result_exercise: string;
    private points_exercise: number;
    private order_exercise: number;
    private id_challenge: number;

    protected table: string = 'exercise';

    /**
     * Creates an instance of Personne.
     * @param {(Exercise(instance) | null)} id
     * @param {string} [name_exercise='']
     * @param {string} [question_exercise='']
     * @param {string} [request_exercise='']
     * @param {string} [result_exercise='']
     * @param {number} [points_exercise=0]
     * @param {number} [order_exercise=1]
     * @param {number} [id_challenge=1]
     * @memberof Exercise
     */

    constructor(

        exercise: Exercise | null, 
        name_exercise: string = '',
        question_exercise: string = '',
        request_exercise: string = '',
        result_exercise: string = '',
        points_exercise: number = 0,
        order_exercise: number = 1,
        id_challenge: number = 1,
    ) {
        if (exercise === null) {
            this.name_exercise = name_exercise,
            this.question_exercise = question_exercise,
            this.request_exercise = request_exercise,
            this.result_exercise = result_exercise,
            this.points_exercise = points_exercise,
            this.order_exercise = order_exercise,
            this.id_challenge = id_challenge
        } else {
            this.id_exercise = exercise.id_exercise,
            this.name_exercise = exercise.name_exercise,
            this.question_exercise = exercise.question_exercise,
            this.request_exercise = exercise.request_exercise,
            this.result_exercise = exercise.result_exercise,
            this.points_exercise = exercise.points_exercise,
            this.order_exercise = exercise.order_exercise,
            this.id_challenge = exercise.id_challenge
        }
    }

    /************************* GETTER *************************/


    get id(): number {
        return < number > this.id_challenge;
    }

    get name(): string {
        return this.name_exercise;
    }

    get question(): string {
        return this.question_exercise;
    }

    get request(): string {
        return this.request_exercise;
    }

    get result(): string {
        return this.result_exercise;
    }

    get points(): number {
        return this.points_exercise;
    }

    get order(): number {
        return this.order_exercise;
    }

    get idChallenge(): number {
        return this.id_challenge;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof Exercise
     */
    get attributInsert(): Array < string > {
        return ['name_exercise', 'question_exercise', 'request_exercise', 'result_exercise', 'points_exercise', 'order_exercise', 'id_challenge']
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