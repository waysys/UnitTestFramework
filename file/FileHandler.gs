//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2008 Waysys, LLC. All Rights Reserved.
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

package unittestcase.file

uses gw.api.util.Logger

uses java.io.FileWriter
uses java.lang.Throwable

/**
*
*   This is a superclass for output files 
*
*   <p>@author William A. Shaffer</p>
*   <p>@version 21-Apr-2012</p>
*
*/
class FileHandler 
{

//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------
  
  private var _fileWriter : FileWriter
  private var _fileName   : String
  
//------------------------------------------------------------------------------
//      Constructors
//------------------------------------------------------------------------------
  
  construct() 
  {
    _fileWriter = null
    _fileName   = null
  }
  
//------------------------------------------------------------------------------
//      Properties
//------------------------------------------------------------------------------

  /**
  * Set the file writer for reporting
  * 
  * @Param value the value of the file writer
  */
  property set File(value : FileWriter)
  {
    _fileWriter = value
  }
  
  /**
  * Return the value of the file writer for the report
  ^
  * @Returns the file writer for the report
  */
  property get File() : FileWriter
  {
    return _fileWriter 
  }
  
  /** Set the file name of the report
  *
  * @Param value the name of the report file (including directories)
  */
  property set FileName(value : String) :void
  {
    check(value <> null   , "The report file name cannot be null")
    check(value.length > 0, "The report file name cannot be an empty string")
    _fileName = value 
    return
  }
  
  /**
  * Return the name of the report file (including all necessary directories)
  *
  * @Returns a string with the name of the report file
  */
  property get FileName() : String
  {
     return _fileName 
  }

  /**
   * Return true if the file is open.
   * 
   * @Return true if the file is open
   */ 
   property get IsOpen() : boolean
   {
     return File <> null
   }
   
//------------------------------------------------------------------------------
//      File operations
//------------------------------------------------------------------------------

  /**
  * Open the report file.
  *
  * @Exception thrown if file cannot be opened
  *
  */
  function open() : void
  {
    check(_fileName <> null, "File name cannot be null")
    close()
    
    //
    // Open report file
    //
    try
    {
        //The file is opened in append mode if it exists
        File = new FileWriter(FileName, true)
    }
    catch (e : Throwable)
    {
        var message = "Unable to open file name: " + FileName + " because: " + e.Message
        print(message)
        Logger.logError(message)
        Logger.logError(e.Message)
        throw "Unable to open file name: " + FileName
    }
    return
  }
  
  /**
  * Close the report file if it has been opened.
  *
  */
  function close() : void
  {
     if (File <> null)  
     {
       File.flush()
       File.close() 
       File = null  
     }
     return
  }

  /**
  * Write text to the report file
  *
  * @Param text a set of characters to write to the report file
  */
  function write(text : String) : void
  {
    check(text <> null, "Text for a file cannot be null")
    check(IsOpen      , "The file cannot be written to before it is opened: " + FileName)
    try
    {
      File.write(text)
    }
    catch (e : Throwable)
    {
      throw "Error writing to file: " + FileName + " caused by\n" + e.getMessage()
    }
    return
  }
  
  /**
  * Write a line to the report file.  A line feed is added to the end of the text.  The buffer
  * is flushed after the write.
  *
  * @Param text a line of text (without the line feed)
  */
  function writeln(text : String) : void
  {
     write(text)
     write("\r\n")
     File.flush()
     return 
  }
  
  /**
  * Delete the report file
  */
  function delete() : void
  {
    try
    {
      close()
      var aFile = new java.io.File(FileName) 
      if (aFile.exists()) 
      {
         aFile.delete() 
      }
    }
    catch (e : Throwable)
    {
      // ignore any exceptions
    }
    return
  }

  /**
   * Return true if the report file exists
   * 
   */
  public function fileExists() : boolean
  {
    var aFile = new java.io.File(FileName) 
    return aFile.exists()
  }
      
//------------------------------------------------------------------------------
//      Support functions
//------------------------------------------------------------------------------

  /**
  * Throws an exception if if result is not true.
  *
  * @Param result a value that is either true or false
  */
  static function check(result : boolean, message : String) : void
  {
    if (not result)
    {
       throw "Assertion Error: " +  message
    }
    return
  }
}
