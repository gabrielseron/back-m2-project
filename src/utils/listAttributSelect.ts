export type listeTables = "user"  | "promo" | "challenge" | "exercise" | 'results'

interface attributSelectInterface
{
    primaryKey: string;
    attribut: Array < string > ;
}

const listAttributSelect: Record < listeTables, attributSelectInterface > = { //Constructs a type with a set of properties Keys of type Type. This utility can be used to map the properties of a type to another type.
    "user":
    {
        primaryKey: `id_user`,
        attribut: [`id_user`, `email`, `password`, `verified_email`, `id_promo`, `is_admin`, `refresh_token`]
    },
    "promo":
    {
        primaryKey: `id_promo`,
        attribut: [`id_promo`, `name_promo`]
    },
    "challenge":
    {
        primaryKey: `id_challenge`,
        attribut: [`id_challenge`, `id_promo`, `name_challenge`]
    },
    "exercise":
    {
        primaryKey: `id_exercise`,
        attribut: [`id_exercise`, `name_exercise`, `question_exercise`, `request_exercise`, `result_exercise`, `points_exercise`, `order_exercise`, `id_challenge`]
    },
    "results":
    {
        primaryKey: `id_challenge`,
        attribut: [`id_challenge`, `result`, `id_user`]
    }
};

export default listAttributSelect;