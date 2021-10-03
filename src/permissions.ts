import { ApplicationCommandPermissionData, Constants, GuildMember } from 'discord.js';

// TODO: to be replaced with permissions overrides in database
export namespace PrebuiltPermissions {
    export const modsOnly: ApplicationCommandPermissionData = {
        id: '510218732698599445',
        type: Constants.ApplicationCommandPermissionTypes.ROLE,
        permission: true,
    };
    export const botOwner: ApplicationCommandPermissionData = {
        id: '147399559247691776',
        type: Constants.ApplicationCommandPermissionTypes.USER,
        permission: true,
    };
}

export function matchPermissions(
    user: GuildMember,
    permissions: ApplicationCommandPermissionData[],
    defaultPermission: boolean = false
): boolean {
    if (user === null) {
        // fallback - if this happens to you, unlucky
        return false;
    }
    let roleWhitelist: boolean = false;
    let roleBlacklist: boolean = false;

    for (const permission of permissions) {
        switch (permission.type) {
            case Constants.ApplicationCommandPermissionTypes.USER: {
                // user-specific permission trumps all
                return permission.permission;
            }
            case Constants.ApplicationCommandPermissionTypes.ROLE: {
                if (user.roles)
                    if (user.roles.cache.some((role) => role.id === permission.id)) {
                        if (permission.permission) {
                            roleWhitelist = true;
                        } else {
                            roleBlacklist = true;
                        }
                    }
            }
        }
    }

    if (defaultPermission) {
        if (roleWhitelist) {
            return true;
        }
        return !roleBlacklist;
    }
    if (roleBlacklist) {
        return false;
    }
    return roleWhitelist;
}
