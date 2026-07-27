import createStore from "./services/store.js";
import RenderPosts from "./components/RenderPosts.js";
import RenderUsers from "./components/RenderUsers.js";
import RenderAlbums from "./components/RenderAlbums.js";

async function main() {
    const store = await createStore();

    const [usersColumn, albumsColumn, postsColumn] = 
    [
        document.getElementById("users-column") as HTMLDivElement,
        document.getElementById("albums-column") as HTMLDivElement,
        document.getElementById("posts-column") as HTMLDivElement
    ];

    usersColumn.innerHTML += RenderUsers(store.getUsers());
    albumsColumn.innerHTML += RenderAlbums(store.getAlbums(), store.getUsers());
    postsColumn.innerHTML += RenderPosts(store.getPosts(), store.getUsers());
}

main();