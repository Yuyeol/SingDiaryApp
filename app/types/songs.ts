export interface TjSongResponse {
  title: TjSong[];
  singer: TjSong[];
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
  title: KySong[];
  singer: KySong[];
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
