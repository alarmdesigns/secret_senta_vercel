import clientPromise from "../lib/mongodb";

export default function Movies({ users }: Props) {
    return (
        <div>
            <h1>Da hu ka?</h1>
            <ul>
                {users && users.map((user) => (
                    <li>
                        <h2>{user.name}</h2>
                        {/* <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface Props {
    users: Users[];
}

interface Users {
    id: string;
    name: string;
    beneficiary: string;
    isComplete: boolean;
    editAttemptCount: boolean;
    wishlist1: string;
    wishlist2: string;
    wishlist3: string;
    updated_date: Date;
}

export async function getServerSideProps() {
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