//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2012 Waysys, LLC. All Rights Reserved.
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
//-----------------------------------------------------------------------------
//   Revisions
//-----------------------------------------------------------------------------
//
// Date of Revision    Description                      Author    Issue Number
// ----------------    -------------------------------  ------    ------------
// 14-Jun-2012         Class created                    WAS
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase

uses gw.lang.reflect.IMethodInfo
uses unittestcase.annotation.Repeat
uses unittestcase.file.FileProcessor

uses java.lang.Throwable
uses java.util.ArrayList
uses java.util.List
uses unittestcase.annotation.RepeatSheet

/**
* This class is a test case class that supports the FIT approach to testing.  
* (FIT stands for Framework for Integrated Tests.)  This class allows 
* annotating a method with @Repeat will cause the method to be executed for
* each row in the specified CSV file.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 14-Jun-2012</p>
*
*/
class FitTestCase extends TestCase{
  
//-----------------------------------------------------------------------------
//   Fields
//-----------------------------------------------------------------------------

  protected var _filename  : String

  protected var _sheetName : String as SheetName
    
  private var _spreadsheet : FileProcessor as Spreadsheet
  
  private var _headings    : List<String> as Headings
  
  private var _current     : int as CurrentRow
  
  private var _rowId       : String as RowId
  
  private var _hasSheet    : boolean as HasSheet
  
  protected var _values      : String[]
 
//-----------------------------------------------------------------------------
//   Constructor
//-----------------------------------------------------------------------------
    

  construct() {
     super()
     _filename    = null
     _sheetName   = null
     _spreadsheet = null
     _headings    = new ArrayList<String>()
     _current     = 0
     _hasSheet    = false
     _values      = null
  }

//-----------------------------------------------------------------------------
//   Internal Operations
//-----------------------------------------------------------------------------

   /**
    * Run a test method
    */
    @Param("method", "the method to be run") 
    override protected function runMethod(method : IMethodInfo) : void {
       if (method.hasAnnotation(Repeat) or method.hasAnnotation(RepeatSheet)) {
         // execute method for each line in spreadsheet
         try {
           executeRepeatedFunction(method)
         } finally {
           HasSheet = false
           if (Spreadsheet != null) Spreadsheet.close()
         }
       }
       else {
         // execute the method just once
         super.runMethod(method)
       }
    }

  /**
   * Run a test method multiple times
   */
   @Param("method", "the method to be run") 
   protected function executeRepeatedFunction(method : IMethodInfo) : void {
     var result = true
     _filename = fetchFilename(method)
     _sheetName = fetchSheetname(method)
     Spreadsheet = null
     //
     // Does file exist?
     //
     if (not FileProcessor.fileExists(_filename)) {
       println("File cannot be opened: " + _filename)
       result = false
     }
     //
     // Can spreadsheet be opened
     //
     if (result) {
        result = openSpreadsheet()
     }
     //
     // Read the first row to get headings
     //
     if (result) {
       result = fetchHeadings()
     }
     //
     // Iterate through the spreadsheet
     //
     if (result) {
       iterateMethod(method)
     }
     return
   }

  /**
   * Open the spreadsheet
   */
   @Returns("true if the spreadsheet was opened without error")
   protected function openSpreadsheet() : boolean {
       var result : boolean
       try {
         Spreadsheet = FileProcessor.getFileProcessor(_filename, _sheetName)
         result = true
       } catch (e : Throwable) {
         println(e.Message)
         result = false
       }
       return result     
   }
   
  /**
   * Return the file name of the spreadsheet
   */
   @Param("method", "the method to be run") 
   protected function fetchFilename(method : IMethodInfo) : String {
     var fileName = ""
     if (method.hasAnnotation(Repeat)) {
        var repeat = method.getAnnotation(Repeat).Instance as Repeat
        fileName = repeat.Filename
     }
     if (method.hasAnnotation(RepeatSheet)) {
       var repeat = method.getAnnotation(RepeatSheet).Instance as RepeatSheet
       fileName = repeat.filename()
     }
     return fileName
   }

  /**
  * Return the Excel spreadsheet name if the annotation is RepeatSheet
  */
   @Param("method", "the method to be run")
   protected function fetchSheetname(method : IMethodInfo) : String {
     var sheetName = ""
     if (method.hasAnnotation(RepeatSheet)) {
       var repeat = method.getAnnotation(RepeatSheet).Instance as RepeatSheet
       sheetName = repeat.sheet()
     }
     return sheetName
   }

  /**
   * Iterate through the rows of the spreadsheet
   */
   @Param("method", "the method to be run")    
   protected function iterateMethod(method : IMethodInfo) : void {
      HasSheet = true
      CurrentRow = 0
      while (Spreadsheet.hasNext()) {
        CurrentRow++
        _values = Spreadsheet.next()
        RowId = "Row " + CurrentRow
        if (isRowEmpty(_values)) {
           println("Stopping because of empty row - " + RowId)
           break;
        }
        super.runMethod(method)
      }
      return
   }

  /**
  *   Return true if the values are empty
  *
  */
  @Param("value", "the array of strings from a row")
  @Returns("true if the row is an empty row")
  protected function isRowEmpty(values : String[]) : boolean {
      var result = false
      result = result || (values[0] == null)  || (values[0] == "")
      result = result || (values[0] == null)  || (values[0] == "")
      return result
  }

  /**
   * Report test result
   */
   @Param("name", "the method name")
   @Param("result", "whether the function completed successfully or not")
   override protected function printResult(name : String, result : String) : void {
      println(name + " " + RowId + " completed " + result)     
   }

//-----------------------------------------------------------------------------
//   Header Operations
//----------------------------------------------------------------------------- 

  /**
   * Load the headings from the first row
   */
   protected function fetchHeadings() : boolean {
     var result = true
     try {
       if (Spreadsheet.hasNext()) {
         _values = Spreadsheet.next()
         var indx = 0
         for(value in _values) {
           _values[indx] = value.trim()
           indx++
         }
         Headings = _values.toList()
       }
       else {
         throw new AssertException("No lines in CSV file")
       }
     } catch (e : Throwable) {
       println(e.Message)
       result = false
     }
     return result
   }

  /**
   * Return the column number of a heading (0 <= column < number of columns).
   * Return -1 if the heading is not in the list of headings.
   */
   protected function getColumnIndex(heading : String) : int {
     var colnum = Headings.indexOf(heading)
     return colnum
   }

//-----------------------------------------------------------------------------
//   Public Operations
//----------------------------------------------------------------------------- 

  /**
   * Return the value in the current row for the specified column
   */  
   @Param("heading", "the heading value")
   @Returns("a string with the value of the cell")
   public function getValue(heading : String) : String {
     var value : String
     var colnum = getColumnIndex(heading.trim())
     assertTrue(colnum >= 0, "Heading not found: " + heading)
     assertTrue(colnum < _values.Count, "Column beyond length of row: " + colnum)
     value = _values[colnum]
     return value
   }

}
