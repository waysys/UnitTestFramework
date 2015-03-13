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
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.annotation
uses gw.lang.annotation.AnnotationUsage
uses gw.lang.annotation.UsageTarget
uses gw.lang.annotation.UsageModifier

/**
* This annotation identifies the class as a specification and identifies the
* subject and test identifier
*
* <p>@Author W. Shaffer</p>
* <p>@Version 21-Apr-2012</p>
*
*/
@AnnotationUsage(UsageTarget.TypeTarget, UsageModifier.One)
class Specification implements IAnnotation  {

  /** the test case identifier for the class */
  private var _testId : String as TestID
  
  /** the subject of the test */
  private var _subject : String as Subject

  /**
   * Create an instance of the class
   */
   @Param("id", "the test identifier")
   @Param("sub", "the subject of the test")
   construct(id : String, sub : String) {
    if (id == null ) id  = ""
    if (sub == null) sub = ""
    _testId = id
    _subject = sub
  }

}
