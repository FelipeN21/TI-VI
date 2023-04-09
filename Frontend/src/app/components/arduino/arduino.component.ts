import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Planta } from 'src/app/plantas/planta.model';
import { Plantas } from 'src/app/plantas/plantas';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-arduino',
  templateUrl: './arduino.component.html',
  styleUrls: ['./arduino.component.css'],
})
export class ArduinoComponent implements OnInit {
  @Input() lumAtual?: number;
  @Input() tempAtual?: number;
  @Input() umAtual?: number;
  showSpinner = false;
  lightOn = true;
  bombOn = false;
  PLANTAS: Planta[] = Plantas.PLANTAS;
  plantaSelecionada?: Planta;
  file:any;
  fileName = '';

  constructor(private service: AppService) {}

  ngOnInit(): void {
   
  }


onFileSelected(event:any) {

  const file:File = event.target.files[0];

  if (file) {

      this.fileName = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
    console.log('Error: ', error);
    };
  }
}





}
