import User from "../models/User";

export default function RenderUsers(users: User[]) {
    return `${users.map(user => `
        <div class="card card--column" data-col="1">
            <h3>${user.username}</h3>
            <p>${user.name}:</p>
            <p>${user.phone}</p>
            <p>${user.email}</p>
            <p>${user.website}</p>
        </div>
    `).join("")
}`
}