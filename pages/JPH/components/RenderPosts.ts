import Post from "../models/Post";
import User from "../models/User";

export default function RenderPosts(posts: Post[], users: Map<number, User>) {
    if(posts.length > 0) {
        return `${
                posts.map(post => `
                <div class="card">
                    <p class="pb-1">User ${users.get(post.userId)?.name ?? post.userId}:</p>
                    <h3 class="pb-1">${post.title}</h3>
                    <p class="pb-1">${post.body}</p>
                </div>
            `).join("")
        }`
    }
    return "";
}