document.addEventListener('DOMContentLoaded', () => {
    const playlistEl = document.getElementById('playlist');
    const player = document.getElementById('player');
    const search = document.getElementById('search');

    // Small sample audio used when track has no file URL
    const sampleAudio = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';

    let tracks = [];

    function render(list) {
        playlistEl.innerHTML = '';
        if (!list.length) {
            playlistEl.textContent = 'No tracks found.';
            return;
        }

        list.forEach(track => {
            const item = document.createElement('div');
            item.className = 'track';

            const meta = document.createElement('div');
            meta.className = 'meta';
            meta.innerHTML = `<div class="title">${escapeHtml(track.title)}</div><div class="artist">${escapeHtml(track.artist)}</div>`;

            const btn = document.createElement('button');
            btn.textContent = 'Play';
            btn.className = 'play';
            btn.addEventListener('click', () => {
                const src = track.file || sampleAudio;
                if (player.src !== src) player.src = src;
                player.play();
            });

            item.appendChild(meta);
            item.appendChild(btn);
            playlistEl.appendChild(item);
        });
    }

    function escapeHtml(s) {
        return (s+'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    function applyFilter() {
        const q = search.value.trim().toLowerCase();
        if (!q) return render(tracks);
        const filtered = tracks.filter(t => (t.title + ' ' + t.artist).toLowerCase().includes(q));
        render(filtered);
    }

    // Load playlist JSON
    fetch('musicdata.json')
        .then(res => res.json())
        .then(data => {
            tracks = Array.isArray(data.tracks) ? data.tracks : [];
            render(tracks);
        })
        .catch(err => {
            playlistEl.textContent = 'Failed to load playlist.';
            console.error(err);
        });

    search.addEventListener('input', applyFilter);
});