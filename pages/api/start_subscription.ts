import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // start superfluid subscription
        res.send({success: true});
    } catch (error) {
        console.error(error)
        // @ts-ignore
        res.status(500).send({success: false, error: error.message})
    }
}