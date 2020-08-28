//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2011, 2012 Waysys, LLC. All Rights Reserved.
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
uses unittestcase.annotation.Repeat
uses java.lang.Exception

/**
* This class is a test of the FitTestCase framework
*
* <p>@Author W. Shaffer</p>
* <p>@Version 14-Jun-2012</p>
*
*/
@Specification("SAMPLE03", "FitTestCase")
class SampleFitTestCase extends FitTestCase {

  var count : int

  construct() {
    super()
    count = 0
  }

  @Context("with FitSpreadsheet.csv")
  override public function setUp() {
    super.setUp()
  }

  @Repeat("/git/UnitTestFrameworkTest/FitSpreadsheet.csv")
  @Behavior("001")
  public function test_can_iterate_with_spreadsheet() {
    count++
    print(count)
  }

  @Repeat("XX")
  @Behavior("002")
  public function test_can_handle_unknown_file() {
    fail("should not execute this function")
  }

  @Repeat("/git/UnitTestFrameworkTest/FitSpreadsheet.csv")
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

  @Repeat("/git/UnitTestFrameworkTest/FitSpreadsheet.csv")
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
