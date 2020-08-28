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

package unittestcase

uses unittestcase.annotation.Specification
uses unittestcase.annotation.Context
uses unittestcase.annotation.Behavior
uses unittestcase.annotation.RepeatSheet
uses java.lang.Exception

/**
 * This class tests the use of Excel files for FIT testing
 *
 * <p>@Author W. Shaffer</p>
 * <p>@Version 17-Aug-2020</p>
 */
@Specification("SAMPLE04", "ExcelTestCase")
class SampleExcelTestCase extends FitTestCase {

  var count : int

  construct() {
    super()
    count = 0
  }

  @Context("with FitSpreadsheet.xlsx")
  override public function setUp() {
    super.setUp()
  }

  @RepeatSheet("/git/UnitTestFrameworkTest/FitSpreadsheet.xlsx", "FitSpreadsheet")
  @Behavior("001")
  public function test_can_iterate_with_spreadsheet() {
    count++
    print(count)
  }

  @RepeatSheet("/git/UnitTestFrameworkTest/FitSpreadsheet.xlsx", "XX")
  @Behavior("002")
  public function test_can_handle_unknown_file() {
    fail("should not execute this function")
  }

  @RepeatSheet("/git/UnitTestFrameworkTest/FitSpreadsheet.xlsx", "FitSpreadsheet")
  @Behavior("003")
  public function test_can_fetch_value() {
    var testID = getValue("TestID")
    var first  = getValue("First")
    var second = getValue("Second")
    var third  = getValue("Third")
    if (testID == "TST-01") {
      assertEquals("a", first)
      assertEquals("b", second)
      assertEquals("c", third)
    }
    if (testID == "TST-02") {
      assertEquals("e", first)
      assertEquals("f", second)
      assertEquals("g", third)
    }
  }

  @RepeatSheet("/git/UnitTestFrameworkTest/FitSpreadsheet.xlsx", "FitSpreadsheet")
  @Behavior("004")
  public function test_can_handle_unknown_heading() {
    try {
      var testId = getValue("XX")
      fail("incorrectly processed unknown heading XX: " + testId)
    } catch (e : Exception) {
      print(e.Message)
    }
    return
  }
}