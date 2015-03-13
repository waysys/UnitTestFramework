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

uses unittestcase.annotation.Behavior
uses unittestcase.annotation.Context
uses unittestcase.annotation.Specification

/**
* This class is an example of a test case.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 22-Apr-2012</p>
*
*/
@Specification("SAMPLE01", "Test Case")
class SampleTestCase extends TestCase {

  construct() {

  }

  @Context("with just test functions")
  override public function setUp() {
    super.setUp()
  }

  @Behavior("001")
  public function test_example_1() : void {
     assertTrue(true, "true not recognized")
     print("example test") 
  }

  @Behavior("002")  
  public function test_example_2() {
    fail("this test case always fails")
  }
}
