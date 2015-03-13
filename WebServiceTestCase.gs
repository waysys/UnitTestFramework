//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2011 Waysys, LLC. All Rights Reserved.
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

package unittestcase

uses java.lang.RuntimeException
uses java.lang.Throwable

/**
 * This class tests the RunTest class
 * 
* <p>@Author W. Shaffer</p>
* <p>@Version 11-Oct-2013</p>
 */
class WebServiceTestCase extends TestCase {
  
//------------------------------------------------------------------------------
//      Variables
//------------------------------------------------------------------------------  

  var service : RunTest
  static private var TEST_CASE = "uig.unittestcase.SampleTestCase"
  static private var REPORT_FILE = "\\proj\\Coverage\\report.txt"
  static private var ERROR_FILE  = "\\proj\\Coverage\\error.txt"
  
//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------

  construct() {

  }

//------------------------------------------------------------------------------
//      Set Up
//------------------------------------------------------------------------------

  /**
   * Perform the set up for each test case
   */
   override public function setUp() {
     service = new RunTest()
     return
   }
   

//------------------------------------------------------------------------------
//      Tests
//------------------------------------------------------------------------------

  /**
   * Test of getTestCaseType
   */
  public function testTestCaseType() : void {
    try {
      var type = service.getTestCaseType(TEST_CASE)
      check(type == unittestcase.SampleTestCase, "test case type incorrect - " + TEST_CASE)
    } catch (e : Throwable) {
       fail("Exception thrown: " + e.Message)
    }
  }
  
  /**
   * Test of unknown test case
   */
   public function testUnknownTestCaseType() : void {
     try {
       var type = service.getTestCaseType("XX")
       fail("No exception thrown for unknown test case type")
     } catch (e : RuntimeException) {
       print(e.Message)
       check(true, "")
     }
   }
   
    /**
     * Test of runTest
     */
     public function testRunTest() : void {
       try {
         var result = service.runTest(TEST_CASE, REPORT_FILE)
         print(result.errorMessage)
         assertTrue(result.errorNum == 0, "Wrong error number: " + result.errorNum)
       } catch (e : RuntimeException) {
         fail("Exception thrown: " + e.Message)         
       }
     }
     
     /**
      * test of unknown test case
      */
      public function testUnknownTestCase() : void {
       try {
         var result = service.runTest("XX", ERROR_FILE)
         print(result.errorMessage)
         assertTrue(result.errorNum== 1, "Wrong error number: " + result.errorNum)
       } catch (e : RuntimeException) {
         fail("exception thrown for unknown test case: " + e.Message)    
       }        
      }
      
      /**
       * test of illegal file
       * 
       */
       public function testBadFile() : void {
         try {
           var result = service.runTest(TEST_CASE, "..")
           assertTrue(result.errorNum== 1, "Wrong error number: " + result.errorNum)           
         } catch (e : RuntimeException) {
           fail("exception thrown for unknown test case: " + e.Message)       
         }                 
       }
}