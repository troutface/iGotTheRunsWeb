import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import 'ag-grid-enterprise/main';

@Component({
    selector: 'runs-root',
    templateUrl: '../root/app.component.html',
    styleUrls: ['../root/app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

    public title: 'app';
    public columnDefs: any = [
      {
        headerName: 'Start Time',
        field: 'startTimeLocal',
        // checkboxSelection: true,
        width: 240
      },
      {
        headerName: 'Activity Type',
        field: 'activityType.typeKey',
        // width: 120,
        rowGroupIndex: 0,
      },
      // {
      //   headerName: 'Activity Name',
      //   field: 'activityName',
      // },
      {
        headerName: 'Distance',
        field: 'distance',
        width: 120,
        valueGetter: this.convertMetersToMiles
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 475
      },

    ];

    public autoGroupColumnDef = {
      headerName: 'Activity Type / Name',
      field: 'activityName',
      width: 320,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
          checkbox: true,
      }
    };

    public rowData: any;

    constructor(private http: HttpClient) {}

    ngOnInit() {
      // this.rowData = this.http.get('https://api.myjson.com/bins/b5qg4');  // smaller data set
      // this.rowData = this.http.get('https://api.myjson.com/bins/zxb1w');
      // this.rowData = this.http.get('http://localhost:58619/activity/activities');  // regular http call
      this.rowData = this.http.get('http://localhost:58619/activity/activities-offline');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation =
      selectedData.map( node =>
        'Date: ' + this.dateToDisplayView(node.startTimeLocal) + '  Miles: ' +
        this.convertMetersToMilesView(node.distance)).join(`\n`);
    alert(`Selected nodes:\n${selectedDataStringPresentation}`);
  }

  public convertMetersToMiles(params: any): any {
    if (params.data) {
      return (params.data.distance * 0.00062137).toFixed(2);
    }
    return null;
  }

  public dateToDisplay(params: any): String {
    if (params.data) {
      const day = params.data.getDate();
      const monthIndex = params.data.getMonth();
      const year = params.data.getFullYear();
      const minutes = params.data.getMinutes();
      const hours = params.data.getHours();
      const seconds = params.data.getSeconds();
      const myFormattedDate = day + '-' + (monthIndex + 1) + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;

      return (myFormattedDate);
    }
    return null;
  }

  private convertMetersToMilesView(params: any): any {
    return (params * 0.00062137).toFixed(2);
  }

  public dateToDisplayView(params: any): String {
    if (params) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
      const date = new Date(params);
      const day = date.getDate();
      const monthIndex = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const seconds = date.getSeconds();
      const myFormattedDate = day + ' ' + monthIndex + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;

      return (myFormattedDate);
    }
    return null;
  }
}
