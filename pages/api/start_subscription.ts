import {NextApiRequest, NextApiResponse} from 'next';
import {ethers} from 'ethers';
import {superPlayABI} from '@/contracts/SuperPlay.abi';

let acc0 = process.env.ETHEREUM_PRIVATE_KEY as string;
// goerli deploys

const SuperPlayGoerli = '0x25c5Ddf8A9A534Fe71ef0adc2575acdbB77cf6b1';

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI_URL)

let gameID = 0;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const superPlayInstance = new ethers.Contract(SuperPlayGoerli, superPlayABI, provider);
        const tx = await superPlayInstance.registerForGame(gameID);
        const r = await tx.wait();
        console.log(r);

        res.send({success: true});
    } catch (error) {
        console.error(error)
        // @ts-ignore
        res.status(500).send({success: false, error: error.message})
    }
}