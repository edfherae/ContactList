var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function createStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            users: [],
            posts: [],
            albums: [],
            usersIndex: 0,
            albumsIndex: 0,
            postsIndex: 0,
        };
        try {
            data.users = yield (yield fetch("https://jsonplaceholder.typicode.com/users")).json();
            data.posts = yield (yield fetch("https://jsonplaceholder.typicode.com/posts")).json();
            data.albums = yield (yield fetch("https://jsonplaceholder.typicode.com/albums")).json();
        }
        catch (error) {
            alert(error);
        }
        return {
            getUsers() {
                return data.users;
            },
            getNextUsers() {
                if (data.usersIndex < data.users.length) {
                    return data.users.slice(data.usersIndex, data.usersIndex += 10);
                }
                return [];
            },
            getNextAlbums() {
                if (data.albumsIndex < data.albums.length) {
                    return data.albums.slice(data.albumsIndex, data.albumsIndex += 10);
                }
                return [];
            },
            getNextPosts() {
                if (data.postsIndex < data.posts.length) {
                    return data.posts.slice(data.postsIndex, data.postsIndex += 10);
                }
                return [];
            },
        };
    });
}
