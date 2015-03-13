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

uses gw.api.util.DateUtil
uses gw.api.util.Logger
uses gw.i18n.DateTimeFormat
uses gw.lang.reflect.IType
uses gw.lang.reflect.TypeSystem
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiGenInToolkit
uses gw.xml.ws.annotation.WsiPermissions
uses gw.xml.ws.annotation.WsiWebService

uses java.lang.RuntimeException
uses java.lang.Throwable

/**
* This class provides a web service to execute a test suite from
* outside Studio
*
* <p>@Author W. Shaffer</p>
* <p>@Version 11-Oct-2013</p>
*
*/
@WsiWebService("http://waysysweb.com")
@WsiAvailability(NONE)
@WsiGenInToolkit
class RunTest {

//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------

  /**
   * create instance of class
   */
  construct() {

  }

//------------------------------------------------------------------------------
//      Operations
//------------------------------------------------------------------------------

  /**
   * Run a test case or test suite
   */
   @WsiPermissions( {SystemPermissionType.TC_SOAPADMIN} ) // a blank list means no authentication needed
   @Param("testName", "the name of the test case or test suite to run")
   @Param("reportName", "the name of the report file where results are printed")
   public function runTest(testName : String, reportName : String) : TestCaseResult {
     Logger.logInfo("RunTest beginning test suite - " + testName)
     var results = new TestCaseResult()
     try {
       launchTest(testName, reportName, results)   
     } catch (e : RuntimeException) {
       results.errorNum = 1
       results.errorMessage = e.Message
     }
     Logger.logInfo("Runtest ends test suite - " + testName)
     return results
   }
   
  /**
   * Launch test case
   */
   @Param("testName", "the name of the class that is the test case")
   @Param("reportName", "the name of the report file where results are printed")   
   @Throws(RuntimeException, "if test case class does not exist or cannot be loaded")  
   protected function launchTest(testName : String, reportName : String, results : TestCaseResult) : void {
      var message = createInitialMessage(testName)
      var aTestCase : TestCase = null
      //
      // Get an instance of the test case class
      //
      var type = getTestCaseType(testName);
      try {
         aTestCase = type.TypeInfo.getConstructor( null ).Constructor.newInstance( null) as TestCase      
      } catch (e : Throwable) {
         message = "Could not obtain instance of testCase: " + testName + " because " + e.getCause() 
         throw new RuntimeException(message)       
      }
      //
      // Delete the report file
      //
      delete(reportName)
      //
      // Run the test case
      //
      aTestCase.openFile(reportName)
      aTestCase.println(message)
      Logger.logInfo(message)
      aTestCase.run()
      aTestCase.close()
      //
      // Set the result class
      //
      results.succeeded = aTestCase.Successes
      results.failed    = aTestCase.Failures
      results.errors    = aTestCase.Errors  
      Logger.logInfo("Ending unit test case - " + testName + "\r\n")
      return
   }

    /**
    * Return the Type of the test case.  An exception is thrown 
    * if there is no type of this kind.
    */
    @Param("testName", "the name of the class that is the test case")
    @Throws(RuntimeException, "if class does not exist")
    protected function getTestCaseType(testName : String) : IType
    {
      var testCaseType : IType
      var message : String
      try
      {
        testCaseType = TypeSystem.getByFullName( testName )
      }
      catch (e : Throwable)
      {
        message = "Test case class does not exist: " + testName
        throw new RuntimeException(message)
      }
      return testCaseType
    }

  /**
  * Delete the report file
  */
  function delete(fileName : String) : void
  {
    try
    {
      var aFile = new java.io.File(fileName) 
      if (aFile.exists()) 
      {
         aFile.delete() 
      }
    }
    catch (e : Throwable)
    {
      Logger.logError("Unable to delete file: " + e.Message)
    }
    return
  }    

  /**
   * Return the initial message 
   */
   function createInitialMessage(testName : String) : String {
     var message : String
     message = 
       "\r\n________________________________________________________________________________\r\n" +
       "Running unit test case " + testName + " - " + 
       DateUtil.currentDate().formatDateTime(DateTimeFormat.LONG, DateTimeFormat.LONG) +
       "\r\n________________________________________________________________________________\r\n" 
     return message
   }
    
}
