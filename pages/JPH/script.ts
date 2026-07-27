import createStore from "./services/store.js";
import RenderPosts from "./components/RenderPosts.js";
import RenderUsers from "./components/RenderUsers.js";
import RenderAlbums from "./components/RenderAlbums.js";
import User from "./models/User.js";

async function main() {
    const store = await createStore();
    const usersMap = new Map<number, User>(store.getUsers().map(user => [user.id, user]));

    const [usersColumn, albumsColumn, postsColumn] = 
    [
        document.getElementById("users-column") as HTMLDivElement,
        document.getElementById("albums-column") as HTMLDivElement,
        document.getElementById("posts-column") as HTMLDivElement
    ];

    usersColumn.innerHTML += RenderUsers(store.getNextUsers());
    albumsColumn.innerHTML += RenderAlbums(store.getNextAlbums(), usersMap);
    postsColumn.innerHTML += RenderPosts(store.getNextPosts(), usersMap);

    usersColumn.addEventListener("scroll", () => {
        if(isScrolledEnough(usersColumn)) {
            usersColumn.innerHTML += RenderUsers(store.getNextUsers());
        }
    })
    albumsColumn.addEventListener("scroll", () => {
        if(isScrolledEnough(albumsColumn)) {
            albumsColumn.innerHTML += RenderAlbums(store.getNextAlbums(), usersMap);
        }
    })
    postsColumn.addEventListener("scroll", () => {
        if(isScrolledEnough(postsColumn)) {
            postsColumn.innerHTML += RenderPosts(store.getNextPosts(), usersMap);
        }
    })
    
    function isScrolledEnough(element : HTMLElement, threshold = 0.8) {
        return element.scrollTop > ((element.scrollHeight - element.clientHeight) * threshold)
    }
}

main();