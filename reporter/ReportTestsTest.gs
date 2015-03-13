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
// 10-Oct-2011         Class created                    WAS
// 11-Oct-2013         Updated for Version 8            WAS
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.reporter

uses unittestcase.SampleTestCase
uses unittestcase.SampleTestSuite
uses unittestcase.TestCase
uses unittestcase.TestSuite
uses unittestcase.annotation.Behavior
uses unittestcase.annotation.Context
uses unittestcase.annotation.Specification

/**
* This class tests the report tests generator.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 11-Oct-2013</p>
*
*/
@Specification("TEST001", "Report Test Generator")
class ReportTestsTest extends TestCase {

//------------------------------------------------------------------------------
//  Fields
//------------------------------------------------------------------------------

  protected var reporter  : TestReporter
  
  protected var suite     : TestSuite
  
  protected var aTestCase : TestCase
  
  protected var data      : TestData

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {

  }

//-----------------------------------------------------------------------------
//   Set up and tear down
//-----------------------------------------------------------------------------

  /**
   * Set up the test case
   */
   @Context("newly invoked reporter and the sample test suite")
   override function setUp() : void {
     // do this first
     super.setUp()
     aTestCase = new SampleTestCase()
     suite     = new SampleTestSuite()
     reporter  = new TestReporter(suite) 
     reporter.FileName = "/proj/bdd/report"
     reporter.delete()  
     data      = new TestData()  
   }
  
  /**
   * Tear down the test case
   */
   override function tearDown() : void {
     // do this last
     super.tearDown()
     suite     = null
     aTestCase = null
     reporter  = null
     return
   }

//-----------------------------------------------------------------------------
//   Tests
//-----------------------------------------------------------------------------

  /**
   * A test suite knows it is a suite
   */
   @Behavior("001") 
   public function test_suite_knows_it_is_suite() {
     assertTrue(suite.IsTestSuite, "suite did not recognize it is a suite")
   }

  /**
   * A test case knows it is not a suite
   */
   @Behavior("002")
   public function test_case_knows_it_is_not_suite() {
     assertTrue(not aTestCase.IsTestSuite, "test case thought it was a suite")
   }
  
  /**
   * The reporter can build a list of test types from a suite
   */
   @Behavior("003")
   public function test_can_build_list_classes_from_suite() {
      reporter.buildTypeList(suite)
      assertTrue(reporter.TestTypes.Count == 1, "wrong count of test cases: " +
        reporter.TestTypes.Count)
      assertEquals((typeof aTestCase).Name, reporter.TestTypes.first().Name)   
   }
   
   /**
    * The reporter can build a list of test types from a test case
    */
    @Behavior("004")
    public function test_can_build_list_types_from_test_case() {
      reporter = new TestReporter(aTestCase)
      reporter.buildTypeList(aTestCase)
      assertTrue(reporter.TestTypes.Count == 1, "wrong count for a test case: " +
        reporter.TestTypes.Count)
      assertEquals((typeof aTestCase).Name, reporter.TestTypes.first().Name)
    }
    
  /**
   * The reporter can find the test id in the specification
   */    
   @Behavior("005")
   public function test_can_find_spec_id() {
      var specId = reporter.fetchSpecId(SampleTestCase)
      assertEquals("SAMPLE01", specId)
   }
   
   /**
    * The reporter can find the subject in the specification
    */
    @Behavior("006")
    public function test_can_find_subject() {
      var subject = reporter.fetchSubject(SampleTestCase)
      assertEquals("Test Case", subject)
    }
    
    /**
     * The reporter can handle classes with no subject annotation
     */
     @Behavior("006")
     public function test_can_handle_no_specification() {
       var specId = reporter.fetchSpecId(SampleTestSuite)
       assertEquals("", specId)
     }
     
  /**
   * The reporter can find the class name of the test case
   */
   @Behavior("007")
   public function test_can_find_class_name() {
     var testClassName = reporter.fetchTestCase(SampleTestSuite)
     assertEquals("unittestcase.SampleTestSuite", testClassName)
   }
   
   /**
    * The reporter can control the report file
    */
    @Behavior("008")
    public function test_can_control_file() {
      assertTrue(not reporter.FileExists, "File should not exist: "   + reporter.FileName)
      assertTrue(not reporter.IsOpen    , "File should not be open: " + reporter.FileName)
      reporter.open()
      assertTrue(reporter.FileExists, "File should exist: "   + reporter.FileName)
      assertTrue(reporter.IsOpen    , "File should be open: " + reporter.FileName)  
      reporter.close()
      assertTrue(not reporter.IsOpen, "File should not be open: " + reporter.FileName)  
      assertTrue(reporter.FileExists, "File should exist: "       + reporter.FileName) 
      reporter.delete()
      assertTrue(not reporter.FileExists, "File should not exist: "   + reporter.FileName)
      assertTrue(not reporter.IsOpen    , "File should not be open: " + reporter.FileName)             
    }
    
    /**
     * The reporter should be able to convert a test function name to a normalized behavior 
     * description
     */
     @Behavior("009")
     public function test_can_convert_to_normalized_behavior() {
       data.Behavior = "test_can_convert_to_normal()"
       assertEquals("can convert to normal", data.NormalizedBehavior)
     }
     
  /**
   * The reporter can fetch the context
   */ 
   @Behavior("010")
   public function test_can_fetch_context() {
     //
     // Because the SpecId is not set,
     // the reporter will not attempt to 
     // write to the file
     reporter.processMethods(SampleTestCase, data)
     assertEquals("with just test functions", data.Context)
   }
   
   /**
    * The reporter can fetch the behavior 
    */
    @Behavior("011")
    public function test_can_fetch_behavior_id() {
      reporter.processMethods(SampleTestCase, data)
      //
      // Data will hold results of the last method in SampleTestCase
      //
      assertEquals("002"      , data.BehaviorId)
      assertEquals("example 2", data.NormalizedBehavior)
    }
    
  /**
   * The reporter can generate a report for SampleTestSuite
   */
   @Behavior("012")
   public function test_can_generate_report() {
     reporter.run("/proj/bdd/report")
     assertTrue(not reporter.IsOpen, "Reporter did not close report file")
     assertTrue(reporter.FileExists, "Report file does not exist")
   }
}
