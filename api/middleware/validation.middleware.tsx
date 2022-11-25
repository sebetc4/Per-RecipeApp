import ObjectSchema from 'yup/lib/object';
import type { NextApiRequest } from 'next';
import { ApiErrors, ApiMethods } from '../../types/api.types';

export default async function validationHandler(method: ApiMethods, schema: ObjectSchema<any>, req: NextApiRequest) {
    if (method !== req.method) {
        throw ApiErrors.INVALID_METHOD;
    }
    try {
        await schema.validate(req.body);
    } catch (err) {
        if (process.env.NODE_ENV === 'production') {
            throw ApiErrors.INVALID_PARAMS;
        }
        throw { err };
    }
}
