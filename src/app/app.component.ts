import { Component, OnInit } from '@angular/core';
import { CRUDService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  estadoAlarma: boolean | undefined;
  estadoLuz: boolean | undefined;
  estadoPuerta: boolean | undefined;
  estadoAire: boolean | undefined;
  temperaturaAire: number | undefined;
  

  constructor(private crudService: CRUDService) { }

  ngOnInit() {
    // Leer el estado actual de la alarma
    this.estadoAlarma = false;

    // Leer el estado actual de la luz
    this.estadoLuz = false;

    // Leer el estado actual de la puerta
    this.estadoPuerta = false;

    // Leer el estado actual del aire acondicionado
    this.estadoAire = false;
    this.crudService.read_aire().subscribe((data: any) => {
      this.estadoAire = data.payload.data().activa;
      this.temperaturaAire = data.payload.data().temperatura;
    });

  }
//ALARMA
toggleAlarma() {
  if (this.estadoAlarma !== undefined) {
    const nuevoEstado = this.estadoAlarma;

    if (nuevoEstado) {
      this.crudService.encender_alarma().then(() => {
        console.log("Alarma encendida.");
        this.estadoAlarma = nuevoEstado;
      }).catch(error => {
        console.error("Error al encender la alarma:", error);
      });
    } else {
      this.crudService.apagar_alarma().then(() => {
        console.log("Alarma apagada.");
        this.estadoAlarma = nuevoEstado;
      }).catch(error => {
        console.error("Error al apagar la alarma:", error);
      });
    }
  }
}

//LUZ
toggleLuz() {
  if (this.estadoLuz !== undefined) {
    const nuevoEstado = this.estadoLuz;

    if (nuevoEstado) {
      this.crudService.encender_luz().then(() => {
        console.log("Luz encendida.");
        this.estadoLuz = nuevoEstado;
      }).catch(error => {
        console.error("Error al encender la luz:", error);
      });
    } else {
      this.crudService.apagar_luz().then(() => {
        console.log("Luz apagada.");
        this.estadoLuz = nuevoEstado;
      }).catch(error => {
        console.error("Error al apagar la luz:", error);
      });
    }
  }
}

//PUERTA
  
togglePuerta() {
  if (this.estadoPuerta !== undefined) {
    // Obtener el estado actual del switch
    const nuevoEstado = this.estadoPuerta;

    // Llamar al servicio CRUD para actualizar el estado de la puerta en la base de datos
    if (nuevoEstado) {
      // Si el switch está activado, abrir la puerta
      this.crudService.abrir_puerta().then(() => {
        console.log("Puerta abierta.");
        this.estadoPuerta = nuevoEstado; // Actualizar el estado local
      }).catch(error => {
        console.error("Error al abrir la puerta:", error);
      });
    } else {
      // Si el switch está desactivado, cerrar la puerta
      this.crudService.cerrar_puerta().then(() => {
        console.log("Puerta cerrada.");
        this.estadoPuerta = nuevoEstado; // Actualizar el estado local
      }).catch(error => {
        console.error("Error al cerrar la puerta:", error);
      });
    }
  }
}






//AIRE ACONDICIONADO
  
  toggleAire() {

    if (this.estadoAire !== undefined) {
      const nuevoEstado = this.estadoAire;

      if (nuevoEstado) {
        this.crudService.encender_aire().then(() => {
          console.log("Aire acondicionado encendido.");
          this.estadoAire = nuevoEstado;
        }).catch(error => {
          console.error("Error al encender el aire acondicionado:", error);
        });
      } else {
        this.crudService.apagar_aire().then(() => {
          console.log("Aire acondicionado apagado.");
          this.estadoAire = nuevoEstado;
        }).catch(error => {
          console.error("Error al apagar el aire acondicionado:", error);
        });
      }
    }

  }

  // Método para cambiar la temperatura del aire acondicionado
  cambiarTemperatura(cambio: number) {
    if (this.temperaturaAire !== undefined) {
      const nuevaTemperatura = this.temperaturaAire + cambio;
      
      if (nuevaTemperatura <= 40) {
        if (nuevaTemperatura >= 16) {
          this.temperaturaAire = nuevaTemperatura;
          this.actualizarTemperatura();
        } else {
          console.warn("La temperatura mínima permitida es 16°C.");
        }
      } else {
        console.warn("La temperatura máxima permitida es 40°C.");
      }
    }
  }
  
  

  // Método para actualizar la temperatura del aire acondicionado en Firebase
  actualizarTemperatura() {
    if (this.temperaturaAire !== undefined) {
      this.crudService.actualizarTemperatura(this.temperaturaAire).then(() => {
        console.log("Temperatura actualizada a:", this.temperaturaAire);
      }).catch(error => {
        console.error("Error al actualizar la temperatura:", error);
      });
    }
  }

  // Método para actualizar el estado del aire acondicionado en Firebase
  actualizarEstadoAire() {
    if (this.estadoAire !== undefined) {
      this.crudService.actualizarEstadoAire(this.estadoAire).then(() => {
        console.log("Estado del aire acondicionado actualizado a:", this.estadoAire);
      }).catch(error => {
        console.error("Error al actualizar el estado del aire acondicionado:", error);
      });
    }
  }
  
}
