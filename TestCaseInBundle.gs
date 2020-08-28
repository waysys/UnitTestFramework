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
 * @Version 11-Oct-2013
 */
class TestCaseInBundle extends TestCase  {


//------------------------------------------------------------------------------
//  Fields
//------------------------------------------------------------------------------

  protected var commitTest : boolean
  private var _user : String

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {
    super()
    _user = "su"
  }

//------------------------------------------------------------------------------
//  Properties
//------------------------------------------------------------------------------

  property get User() : String {
    return _user
  }

  property set User(value : String) {
    assert value != null : "User must not be null"
    assert not value.Empty : "User must not be empty string"
    _user = value
  }

//------------------------------------------------------------------------------
//  Methods to Override
//------------------------------------------------------------------------------

  /**
   * Run a test method
   */
  @Param("method", "the method to be run")
  override protected function runMethod(method : IMethodInfo) : void {
    assert User != null : "User must not be null"
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      runMeth(method)
    }, User)
  }

  /**
   * Invoke the runMethod in the TestCase class.  This function is necessary, since
   * super cannot be mentioned in a block.
   */
  @Param("method", "the method to be run")
  private function runMeth(method : IMethodInfo) {
    super.runMethod(method)
    return
  }
}