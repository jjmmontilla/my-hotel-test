import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { top: `140px` };
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  response(event) {
    //if (event == 'close') {
      this.dialogRef.close(event);
    /*} else {
      this.dialogRef.close(event);
    }*/
  }

}
