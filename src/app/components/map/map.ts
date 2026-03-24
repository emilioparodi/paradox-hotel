import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div class="w-full max-w-2xl border-2 border-[#FF0000] shadow-[0_0_30px_#FF0000] p-6 bg-black relative overflow-hidden">
        
        <!-- Scanline Effect -->
        <div class="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

        <!-- Map Header -->
        <div class="flex justify-between items-center mb-6 border-b border-[#FF0000]/30 pb-2 relative z-10">
          <h2 class="text-[#FF0000] text-xl font-bold tracking-[0.4em] uppercase italic">Hotel Schematic</h2>
          <button (click)="gs.toggleMap()" class="text-[#FF0000] hover:text-white transition-colors text-xs tracking-widest">
            [ CLOSE_SYSTEM ]
          </button>
        </div>

        <!-- Floor Switcher -->
        <div class="flex gap-4 mb-8 justify-center relative z-10">
          <button 
            (click)="currentLayer.set('first')" 
            [class.active-layer]="currentLayer() === 'first'"
            class="layer-btn">1F</button>
          <button 
            (click)="currentLayer.set('ground')" 
            [class.active-layer]="currentLayer() === 'ground'"
            class="layer-btn">GF</button>
          <button 
            (click)="currentLayer.set('basement')" 
            [class.active-layer]="currentLayer() === 'basement'"
            class="layer-btn">B1</button>
        </div>

        <!-- SVG Map -->
        <div class="aspect-video w-full relative z-10">
          <svg viewBox="0 0 400 200" class="w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- First Floor -->
            @if (currentLayer() === 'first') {
              <g class="animate-fade-in" filter="url(#glow)">
                <!-- Corridor -->
                @if (isDiscovered('corridor')) {
                  <rect x="50" y="80" width="300" height="40" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="200" y="105" fill="#FF0000" font-size="8" text-anchor="middle" class="tracking-tighter">CORRIDOR</text>
                }
                <!-- Room 404 -->
                @if (isDiscovered('room404')) {
                  <rect x="50" y="40" width="70" height="40" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="85" y="65" fill="#FF0000" font-size="8" text-anchor="middle">404</text>
                }
                <!-- Room 202 -->
                @if (isDiscovered('room202')) {
                  <rect x="280" y="40" width="70" height="40" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="315" y="65" fill="#FF0000" font-size="8" text-anchor="middle">202</text>
                }
                <!-- Suite 500 -->
                @if (isDiscovered('suite500')) {
                  <rect x="280" y="120" width="70" height="40" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="315" y="145" fill="#FF0000" font-size="8" text-anchor="middle">500</text>
                }

                <!-- Current Position Marker -->
                @if (currentLayer() === roomLayer(gs.currentRoom().id)) {
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="4" fill="#FF0000" class="animate-ping" />
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="2" fill="#FF0000" />
                }
              </g>
            }

            <!-- Ground Floor -->
            @if (currentLayer() === 'ground') {
              <g class="animate-fade-in" filter="url(#glow)">
                <!-- Hall -->
                @if (isDiscovered('hall')) {
                  <rect x="100" y="40" width="200" height="80" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="200" y="85" fill="#FF0000" font-size="10" text-anchor="middle" class="tracking-widest">GRAND HALL</text>
                }
                <!-- Kitchen -->
                @if (isDiscovered('kitchen')) {
                  <rect x="100" y="120" width="200" height="40" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="200" y="145" fill="#FF0000" font-size="10" text-anchor="middle">KITCHEN</text>
                }

                <!-- Current Position Marker -->
                @if (currentLayer() === roomLayer(gs.currentRoom().id)) {
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="4" fill="#FF0000" class="animate-ping" />
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="2" fill="#FF0000" />
                }
              </g>
            }

            <!-- Basement -->
            @if (currentLayer() === 'basement') {
              <g class="animate-fade-in" filter="url(#glow)">
                <!-- Basement -->
                @if (isDiscovered('basement')) {
                  <rect x="120" y="60" width="160" height="80" fill="none" stroke="#FF0000" stroke-width="2" />
                  <text x="200" y="105" fill="#FF0000" font-size="10" text-anchor="middle" class="tracking-widest">BASEMENT</text>
                }

                <!-- Current Position Marker -->
                @if (currentLayer() === roomLayer(gs.currentRoom().id)) {
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="4" fill="#FF0000" class="animate-ping" />
                  <circle [attr.cx]="roomCoords(gs.currentRoom().id).x" [attr.cy]="roomCoords(gs.currentRoom().id).y" r="2" fill="#FF0000" />
                }
              </g>
            }
          </svg>
        </div>

        <!-- Legend -->
        <div class="mt-6 flex justify-between text-[8px] text-[#FF0000]/50 uppercase tracking-[0.2em] relative z-10">
          <div>Status: Biometric Sync Active</div>
          <div>Signal: Stable</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-scanlines {
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 2px, 3px 100%;
    }
    .layer-btn {
      padding: 0.4rem 1.2rem;
      border: 1px solid #FF0000;
      color: #FF0000;
      font-size: 0.7rem;
      font-weight: bold;
      transition: all 0.2s ease;
      background: transparent;
    }
    .layer-btn:hover {
      background: rgba(255, 0, 0, 0.2);
      box-shadow: 0 0 10px #FF0000;
    }
    .active-layer {
      background: #FF0000;
      color: black;
      box-shadow: 0 0 15px #FF0000;
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class MapComponent {
  gs = inject(GameStateService);
  currentLayer = signal<'first' | 'ground' | 'basement'>('ground');

  constructor() {
    this.currentLayer.set(this.roomLayer(this.gs.currentRoom().id));
  }

  isDiscovered(roomId: string): boolean {
    return this.gs.discoveredRooms().includes(roomId);
  }

  roomLayer(roomId: string): 'first' | 'ground' | 'basement' {
    if (['room404', 'corridor', 'room202', 'suite500'].includes(roomId)) return 'first';
    if (['hall', 'kitchen'].includes(roomId)) return 'ground';
    if (roomId === 'basement') return 'basement';
    return 'ground';
  }

  roomCoords(roomId: string): { x: number, y: number } {
    const coords: Record<string, { x: number, y: number }> = {
      room404: { x: 85, y: 60 },
      corridor: { x: 200, y: 100 },
      room202: { x: 315, y: 60 },
      suite500: { x: 315, y: 140 },
      hall: { x: 200, y: 80 },
      kitchen: { x: 200, y: 140 },
      basement: { x: 200, y: 100 }
    };
    return coords[roomId] || { x: 0, y: 0 };
  }
}
