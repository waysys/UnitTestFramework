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

uses java.util.ArrayList

/**
*
*   This class produces a CSV file.
*
*   <p>@author William A. Shaffer</p>
*   <p>@version 11-Oct-2013</p>
*
*/
class CsvWriter extends FileHandler
{
//------------------------------------------------------------------------------
//      Fields
//------------------------------------------------------------------------------

  private var _delimiter  : String
  private var _row        : ArrayList
  private var _quote      : String
  private var _rw         : int
  
  protected var headings : String[] 
  
//------------------------------------------------------------------------------
//      Constructors
//------------------------------------------------------------------------------
  
  construct()
  {
    super()
    _delimiter  = ","
    _row        = new ArrayList()
    _quote      = "\""
    _rw         = 1
    headings    = {}
  }
  
//------------------------------------------------------------------------------
//      Properties
//------------------------------------------------------------------------------

  /** file name of the report
  */
  override property set FileName(value : String) : void
  {
    check(value != null, "The CSV file name cannot be null")
    check(value.length > 0, "The CSV file name cannot be an empty string")
    super.FileName = value + ".csv"
    return
  }
  
  /**
  * The field delimiter.  This delimiter is the character that
  * separates cells on a line.  This is usually a comma.
  * 
  */
  property set Delimiter(value : String) : void
  {
     check(value != null    , "Delimiter cannot be null"                  )
     check(value.length == 1, "Delimiter value must be a single character: " + value)
     _delimiter = value
     return 
  }
  
  property get Delimiter() : String
  {
    return _delimiter
  }

//------------------------------------------------------------------------------
//      Cell operations
//------------------------------------------------------------------------------

  /**
  * Add a cell to a row.  
  *
  * 
  */
  @Param( "content", "the content of the cell")
  @Param( "addQuotes", "true if quote marks should surround content")
  function addCell(content : String, addQuotes : boolean) : void
  {
     var value = content
     if (addQuotes) value = _quote + value + _quote
     _row.add(value)
     return
  }
  
  /**
  * Write the row to the file.  Separate cells with a delimiter and 
  * add a line feed at the end of the line.
  */
  function writeRow()
  {
    var count = 0
    for(cell in _row)
    {
      if (count > 0) write(Delimiter)
      write(cell as String)
      count = count + 1
    }
    write("\n")
    File.flush()
    _row.clear()
    _rw = _rw + 1
    return
  }
  
//------------------------------------------------------------------------------
//      CSV operations
//------------------------------------------------------------------------------ 

  /**
  * Build the heading in the CSV file.
  *
  */
  function suiteHeader() : void
  {
    _rw = 1
    writeRow(headings)
    return
  }
  
  /**
  * Write a row to the CSV file
  *
  * 
  */
  @Param( "aRow", "a row to be written to the CSV file")
  function writeRow(aRow : String[]) : void
  {
    if (IsOpen)
    {
      var putQuotes : boolean
      for (cell in aRow)
      {
        if (cell == null) cell = ""
        if (cell.startsWith( "=")) putQuotes = false
        else                       putQuotes = true
        addCell( cell, putQuotes )
      }
      writeRow()
    }
    return   
  }
  
}
