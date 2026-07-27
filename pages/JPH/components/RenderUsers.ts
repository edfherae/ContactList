import User from "../models/User";

export default function RenderUsers(users: User[]) {
    if(users.length > 0) {
        return `${users.map(user => `
                <div class="card">
                    <h3>@${user.username}</h3>
                    <p>${user.name}</p>
                    <p>${user.phone}</p>
                    <p>${user.email}</p>
                    <a href="${user.website}">${user.website}</a>
                </div>
            `).join("")
        }`
    }
    return "";
}