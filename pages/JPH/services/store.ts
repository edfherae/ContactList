import type User from "../models/User"
import type Post from "../models/Post"
import type Album from "../models/Album"

export default async function createStore() {
    interface Store {
        users: User[],
        posts: Post[],
        albums: Album[]
    }

    const data : Store = {
        users: [],
        posts: [],
        albums: []
    }

    try {
        data.users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
        data.posts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
        data.albums = await (await fetch("https://jsonplaceholder.typicode.com/albums")).json();
    } catch (error) {
        console.log(error)
    }

    return {
        getUsers() { return data.users },
        getPosts() { return data.posts },
        getAlbums() { return data.albums }
    }
}