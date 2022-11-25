import type { NextApiResponse } from 'next';

export default function successHandler(data: unknown, res: NextApiResponse, code: number = 200){
    res.status(code).json(data);
};