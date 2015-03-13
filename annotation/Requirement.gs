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
* <p>@Version 22-Apr-2012</p>
*
*/
@AnnotationUsage(UsageTarget.MethodTarget, UsageModifier.Many)
class Requirement {

  private var _reqId : String as ReqId
  
  private var _reqName : String as ReqName

  @Param("rqId", "the identifier if the requirement")
  construct(rqId : String, rqName : String) {
    if (rqId   == null) rqId = ""
    if (rqName == null) rqName = ""
    _reqId   = rqId
    _reqName = rqName
  }

}
