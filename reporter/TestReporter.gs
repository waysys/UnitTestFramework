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

uses gw.lang.reflect.IMethodInfo
uses unittestcase.AssertException
uses unittestcase.TestCase
uses unittestcase.TestSuite
uses unittestcase.annotation.Behavior
uses unittestcase.annotation.Context
uses unittestcase.annotation.Specification
uses unittestcase.file.TestReportFileWriter

uses java.lang.Throwable
uses java.util.ArrayList
uses java.util.List

/**
* This class generates a report based on the behavior driven development 
* annotations on the test classes.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 21-Apr-2012</p>
*
*/
class TestReporter {
  
//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------ 

  protected var _testTypes : List<Type> 
  
  protected var suite      : TestCase
  
  protected var _csvWriter : TestReportFileWriter

//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------

  /**
   * Construct a new instance of the report generator
   */
  @Param("aTestSuite", "an instance of a test suite")
  construct(aTestSuite : TestCase) {
    if (aTestSuite == null) throw new AssertException("Test Suite cannot be null")
    _testTypes = new ArrayList<Type>()
    _csvWriter = new TestReportFileWriter()
    suite      = aTestSuite
  }

//------------------------------------------------------------------------------
//      Properties
//------------------------------------------------------------------------------ 

  /**
   * The classes that will be included in the report
   */
   public property get TestTypes() : List<Type> {
      return _testTypes 
   }

  /**
  * The name of the report file
  *
  */
  public property get FileName() : String
  {
    if(_csvWriter.FileName == null) throw new AssertException( "CSV file name must be set")
    return _csvWriter.FileName
  }

   public property set FileName(name : String) : void 
   {
     _csvWriter.FileName = name
     return
   }  

  /**
   * Is the file open
   */
   public property get IsOpen() : boolean {
      return _csvWriter.IsOpen
   }

  /**
   * File exist
   */
   public property get FileExists() : boolean {
      return _csvWriter.fileExists()
   }

//------------------------------------------------------------------------------
//  Public Operations
//------------------------------------------------------------------------------  

  /**
   * Run the report and output into the specified file.  Full path names
   * are recommended.  If the report file already exists, the old file
   * is deleted.
   */
   @Param("reportFile", "the name of the report file")
   public function run(reportFile : String) : void {
     if ((reportFile == null) or (reportFile == "")) {
       throw new AssertException("Report file name cannot be null or empty")
     }
     FileName = reportFile
     try {
       //
       // Open the report file
       //
       print("Beginning test reporter for " + (typeof suite).Name)
       delete()
       open()
       writeHeader()
       //
       // build a list of types to inspect
       //
       buildTypeList(suite)
       //
       // Produce the report
       //
       processTypes()
       print("Created test report: " + FileName)
     } catch (e : Throwable) {
         var message = e.Class.Name + ": " + e.Message
         print(message)
     } finally {
       close()
       print("Test reporter is finished")
     }
     
   }

//------------------------------------------------------------------------------
//  Type List Operations
//------------------------------------------------------------------------------  
   
  /**
   * Build a list of types contained in the test suite.
   * 
   * No duplicates even if a test case is mentioned in more than one suite.
   */
   @Param("aTestCase", "an instance of TestCase which could include a test suite")  
   public function buildTypeList(aTestCase : TestCase) : void {
     var types : List<Type>
     var aTest : TestCase
     var aTestSuite : TestSuite
     //
     // If the instance is an instance of a test suite, get the children of the 
     // test suite
     //
     if (aTestCase.IsTestSuite) {
       aTestSuite = aTestCase as TestSuite
       aTestSuite.addTests()
       types = aTestSuite.TestCaseTypes
       for (aType in types) {
           aTest = TestSuite.createInstance(aType)
           buildTypeList(aTest)
       }
     }
     //
     // If the instance is a test case, add its class to the list
     //
     else {
         addTestType(typeof aTestCase)
     }
   }
   
   /**
    * Add a test case class to the list of test cases if it is not already there
    */
    @Param("aType", "a test case class")
    public function addTestType(aType : Type) : void {
       if (not TestTypes.contains(aType) ) {
          TestTypes.add(aType)
       }
       return
    }

//------------------------------------------------------------------------------
//  Report Writing Operations
//------------------------------------------------------------------------------  
   
  /**
   * Cycle through the list of types and build the report
   */ 
   public function processTypes() : void {
     var data = new TestData()
     for (aType in TestTypes) {
        data.SpecId       = fetchSpecId(aType)
        data.Subject      = fetchSubject(aType)
        data.TestCaseName = fetchTestCase(aType)
        //
        // Process methods and print the results if the 
        // SpecId is not empty
        //
        if (data.CanProcessType) processMethods(aType, data)
     }
     return
   }

  /**
   * Cycle through the methods on a type and look for the context, behaviors,
   * and test method names.  Output a row into the 
   */
   @Param("aType", "a type of a test case class")
   @Param("data", "an instance holding the test data")
   public function processMethods(aType : Type, data : TestData) : void {
     data.Context = ""
     var methods = aType.TypeInfo.Methods  
     for (method in methods) {
       processAMethod(method, data)
       if (data.CanProcessMethod) writeRow(data)
     }
     return
   }

  /**
   * Process the information on a method.  
   */   
   @Param("method", "an instance of IMethodInfo")
   @Param("data", "an instance holding the test data")
   public function processAMethod(method : IMethodInfo, data : TestData) : void {
      data.Behavior = ""
      data.BehaviorId = ""
      //
      // Obtain the context, if there is one
      //
      if (method.hasAnnotation(Context)) {
        var context  = method.getAnnotation(Context).Instance as Context
        data.Context = context.Description
      }
      //
      // Obtain the behavior. The method name
      //
      if (method.hasAnnotation(Behavior)) {
        var behavior = method.getAnnotation(Behavior).Instance as Behavior
        data.BehaviorId = behavior.TestID
        data.Behavior = method.Name
      }
      return
   }

//------------------------------------------------------------------------------
//  Property Fetching Operations
//------------------------------------------------------------------------------  
   
   /**
    * Return the test id for the specification annotation for the class.  There is no guarantee that
    * annotations exist.
    */
    @Param("aType", "a type of a test case class")
    @Returns("a string with the test id of the specification annotation")
    public function fetchSpecId(aType : Type) : String {
      var specId : String
      var aSpecification = fetchSpecInstance(aType)
      if (aSpecification == null) specId = ""
      else                        specId = aSpecification.TestID
      return specId
    }

  /**
   * Return the subject of the specification annotation.  There is no guarantee that
   * the annotation exists
   */
    @Param("aType", "a type of a test case class")
    @Returns("a string with the subject of the specification annotation")
    public function fetchSubject(aType : Type) : String {
      var subject : String
      var aSpecification = fetchSpecInstance(aType)
      if (aSpecification == null) subject = ""
      else                        subject = aSpecification.Subject
      return subject
    }
    
  /**
   * Return the specification annotation on a class.  This can be null
   * if there is not specification
   */ 
   @Param("aType", "a type of a test case class")
   @Returns("an instance of Specification")
   public function fetchSpecInstance(aType : Type) : Specification {
      var aSpecification : Specification
      if (aType == null) throw new AssertException("aType cannot be null")
      var annotation = aType.TypeInfo.getAnnotation(Specification)
      if (annotation == null) aSpecification = null
      else                    aSpecification = (annotation.Instance as Specification)
      return aSpecification      
   }
   
   /**
    * Return the name of the test case
    */
    @Param("aType", "a type of a test case class")
    @Returns("a string with the name of the test case class")
    public function fetchTestCase(aType : Type) : String {
      return aType.Name
    }
    
//------------------------------------------------------------------------------
//      Basic File Operations
//------------------------------------------------------------------------------
   
  /**
   * Delete the files.
   * 
   *     
   */ 
   public function delete() : void
   {
    _csvWriter.delete()
    return
   }
    
  /**
   * Open the reporting files.  File names must be set.
   * 
   */
   public function open() : void
   {
     _csvWriter.open()
     return       
   }
     
  /**
   * Close the files.
   */
   public function close() : void
   {
     _csvWriter.close()
     return        
   }

  /**
   * Write the header
   */
   public function writeHeader() : void 
   {
     _csvWriter.suiteHeader()
     return
   }
   
  /**
   * Build a row and write it out
   */
   @Param("data", "an instance holding the test data")   
   public function writeRow(data : TestData) : void {
     if (not IsOpen)  throw new AssertException("File must be opened" + FileName)
     _csvWriter.buildRow(data)
     return  
     }       
}
