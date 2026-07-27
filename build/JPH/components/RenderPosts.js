export default function RenderPosts(posts, users) {
    return `${posts.map(post => { var _a; return `
        <div class="card card--column" data-col="3">
            <p>User ${(_a = users.find((User) => User.id === post.userId)) === null || _a === void 0 ? void 0 : _a.name}:</p>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `; }).join("")}`;
}
