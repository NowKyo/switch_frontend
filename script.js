const API = "https://switchvideo.onrender.com";

function doSearch() {
    let q = document.getElementById("query").value;

    fetch(`${API}/search?query=${encodeURIComponent(q)}`)
        .then(r => r.json())
        .then(data => {
            let html = "";
            data.results.forEach(item => {
                html += `
                <div class="result" onclick="openPage('${item.url}')">
                    <b>${item.title}</b><br>
                    ${item.snippet}
                </div>`;
            });
            document.getElementById("results").innerHTML = html;
        });
}

function openPage(url) {
    fetch(`${API}/scrape?url=${encodeURIComponent(url)}`)
        .then(r => r.json())
        .then(data => {
            let html = `<h2>${data.title}</h2>`;

            if (data.videos.length === 0) {
                html += "<p>No hay videos encontrados.</p>";
            } else {
                data.videos.forEach(v => {
                    html += `
                        <video controls width="320">
                            <source src="${v}">
                        </video><br><br>
                    `;
                });
            }

            document.getElementById("page").innerHTML = html;
        });
}
