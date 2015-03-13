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
* This annotation identifies a test as a behavior.  This annotation
* is set on a test method.  The name of the test method becomes the description
* of the behavior.  It takes a single parameter that is the identifier of the test.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 21-Apr-2012</p>
*
*/
@AnnotationUsage(UsageTarget.MethodTarget, UsageModifier.One)
class Behavior implements IAnnotation {

  /**
   * The identifier for this test
   */
  private var _testId : String as TestID

  /**
   * Create a new instance of this class
   */
  @Param("id", "the test identifier for the behavior")
  construct(id : String) {
    if (id == null) id = ""
    _testId = id
  }

}
