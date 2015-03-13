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
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase

uses gw.xml.ws.annotation.WsiExportable

/**
* This class is used to transfer data for the RunTest web service
*
* <p>@Author W. Shaffer</p>
* <p>@Version 18-Dec-2011</p>
*
*/
@WsiExportable
final public class TestCaseResult {
  
//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

  /** error number indicating an error.  Return 0 if no error */
  public var errorNum : int
  /** error message.  Empty string if no error.  Never null */
  public var errorMessage : String   
  /** tests succeeded */
  public var succeeded : int
  /** tests failed */
  public var failed : int
  /** test errors */
  public var errors : int

//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

  construct() {
    errorNum     = 0
    errorMessage = ""  
    succeeded    = 0
    failed       = 0
    errors       = 0  
  }
}
