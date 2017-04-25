import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackService {

  constructor(public snackBar: MdSnackBar) { }

  /**
   * showSnackBar
   */
  public showSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
        duration: 4000,
    });
    return this.snackBar._openedSnackBarRef;
  }

}
