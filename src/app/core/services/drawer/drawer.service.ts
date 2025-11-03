import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private readonly isOpen = signal(false);

  get drawerIsOpen(): Signal<boolean> {
    return this.isOpen.asReadonly();
  }

  setDrawerState(isOpen: boolean) {
    this.isOpen.set(isOpen);
  }
}
