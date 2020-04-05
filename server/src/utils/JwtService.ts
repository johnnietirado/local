import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';

export class JwtService {

    private readonly secret: string;
    private readonly options: object;

    constructor() {
        this.secret = (process.env.JWT_SECRET);
        this.options = {
            expiresIn: 3 + ' days',
        };
    }

    public getJwt(data: object): Promise<string> {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(data, this.secret, this.options, (err: any, token: string) => {
                err ? reject(err) : resolve(token);
            });
        });
    }

    public decodeJwt(jwt: string): Promise<object> {
        return new Promise((res, rej) => {
            jsonwebtoken.verify(jwt, this.secret, (err: VerifyErrors, decoded: object) => {
                return err ? rej('JSON-web-token validation failed') : res(decoded);
            });
        });
    }
}