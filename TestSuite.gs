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
// 05-Aug-2012         Class update                     WAS       N/A
//                     Fixed create index
// 11-Oct-2013         Updated for Version 8            WAS       N/A
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase

uses gw.lang.reflect.IConstructorInfo
uses gw.lang.reflect.ITypeInfo

uses java.lang.Throwable
uses java.util.ArrayList
uses java.util.List

/**
 * This class runs a suite of tests.
 * 
 * @Author W. Shaffer
 * @Version 11-Oct-2013
 */
abstract class TestSuite extends TestCase {
  
//------------------------------------------------------------------------------
//  Fields
//------------------------------------------------------------------------------

  protected var tests : List<Type>

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {
    tests = new ArrayList<Type>()
  }

//------------------------------------------------------------------------------
//  Properties
//------------------------------------------------------------------------------

  /**
   * Is test suite
   */
   override public property get IsTestSuite() : boolean {
      return true 
   }

  /**
   * Return a list of test cases contained in this suite
   */
   override public property  get TestCaseTypes() : List<Type> {
     return tests
   }

//------------------------------------------------------------------------------
//  Operations
//------------------------------------------------------------------------------

  /**
   * Add classes to the list of test cases
   * 
   */
   @Param("testCaseClass", "a test case class")
   public function addTestCase(testCaseClass : Type) {
     tests.add(testCaseClass)
     return
   }

  /**
   * Run all the test cases
   */
   override public function run() : void {
     println("Beginning test suite " + (typeof this))
     initialize()
     //
     // Build a list of tests
     //
     addTests()
     //
     // Run through the list
     //
     for (test in tests) {
       if (test == null) {
         //do nothing
       }       
       else if (isTestCase(test)) {
         var instance = createInstance(test)
         if (instance != null) {
           instance.ReportFile = ReportFile
           instance.run()
           success += instance.Successes
           fail += instance.Failures
           error += instance.Errors
         }
       }
       else  {
         println("Test case is not a subclass of TestCase: " + test.DisplayName)
       }
     }
     println("End test suite " + (typeof this))
     printSummary()
     return
   }
  
  /**
   * Add the desired test cases to the list of 
   * test cases.  This method must be overridden
   * in a subclass.
   */
  abstract public function addTests() : void;

  /**
   * Return an instance of a type
   */
   static public function createInstance(aType : Type) : TestCase {
     var test      : TestCase
     var typeInfo  : ITypeInfo
     var constInfo : IConstructorInfo
     try {
        typeInfo = aType.TypeInfo
        constInfo = typeInfo.getConstructor(null) 
        var constructor = constInfo.Constructor
        test = constructor.newInstance(null) as TestCase
     } catch (e : Throwable) {
        print("Unable to create instance of test: " + aType.DisplayName)
        print(e.Message)
        test = null
     }
     return test
   }

  /**
   * Return true if a type is a subclass of TestCase
   */
   static public function isTestCase(aType : Type) : boolean {
     var result = TestCase.Type.isAssignableFrom(aType)
     return result
   }

}
