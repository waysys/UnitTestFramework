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
// 14-Jun-2012         IsLoggedIn property added        WAS
// 11-Oct-2013         Updated for Version 8            WAS
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase

uses gw.lang.reflect.IMethodInfo

uses java.io.FileWriter
uses java.lang.RuntimeException
uses java.lang.Throwable
uses java.util.ArrayList
uses java.util.List

/**
 * This class supports XUnit testing in a manner similar to JUnit. 
 * 
 * @Author W. Shaffer
 * @Version 11-Oct-2013
 */
class TestCase  {

//------------------------------------------------------------------------------
//  Fields
//------------------------------------------------------------------------------
  
  protected var success : int
  protected var fail    : int
  protected var error   : int  
  
  protected var report : FileWriter

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {
    report = null
  }

//------------------------------------------------------------------------------
//  Properties
//------------------------------------------------------------------------------

    /** the number of successes */
    public property get Successes() : int {
       return success 
    }

    /** the number of failures */
    public property get Failures() : int {
       return fail 
    }

    /** the number of errors */
    public property get Errors() : int {
       return error 
    }

    /**
     * the total number of test cases
     */
     public property get Total() : int {
       return success + fail + error
     }
 
    /**
    * output file
    */
    public property get ReportFile() : FileWriter {
      return report
    }

    public property set ReportFile(writer : FileWriter) : void {
      report = writer
    }

    /**
     * Is test suite
     */
     public property get IsTestSuite() : boolean {
        return false 
     }

  /**
   * Return an empty list, since the list is a list of classes
   * contained by suite.  This class has already been listed.
   */
   public property get TestCaseTypes() : List<Type> {
     return new ArrayList<Type>()
   }

  /** True if the user is logged in
   * 
   */
   public property get IsLoggedIn() : boolean {
     return User.util.CurrentUser != null
   }

//------------------------------------------------------------------------------
//  Methods to Override
//------------------------------------------------------------------------------

  /**
  * Perform set up - this method is typically overridden in the subclasses
  */
  public function setUp() : void {
   return
  }

  /**
  * Perform the tear down - this method is typically overridden in the subclasses
  */   
  public function tearDown() : void {
   return
  }

  /**
  * Perform tests on the precondition
  */
  public function testPreconditions() : void {
    return
  }

//------------------------------------------------------------------------------
//  Method Characteristics
//------------------------------------------------------------------------------

  /**
   * Return the return type of a method as a string.
   * 
   */
   @Param("method", "the method being inspected")
   @Returns("the return type of the method")
   protected function getReturnType(method : IMethodInfo) : String
   {
     check(method != null, "method cannot be null")
     var returnType = method.ReturnType as String
     return returnType
   }

  /**
   * Return the number of parameters for a method.
   * 
   */
   @Param("method", "the method being inspected")
   @Returns("the return type of the method")   
   protected function getNumberParams(method : IMethodInfo) : int
   {
      check(method != null, "method cannot be null")
      return method.Parameters.Count
   } 
    
//------------------------------------------------------------------------------
//  Run the Tests
//------------------------------------------------------------------------------

  /**
   * Run all test methods
   */
  public function run() : void {
    //
    // retrieve the list of methods
    //
    var methods = (typeof this).TypeInfo.Methods 
    //
    // execute test methods
    //
    println("Beginning test case " + (typeof this))
    initialize()
    //
    // test preconditions
    //
    runPrecondition()
    for (method in methods) {
       if (isTestMethod(method)) {
          runMethod(method) 
       }
    }
    //
    // Print summary
    //
    printSummary()
    return
  }

  /**
   * Initialize the instance variables
   */
   protected function initialize() : void {
     success = 0
     fail    = 0
     error   = 0
     return
   }

  /**
   * Run the precondition test
   */
   protected function runPrecondition() : void {
      var result = ""
      try {
        setUp()
        testPreconditions()
        success++
        result = "success"
      } catch (e : AssertException) {
         fail++
         printException(e)
         result = "with failure"       
      } catch ( e : Throwable) {
        error++
        printException(e) 
        result = "with error"
      } finally {
        tearDown() 
        println("testPreconditions completed " + result)
      }
      return
   }
  
  /**
   * Return true if a method is a test method. Test methods begin with 
   * the name "test" and have no arguments and return no results.
   */
   @Param("method", "the method to be tested")
   @Returns("return true if this method is a test method")
   protected function isTestMethod(method : IMethodInfo) : boolean {
      var result = false
      var name = method.Name
      if (name.startsWith("test") and (name != "testPreconditions()")) {
        // no test method if it has parameters
        if (getNumberParams(method) == 0) {
          if (getReturnType(method) == "void") result = true
        }
      }
      return result
   }
   
   /**
    * Run a test method
    */
    @Param("method", "the method to be run") 
    protected function runMethod(method : IMethodInfo) : void {
      var result = ""
      try {
         setUp()
         method.CallHandler.handleCall(this, {})
         success++
         result = "successfully"
      } catch (e : AssertException) {
         fail++
         printException(e)
         result = "with failure"
      } catch (e : Throwable) {
         error++
         printException(e)
         result = "with error"
      } finally {
         tearDown()
         printResult(method.Name, result)
      }
    }

  /**
   * Report test result
   */
   @Param("name", "the method name")
   @Param("result", "whether the function completed successfully or not")
   protected function printResult(name : String, result : String) : void {
      println(name + " completed " + result)     
   }

//------------------------------------------------------------------------------
//  Print Methods
//------------------------------------------------------------------------------

    /**
     * Open a file writer
     */
     @Param("fileName", "the name of the report file")
     @Throws(RuntimeException, "if file cannot be open for writing")
     public function openFile(fileName : String) : void
     {
        check(fileName != null, "File name cannot be null")
        close()
        //
        // Open report file
        //
        try
        {
            //The file is opened in append mode if it exists
            ReportFile = new FileWriter(fileName, true)
        }
        catch (e : Throwable)
        {
            var message = "Unable to open file name: " + fileName + " because: " + e.Message
            println(message)
            throw new RuntimeException(message)
        }
        return
    }

    /**
    * Close the report file if it has been opened.
    *
    */
    function close() : void
    {
       if (ReportFile != null)  
       {
         ReportFile.flush()
         ReportFile.close() 
         ReportFile = null  
       }
       return
    }

    /**
     * Print a line
     */
     @Param("message", "the message to be printed")
     protected function println(message : String) : void {
       if (ReportFile == null) print(message)
       else {
         ReportFile.write(message)
         ReportFile.write("\r\n")
       }
       return
     }

    /**
     * Print out the error message and the stack trace for an exception
     * 
     */
     @Param("e", "an exception")
     protected function printException(e : Throwable) : void {
       println("----------------------------------------------")
       if (e.Message != null) println(e.Message) 
       else println((typeof e) as String)
       println(" ")
       e.printStackTrace()
     }

    /**
     * Print a summary of the results
     */
     protected function printSummary() : void {
       println("Total tests: " + Total + ", Successes: " + success +
         ", Failures: " + fail + ", Errors: " + error)
       println(" ")
       return
     }
   
//------------------------------------------------------------------------------
//  Additional Assertions
//------------------------------------------------------------------------------ 

  /**
  * Throws an exception if result is not true.  The function also logs the 
  * message as an error.
  *
  */
  @Param("result", "Should be true, but if false, throw an exception")
  @Param("message", "A numeric identifier for the error message")
  @Throws(AssertException, "if result is false")
  public function check(result : boolean, message : String) : void
  {
    if (not result)
    {
       throw new AssertException(message)
    }
    return
  } 

  /**
   * Throw an exception if the result is not true
   */
   @Param("result", "the result of an evaluation")
   @Param("message", "the message to be printed")
   @Throws(AssertException, "if result is not true")
   public function assertTrue(result : boolean, message : String) : void {
     check(result, message)
     return
   }
   
   /**
    * Throw an exception with an error message
    */
    @Param("message", "the message indicating the failur")
    @Throws(AssertException, "always")
    public function fail(message : String) : void {
      throw new AssertException(message)
    }
 
   /**
    * Throw exception if item is null
    */  
    @Param("item", "an object")
    @Param("message", "the message if test fails")
    @Throws(AssertException, "if condition is not true")
    public function assertNotNull(item : Object, message : String) {
      check(item != null, message)
      return
    }

    /**
     * Throw an exception if item is not null
     */
     @Param("item", "an object")
     @Param("message", "the message if test fails")
     @Throws(AssertException, "if condition is not true")     
     public function assertNull(item : Object, message : String) {
       check(item == null, message)
       return
     }
    
    /**
     * Test if two strings are equal.  If not, throw an exception.
     * 
     */
     @Param("expected", "the expected value of the string")
     @Param("actual", "the actual value of the string")
     @Throws(AssertException, "if expected != actual")
     public function assertEquals(expected : String, actual : String) : void {
       check(expected == actual, "Excpected " + expected + " but received " + actual)
       return
     }
}
