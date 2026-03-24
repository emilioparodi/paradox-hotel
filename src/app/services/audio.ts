import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private audio1: HTMLAudioElement | null = null;
  private audio2: HTMLAudioElement | null = null;
  private activeAudio: HTMLAudioElement | null = null;
  private currentTrack: string | null = null;
  private readonly DEFAULT_VOLUME = 0.7;
  private readonly CROSSFADE_DURATION = 2000; // 2 seconds

  private roomToTrack: Record<string, string> = {
    'room404': 'hallway_loop_404.mp3',
    'room202': 'hallway_loop_404.mp3',
    'suite500': 'hallway_loop_404.mp3',
    'corridor': 'hallway_loop_404.mp3',
    'hall': 'grand_lounge_social_process.mp3',
    'kitchen': 'grand_lounge_social_process.mp3',
    'basement': 'basement_the_kernel.mp3',
    'white': 'white_room_final_crash.mp3'
  };

  constructor() {
    if (this.isBrowser) {
      this.audio1 = new Audio();
      this.audio2 = new Audio();
      this.audio1.loop = true;
      this.audio2.loop = true;
    }
  }

  playRoomBgm(roomId: string) {
    if (!this.isBrowser) return;
    const track = this.roomToTrack[roomId];
    if (!track) return;
    this.playTrack(track);
  }

  private playTrack(track: string) {
    if (this.currentTrack === track || !this.isBrowser) return;

    const nextAudio = this.activeAudio === this.audio1 ? this.audio2 : this.audio1;
    const prevAudio = this.activeAudio;

    if (nextAudio) {
      nextAudio.src = `/assets/audio/${track}`;
      nextAudio.volume = 0;
      nextAudio.play().catch(err => console.warn(`Audio play failed: ${track}. Silence is also liminal.`, err));

      this.crossfade(prevAudio, nextAudio);
      
      this.activeAudio = nextAudio;
      this.currentTrack = track;
    }
  }

  private crossfade(fadeOutAudio: HTMLAudioElement | null, fadeInAudio: HTMLAudioElement) {
    const steps = 20;
    const interval = this.CROSSFADE_DURATION / steps;
    const volumeStep = this.DEFAULT_VOLUME / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      
      // Fade in
      fadeInAudio.volume = Math.min(this.DEFAULT_VOLUME, currentStep * volumeStep);
      
      // Fade out
      if (fadeOutAudio) {
        fadeOutAudio.volume = Math.max(0, this.DEFAULT_VOLUME - (currentStep * volumeStep));
      }

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (fadeOutAudio) {
          fadeOutAudio.pause();
          fadeOutAudio.src = '';
        }
      }
    }, interval);
  }

  stop() {
    if (!this.isBrowser) return;
    if (this.audio1) { this.audio1.pause(); this.audio1.src = ''; }
    if (this.audio2) { this.audio2.pause(); this.audio2.src = ''; }
    this.activeAudio = null;
    this.currentTrack = null;
  }
}
