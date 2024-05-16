import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private fireStore: AngularFirestore) { }
//ALARMA
  read_alarma() {
    return this.fireStore.collection('Sistema1').doc('alarma').snapshotChanges();
  }  
  encender_alarma() {
    return this.fireStore.collection('Sistema1').doc('alarma').update({ activa: true });
  }
  apagar_alarma() {
    return this.fireStore.collection('Sistema1').doc('alarma').update({ activa: false });
  }

//LUZ
  read_luz() {
    return this.fireStore.collection('Sistema1').doc('luz').snapshotChanges();
  }
  encender_luz() {
    return this.fireStore.collection('Sistema1').doc('luz').update({ activa: true });
  }
  apagar_luz() {
    return this.fireStore.collection('Sistema1').doc('luz').update({ activa: false });
  }


//PUERTA
  read_puerta() {
    return this.fireStore.collection('Sistema1').doc('puerta').snapshotChanges();
  }
  abrir_puerta() {
    return this.fireStore.collection('Sistema1').doc('puerta').update({ activa: true });
  }
  cerrar_puerta() {
    return this.fireStore.collection('Sistema1').doc('puerta').update({ activa: false });
  }

//AIRE ACONDICIONADO
  read_aire() {
    return this.fireStore.collection('Sistema1').doc('aireAcondicionado').snapshotChanges();
  }
  encender_aire() {
    return this.fireStore.collection('Sistema1').doc('aireAcondicionado').update({ activa: true });
  }
  apagar_aire() {
    return this.fireStore.collection('Sistema1').doc('aireAcondicionado').update({ activa: false });
  }
   // Actualizar la temperatura del aire acondicionado
   actualizarTemperatura(temperatura: number) {
    return this.fireStore.collection('Sistema1').doc('aireAcondicionado').update({ temperatura });
  }

  // Actualizar el estado del aire acondicionado (encender/apagar)
  actualizarEstadoAire(estado: boolean) {
    return this.fireStore.collection('Sistema1').doc('aireAcondicionado').update({ activo: estado });
  }

  

}
