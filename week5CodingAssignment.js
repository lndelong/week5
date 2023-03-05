// create menu app //
// music playlist creator

class Playlist {
    constructor(name) {
    this.name = name;
    this.songs = [];
    }
    addSong(name) {
    if (name instanceof Song){
        this.name.push(name);
    }
    else throw new Error (`You can only add an instance of Song. Argument is not valid: ${name}`);
    }

    describe() {
    return `Playlist ${playlistName} has ${this.songs.length} songs`;
    }
}

class Song {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
    }
}

class Menu {
    constructor() {
    this.playlists = [];
    this.selectedPlaylist = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch(selection) {
                case '1':
                    this.createPlaylist();
                    break;
                case '2':
                    this.viewPlaylist();
                    break;
                case '3':
                    this.deletePlaylist();
                    break;
                case '4':
                    this.displayPlaylists();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new playlist
        2) view playlist
        3) delete playlist
        4) display all playlists
        `);
    }

    showPlaylistMenuOptions(playlistInfo) {
        return prompt(`
        0) back
        1) add song
        2) delete song
        ----------------------
        ${playlistInfo}
        `);
    }

    displayPlaylists() {
        let playlistString = '';
        for (let i = 0; i < this.playlists.length; i++) {
            playlistString += i + ') ' + this.playlists[i].name + '\n';
        }
        alert(playlistString);
    }
    createPlaylist() {
        let name = prompt('Enter name for new playlist:');
        this.playlists.push(new Playlist(name));
    }

    viewPlaylist() {
        let index = prompt('Enter the index of the playlist you wish to view:');
        if (index > -1 && index < this.playlists.length) {
            this.selectedPlaylist = this.playlists[index];
            let description = ('Playlist name: ' + this.selectedPlaylist.name + '\n');

            for (let i = 0; i < this.selectedPlaylist.songs.length; i++) {
                description += i + ') ' + this.selectedPlaylist.songs[i].name + ' - '
                + this.selectedPlaylist.songs[i].artist + '\n';
            }

            let selection = this.showPlaylistMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createSong();
                    break;
                case '2':
                    this.deleteSong();
            }
        }
    }

    deletePlaylist() {
        let index = prompt('Enter the index of the playlist you wish to delete:');
        if (index > -1 && index < this.playlists.length) {
            this.playlists.splice(index, 1);
        }
    }
   
    createSong() {
        let name = prompt('Enter name for new song:');
        let artist = prompt('Enter artist for new song:')
        this.selectedPlaylist.songs.push(new Song(name, artist));
    }

    deleteSong() {
        let index = prompt('Enter the index of the song you wish to delete:');
        if (index > -1 && index < this.selectedPlaylist.songs.length) {
            this.selectedPlaylist.songs.splice(index, 1);
        }
    }
    
}

let menu = new Menu();
menu.start();
