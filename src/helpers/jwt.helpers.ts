import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IUser } from '../app/modules/user/user.interface';

type payload = Pick<IUser, 'id' | 'role'>;

 const createToken = (payload: payload, secret: Secret, expireTime: string):string => {
  return jwt.sign(payload, secret, {
    expiresIn:expireTime
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};


export const jwtHelpers = {
    createToken,
    verifyToken
}
