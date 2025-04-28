export interface TjPopularSongResponse {
  songs: TjPopularSong[];
  success: boolean;
}

export interface TjPopularSong {
  id: number;
  rank: number;
  number: string;
  title: string;
  singer: string;
  created_at: string;
}

export interface KyPopularSongResponse {
  songs: KyPopularSong[];
  success: boolean;
}

export interface KyPopularSong {
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

export type PopularSong = TjPopularSong | KyPopularSong;
