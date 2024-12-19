import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user; // User is attached here after JWT validation

    if (!user || !user.role) {
      throw new ForbiddenException(
        'User is not authenticated or role is missing',
      );
    }

    const hasRequiredRole = requiredRoles.some((role) => user.role === role);
    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Access denied: User with role '${user.role}' is not authorized to perform this action. Required roles: ${requiredRoles.join(', ')}.`,
      );
    }
    return hasRequiredRole;
  }
}
