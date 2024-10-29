import { Component, OnInit } from '@angular/core';
import { Music } from 'src/app/models/music';
import { MusicService } from 'src/app/services/music/music.service';

@Component({
  selector: 'app-top-songs-report',
  templateUrl: './top-songs-report.component.html',
  styleUrls: ['./top-songs-report.component.css'],
})
export class TopSongsReportComponent implements OnInit {
  topSongs: Music[] = [];
  selectedPeriod: string = 'all-time';
  p: number = 1;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.loadTopSongs();
  }

  loadTopSongs() {
    this.musicService.getTopSongs(this.selectedPeriod).subscribe((songs) => {
      this.topSongs = songs;
    });
  }

  onPeriodChange() {
    this.p = 1;
    this.loadTopSongs();
  }
}
