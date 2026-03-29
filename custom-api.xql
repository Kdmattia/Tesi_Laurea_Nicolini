xquery version "3.1";

(:~
 : This is the place to import your own XQuery modules for either: 
 :
 : 1. custom API request handling functions
 : 2. custom templating functions to be called from one of the HTML templates
:)
module namespace custom="http://teipublisher.com/api/custom";

declare namespace api="https://tei-publisher.com/xquery/api";
declare namespace tei="http://www.tei-c.org/ns/1.0";

declare namespace rest = "http://exquery.org/ns/restxq";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

(: Add your own module imports here :)

import module namespace rutil="http://e-editiones.org/roaster/util";
import module namespace xmldb = "http://exist-db.org/xquery/xmldb";
import module namespace util = "http://exist-db.org/xquery/util"; 

import module namespace config="http://www.tei-c.org/tei-simple/config" at "config.xqm";

import module namespace antlr="http://exist-db.org/xquery/antlr";

(:~
 : Keep this. This function does the actual lookup in the imported modules.
:)
 
declare function api:lookup($name as xs:string, $arity as xs:integer) {
    try {
        function-lookup(xs:QName($name), $arity)
    } catch * {
        ()
    }
};

declare
  %rest:GET
  %rest:path("/api/dsls")
  %output:method("json")
function custom:get-dsls($request as map(*)) {

  let $dslDir := "/db/apps/tei-publisher/data/dsls"

  let $dsls :=
    for $file in xmldb:get-child-resources($dslDir)
    let $doc := doc($dslDir || "/" || $file)
    return map {
      "id": replace($file, "\.xml$", ""),
      "name": normalize-space($doc/dsl/name/string()),
      "grammar": string($doc/dsl/grammar)
    }

  return array { $dsls }
};



declare
  %rest:POST
  %rest:path("/api/dsls")
  %output:method("json")
function custom:create-dsl($request as map(*)) {

  let $body := $request?body

  let $id := $body?id
  let $name := $body?name
  let $grammar := $body?grammar

  let $dslDoc :=
    <dsl>
        <id>{$id}</id>
        <name>{$name}</name>
        <grammar>{$grammar}</grammar>
    </dsl>

  let $_ :=
    xmldb:store(
      "/db/apps/tei-publisher/data/dsls",
      $id || ".xml",
      $dslDoc
    )
    
    let $generation :=
    try {
      antlr:generate($grammar, $id)
    } catch * {
      error(QName("", "DSLGenerationError"),
            $err:description)
    }
    
  return(
    map {
      "status": "ok",
      "id": $id
    }
  )
};


declare
  %rest:GET
  %rest:path("/api/dsls/{id}")
  %output:method("json")
function custom:get-dsl-by-id($request as map(*)) {

  let $id := $request?parameters?id

  let $doc :=
    doc("/db/apps/tei-publisher/data/dsls/" || $id || ".xml")

  return map {
    "id": $id,
    "name": normalize-space($doc/dsl/name/string()),
    "grammar": string($doc/dsl/grammar)
  }
};


