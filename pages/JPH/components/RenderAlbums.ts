import Album from "../models/Album";
import User from "../models/User";

export default function RenderAlbums(albums: Album[], users: Map<number, User>) {
    if(albums.length > 0) {
        return `${albums.map(album => `
                <div class="card">
                    <p class="card__id--gray pb-1">Album №${album.id}:</p>
                    <h3 class="pb-1">${album.title}</h3>
                    <p class="pb-1">Created by ${users.get(album.userId)?.name ?? album.userId}</p>
                </div>
            `).join("")
        }`
    }
    return "";
}