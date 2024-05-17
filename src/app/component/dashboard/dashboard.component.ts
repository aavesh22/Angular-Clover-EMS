import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Employee } from '../../model/employee';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employeeList: Employee[] = [];
  filteredEmployeeList: Employee[] = [];
  employeeObj: Employee = {
    id: '',
    employee_code: '',
    employee_name: '',
    clover_doj: '',
    qualification: '',
    technology: '',
    lateralHireOrAcademy: '',
    experience: '',
    location: ''
  };

  id: string = '';
  employee_code: string = '';
  employee_name: string = '';
  clover_doj: string = '';
  qualification: string = '';
  technology: string = '';
  lateralHireOrAcademy: string = '';
  experience: string = '';
  location: string = '';
  searchText: string = '';
  isEditing: boolean = false;
  editingEmployeeId: string | null = null;

  benchCount: number = 0;

  constructor(private auth: AuthService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  logout() {
    this.auth.logout();
  }

  getAllEmployees() {
    this.data.getAllEmployees().subscribe(
      res => {
        this.employeeList = res.map((e: any) => {
          const data = e.payload.doc.data() as Employee;
          data.id = e.payload.doc.id;
          return data;
        });
        this.filteredEmployeeList = [...this.employeeList];
        this.updateBenchCount();
      },
      err => {
        console.error('Error while fetching employee data', err);
      }
    );
  }


  resetForm() {
    this.id = '';
    this.employee_code = '';
    this.employee_name = '';
    this.clover_doj = '';
    this.qualification = '';
    this.technology = '';
    this.lateralHireOrAcademy = '';
    this.experience = '';
    this.location = '';
    this.isEditing = false;
    this.editingEmployeeId = null;
    this.searchText = '';
    this.filteredEmployeeList = [...this.employeeList];
  }

  addEmployee() {
    if (this.employee_code === '' || this.employee_name === '' || this.clover_doj === '' || this.qualification === '' || this.technology === '' || this.lateralHireOrAcademy === '' || this.experience === '' || this.location === '') {
      alert('Please fill all input fields');
      return;
    }

    this.employeeObj = {
      id: '',
      employee_code: this.employee_code,
      employee_name: this.employee_name,
      clover_doj: this.clover_doj,
      qualification: this.qualification,
      technology: this.technology,
      lateralHireOrAcademy: this.lateralHireOrAcademy,
      experience: this.experience,
      location: this.location
    };

    this.data.addEmployee(this.employeeObj).then(() => {
      this.resetForm();
      this.getAllEmployees();
      this.updateBenchCount();
    });
  }

  editEmployee(employee: Employee) {
    this.isEditing = true;
    this.editingEmployeeId = employee.id;
    this.id = employee.id;
    this.employee_code = employee.employee_code;
    this.employee_name = employee.employee_name;
    this.clover_doj = employee.clover_doj;
    this.qualification = employee.qualification;
    this.technology = employee.technology;
    this.lateralHireOrAcademy = employee.lateralHireOrAcademy;
    this.experience = employee.experience;
    this.location = employee.location;
  }

  updateEmployee() {
    if (this.editingEmployeeId) {
      const updatedEmployee: Employee = {
        id: this.editingEmployeeId,
        employee_code: this.employee_code,
        employee_name: this.employee_name,
        clover_doj: this.clover_doj,
        qualification: this.qualification,
        technology: this.technology,
        lateralHireOrAcademy: this.lateralHireOrAcademy,
        experience: this.experience,
        location: this.location
      };

      this.data.updateEmployee(updatedEmployee).then(() => {
        this.resetForm();
        this.getAllEmployees();
        this.updateBenchCount();
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteEmployee(employee: Employee) {
    if (window.confirm(`Are you sure you want to delete ${employee.employee_name}?`)) {
      this.data.deleteEmployee(employee.id).then(() => {
        this.employeeList = this.employeeList.filter(emp => emp.id !== employee.id);
        this.updateBenchCount();
      }).catch(error => {
        console.error("Error deleting employee:", error);
      });
    }
  }

  updateBenchCount() {
    this.benchCount = this.employeeList.length;
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel() {
    // Step 1: Prepare the data array from employeeList
    const data = this.employeeList.map((employee, index) => ({
      'Sr.No': index + 1,
      'Employee Code': employee.employee_code,
      'Employee Name': employee.employee_name,
      'Clover DOJ': employee.clover_doj,
      'Qualification': employee.qualification,
      'Technology': employee.technology,
      'Lateral Hire / Academy': employee.lateralHireOrAcademy,
      'Experience': employee.experience,
      'Location': employee.location
    }));

    // Step 2: Convert the data array to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Step 3: Generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Step 4: Save to file
    XLSX.writeFile(wb, this.fileName);
  }


  searchEmployee(): void {
    if (this.searchText.trim() === '') {
      this.filteredEmployeeList = [...this.employeeList];
    } else {
      this.filteredEmployeeList = this.employeeList.filter(employee =>
        employee.employee_name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

}