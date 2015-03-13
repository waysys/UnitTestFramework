//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2014 Waysys, LLC. All Rights Reserved.
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

uses java.util.Iterator
uses java.io.File
uses unittestcase.AssertException

/**
 * This class is the parent class for input processors that read a row at a time.
 *
 *   <p>@author William A. Shaffer</p>
 *   <p>@version 26-Apr-2014</p>
 */
public abstract class FileProcessor implements Iterator<String[]> {

  //------------------------------------------------------------------------------
  //      Field
  //------------------------------------------------------------------------------

  private var aFileName : String

  private static final var EXCEL_EXTENSIONS = {"xlsx", "xlsm"  }
  private static final var CSV_EXTENSION = "csv"

  //------------------------------------------------------------------------------
  //      Constructor
  //------------------------------------------------------------------------------

  /**
   * Create an instance of this class
   */
  @Param("fileName", "Name of the file to read.  File must exist")
  construct(fileName : String) {
    if (not fileExists(fileName)) {
      throw new AssertException("File not found: " + fileName)
    }
    aFileName = fileName
  }

  //------------------------------------------------------------------------------
  //      Functions
  //------------------------------------------------------------------------------

  /**
   * Remove the row.  This function is not implemented.
   */
  @Throws(AssertException, "if called")
  override public function remove() : void {
    throw new AssertException("remove() function not implemented")
  }

  /**
   * Close the file
   */
  public abstract function close() : void;

  //------------------------------------------------------------------------------
  //      Support Functions
  //------------------------------------------------------------------------------

  /**
   * Return true if file exists.
   *
   */
  @Param("name", "the name of the file")
  @Returns("true if the file exists")
  public static function fileExists(name : String) : boolean
  {
    var aFile = new File(name)
    var result = aFile.exists() and aFile.canRead()
    aFile = null
    return result
  }

  /**
  *   Return the file processor appropriate to the file
  */
  @Param("name", "the name of the file")
  @Param("sheet", "the name of the spreadsheet")
  @Returns("The appropriate file processor")
  public static function getFileProcessor(name : String, sheet : String) : FileProcessor {
       var processor : FileProcessor = null
       if (isExcelFile(name)) {
          if (sheet.length() > 0) {
             processor = new XlsProcessor(name, sheet)
          }
          else {
            processor = new XlsProcessor(name)
          }
       } else {
         processor =  new CSVProcessor(name)
       }
       return processor
  }

  /**
  *   Return true if the file is an Excel file
  */
  @Param("name", "the name of the file")
  @Returns("true if the file is an Excel file")
  public static function isExcelFile(name : String) : boolean {
    var aFile = new File(name)
    var extension = aFile.Extension.toLowerCase()
    for (value in EXCEL_EXTENSIONS) {
      if (extension == value) return true
    }
    if (extension != CSV_EXTENSION)  {
       throw new AssertException("File type is unknown - " + name)
    }
    return false
  }
}