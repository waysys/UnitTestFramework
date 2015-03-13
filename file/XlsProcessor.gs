//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2014 Waysys, LLC. All Rights Reserved.
//
//
//  Waysys MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
//  THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//  TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//  PARTICULAR PURPOSE, OR NON-INFRINGEMENT. Waysys SHALL NOT BE LIABLE FOR
//  ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
//  DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
//
//  For further information, contact Waysys LLC at wshaffer@waysysweb.com
//  or 800-622-5315 (USA).
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.file

uses org.apache.poi.ss.usermodel.Row
uses org.apache.poi.ss.usermodel.Workbook
uses org.apache.poi.ss.usermodel.WorkbookFactory
uses unittestcase.AssertException

uses java.io.File
uses java.util.Iterator

/**
 * This class reads an Excel .xlsx or .xlsm file
 *
 *   <p>@author William A. Shaffer</p>
 *   <p>@version 26-Apr-2014</p>
*/
class XlsProcessor extends FileProcessor {

  //------------------------------------------------------------------------------
  //      Fields
  //------------------------------------------------------------------------------

  var  builder : Iterator<Row>
  var  values  : String[]
  var  workbook : Workbook

  //------------------------------------------------------------------------------
  //      Constructor
  //------------------------------------------------------------------------------

  /**
   * Create an instance of this class
   */
  @Param("fileName", "Name of the Excel file to read.  File must exist.")
  construct(fileName : String) {
    super(fileName)
    var reader = new File(fileName)
    workbook = WorkbookFactory.create(reader);
    var numberSheets = workbook.getNumberOfSheets()
    if (numberSheets == 0) {
      throw new AssertException("Excel workbook has no sheets - " + fileName)
    }
    var sheet = workbook.getSheetAt(0)
    builder = sheet.iterator()
    values = new String[] {}
  }

  /**
   * Create an instance of this class
   */
  @Param("fileName", "Name of the Excel file to read.  File must exist.")
  @Param("sheetName", "the name of the spreadsheet")
  construct(fileName : String, sheetName : String) {
    super(fileName)
    var reader = new File(fileName)
    workbook = WorkbookFactory.create(reader)
    var sheet = workbook.getSheet(sheetName)
    if (sheet == null) {
       throw new AssertException("Excel workbook does not have sheet - " + sheetName)
    }
    builder = sheet.iterator()
    values = new String[] {}
  }

  //------------------------------------------------------------------------------
  //      Functions
  //------------------------------------------------------------------------------

  /**
   * Return true if there is another row
   */
  @Returns("true if there is another row to read")
  override public function hasNext() : boolean {
    if (builder == null) {
      throw new AssertException("Cannot access file after it is closed")
    }
    var result = builder.hasNext()
    return result
  }

  /**
   * Return the next row
   */
  @Returns("an array of strings for the current rows")
  @Throws(AssertException, "if attempting to read a reow that does not exist")
  override public function next() : String[] {
    var row = builder.next()
    var count = row.Count
    values = new String[count]
    var indx = 0
    for (cell in row) {
       if (cell <> null) {
         values[indx] = cell.StringCellValue
       }
       else {
         values[indx] = ""
       }
       indx++
    }
    return values
  }

  /**
   * Close the file
   */
  override public function close() : void {
    workbook = null
    values = new String[] {}
    return
  }

}