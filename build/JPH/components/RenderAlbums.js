export default function RenderAlbums(albums, users) {
    if (albums.length > 0) {
        return `${albums.map(album => { var _a; var _b; return `
                <div class="card">
                    <p class="card__id--gray pb-1">Album №${album.id}:</p>
                    <h3 class="pb-1">${album.title}</h3>
                    <p class="pb-1">Created by ${(_b = (_a = users.get(album.userId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : album.userId}</p>
                </div>
            `; }).join("")}`;
    }
    return "";
}
