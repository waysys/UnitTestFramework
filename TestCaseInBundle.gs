//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2011, 2018 Waysys, LLC. All Rights Reserved.
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
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase

uses gw.lang.reflect.IMethodInfo
uses gw.pl.persistence.core.Bundle
uses gw.transaction.Transaction

uses java.lang.Throwable

/**
 * This class provides execution of tests like TestCase, except that each test
 * is wrapped in a transaction.  A writable bundle is provided through the
 * field testBundle.
 * 
 * @Author W. Shaffer
 * @Version 15-May-2018
 */
class TestCaseInBundle extends TestCase  {

//------------------------------------------------------------------------------
//  Fields
//------------------------------------------------------------------------------
  
  protected var testBundle : Bundle
  protected var commitTest : boolean
  static var USER = "su"


//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {
    super()
  }


//------------------------------------------------------------------------------
//  Methods to Override
//------------------------------------------------------------------------------

  /**
   * Run a test method inside a transaction
   */
  @Param("method", "the method to be run")
  override protected function runMethod(method : IMethodInfo) : void {
    Transaction.runWithNewBundle(\bundle -> {
      testBundle = bundle
      invokeSuper(method)
    }, USER)
  }

  /**
   * Invoke runMethod in super.  The super symbol is not
   * available in blocks.
   */
  @Param("method", "the method to be run")
  private function invokeSuper(method : IMethodInfo) {
    super.runMethod(method)
  }
}