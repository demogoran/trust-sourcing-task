import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

//used to verify token is here
@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = (request.headers['authorization'] || '').replace(
      'Bearer ',
      '',
    );
    if (token === process.env.APP_TOKEN) {
      return true;
    } else {
      return false;
    }
  }
}
