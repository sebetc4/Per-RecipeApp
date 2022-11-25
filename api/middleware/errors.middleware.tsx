import type { NextApiResponse } from 'next';
import { ApiErrors } from '../../types/api.types';

export default function errorHandler(error: any, res: NextApiResponse) {
    switch (error) {
        case ApiErrors.INVALID_METHOD:
            res.status(400).json({ error: 'Invalid request method' });
            break;
        case ApiErrors.INVALID_PARAMS:
            res.status(400).json({ error: 'Invalid parameters' });
            break;
        case ApiErrors.INVALID_PSEUDO:
            res.status(400).json({ error: 'Invalid username' });
            break;
        case ApiErrors.INVALID_EMAIL:
            res.status(400).json({ error: 'Invalid email' });
            break;
        case ApiErrors.INVALID_PASSWORD:
            res.status(400).json({ error: 'Invalid password' });
            break;
        case ApiErrors.EMAIL_ALREADY_EXISTS:
            res.status(403).json({ error: 'Email already exists' });
            break
        default:
            process.env.NODE_ENV === 'production'
                ? res.status(500).json({ error: 'Internal server error' })
                : res.status(500).json(error);
    }
};
