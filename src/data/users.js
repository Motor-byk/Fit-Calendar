// Stand-in for the `users` collection. Real authentication comes later, so there is no
// password field here on purpose — adding one now would mean inventing a credential shape
// before there is anything to check it against.
export const USERS = [
    {
        id: "u_ava",
        displayName: "Ava",
        avatarUrl: "https://picsum.photos/seed/u_ava/120/120",
    },
    {
        id: "u_mateo",
        displayName: "Mateo",
        avatarUrl: "https://picsum.photos/seed/u_mateo/120/120",
    },
    {
        id: "u_jun",
        displayName: "Jun",
        avatarUrl: "https://picsum.photos/seed/u_jun/120/120",
    },
];

export function findUser(userId) {
    return USERS.find((user) => user.id === userId) ?? null;
}
