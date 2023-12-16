import { UserRoles } from "./enums/user-role.enum";
import { UserStatues } from "./enums/user-status.enum";

export const UsersData: { id: number, name: string, lastName: string, email: string, passwordHash: string, passwordSalt: string, status: UserStatues, role: UserRoles, createdAt: Date }[] = []

