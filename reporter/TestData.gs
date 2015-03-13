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

/**
* This class stores data about tests and is used to move data around 
* concerning tests
*
* <p>@Author W. Shaffer</p>
* <p>@Version 22-Apr-2012</p>
*
*/
class TestData {

//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

  private var _specId       : String as SpecId
  private var _subject      : String as Subject
  private var _testCaseName : String as TestCaseName
  private var _context      : String as Context
  private var _behaviorId   : String as BehaviorId
  private var _behavior     : String as Behavior 

//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------ 

  construct() {
    _specId       = ""
    _subject      = ""
    _testCaseName = ""
    _context      = ""
    _behaviorId   = ''
    _behavior     = ""
  }

//------------------------------------------------------------------------------
//      Properties
//------------------------------------------------------------------------------ 


  /**
   * True if the type can be processed
   */
   public property get CanProcessType() : boolean {
     return _specId != ""
   }

   /**
    * True if the method can be processed
    */
    public property get CanProcessMethod() : boolean {
      return CanProcessType && (_behaviorId != "")
    }

  /**
   * The normalized behavior name.
   * 
   * Underscores are replaced by spaces and the leading test is removed.
   */
   public property get NormalizedBehavior() : String {
     var normalized = Behavior.replace('_', ' ')
     if (normalized.startsWith("test")) normalized = normalized.substring(5)
     if (normalized.startsWith(" ")   ) normalized = normalized.substring(1) 
     normalized = normalized.remove("()")
     return normalized
   }
}
