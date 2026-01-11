import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body } = req;

    const now = Date.now();
    console.log(` [Request] ${method} ${url}`);
    console.log(` Body:`, body);

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;

        console.log(
          `⬅ [Response] ${method} ${url} ${statusCode} - ${Date.now() - now}ms`,
        );
        console.log(` Data:`, data);
      }),
    );
  }
}