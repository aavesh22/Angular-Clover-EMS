import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add employee
  addEmployee(employee: Employee) {
    employee.id = this.afs.createId();
    return this.afs.collection('/Employees').doc(employee.id).set(employee);
  }

  // Get all employees
  getAllEmployees() {
    return this.afs.collection('/Employees').snapshotChanges();
  }

  // Delete employee
  deleteEmployee(id: string) {
    return this.afs.doc('/Employees/' + id).delete();
  }

  // Update employee
  updateEmployee(employee: Employee) {
    return this.afs.doc('/Employees/' + employee.id).update(employee);
  }
}
