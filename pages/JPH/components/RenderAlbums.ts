import Album from "../models/Album";
import User from "../models/User";

export default function RenderAlbums(albums: Album[], users: User[]) {
    return `${albums.map(album => `
        <div class="card card--column" data-col="2">
            <p class="card__id--gray">${album.id}:</p>
            <h3>${album.title}</h3>
            <p>Created by ${users.find((User) => User.id === album.userId)?.name}</p>
        </div>
    `).join("")
}`
}