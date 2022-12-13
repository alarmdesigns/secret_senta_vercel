import clientPromise from "../lib/mongodb";

export interface Props {
    users: User[];
}

interface User {
    _id?: string;
    order?: number;
    name?: string;
    beneficiary?: string;
    isComplete?: boolean;
    editAttemptCount?: boolean;
    wishlist1?: string;
    wishlist2?: string;
    wishlist3?: string;
    updated_date?: Date;
}

export async function retrieveData() {
    try {
        const client = await clientPromise;
        const db = client.db("secret_senta");

        const users = await db
            .collection("secret_senta_users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
    }
}


export async function retrieveDataById(order:string) {
    try {
        const client = await clientPromise;
        const db = client.db("secret_senta");

        const users = await db
            .collection("secret_senta_users")
            .find({'order':Number(order)})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
    }
}
