import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

interface RequestWithUserId extends Request {
    user_id: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepository,
    ) { }

    async use(req: RequestWithUserId, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        if (!authorization) throw new UnauthorizedException('Unauthorized user');
            
        const splitAuth = authorization.split(' ');

        if (splitAuth.length !== 2 || splitAuth[0] !== 'Bearer') 
            throw new UnauthorizedException('Invalid Authentication');

        try {
            await this.jwtService.verifyAsync(splitAuth[1]);

            const session = await this.authRepository.getSession(splitAuth[1]);

            if (!session) throw new UnauthorizedException('Invalid Authentication');

            req.user_id = session.user_id;

            return next();

        } catch (error: any) {
            if (error.name === 'JsonWebTokenError') throw new UnauthorizedException('Invalid Authentication');
        }
    }
}