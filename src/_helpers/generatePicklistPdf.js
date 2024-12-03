import React, { useEffect, useState, useStyles } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { commonService, alertService, accountService } from "@/_services";
import logo from '../Assets/CompanyLogo.jpg'

const generatePicklistPdf = (tickets,ReqCode) => {
  const user = accountService.userValue;
  var maxDate = null;
  var minDate = null;
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  const doc = new jsPDF('p', 'mm', [297, 210]);
  const tableColumn = ["ITEM CODE", "ITEM DESC", "Qty", "LOCATION"];
  const addFooters = doc => {
    const pageCount = doc.internal.getNumberOfPages()
  
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 1.2, 287, {
        align: 'center'
      }),
      doc.text('PrintedBy:' + user.firstName,doc.internal.pageSize.width / 8, 287, {
        align: 'center'
      }),
      doc.text('PrintedOn:' + datetime,doc.internal.pageSize.width / 3, 287, {
        align: 'center'
      })

    }
  }
  const tableRows = [];
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.ITEM_CODE,
      ticket.ITEM_DESC,
      ticket.Qty,
      ticket.STOCK_LOCATION
      
    ];
    tableRows.push(ticketData);
  });
  doc.autoTable(tableColumn, tableRows, {
      margin: {top: 30},
      addPageContent: function(data) {
        
        
        doc.setFont('helvetica', 'bold')
          doc.setFontSize(12)
          doc.text("Naturub Accessories BD Limited", 15, 15);
          doc.text("Spare part pick List", 15, 20);
          doc.text(ReqCode, 15, 25);
          
      },
      
      columnStyles: {
        0: {cellWidth: 25},
        1: {cellWidth: 50},
        2: {cellWidth: 25},
        3: {cellWidth: 35},
        4: {cellWidth: 35},
        5: {cellWidth: 25}
      }
  });
  addFooters(doc);
   

  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePicklistPdf;