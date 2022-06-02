export type listeTables = "user" // | "deleteduser"

interface attributSelectInterface
{
    primaryKey: string;
    attribut: Array < string > ;
}

const listAttributSelect: Record < listeTables, attributSelectInterface > = { //Constructs a type with a set of properties Keys of type Type. This utility can be used to map the properties of a type to another type.
    "user":
    {
        primaryKey: `idUser`,
        attribut: [`idUser`, `nameUser`, `mailUser`, `passUser`]
    },
    // "deleteduser": {
    //     primaryKey: `idDeletedUser`,
    //     attribut: [`idDeletedUser`, `nameDeletedUser`, `mailDeletedUser`, `passDeletedUser`]
    // }
};

export default listAttributSelect;