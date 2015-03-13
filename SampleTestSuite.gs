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

/**
 * This is a sample test suite
 * 
 * @Author W. Shaffer
 * @Version 11-Oct-2013
 */
class SampleTestSuite extends TestSuite {

//------------------------------------------------------------------------------
//  Constructor
//------------------------------------------------------------------------------

  /**
   * Create an instance of this class.  The constructor of the super class
   * must be called.
   */
  construct() {
    super()
  }

//------------------------------------------------------------------------------
//  Add Test 
//------------------------------------------------------------------------------

  /**
   * Add the classes to be tested
   */
   override public function addTests() : void {
     addTestCase(SampleTestCase)
     addTestCase(SampleTestCase)
     return
   }

}
