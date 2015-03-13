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
  
  protected var testBundle : Bundle
  protected var commitTest : boolean

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  construct() {
  }


//------------------------------------------------------------------------------
//  Methods to Override
//------------------------------------------------------------------------------

  /**
   * Perform certain set up functions
   */
   override public function setUp() {
     super.setUp()
     commitTest = false
     testBundle = Transaction.getCurrent() 
   }

  /**
   * Perform certain tear down functions, including committing the
   * bundle if requested
   */
   override public function tearDown() {
     if (testBundle != null) {
       if (commitTest) testBundle.commit()
       else {
         try {
           testBundle.commit()
         } catch (e : Throwable) {
           // do nothing
         }
       }
     }
     super.tearDown()
   }
}