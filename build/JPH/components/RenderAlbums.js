export default function RenderAlbums(albums, users) {
    return `${albums.map(album => { var _a; return `
        <div class="card card--column" data-col="2">
            <p class="card__id--gray">${album.id}:</p>
            <h3>${album.title}</h3>
            <p>Created by ${(_a = users.find((User) => User.id === album.userId)) === null || _a === void 0 ? void 0 : _a.name}</p>
        </div>
    `; }).join("")}`;
}
