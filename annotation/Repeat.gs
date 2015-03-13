//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2012, 2014 Waysys, LLC. All Rights Reserved.
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
// 27-Apr-2014         Added sheet                      WAS
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.annotation

uses gw.lang.annotation.AnnotationUsage
uses gw.lang.annotation.UsageTarget
uses gw.lang.annotation.UsageModifier

/**
* This annotation is used to specify the CSV or Excel file for repeating
* a test method.
*
* <p>@Author W. Shaffer</p>
* <p>@Version 27-Apr-2014</p>
*
*/
@AnnotationUsage(UsageTarget.MethodTarget, UsageModifier.One)
class Repeat implements IAnnotation {

  /**
   * Identifiers for this annotation
   */
   protected var _filename : String as Filename

  construct(filenm : String) {
     _filename = filenm
  }

}
