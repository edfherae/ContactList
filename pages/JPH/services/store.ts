import type User from "../models/User"
import type Post from "../models/Post"
import type Album from "../models/Album"

export default async function createStore() {
    interface Store {
        users: User[],
        albums: Album[],
        posts: Post[],
        usersIndex: number,
        albumsIndex: number,
        postsIndex: number,
    }

    const data : Store = {
        users: [],
        posts: [],
        albums: [],
        usersIndex: 0,
        albumsIndex: 0,
        postsIndex: 0,
    }

    try {
        data.users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
        data.posts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
        data.albums = await (await fetch("https://jsonplaceholder.typicode.com/albums")).json();
    } catch (error) {
        alert(error)
    }

    return {
        getUsers() {
            return data.users;
        },
        getNextUsers() { 
            if(data.usersIndex < data.users.length) {
                return data.users.slice(data.usersIndex, data.usersIndex += 10);
            }
            return [];
        },
        getNextAlbums() { 
            if(data.albumsIndex < data.albums.length) {
                return data.albums.slice(data.albumsIndex, data.albumsIndex += 10);
            }
            return [];
        },
        getNextPosts() { 
            if(data.postsIndex < data.posts.length) {
                return data.posts.slice(data.postsIndex, data.postsIndex += 10);
            }
            return [];
        },
    }
}