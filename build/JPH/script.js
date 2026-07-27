var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createStore from "./services/store.js";
import RenderPosts from "./components/RenderPosts.js";
import RenderUsers from "./components/RenderUsers.js";
import RenderAlbums from "./components/RenderAlbums.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const store = yield createStore();
        const usersMap = new Map(store.getUsers().map(user => [user.id, user]));
        const [usersColumn, albumsColumn, postsColumn] = [
            document.getElementById("users-column"),
            document.getElementById("albums-column"),
            document.getElementById("posts-column")
        ];
        usersColumn.innerHTML += RenderUsers(store.getNextUsers());
        albumsColumn.innerHTML += RenderAlbums(store.getNextAlbums(), usersMap);
        postsColumn.innerHTML += RenderPosts(store.getNextPosts(), usersMap);
        usersColumn.addEventListener("scroll", () => {
            if (isScrolledEnough(usersColumn)) {
                usersColumn.innerHTML += RenderUsers(store.getNextUsers());
            }
        });
        albumsColumn.addEventListener("scroll", () => {
            if (isScrolledEnough(albumsColumn)) {
                albumsColumn.innerHTML += RenderAlbums(store.getNextAlbums(), usersMap);
            }
        });
        postsColumn.addEventListener("scroll", () => {
            if (isScrolledEnough(postsColumn)) {
                postsColumn.innerHTML += RenderPosts(store.getNextPosts(), usersMap);
            }
        });
        function isScrolledEnough(element, threshold = 0.8) {
            return element.scrollTop > ((element.scrollHeight - element.clientHeight) * threshold);
        }
    });
}
main();
