//------------------------------------------------------------------------------
//      Compilation Unit Header
//------------------------------------------------------------------------------
//
//
//  Copyright (c) 2008, 2014 Waysys, LLC. All Rights Reserved.
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
//     Modifications
//------------------------------------------------------------------------------
//
//  Date         Author     Modificatioin
//  ------------ ---------  ------------------------------------------------------
//  26-Apr-2014  W. Shaffer Made subclass of FileProcessor
//
//
//------------------------------------------------------------------------------
//      Package Declaration
//------------------------------------------------------------------------------

package unittestcase.file

uses java.io.FileReader
uses unittestcase.AssertException

/**
*
*   This class reads CSV file.
*
*   <p>@author William A. Shaffer</p>
*   <p>@version 26-Apr-2014</p>
*
*/
class CSVProcessor extends FileProcessor {

//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

  var  builder : CSVReader
  var  values  : String[]
  
//------------------------------------------------------------------------------
//      Constructor
//------------------------------------------------------------------------------

  /**
   * Create an instance of this class
   */
  @Param("fileName", "Name of the CSV file to read.  File must exist")
  construct(fileName : String) {
     super(fileName)
     var reader = new FileReader(fileName)
     builder = new CSVReader(reader)
     values = new String[] {}
  }

//------------------------------------------------------------------------------
//      Functions
//------------------------------------------------------------------------------

  /**
   * Return true if there is another row
   */
   @Returns("true if there is another row to read")
   override public function hasNext() : boolean {
     if (builder == null) {
       throw new AssertException("Cannot access file after it is closed")
     }
     values = builder.readNext()
     return values.Count > 0
   }

  /**
   * Return the next row
   */
   @Returns("an array of strings for the current rows")
   @Throws(AssertException, "if attempting to read a reow that does not exist")
   override public function next() : String[] {
     if (values.Count == 0) {
       throw new AssertException("Cannot read past last row")
     }
     return values
   }

  /**
   * Close the file
   */
   override public function close() : void {
     builder.close()
     builder = null
     values = new String[] {}
     return
   }

}
