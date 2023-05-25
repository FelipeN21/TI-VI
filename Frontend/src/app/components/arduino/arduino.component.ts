import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ImagemDto } from 'src/app/Dtos/imagem-dto';
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
  resultadoStatus = false;
  resultadoText = "";
  resultadoValor = "nulo";
  status = true;
  percentageResult: any;
  imagem: ImagemDto = {
    imagem: 0
  };
  

  constructor(private service: AppService) {}

  ngOnInit(): void {
  }

    async testRequest(imagem:any)
    {
      const bomb = await lastValueFrom(this.service.test(imagem));

      this.resultadoText = bomb.text;
      this.resultadoValor = bomb.valor;
  
      this.resultadoValor = parseFloat(this.resultadoValor).toFixed(2);

      if(this.resultadoText.includes("Não"))
      this.status = false; 
      else
      this.status = true; 

      this.percentageResult = parseFloat(this.resultadoValor) * 100;
      if(this.percentageResult < 50)
        this.percentageResult = (this.percentageResult - 100) * -1

      this.resultadoStatus = true;
      this.showSpinner = false;
    }

onFileSelected(event:any) {
 // var conteudo;
 this.showSpinner = true;
  const file:File = event.target.files[0];
  
  if (file) {
      
      this.fileName = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload =  async (e) => {
       // conteudo =  e.target?.result;
          this.imagem.imagem = reader.result;
        console.log(this.imagem.imagem)
          var object = {
            imagem : this.imagem.imagem,
          };

        this.testRequest(object);
      };   
  }
}







}
