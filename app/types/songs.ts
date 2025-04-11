export interface TjSongResponse {
  songs: TjSong[];
  success: boolean;
}

export interface TjSong {
  id: number;
  rank: number;
  number: string;
  title: string;
  singer: string;
  created_at: string;
}

export interface KySongResponse {
  songs: KySong[];
  success: boolean;
}

export interface KySong {
  id: number;
  rank: number;
  number: string;
  title: string;
  singer: string;
  composer: string;
  lyricist: string;
  release_date: string;
  lyrics: string;
  created_at: string;
}

export type Song = TjSong | KySong;
