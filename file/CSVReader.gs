//------------------------------------------------------------------------------
//   Compilation Unit Header
//------------------------------------------------------------------------------
//
// Copyright (c) 2020 Waysys LLC. All Rights Reserved.
//
//------------------------------------------------------------------------------
//   Package Declaration
//------------------------------------------------------------------------------

package unittestcase.file


uses unittestcase.AssertException

uses java.io.BufferedReader
uses java.io.FileReader


/**
 * This class processes a CSV file according to RFC 4180.
 * <p>
 * <p>@Author W. Shaffer</p>
 * <p>@Version 8/14/2020</p>
 */
class CSVReader {

//-----------------------------------------------------------------------------
//  Fields
//-----------------------------------------------------------------------------

  private var lexer : Lex

  private var fields : List<String>
  private var field : String
  private var line : int
  private var prior : Token
  private var allRead : boolean as AllRead

//-----------------------------------------------------------------------------
//  Constructor
//-----------------------------------------------------------------------------

  construct(reader : FileReader) {
    assert reader != null : "File reader must not be null"
    lexer = new Lex(reader)
    fields = new ArrayList<String>()
    line = 1
    prior = null
    allRead = false
  }

//-----------------------------------------------------------------------------
//  Properties
//----------------------------------------------------------------------------- 


//-----------------------------------------------------------------------------
//  Public Functions
//-----------------------------------------------------------------------------

  /**
   * Close the file reader
   */
  function close() {
    lexer.close()
    return
  }

  /**
   * Read the next line of the CSV file.  Return an array of strings.
   */
  @Returns("The fields from the next line in the file")
  function readNext() : String[] {
    fields = new ArrayList<String>()
    if (not allRead) {
      // If the end of file has not been encountered, process the next line
      processLine()
    }
    return fields.toTypedArray()
  }

//-----------------------------------------------------------------------------
//  Support Functions
//-----------------------------------------------------------------------------

  /**
   * Fetch a token.  If the prior token is not null, return it.  Otherwise,
   * read the next token from the lexer.
   */
  @Returns("The next token in the stream")
  private function fetchToken() : Token {
    var token : Token = null
    if (prior == null) {
      token = lexer.next()
    } else {
      token = prior
      prior = null
    }
    return token
  }

  /**
   * Set the prior token to the specified value, so that it is returned on the
   * next call to fetchToken.
   */
  @Param("token", "A token from the lexer")
  private function push(token : Token) {
    prior = token
    return
  }

  /**
   * Process a line in the CSV file
   */
  private function processLine() {
    field = ""
    var cont = true
    while (cont) {
      var token = fetchToken()
      switch (token) {
        case EOF:
          cont = false
          if (fields.Count > 0 or field.size > 0) {
            fields.add(field)
          }
          allRead = true
          break
        case CR:
          break
        case LF:
          if (fields.Count > 0 or field.size > 0) {
            fields.add(field)
          }
          line++
          cont = false
          break
        case TEXTDATA:
          field = field + token.Chr
          break
        case COMMA:
          fields.add(field)
          field = ""
          break
        case DQUOTE:
          if (not field.Empty) {
            processError("Double quote in middle of unescaped field")
          } else {
            processEscapedField()
          }
          break
        default:
          assert false : "Unhandled token: " + token
      }
    }
    return
  }

  /**
   * Process an escaped field.  An escaped field is on surrounded by double quotes.
   */
  @Returns("A field ")
  private function processEscapedField()  {
    field = ""
    var cont = true
    while (cont) {
      var token = fetchToken()
      switch (token) {
        case EOF:
          processError("End of file encountered before closing quote for a field")
          break
        case CR:
        case TEXTDATA:
        case LF:
        case COMMA:
          field += token.Chr
          break
        case DQUOTE:
          cont = processDquote()
          break
        default:
          assert false : "Unhandled token: " + token
      }
    }
    return
  }

  /**
   * Process an error
   */
  @Param("message", "the error message")
  private function processError(message : String) {
    var mess = "At line " + line + ": "
    mess += message
    throw new AssertException(mess)
  }

  /**
   * Process a double quote in an escaped field.
   */
  @Returns("True if this is two double quotes and processing the field should continue, else false")
  private function processDquote() : boolean {
    var cont = false
    var token = fetchToken()
    switch (token) {
      case EOF:
      case CR:
      case LF:
      case COMMA:
        push(token)
        break
      case TEXTDATA:
        processError("Text after single quote in escapped field")
        break
      case DQUOTE:
        field += token.Chr
        cont = true
        break
      default:
        assert false : "Unhandled token: " + token
    }
    return cont
  }

//-----------------------------------------------------------------------------
//  Lexical Analyzer
//-----------------------------------------------------------------------------

  /**
   * This class reads a character at a time and returns a token identifying the
   * type of character and the character itself.
   */
  class Lex {

    private var _reader : BufferedReader

    construct(reader : FileReader) {
      _reader = new BufferedReader(reader)
    }

    /**
     * Close the lexer
     */
    function close() {
      _reader.close()
    }

    /**
     * Read the next character and categorize it
     */
    function next() : Token {
      var data = _reader.read()
      var token : Token = null
      if (data == -1) {
        token = Token.EOF
        token.Chr = null
      } else {
        var chr = Character.toChars(data)[0]
        switch (chr) {
          case ',':
            token = Token.COMMA
            break
          case '"':
            token = Token.DQUOTE
            break
          case '\r':
            token = Token.CR
            break
          case '\n':
            token = Token.LF
            break
          default:
            token = Token.TEXTDATA
        }
        token.Chr = chr
      }
      return token
    }

  }

//-----------------------------------------------------------------------------
//  Token Enumeraction
//-----------------------------------------------------------------------------

  /**
   * This enumeration represents a character in the CSV file.
   */
  enum Token {
    COMMA,
    CR,
    LF,
    CRLF,
    DQUOTE,
    TEXTDATA,
    EOF

    static var chr : String as Chr
  }
}