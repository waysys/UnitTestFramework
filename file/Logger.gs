//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2010 Waysys, LLC. All Rights Reserved.
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

package unittestcase.file

uses gw.api.system.PLLoggerCategory

/**
 *
 *   This class wraps the logging classes to provide an interface similar to prior ones.
 *
 *   @author William A. Shaffer
 *   @version 21-Mar-2015
 *
 *   Date of Revision      Description                         Author    Defect Number
 *   ----------------      ----------------------------------  --------  -------------
 *   21-Mar-2015           File created                        WAS
 */
class Logger {
  //------------------------------------------------------------------------------
  //      Fields
  //------------------------------------------------------------------------------

  private static var _logger = PLLoggerCategory.API

  //------------------------------------------------------------------------------
  //      Constructor
  //------------------------------------------------------------------------------

  /**
   * Construct a new policy data store. Since the policy is at the top of hierarchy,
   * clear the registry.
   */
  private construct()
  {

  }

  //------------------------------------------------------------------------------
  //      Operations
  //------------------------------------------------------------------------------

  /**
  *   Log information messages
  */
  @Param("message", "the message to be logged")
  public static function logInfo(message : String) : void {
     _logger.info(message)
    return
  }

  /**
  *  Log error messages
  */
   @Param("message", "the message to be logged")
   public static function logError(message : String) : void {
     _logger.error(message)
     return
   }

   /**
   *  Log a debug message
   */
   @Param("message", "the message to be logged")
   public static function logDebug(message : String) : void {
     _logger.debug(message)
     return
   }
}