export default function RenderPosts(posts, users) {
    if (posts.length > 0) {
        return `${posts.map(post => { var _a; var _b; return `
                <div class="card">
                    <p class="pb-1">User ${(_b = (_a = users.get(post.userId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : post.userId}:</p>
                    <h3 class="pb-1">${post.title}</h3>
                    <p class="pb-1">${post.body}</p>
                </div>
            `; }).join("")}`;
    }
    return "";
}
