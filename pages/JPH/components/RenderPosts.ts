import Post from "../models/Post";
import User from "../models/User";

export default function RenderPosts(posts: Post[], users: User[]) {
    return `${
        posts.map(post => `
        <div class="card card--column" data-col="3">
            <p>User ${users.find((User) => User.id === post.userId)?.name}:</p>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).join("")
}`
}