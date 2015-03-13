//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2008 Waysys, LLC. All Rights Reserved.
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
// 10-Oct-2011         Class created                    WAS
// 11-Oct-2013         Updated for Version 8            WAS
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.file
uses unittestcase.reporter.TestData

/**
*
*   This class produces the test report file which is a CSV file
*
*   <p>@author William A. Shaffer</p>
*   <p>@version 21-Apr-2012</p>
*
*/
class TestReportFileWriter extends CsvWriter {

//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------

  construct() {
    headings = {"Specification ID", "Behavior Id" , "Test Case Name", "Subject", "Context" , "Behavior"}
  }

//------------------------------------------------------------------------------
//      Operations
//------------------------------------------------------------------------------

  /**
   * Build a row and write it out
   */
   @Param("data", "an instance holding the test data")   
   public function buildRow(data : TestData) : void {
     check(IsOpen, "File must be opened" + FileName)
     var row : String[] = {
       data.SpecId, data.BehaviorId, data.TestCaseName, data.Subject, 
       data.Context, data.NormalizedBehavior 
     }
     check(row.length == headings.length, "Number of items in CSV row does not match headings")
     writeRow(row)
     return  
     }
  
}
