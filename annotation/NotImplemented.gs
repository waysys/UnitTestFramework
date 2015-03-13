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
* This annotation identifies the test method as not being implemented.  It
* can be placed on a test method to indicate that the method still needs to be
* fully implemented.
* 
* <p>@Author W. Shaffer</p>
* <p>@Version 21-Apr-2012</p>
*
*/
@AnnotationUsage(UsageTarget.MethodTarget, UsageModifier.One)
class NotImplemented {

  /**
   * Create a new instance of this class
   */
  construct() {

  }

}
