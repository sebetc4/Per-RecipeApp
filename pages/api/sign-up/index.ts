import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../api/config/db-connect';
import { errorHandler, successHandler, validationHandler } from '../../../api/middleware';
import { User } from '../../../api/models/User';
import { ApiMethods } from '../../../types/api.types';
import { signUpSchema } from '../../../utils/validationSchemas';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validationHandler(ApiMethods.POST, signUpSchema, req)
        await dbConnect();
        const user = new User(req.body);
        const saveUser = await user.save();
        delete saveUser._doc.password
        successHandler(saveUser, res, 201);
    } catch (err) {
        errorHandler(err, res);
    }
};
