import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {

    if (req?.method !== 'POST') {
        res?.status(405).send({ message: 'Only POST requests allowed' })
        return
      }

   try {

    const body = req.body;
       const client = await clientPromise;
       const db = client.db("secret_senta");

       const users = await db
 
       .collection('secret_senta_users')
       .updateOne({order:Number(req?.query?.pid)}, {$set: body}, {upsert: true});


       res.json(users);
   } catch (e) {
       console.error(e);
   }
};

// export default function handler(req, res) {
//     if (req.method !== 'POST') {
//       res.status(405).send({ message: 'Only POST requests allowed' })
//       return
//     }
  
  
//     // not needed in NextJS v12+
//     const body = JSON.parse(req.body)
  
//     // the rest of your code
//   }