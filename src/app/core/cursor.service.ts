import { Injectable, signal } from '@angular/core';

export type CursorState = 'default' | 'link' | 'project' | 'hero' | 'text' | 'hidden';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  state = signal<CursorState>('default');
  textLabel = signal<string>('');
  pointerPos = signal<{ x: number; y: number }>({ x: -100, y: -100 });
  isHoveringHero = signal<boolean>(false);

  setState(state: CursorState, label: string = ''): void {
    this.state.set(state);
    this.textLabel.set(label);
  }

  reset(): void {
    this.state.set('default');
    this.textLabel.set('');
  }

  updatePosition(x: number, y: number): void {
    this.pointerPos.set({ x, y });
  }
}

