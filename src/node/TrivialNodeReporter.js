jasmine.TrivialNodeReporter = function(sys) {

  var ansi = {
    green: '\033[32m',
    red: '\033[31m',
    yellow: '\033[33m',
    none: '\033[0m'
  };
  
  var defaultColumnsPerLine = 50;
  
  function coloredStr(color, str) { return ansi[color] + str + ansi.none; }
  
  function greenStr(str)  { return coloredStr("green", str); }
  function redStr(str)    { return coloredStr("red", str); }
  function yellowStr(str) { return coloredStr("yellow", str); }
  
  function newline()    { sys.print("\n"); }
  function started()    { sys.print("Started"); newline(); }
  function greenDot()   { sys.print(greenStr(".")); }
  function redF()       { sys.print(redStr("F")); }
  function yellowStar() { sys.print(yellowStr("*")); }
  
  
  
  
  function lineEnder(columnsPerLine) {
    var columnsSoFar = 0;
    return function() {
      columnsSoFar += 1;
      if (columnsSoFar == columnsPerLine) {
        newline();
        columnsSoFar = 0;
      }
    };
  }
  
  var startNewLineIfNecessary = lineEnder(defaultColumnsPerLine);
  
  this.reportRunnerStarting = function() {
    started();
  };
  
  this.reportSpecResults = function(spec) {
    var results = spec.results();
    if (results.skipped) {
      yellowStar();
    } else if (results.passed()) {
      greenDot();
    } else {
      redF();
    } 
    startNewLineIfNecessary();   
  };
};