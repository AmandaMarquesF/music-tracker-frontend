import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Music } from 'src/app/models/music';
import { MusicService } from 'src/app/services/music/music.service';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.css'],
})
export class MusicFormComponent {
  musicForm: FormGroup;

  constructor(private fb: FormBuilder, private musicService: MusicService) {
    this.musicForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      composer: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      album: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.musicForm.valid) {
      const music: Music = this.musicForm.value;
      this.musicService.registerMusic(music).subscribe(
        (response) => {
          console.log('Música registrada:', response);
          this.musicForm.reset();
        },
        (error) => {
          console.error('Erro ao registrar música:', error);
          alert('Erro ao registrar a música. Tente novamente mais tarde.');
        }
      );
    }
  }
}
