import {
  createPatternMatchers,
  argumentMatcher,
  prefixedMatcher,
} from "../util/nodeMatchers";
import { NodeMatcherAlternative, ScopeType } from "../typings/Types";

// Generated by the following command:
// > curl https://raw.githubusercontent.com/tree-sitter/tree-sitter-java/master/src/node-types.json | jq '[.[] | select(.type == "statement" or .type == "declaration") | .subtypes[].type]'
const STATEMENT_TYPES = [
  "annotation_type_declaration",
  "class_declaration",
  "enum_declaration",
  "import_declaration",
  "interface_declaration",
  "module_declaration",
  "package_declaration",
  //   ";",
  "assert_statement",
  "block",
  "break_statement",
  "continue_statement",
  "declaration",
  "do_statement",
  "enhanced_for_statement",
  "expression_statement",
  "for_statement",
  "if_statement",
  "labeled_statement",
  "local_variable_declaration",
  "return_statement",
  "switch_expression",
  "synchronized_statement",
  "throw_statement",
  "try_statement",
  "try_with_resources_statement",
  "while_statement",
  "yield_statement",
];

const nodeMatchers: Partial<Record<ScopeType, NodeMatcherAlternative>> = {
  statement: STATEMENT_TYPES,
  class: "class_declaration",
  className: "class_declaration[name]",
  ifStatement: "if_statement",
  string: "string_literal",
  comment: "comment",
  anonymousFunction: "lambda_expression",
  list: "array_initializer",
  functionCall: "method_invocation",
  map: "block",
  name: ["*[declarator][name]", "*[name]", "formal_parameter.identifier!"],
  namedFunction: ["method_declaration", "constructor_declaration"],
  type: [
    "type_identifier",
    "local_variable_declaration[type]",
    "array_creation_expression[type]",
    "formal_parameter[type]",
    "method_declaration[type]",
  ],
  functionName: [
    "method_declaration.identifier!",
    "constructor_declaration.identifier!",
  ],
  value: prefixedMatcher("*[declarator][value]", "*[value]"),
  collectionItem: argumentMatcher("array_initializer"),
  argumentOrParameter: argumentMatcher("formal_parameters", "argument_list"),
};

export default createPatternMatchers(nodeMatchers);
