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
* This annotation describes the context for a set of tests.  This annotation
* is typically applied to the set up method.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 21-Apr-2012</p>
*
*/
@AnnotationUsage(UsageTarget.MethodTarget, UsageModifier.One)
class Context implements IAnnotation {

  /**
   * The description of the context
   */
  private var _desc : String as Description
  
  construct(desc : String) {
    if (desc == null) desc = ""
    _desc = desc
  }

}
