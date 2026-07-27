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
            albums: []
        };
        try {
            data.users = yield (yield fetch("https://jsonplaceholder.typicode.com/users")).json();
            data.posts = yield (yield fetch("https://jsonplaceholder.typicode.com/posts")).json();
            data.albums = yield (yield fetch("https://jsonplaceholder.typicode.com/albums")).json();
        }
        catch (error) {
            console.log(error);
        }
        return {
            getUsers() { return data.users; },
            getPosts() { return data.posts; },
            getAlbums() { return data.albums; }
        };
    });
}
