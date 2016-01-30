'use strict';

angular.module('myApp.cvForm', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cvForm', {
        templateUrl: 'cvForm/cvForm.html',
        controller: 'CvFormCtrl'
    });

}])


.controller('CvFormCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
        $scope.state = 0;
        $scope.levelTypes = [
            {id: '1', name: 'Knowledge'},
            {id: '2', name: 'Experience'},
            {id: '3', name: 'Deep'},
            {id: '4', name: 'Expert'}];
        $scope.yearOfExperienceTypes = [
            {id: '1', name: '1-2'},
            {id: '2', name: '3-5'},
            {id: '3', name: '6-10'},
            {id: '4', name: '10+'}];
        $scope.tabSelected = "#step1";

        $scope.newCandidat = {
            "name": "Dupont",
            "firstname": "Pierre",
            "city": "Fribourg",
            "npa": "1700",
            "birthdate": "2014-02-20",
            "address": "21 avenue du moleson",
            "skills": [{
                "name": "Java_(programming_language)",
                "level": "4",
                "yearOfExperience": "2"
            }, {
                "name": "C_(programming_language)",
                "level": "3",
                "yearOfExperience": "3"
            }, {
                "name": "PHP",
                "level": "1",
                "yearOfExperience": "1"
            }
            ],
            "jobs": [{
                "position": "Programmer junior",
                "employer": "Mr. X",
                "start": "000",
                "end": "001",
                "description": "Cool",
                "npa": "1700",
                "city": "Fribourg"
            }, {
                "position": "Programmer",
                "employer": "Mr. X",
                "start": "000",
                "end": "001",
                "description": "Cool",
                "npa": "1700",
                "city": "Fribourg"
            }],
            "schools": [{
                "title": "Bachelor of Science in computer science",
                "school": "HEIA-FR",
                "start": "000",
                "end": "001",
                "speciality": "Computer Science",
                "npa": "1700",
                "city": "Fribourg"
            }, {
                "title": "Master of Science in software engineering",
                "school": "HES-SO",
                "start": "000",
                "end": "001",
                "speciality": "Computer Science",
                "npa": "2000",
                "city": "Lausanne"
            }],
            "files": [{
                "name": "ElianeMaalouf.pdf",
                "id": "/Users/paulineboukhaled/git/TM_JobQuest/datasetupload/1453051864035_ElianeMaalouf.pdf"
            }, {
                "name": "ChristopheGalster.pdf",
                "id": "/Users/paulineboukhaled/git/TM_JobQuest/datasetupload/1453051911084_ChristopheGalster.pdf"
            }]
        };



        $scope.getLabels = function (label) {
            $http.get("http://localhost:8080/TM_JobQuest/api/?skill=" + label)
                .success(function (response) {
                    $scope.responseLabels = response;
                    $scope.getTags($scope.responseLabels);
                }
            );
        };

        $scope.deleteSkill = function (index) {
            console.log(index);
            delete $scope.newCandidat.skills.splice(index, 1);

        };

        $scope.addSkill = function (skill) {
            $scope.newCandidat.skills.push(angular.copy(skill));
            $scope.skillInit();
        };

        $scope.skillInit = function () {
            $scope.newSkill = {};
            $scope.newSkill.name = '';
            $scope.newSkill.level = '1';
            $scope.newSkill.yearOfExperience = '1';
        };


        $scope.schoolInit = function () {
            $scope.newSchool = {};
            $scope.newSchool.title = '';
            $scope.newSchool.school = '';
            $scope.newSchool.speciality = '';
            $scope.newSchool.start = '';
            $scope.newSchool.end = '';
            $scope.newSchool.npa = '';
            $scope.newSchool.city = '';
        };

        $scope.jobInit = function () {
            $scope.newJob = {};
            $scope.newJob.indexposition = '';
            $scope.newJob.employer = '';
            $scope.newJob.start = '';
            $scope.newJob.end = '';
            $scope.newJob.description = '';
            $scope.newJob.npa = '';
            $scope.newJob.city = '';
        };

        $scope.sendInformation = function () {
            $scope.state = 1;
            $http.post('http://localhost:8080/TM_JobQuest/api/user/getForm', $scope.newCandidat).success(function (data, status) {
                console.log(data);
                $scope.state = 2;
            })
        };

        $scope.onUpload = function (files) {
            console.log("onUpload");
            console.log(files);
        };

        $scope.onSuccess = function (response) {
            console.log("onSuccess");
            $scope.addFile(response.data);
            console.log(response);
        };

        $scope.onError = function (response) {
            console.log("onError");
            console.log(response);
        };

        $scope.onComplete = function (response) {
            console.log("onComplete");
            console.log(response);
        };

        $scope.deleteFile = function (index) {
            console.log("deleteFile");
            delete $scope.newCandidat.files.splice(index, 1);
        };

        $scope.addFile = function (file) {
            console.log("addFile");
            $scope.newCandidat.files.push(angular.copy(file));
        };

        $scope.tabChange = function(e){
            $scope.tabSelected = e;
            console.log($scope.tabSelected);

        };

        $scope.deleteJob = function (index) {
            console.log(index);
            delete $scope.newCandidat.jobs.splice(index, 1);

        };

        $scope.addJob = function (job) {
            console.log(job);
            $scope.newCandidat.jobs.push(angular.copy(job));
            $scope.jobInit();
        };

        $scope.deleteSchool = function (index) {
            console.log(index);
            delete $scope.newCandidat.schools.splice(index, 1);

        };

        $scope.addSchool = function (school) {
            console.log(school);
            $scope.newCandidat.schools.push(angular.copy(school));
            $scope.schoolInit();
        };


        $scope.skillDBPedia = [{"name":"Plankalk%C3%BCl","uri":"Plankalk%C3%BCl"},{"name":"XBasic","uri":"XBasic"},{"name":"Abstractsyntax","uri":"Abstract_syntax"},{"name":"Accent","uri":"Accent_(programming_language)"},{"name":"COWSEL","uri":"COWSEL"},{"name":"FLOW-MATIC","uri":"FLOW-MATIC"},{"name":"Metacharacter","uri":"Metacharacter"},{"name":"StandardML","uri":"Standard_ML"},{"name":"AgentSheets","uri":"AgentSheets"},{"name":"Basic4GL","uri":"Basic4GL"},{"name":"E(verificationlanguage)","uri":"E_(verification_language)"},{"name":"ExtensibleEmbeddableLanguage","uri":"Extensible_Embeddable_Language"},{"name":"Gemstone(database)","uri":"Gemstone_(database)"},{"name":"GluonJ","uri":"GluonJ"},{"name":"Helium(Haskell)","uri":"Helium_(Haskell)"},{"name":"ImpulseC","uri":"Impulse_C"},{"name":"JScheme","uri":"JScheme"},{"name":"KNITRO","uri":"KNITRO"},{"name":"Logtalk","uri":"Logtalk"},{"name":"RunBASIC","uri":"Run_BASIC"},{"name":"Ferite","uri":"Ferite"},{"name":"Fantom","uri":"Fantom_(programming_language)"},{"name":"GrGen","uri":"GrGen"},{"name":"MVEL","uri":"MVEL"},{"name":"Net.Data","uri":"Net.Data"},{"name":"PCASTL","uri":"PCASTL"},{"name":"PLEXIL","uri":"PLEXIL"},{"name":"Pnuts","uri":"Pnuts"},{"name":"QB64","uri":"QB64"},{"name":"Refal","uri":"Refal"},{"name":"Vvvv","uri":"Vvvv"},{"name":"XBLite","uri":"XBLite"},{"name":"XRuby","uri":"XRuby"},{"name":"Gosu","uri":"Gosu_(programming_language)"},{"name":"AtejiPX","uri":"Ateji_PX"},{"name":"Objeck","uri":"Objeck_(programming_language)"},{"name":"OptimJ","uri":"OptimJ"},{"name":"PowerLanguage","uri":"PowerLanguage"},{"name":"TradeSpaceVisualizer","uri":"Trade_Space_Visualizer"},{"name":"PONIE","uri":"PONIE"},{"name":"MacroML","uri":"MacroML"},{"name":"BBCBASIC","uri":"BBC_BASIC"},{"name":"C++","uri":"C++"},{"name":"Lua","uri":"Lua_(programming_language)"},{"name":"PowerBASIC","uri":"PowerBASIC"},{"name":"PureBasic","uri":"PureBasic"},{"name":"Self","uri":"Self_(programming_language)"},{"name":"LocomotiveBASIC","uri":"Locomotive_BASIC"},{"name":"MetaPost","uri":"MetaPost"},{"name":"SmallBASIC","uri":"SmallBASIC"},{"name":"ALGOL","uri":"ALGOL"},{"name":"AMOS","uri":"AMOS_(programming_language)"},{"name":"ANSIC","uri":"ANSI_C"},{"name":"APL","uri":"APL_(programming_language)"},{"name":"AWK","uri":"AWK"},{"name":"Ada","uri":"Ada_(programming_language)"},{"name":"Assemblylanguage","uri":"Assembly_language"},{"name":"BASIC","uri":"BASIC"},{"name":"BCPL","uri":"BCPL"},{"name":"B","uri":"B_(programming_language)"},{"name":"BlitzBASIC","uri":"Blitz_BASIC"},{"name":"Brainfuck","uri":"Brainfuck"},{"name":"CLU","uri":"CLU_(programming_language)"},{"name":"COBOL","uri":"COBOL"},{"name":"C","uri":"C_(programming_language)"},{"name":"CommonLisp","uri":"Common_Lisp"},{"name":"Coral66","uri":"Coral_66"},{"name":"Cyclone","uri":"Cyclone_(programming_language)"},{"name":"Dylan","uri":"Dylan_(programming_language)"},{"name":"Eiffel","uri":"Eiffel_(programming_language)"},{"name":"Erlang","uri":"Erlang_(programming_language)"},{"name":"Euphoria","uri":"Euphoria_(programming_language)"},{"name":"Forth","uri":"Forth_(programming_language)"},{"name":"Fortran","uri":"Fortran"},{"name":"Fourth-generationprogramminglanguage","uri":"Fourth-generation_programming_language"},{"name":"Godiva","uri":"Godiva_(programming_language)"},{"name":"Icon","uri":"Icon_(programming_language)"},{"name":"JavaScript","uri":"JavaScript"},{"name":"Java","uri":"Java_(programming_language)"},{"name":"KRL","uri":"KRL_(programming_language)"},{"name":"KentRecursiveCalculator","uri":"Kent_Recursive_Calculator"},{"name":"LiveScript","uri":"LiveScript"},{"name":"ML","uri":"ML_(programming_language)"},{"name":"MOO","uri":"MOO_(programming_language)"},{"name":"MUMPS","uri":"MUMPS"},{"name":"Mary","uri":"Mary_(programming_language)"},{"name":"Mercury","uri":"Mercury_(programming_language)"},{"name":"Mesa","uri":"Mesa_(programming_language)"},{"name":"Modula","uri":"Modula"},{"name":"Nial","uri":"Nial"},{"name":"Occam","uri":"Occam_(programming_language)"},{"name":"PL/I","uri":"PL/I"},{"name":"Pascal","uri":"Pascal_(programming_language)"},{"name":"Perl","uri":"Perl"},{"name":"PostScript","uri":"PostScript"},{"name":"Prolog","uri":"Prolog"},{"name":"QuakeC","uri":"QuakeC"},{"name":"SNOBOL","uri":"SNOBOL"},{"name":"SQL","uri":"SQL"},{"name":"Sather","uri":"Sather"},{"name":"Sed","uri":"Sed"},{"name":"Simula","uri":"Simula"},{"name":"Smalltalk","uri":"Smalltalk"},{"name":"Steelmanlanguagerequirements","uri":"Steelman_language_requirements"},{"name":"DataFlex","uri":"DataFlex"},{"name":"EasyLanguage","uri":"EasyLanguage"},{"name":"NesC","uri":"NesC"},{"name":"ProvideX","uri":"ProvideX"},{"name":"VilniusBASIC","uri":"Vilnius_BASIC"},{"name":"Joe-E","uri":"Joe-E"},{"name":"Script.NET","uri":"Script.NET"},{"name":"AngelScript","uri":"AngelScript"},{"name":"AgentSpeak","uri":"AgentSpeak"},{"name":"Hugo","uri":"Hugo_(programming_language)"},{"name":"SASL","uri":"SASL_(programming_language)"},{"name":"Newspeak","uri":"Newspeak_(programming_language)"},{"name":"Ypsilon(Schemeimplementation)","uri":"Ypsilon_(Scheme_implementation)"},{"name":"KonsolScript","uri":"KonsolScript"},{"name":"Brutus2D","uri":"Brutus2D"},{"name":"ConcurrentEuclid","uri":"Concurrent_Euclid"},{"name":"G-code","uri":"G-code"},{"name":"COMIT","uri":"COMIT"},{"name":"CompatibilityofCandC++","uri":"Compatibility_of_C_and_C++"},{"name":"SPARQL","uri":"SPARQL"},{"name":"PLEX","uri":"PLEX_(programming_language)"},{"name":"SK8","uri":"SK8"},{"name":"Tulip(pythonproject)","uri":"Tulip_(python_project)"},{"name":"Cayenne","uri":"Cayenne_(programming_language)"},{"name":"F","uri":"F_(programming_language)"},{"name":"Joperator","uri":"J_operator"},{"name":"Lucid","uri":"Lucid_(programming_language)"},{"name":"NotQuiteC","uri":"Not_Quite_C"},{"name":"Sass(stylesheetlanguage)","uri":"Sass_(stylesheet_language)"},{"name":"Servant(CORBA)","uri":"Servant_(CORBA)"},{"name":"G%C3%B6del","uri":"G%C3%B6del_(programming_language)"},{"name":"Fabrik(software)","uri":"Fabrik_(software)"},{"name":"RTL/2","uri":"RTL/2"},{"name":"Compilerconstruction","uri":"Compiler_construction"},{"name":"*Lisp","uri":"*Lisp"},{"name":"Pacbase","uri":"Pacbase"},{"name":"Symbolicprogramming","uri":"Symbolic_programming"},{"name":"BusinessIntelligenceMarkupLanguage","uri":"Business_Intelligence_Markup_Language"},{"name":"JavaServerPages","uri":"JavaServer_Pages"},{"name":"Lisp","uri":"Lisp_(programming_language)"},{"name":"Logo","uri":"Logo_(programming_language)"},{"name":"MATLAB","uri":"MATLAB"},{"name":"MOSTechnology6502","uri":"MOS_Technology_6502"},{"name":"Motorola6809","uri":"Motorola_6809"},{"name":"OCaml","uri":"OCaml"},{"name":"Oberon","uri":"Oberon_(programming_language)"},{"name":"PDP-8","uri":"PDP-8"},{"name":"PHP","uri":"PHP"},{"name":"Python","uri":"Python_(programming_language)"},{"name":"Rebol","uri":"Rebol"},{"name":"Ruby","uri":"Ruby_(programming_language)"},{"name":"ScalableVectorGraphics","uri":"Scalable_Vector_Graphics"},{"name":"Scheme","uri":"Scheme_(programming_language)"},{"name":"Shellscript","uri":"Shell_script"},{"name":"TrueBASIC","uri":"True_BASIC"},{"name":"VHDL","uri":"VHDL"},{"name":"XML","uri":"XML"},{"name":"XSLT","uri":"XSLT"},{"name":"Compiledlanguage","uri":"Compiled_language"},{"name":"AspectJ","uri":"AspectJ"},{"name":"Joinpoint","uri":"Join_point"},{"name":"IBMRPGII","uri":"IBM_RPG_II"},{"name":"A++","uri":"A++"},{"name":"SuperPascal","uri":"SuperPascal"},{"name":"Aldor","uri":"Aldor"},{"name":"NESL","uri":"NESL"},{"name":"Pidgincode","uri":"Pidgin_code"},{"name":"ECLR-attributedgrammar","uri":"ECLR-attributed_grammar"},{"name":"WLanguage","uri":"WLanguage"},{"name":"SWLPC","uri":"SWLPC"},{"name":"Cprocesscontrol","uri":"C_process_control"},{"name":"ColorBASIC","uri":"Color_BASIC"},{"name":"Intrinsicfunction","uri":"Intrinsic_function"},{"name":"JavaPersistenceQueryLanguage","uri":"Java_Persistence_Query_Language"},{"name":"MacOSRuntimeforJava","uri":"Mac_OS_Runtime_for_Java"},{"name":"RubyJS","uri":"RubyJS"},{"name":"MicrodataCorporation","uri":"Microdata_Corporation"},{"name":"Cybil","uri":"Cybil_(programming_language)"},{"name":"XeroxEscapeSequence","uri":"Xerox_Escape_Sequence"},{"name":"DATATRIEVE","uri":"DATATRIEVE"},{"name":"LR-attributedgrammar","uri":"LR-attributed_grammar"},{"name":"PL-6","uri":"PL-6"},{"name":"TorqueScript","uri":"TorqueScript"},{"name":"ANSI/ISOCSpecificationLanguage","uri":"ANSI/ISO_C_Specification_Language"},{"name":"AdvancedContinuousSimulationLanguage","uri":"Advanced_Continuous_Simulation_Language"},{"name":"Alef","uri":"Alef_(programming_language)"},{"name":"Atom","uri":"Atom_(programming_language)"},{"name":"Brooks","uri":"Brooks_(programming_language)"},{"name":"CHILL","uri":"CHILL"},{"name":"COLA(softwarearchitecture)","uri":"COLA_(software_architecture)"},{"name":"DIGITALCommandLanguage","uri":"DIGITAL_Command_Language"},{"name":"Datapoint\u0027sAdvancedSystemsLanguage","uri":"Datapoint\u0027s_Advanced_Systems_Language"},{"name":"Draco","uri":"Draco_(programming_language)"},{"name":"Haxe","uri":"Haxe"},{"name":"LISA(LanguageforInstructionSetArchitecture)","uri":"LISA_(Language_for_Instruction_Set_Architecture)"},{"name":"MetaL","uri":"MetaL_(programming_language)"},{"name":"OpenProgrammingLanguage","uri":"Open_Programming_Language"},{"name":"PL/P","uri":"PL/P"},{"name":"S3","uri":"S3_(programming_language)"},{"name":"TMG(language)","uri":"TMG_(language)"},{"name":"Ur","uri":"Ur_(programming_language)"},{"name":"WebMethodsFlow","uri":"WebMethods_Flow"},{"name":"A-normalform","uri":"A-normal_form"},{"name":"FP","uri":"FP_(programming_language)"},{"name":"JScript","uri":"JScript"},{"name":"LanguageforSystemsDevelopment","uri":"Language_for_Systems_Development"},{"name":"XC","uri":"XC_(programming_language)"},{"name":"AMBIT","uri":"AMBIT"},{"name":"Asymptote(vectorgraphicslanguage)","uri":"Asymptote_(vector_graphics_language)"},{"name":"Elm","uri":"Elm_(programming_language)"},{"name":"A+","uri":"A+_(programming_language)"},{"name":"AbstractStateMachineLanguage","uri":"Abstract_State_Machine_Language"},{"name":"Hopscotch","uri":"Hopscotch_(programming_language)"},{"name":"Itk","uri":"Itk"},{"name":"Kojo","uri":"Kojo_(programming_language)"},{"name":"Orc","uri":"Orc_(programming_language)"},{"name":"ExtensibleApplicationMarkupLanguage","uri":"Extensible_Application_Markup_Language"},{"name":"ObjectPascal","uri":"Object_Pascal"},{"name":"Croma","uri":"Croma"},{"name":"Deesel","uri":"Deesel"},{"name":"BasicForQt","uri":"Basic_For_Qt"},{"name":"Babelfy","uri":"Babelfy"},{"name":"Discriminator","uri":"Discriminator"},{"name":"ALGOL60","uri":"ALGOL_60"},{"name":"C*","uri":"C*"},{"name":"C--","uri":"C--"},{"name":"COMAL","uri":"COMAL"},{"name":"CPL","uri":"CPL_(programming_language)"},{"name":"CSharp","uri":"C_Sharp_(programming_language)"},{"name":"CadenceSKILL","uri":"Cadence_SKILL"},{"name":"Clojure","uri":"Clojure"},{"name":"CoffeeScript","uri":"CoffeeScript"},{"name":"CommodoreBASIC","uri":"Commodore_BASIC"},{"name":"Dart","uri":"Dart_(programming_language)"},{"name":"DartmouthBASIC","uri":"Dartmouth_BASIC"},{"name":"EuLisp","uri":"EuLisp"},{"name":"GNUCommonLisp","uri":"GNU_Common_Lisp"},{"name":"GW-BASIC","uri":"GW-BASIC"},{"name":"Go","uri":"Go_(programming_language)"},{"name":"HyperTalk","uri":"HyperTalk"},{"name":"IBMBASIC","uri":"IBM_BASIC"},{"name":"JOSS","uri":"JOSS"},{"name":"JOVIAL","uri":"JOVIAL"},{"name":"JScript.NET","uri":"JScript_.NET"},{"name":"Julia","uri":"Julia_(programming_language)"},{"name":"K","uri":"K_(programming_language)"},{"name":"LPC","uri":"LPC_(programming_language)"},{"name":"Lasso","uri":"Lasso_(programming_language)"},{"name":"Lisaac","uri":"Lisaac"},{"name":"MSXBASIC","uri":"MSX_BASIC"},{"name":"MUF","uri":"MUF_(programming_language)"},{"name":"MicrosoftBASIC","uri":"Microsoft_BASIC"},{"name":"MonkeyX","uri":"Monkey_X"},{"name":"Objective-C","uri":"Objective-C"},{"name":"Objective-J","uri":"Objective-J"},{"name":"P%E2%80%B2%E2%80%B2","uri":"P%E2%80%B2%E2%80%B2"},{"name":"QBasic","uri":"QBasic"},{"name":"QML","uri":"QML"},{"name":"Q(programminglanguagefromKxSystems)","uri":"Q_(programming_language_from_Kx_Systems)"},{"name":"RPL","uri":"RPL_(programming_language)"},{"name":"Ravenscarprofile","uri":"Ravenscar_profile"},{"name":"Rust","uri":"Rust_(programming_language)"},{"name":"SQL/PSM","uri":"SQL/PSM"},{"name":"STOSBASIC","uri":"STOS_BASIC"},{"name":"Scala","uri":"Scala_(programming_language)"},{"name":"Seed7","uri":"Seed7"},{"name":"SinclairBASIC","uri":"Sinclair_BASIC"},{"name":"Speedcoding","uri":"Speedcoding"},{"name":"Split-C","uri":"Split-C"},{"name":"Swift","uri":"Swift_(programming_language)"},{"name":"Tcl","uri":"Tcl"},{"name":"TypeScript","uri":"TypeScript"},{"name":"ISWIM","uri":"ISWIM"},{"name":"Modula-2","uri":"Modula-2"},{"name":"Opa","uri":"Opa_(programming_language)"},{"name":"ALGOLW","uri":"ALGOL_W"},{"name":"Chomski","uri":"Chomski"},{"name":"ColdC","uri":"ColdC"},{"name":"ConstraintHandlingRules","uri":"Constraint_Handling_Rules"},{"name":"CoolMUD","uri":"CoolMUD"},{"name":"Elixir","uri":"Elixir_(programming_language)"},{"name":"Falcon","uri":"Falcon_(programming_language)"},{"name":"Fancy","uri":"Fancy_(programming_language)"},{"name":"Haskell","uri":"Haskell_(programming_language)"},{"name":"InformationProcessingLanguage","uri":"Information_Processing_Language"},{"name":"Ioke","uri":"Ioke_(programming_language)"},{"name":"Kotlin","uri":"Kotlin_(programming_language)"},{"name":"LanguageIntegratedQuery","uri":"Language_Integrated_Query"},{"name":"Mirah","uri":"Mirah_(programming_language)"},{"name":"NIL","uri":"NIL_(programming_language)"},{"name":"NetLogo","uri":"NetLogo"},{"name":"OPS5","uri":"OPS5"},{"name":"Oberon-2","uri":"Oberon-2_(programming_language)"},{"name":"ObjectREXX","uri":"Object_REXX"},{"name":"Picolisp","uri":"Picolisp"},{"name":"Potion","uri":"Potion_(programming_language)"},{"name":"Red","uri":"Red_(programming_language)"},{"name":"Reia","uri":"Reia_(programming_language)"},{"name":"Rexx","uri":"Rexx"},{"name":"SP/k","uri":"SP/k"},{"name":"Scratch","uri":"Scratch_(programming_language)"},{"name":"Shen","uri":"Shen_(programming_language)"},{"name":"WindowsPowerShell","uri":"Windows_PowerShell"},{"name":"MiniD","uri":"MiniD"},{"name":"DIBOL","uri":"DIBOL"},{"name":"Object-OrientedTuring","uri":"Object-Oriented_Turing"},{"name":"VAXMacro","uri":"VAX_Macro"},{"name":"Vimscript","uri":"Vim_script"},{"name":"BASIC-PLUS","uri":"BASIC-PLUS"},{"name":"FOCAL","uri":"FOCAL_(programming_language)"},{"name":"MACRO-11","uri":"MACRO-11"},{"name":"CorVision","uri":"CorVision"},{"name":"C++03","uri":"C++03"},{"name":"MOFModeltoTextTransformationLanguage","uri":"MOF_Model_to_Text_Transformation_Language"},{"name":"Boomerang","uri":"Boomerang_(programming_language)"},{"name":"Genie","uri":"Genie_(programming_language)"},{"name":"Cach%C3%A9ObjectScript","uri":"Cach%C3%A9_ObjectScript"},{"name":"Ciao","uri":"Ciao_(programming_language)"},{"name":"Prograph","uri":"Prograph"},{"name":"Joule","uri":"Joule_(programming_language)"},{"name":"Argus","uri":"Argus_(programming_language)"},{"name":"Goo","uri":"Goo_(programming_language)"},{"name":"P*","uri":"P*"},{"name":"BLISS","uri":"BLISS"},{"name":"BitC","uri":"BitC"},{"name":"Charm","uri":"Charm_(programming_language)"},{"name":"JatoVM","uri":"Jato_VM"},{"name":"XSB","uri":"XSB"},{"name":"Cool","uri":"Cool_(programming_language)"},{"name":"Karel","uri":"Karel_(programming_language)"},{"name":"Asynchronousmoduledefinition","uri":"Asynchronous_module_definition"},{"name":"Candle","uri":"Candle_(programming_language)"},{"name":"Epigram","uri":"Epigram_(programming_language)"},{"name":"CoarrayFortran","uri":"Coarray_Fortran"},{"name":"ColonyFramework","uri":"Colony_Framework"},{"name":"DIANA(intermediatelanguage)","uri":"DIANA_(intermediate_language)"},{"name":"Emerald","uri":"Emerald_(programming_language)"},{"name":"Euclid","uri":"Euclid_(programming_language)"},{"name":"Flowchartlanguage","uri":"Flow_chart_language"},{"name":"Handlebars(templatesystem)","uri":"Handlebars_(template_system)"},{"name":"Idris","uri":"Idris_(programming_language)"},{"name":"Turing+","uri":"Turing+"},{"name":"LindenScriptingLanguage","uri":"Linden_Scripting_Language"},{"name":"NGL","uri":"NGL_(programming_language)"},{"name":"Oriel(scriptinglanguage)","uri":"Oriel_(scripting_language)"},{"name":"QUILL","uri":"QUILL"},{"name":"S-Lang(programminglibrary)","uri":"S-Lang_(programming_library)"},{"name":"S2","uri":"S2_(programming_language)"},{"name":"SCM(Schemeimplementation)","uri":"SCM_(Scheme_implementation)"},{"name":"Snap!","uri":"Snap!_(programming_language)"},{"name":"Swift(parallelscriptinglanguage)","uri":"Swift_(parallel_scripting_language)"},{"name":"TTM","uri":"TTM_(programming_language)"},{"name":"Zebra","uri":"Zebra_(programming_language)"},{"name":"ASharp(Axiom)","uri":"A_Sharp_(Axiom)"},{"name":"GnomeBasic","uri":"Gnome_Basic"},{"name":"Roy","uri":"Roy_(programming_language)"},{"name":"XPath","uri":"XPath"},{"name":"F*","uri":"F*_(programming_language)"},{"name":"Fluxus(programmingenvironment)","uri":"Fluxus_(programming_environment)"},{"name":"ParaSail","uri":"ParaSail_(programming_language)"},{"name":"Qalb","uri":"Qalb_(programming_language)"},{"name":"Xtend","uri":"Xtend"},{"name":"ActiveVFP","uri":"ActiveVFP"},{"name":"Asm.js","uri":"Asm.js"},{"name":"Join-pattern","uri":"Join-pattern"},{"name":"MSharp","uri":"M_Sharp_(programming_language)"},{"name":"MexScript","uri":"MexScript"},{"name":"Obix","uri":"Obix_(programming_language)"},{"name":"Praspel","uri":"Praspel"},{"name":"ProgrammingwithBigDatainR","uri":"Programming_with_Big_Data_in_R"},{"name":"RiscLua","uri":"RiscLua"},{"name":"SAMPL","uri":"SAMPL"},{"name":"Stylus(stylesheetlanguage)","uri":"Stylus_(stylesheet_language)"},{"name":"Tritium","uri":"Tritium_(programming_language)"},{"name":"Underscore.js","uri":"Underscore.js"},{"name":"TUTOR","uri":"TUTOR_(programming_language)"},{"name":"Mortran","uri":"Mortran"},{"name":"Modula-2+","uri":"Modula-2+"},{"name":"Newsqueak","uri":"Newsqueak"},{"name":"Uplevel","uri":"Uplevel"},{"name":"FlowJava","uri":"Flow_Java"},{"name":"Linktime","uri":"Link_time"},{"name":"ScriptingfortheJavaPlatform","uri":"Scripting_for_the_Java_Platform"},{"name":"VistaSmalltalk","uri":"VistaSmalltalk"},{"name":"Manifestexpression","uri":"Manifest_expression"},{"name":"CGOL","uri":"CGOL"},{"name":"WordBASIC","uri":"WordBASIC"},{"name":"GScript","uri":"GScript"},{"name":"Heappollution","uri":"Heap_pollution"},{"name":"Compilercorrectness","uri":"Compiler_correctness"},{"name":"XL(XMLprogramminglanguage)","uri":"XL_(XML_programming_language)"},{"name":"Dolittle","uri":"Dolittle_(programming_language)"},{"name":"Nemo","uri":"Nemo_(programming_language)"},{"name":"UCBLogo","uri":"UCBLogo"},{"name":"Umple","uri":"Umple"},{"name":"ACL2","uri":"ACL2"},{"name":"Caml","uri":"Caml"},{"name":"Format(CommonLisp)","uri":"Format_(Common_Lisp)"},{"name":"Orwell","uri":"Orwell_(programming_language)"},{"name":"Swing(Java)","uri":"Swing_(Java)"},{"name":"Yorick","uri":"Yorick_(programming_language)"},{"name":"ABC","uri":"ABC_(programming_language)"},{"name":"ALGOL58","uri":"ALGOL_58"},{"name":"ASICprogramminglanguage","uri":"ASIC_programming_language"},{"name":"ActionScript","uri":"ActionScript"},{"name":"ApacheCocoon","uri":"Apache_Cocoon"},{"name":"Arc","uri":"Arc_(programming_language)"},{"name":"Backbone.js","uri":"Backbone.js"},{"name":"CMS-2","uri":"CMS-2_(programming_language)"},{"name":"ECMAScript","uri":"ECMAScript"},{"name":"Escher","uri":"Escher_(programming_language)"},{"name":"Euler","uri":"Euler_(programming_language)"},{"name":"ExtensionLanguageKit","uri":"Extension_Language_Kit"},{"name":"Factor","uri":"Factor_(programming_language)"},{"name":"GNUGuile","uri":"GNU_Guile"},{"name":"Hack","uri":"Hack_(programming_language)"},{"name":"Hop(software)","uri":"Hop_(software)"},{"name":"IBMRPG","uri":"IBM_RPG"},{"name":"IDL","uri":"IDL_(programming_language)"},{"name":"Janus","uri":"Janus_(programming_language)"},{"name":"KMprogramminglanguage","uri":"KM_programming_language"},{"name":"Kylix(software)","uri":"Kylix_(software)"},{"name":"Label(computerscience)","uri":"Label_(computer_science)"},{"name":"Less(stylesheetlanguage)","uri":"Less_(stylesheet_language)"},{"name":"Limbo","uri":"Limbo_(programming_language)"},{"name":"M4(computerlanguage)","uri":"M4_(computer_language)"},{"name":"Miranda","uri":"Miranda_(programming_language)"},{"name":"Mondrian(software)","uri":"Mondrian_(software)"},{"name":"Nu","uri":"Nu_(programming_language)"},{"name":"Oxygene","uri":"Oxygene_(programming_language)"},{"name":"Oz","uri":"Oz_(programming_language)"},{"name":"Pico","uri":"Pico_(programming_language)"},{"name":"Pike","uri":"Pike_(programming_language)"},{"name":"Programtransformation","uri":"Program_transformation"},{"name":"Racket","uri":"Racket_(programming_language)"},{"name":"Raptor","uri":"Raptor_(programming_language)"},{"name":"SACprogramminglanguage","uri":"SAC_programming_language"},{"name":"SALSA","uri":"SALSA_(programming_language)"},{"name":"SystemVerilog","uri":"SystemVerilog"},{"name":"Unicon","uri":"Unicon_(programming_language)"},{"name":"Vala","uri":"Vala_(programming_language)"},{"name":"VisualBasic","uri":"Visual_Basic"},{"name":"VisualBasic.NET","uri":"Visual_Basic_.NET"},{"name":"WolframLanguage","uri":"Wolfram_Language"},{"name":"ATS","uri":"ATS_(programming_language)"},{"name":"Join-calculus","uri":"Join-calculus"},{"name":"LOLCODE","uri":"LOLCODE"},{"name":"LiveCode","uri":"LiveCode"},{"name":"ASF+SDFMetaEnvironment","uri":"ASF+SDF_Meta_Environment"},{"name":"Alice","uri":"Alice_(programming_language)"},{"name":"Bon","uri":"Bon_(programming_language)"},{"name":"CALActorLanguage","uri":"CAL_Actor_Language"},{"name":"Cg","uri":"Cg_(programming_language)"},{"name":"Charm++","uri":"Charm++"},{"name":"Clean","uri":"Clean_(programming_language)"},{"name":"ComponentPascal","uri":"Component_Pascal"},{"name":"DYNAMO","uri":"DYNAMO_(programming_language)"},{"name":"ECL(data-centricprogramminglanguage)","uri":"ECL_(data-centric_programming_language)"},{"name":"ELI","uri":"ELI_(programming_language)"},{"name":"Hermes","uri":"Hermes_(programming_language)"},{"name":"HotSoupProcessor","uri":"Hot_Soup_Processor"},{"name":"IBMiControlLanguage","uri":"IBM_i_Control_Language"},{"name":"Io","uri":"Io_(programming_language)"},{"name":"JustBASIC","uri":"Just_BASIC"},{"name":"Kvirtualmachine","uri":"K_virtual_machine"},{"name":"Nyquist","uri":"Nyquist_(programming_language)"},{"name":"OpenCL","uri":"OpenCL"},{"name":"PL/C","uri":"PL/C"},{"name":"Pan","uri":"Pan_(programming_language)"},{"name":"Pawn(scriptinglanguage)","uri":"Pawn_(scripting_language)"},{"name":"QuarkFramework","uri":"Quark_Framework"},{"name":"Squib(weblog)","uri":"Squib_(weblog)"},{"name":"TOM(object-orientedprogramminglanguage)","uri":"TOM_(object-oriented_programming_language)"},{"name":"WindowsPresentationFoundation","uri":"Windows_Presentation_Foundation"},{"name":"C3linearization","uri":"C3_linearization"},{"name":"CLP(R)","uri":"CLP(R)"},{"name":"RAPID","uri":"RAPID"},{"name":"Impromptu(programmingenvironment)","uri":"Impromptu_(programming_environment)"},{"name":".QL","uri":".QL"},{"name":"Linoleum","uri":"Linoleum_(programming_language)"},{"name":"Applications-By-Forms","uri":"Applications-By-Forms"},{"name":"MML","uri":"MML_(programming_language)"},{"name":"Neko","uri":"Neko_(programming_language)"},{"name":"FACT(computerlanguage)","uri":"FACT_(computer_language)"},{"name":"Typedassemblylanguage","uri":"Typed_assembly_language"},{"name":"IBMALP","uri":"IBM_ALP"},{"name":"PV-Wave","uri":"PV-Wave"},{"name":"Pure","uri":"Pure_(programming_language)"},{"name":"Sense(programming)","uri":"Sense_(programming)"},{"name":"Skeleton(computerprogramming)","uri":"Skeleton_(computer_programming)"},{"name":"Speakeasy(computationalenvironment)","uri":"Speakeasy_(computational_environment)"},{"name":"TXL","uri":"TXL_(programming_language)"},{"name":"ISO/IEC8652","uri":"ISO/IEC_8652"},{"name":"Microprogramminglanguage","uri":"Micro_programming_language"},{"name":"Bistro","uri":"Bistro_(programming_language)"},{"name":"Handel-C","uri":"Handel-C"},{"name":"LOOM(ontology)","uri":"LOOM_(ontology)"},{"name":"Go!","uri":"Go!_(programming_language)"},{"name":"Namecollision","uri":"Name_collision"},{"name":"GuidovanRobot","uri":"Guido_van_Robot"},{"name":"Jasmin(software)","uri":"Jasmin_(software)"},{"name":"Deforestation(computerscience)","uri":"Deforestation_(computer_science)"},{"name":"Plus","uri":"Plus_(programming_language)"},{"name":"Soot(software)","uri":"Soot_(software)"},{"name":"GlobalArrays","uri":"Global_Arrays"},{"name":"Joyce","uri":"Joyce_(programming_language)"},{"name":"Fj%C3%B6lnir","uri":"Fj%C3%B6lnir_(programming_language)"},{"name":"Arrayaccessanalysis","uri":"Array_access_analysis"},{"name":"Tracescheduling","uri":"Trace_scheduling"},{"name":"PeopleCode","uri":"PeopleCode"},{"name":"ShortCode(computerlanguage)","uri":"Short_Code_(computer_language)"},{"name":"NetRexx","uri":"NetRexx"},{"name":"Frege","uri":"Frege_(programming_language)"},{"name":"C++17","uri":"C++17"},{"name":"MetaQuotesLanguageMQL4/MQL5","uri":"MetaQuotes_Language_MQL4/MQL5"},{"name":"AMPL","uri":"AMPL"},{"name":"Alma-0","uri":"Alma-0"},{"name":"C%CF%89","uri":"C%CF%89"},{"name":"CLISP","uri":"CLISP"},{"name":"Cilk","uri":"Cilk"},{"name":"Claire","uri":"Claire_(programming_language)"},{"name":"ColdFusionMarkupLanguage","uri":"ColdFusion_Markup_Language"},{"name":"Felix","uri":"Felix_(programming_language)"},{"name":"PerlDataLanguage","uri":"Perl_Data_Language"},{"name":"SETL","uri":"SETL"},{"name":"UnifiedParallelC","uri":"Unified_Parallel_C"},{"name":"BeanShell","uri":"BeanShell"},{"name":"Boo","uri":"Boo_(programming_language)"},{"name":"Charity","uri":"Charity_(programming_language)"},{"name":"Converge","uri":"Converge_(programming_language)"},{"name":"ELAN","uri":"ELAN_(programming_language)"},{"name":"E","uri":"E_(programming_language)"},{"name":"F-Script","uri":"F-Script_(programming_language)"},{"name":"Fortress","uri":"Fortress_(programming_language)"},{"name":"FreeBASIC","uri":"FreeBASIC"},{"name":"Harbour(software)","uri":"Harbour_(software)"},{"name":"IKVM.NET","uri":"IKVM.NET"},{"name":"JCvirtualmachine","uri":"JC_virtual_machine"},{"name":"JamVM","uri":"JamVM"},{"name":"Jaos","uri":"Jaos"},{"name":"JupiterJVM","uri":"Jupiter_JVM"},{"name":"MIVAScript","uri":"MIVA_Script"},{"name":"MayaEmbeddedLanguage","uri":"Maya_Embedded_Language"},{"name":"Modelica","uri":"Modelica"},{"name":"NWScript","uri":"NWScript"},{"name":"NewLISP","uri":"NewLISP"},{"name":"Noop","uri":"Noop"},{"name":"OpenGLShadingLanguage","uri":"OpenGL_Shading_Language"},{"name":"OracleDeveloperSuite","uri":"Oracle_Developer_Suite"},{"name":"PL/pgSQL","uri":"PL/pgSQL"},{"name":"Perl6","uri":"Perl_6"},{"name":"StacklessPython","uri":"Stackless_Python"},{"name":"StandardMLofNewJersey","uri":"Standard_ML_of_New_Jersey"},{"name":"StarLogo","uri":"StarLogo"},{"name":"ThinBasic","uri":"ThinBasic"},{"name":"TurboAssembler","uri":"Turbo_Assembler"},{"name":"X10","uri":"X10_(programming_language)"},{"name":"ZPL","uri":"ZPL_(programming_language)"},{"name":"Littleb","uri":"Little_b_(programming_language)"},{"name":"Agda","uri":"Agda_(programming_language)"},{"name":"Chapel","uri":"Chapel_(programming_language)"},{"name":"FpgaC","uri":"FpgaC"},{"name":"InteractiveC","uri":"Interactive_C"},{"name":"Karel++","uri":"Karel++"},{"name":"Mudlle","uri":"Mudlle"},{"name":"Gambas","uri":"Gambas"},{"name":"ADMB","uri":"ADMB"},{"name":"Axum","uri":"Axum_(programming_language)"},{"name":"Basic4ppc","uri":"Basic4ppc"},{"name":"CLACL","uri":"CLACL"},{"name":"CreativeBasic","uri":"Creative_Basic"},{"name":"DesignByNumbers","uri":"Design_By_Numbers"},{"name":"DeterministicParallelJava","uri":"Deterministic_Parallel_Java"},{"name":"FacebookQueryLanguage","uri":"Facebook_Query_Language"},{"name":"MicrosoftSmallBasic","uri":"Microsoft_Small_Basic"},{"name":"NObjective","uri":"NObjective"},{"name":"VSXu","uri":"VSXu"},{"name":"ESharp","uri":"E_Sharp_(programming_language)"},{"name":"Frenetic","uri":"Frenetic_(programming_language)"},{"name":"Nemerle","uri":"Nemerle"},{"name":"AIMMS","uri":"AIMMS"},{"name":"Ceylon","uri":"Ceylon_(programming_language)"},{"name":"GNUE","uri":"GNU_E"},{"name":"OpenMx","uri":"OpenMx"},{"name":"Seph","uri":"Seph_(programming_language)"},{"name":"SQLPL","uri":"SQL_PL"},{"name":"ShiftScript","uri":"Shift_Script"},{"name":"TclX","uri":"TclX"},{"name":"Wildbranch","uri":"Wild_branch"},{"name":"Literalpool","uri":"Literal_pool"},{"name":"JSONiq","uri":"JSONiq"},{"name":"As-ifrule","uri":"As-if_rule"},{"name":"XQuery","uri":"XQuery"},{"name":"ANSI-C","uri":"ANSI-C"},{"name":"CBASIC","uri":"CBASIC"},{"name":"Dart,HTML5","uri":"Dart,_HTML5"},{"name":"Degrafa","uri":"Degrafa"},{"name":"PROCprocedurelanguage","uri":"PROC_procedure_language"},{"name":"Coprocess","uri":"Coprocess"},{"name":"CEEMAC","uri":"CEEMAC"},{"name":"ARexx","uri":"ARexx"},{"name":"JavaFXScript","uri":"JavaFX_Script"},{"name":"L-attributedgrammar","uri":"L-attributed_grammar"},{"name":"PL/M","uri":"PL/M"},{"name":"Urbiscript","uri":"Urbiscript"},{"name":"AutoLISP","uri":"AutoLISP"},{"name":"Befunge","uri":"Befunge"},{"name":"BorlandTurboC","uri":"Borland_Turbo_C"},{"name":"Curl","uri":"Curl_(programming_language)"},{"name":"LibertyBASIC","uri":"Liberty_BASIC"},{"name":"MAD","uri":"MAD_(programming_language)"},{"name":"NewtonScript","uri":"NewtonScript"},{"name":"Planner","uri":"Planner_(programming_language)"},{"name":"SISAL","uri":"SISAL"},{"name":"Turing","uri":"Turing_(programming_language)"},{"name":"VBScript","uri":"VBScript"},{"name":"VisualBasicforApplications","uri":"Visual_Basic_for_Applications"},{"name":"XSL","uri":"XSL"},{"name":"Yacc","uri":"Yacc"},{"name":"IBMHighLevelAssembler","uri":"IBM_High_Level_Assembler"},{"name":"SpecSharp","uri":"Spec_Sharp"},{"name":"YAAF","uri":"YAAF"},{"name":"%CE%9CC++","uri":"%CE%9CC++"},{"name":"Bigwig","uri":"Bigwig_(programming_language)"},{"name":"Etoys","uri":"Etoys_(programming_language)"},{"name":"Fril","uri":"Fril"},{"name":"JRockit","uri":"JRockit"},{"name":"JavaServerPagesStandardTagLibrary","uri":"JavaServer_Pages_Standard_Tag_Library"},{"name":"JoinJava","uri":"Join_Java"},{"name":"Nickle","uri":"Nickle_(programming_language)"},{"name":"Squirrel","uri":"Squirrel_(programming_language)"},{"name":"Tea","uri":"Tea_(programming_language)"},{"name":"ToonTalk","uri":"ToonTalk"},{"name":"VisSim","uri":"VisSim"},{"name":"XL","uri":"XL_(programming_language)"},{"name":"Yoix","uri":"Yoix"},{"name":"T","uri":"T_(programming_language)"},{"name":"Absys","uri":"Absys"},{"name":"Accessquerylanguage","uri":"Access_query_language"},{"name":"EMintermediatelanguage","uri":"EM_intermediate_language"},{"name":"GGobi","uri":"GGobi"},{"name":"Judoscript","uri":"Judoscript"},{"name":"Cel","uri":"Cel_(programming_language)"},{"name":"Actor-BasedConcurrentLanguage","uri":"Actor-Based_Concurrent_Language"},{"name":"AlgebraicLogicFunctionalprogramminglanguage","uri":"Algebraic_Logic_Functional_programming_language"},{"name":"AmbientTalk","uri":"AmbientTalk"},{"name":"Cobra","uri":"Cobra_(programming_language)"},{"name":"IncrTcl","uri":"Incr_Tcl"},{"name":"Lite-C","uri":"Lite-C"},{"name":"Parser(CGIlanguage)","uri":"Parser_(CGI_language)"},{"name":"Php4delphi","uri":"Php4delphi"},{"name":"ScientificVectorLanguage","uri":"Scientific_Vector_Language"},{"name":"Corelanguage","uri":"Core_language"},{"name":"Free-formlanguage","uri":"Free-form_language"},{"name":"Obliq","uri":"Obliq"},{"name":"Bio7","uri":"Bio7"},{"name":"Cameleon","uri":"Cameleon_(programming_language)"},{"name":"Coopr","uri":"Coopr"},{"name":"Crypton(framework)","uri":"Crypton_(framework)"},{"name":"DADiSP","uri":"DADiSP"},{"name":"Flowgorithm","uri":"Flowgorithm"},{"name":"Halide","uri":"Halide_(programming_language)"},{"name":"LARP","uri":"LARP_(programming_language)"},{"name":"LittleInterpretedLanguage","uri":"Little_Interpreted_Language"},{"name":"Pyomo","uri":"Pyomo"},{"name":"VisualLogic","uri":"Visual_Logic"},{"name":"TELCOMP","uri":"TELCOMP"},{"name":"Tactileprogramminglanguage","uri":"Tactile_programming_language"},{"name":"ObjectOberon","uri":"Object_Oberon"},{"name":"Metacompilation","uri":"Metacompilation"},{"name":"POPLmarkchallenge","uri":"POPLmark_challenge"},{"name":"High-LevelShadingLanguage","uri":"High-Level_Shading_Language"},{"name":"Concurrentobject-orientedprogramming","uri":"Concurrent_object-oriented_programming"},{"name":"FutureBASIC","uri":"FutureBASIC"},{"name":".net","uri":".net"},{"name":"ABAP","uri":"ABAP"},{"name":"ALGOL68","uri":"ALGOL_68"},{"name":"AppleScript","uri":"AppleScript"},{"name":"BETA","uri":"BETA_(programming_language)"},{"name":"CWEB","uri":"CWEB"},{"name":"ChucK","uri":"ChucK"},{"name":"Clipper","uri":"Clipper_(programming_language)"},{"name":"ColorForth","uri":"ColorForth"},{"name":"Coq","uri":"Coq"},{"name":"Curry","uri":"Curry_(programming_language)"},{"name":"DBase","uri":"DBase"},{"name":"D","uri":"D_(programming_language)"},{"name":"FASM","uri":"FASM"},{"name":"FSharp","uri":"F_Sharp_(programming_language)"},{"name":"GenericJava","uri":"Generic_Java"},{"name":"Groovy","uri":"Groovy_(programming_language)"},{"name":"Hartmannpipeline","uri":"Hartmann_pipeline"},{"name":"Inform","uri":"Inform"},{"name":"J","uri":"J_(programming_language)"},{"name":"JSharp","uri":"J_Sharp"},{"name":"Joy","uri":"Joy_(programming_language)"},{"name":"MIRCscriptinglanguage","uri":"MIRC_scripting_language"},{"name":"Mizarsystem","uri":"Mizar_system"},{"name":"Modula-3","uri":"Modula-3"},{"name":"Pizza","uri":"Pizza_(programming_language)"},{"name":"PolyphonicCSharp","uri":"Polyphonic_C_Sharp"},{"name":"Processing","uri":"Processing_(programming_language)"},{"name":"PureData","uri":"Pure_Data"},{"name":"Q(equationalprogramminglanguage)","uri":"Q_(equational_programming_language)"},{"name":"R","uri":"R_(programming_language)"},{"name":"Ratfor","uri":"Ratfor"},{"name":"Rc","uri":"Rc"},{"name":"SPARK","uri":"SPARK_(programming_language)"},{"name":"TADS","uri":"TADS"},{"name":"UnrealScript","uri":"UnrealScript"},{"name":"Verilog","uri":"Verilog"},{"name":"XOTcl","uri":"XOTcl"},{"name":"XUL","uri":"XUL"},{"name":"Overheadcode","uri":"Overhead_code"},{"name":"FL","uri":"FL_(programming_language)"},{"name":"IntelParallelBuildingBlocks","uri":"Intel_Parallel_Building_Blocks"},{"name":"COMTRAN","uri":"COMTRAN"},{"name":"Ezhil","uri":"Ezhil_(programming_language)"},{"name":"PersonalJava","uri":"PersonalJava"},{"name":"Programminglanguageimplementation","uri":"Programming_language_implementation"},{"name":"Referencetype","uri":"Reference_type"},{"name":"AdvPL","uri":"AdvPL"},{"name":"MACRO-10","uri":"MACRO-10"},{"name":"PythonforS60","uri":"Python_for_S60"},{"name":"FortranM","uri":"FortranM"},{"name":"HummingbirdQuickScript","uri":"Hummingbird_QuickScript"},{"name":"ListofCLIlanguages","uri":"List_of_CLI_languages"},{"name":"S-attributedgrammar","uri":"S-attributed_grammar"},{"name":"TIBASIC(TI99/4A)","uri":"TI_BASIC_(TI_99/4A)"},{"name":"CObjectProcessor","uri":"C_Object_Processor"},{"name":"Humus","uri":"Humus_(programming_language)"},{"name":"PROMAL","uri":"PROMAL"},{"name":"Babbage","uri":"Babbage_(programming_language)"},{"name":"Erroneousprogram","uri":"Erroneous_program"},{"name":"SimpleKnowledgeOrganizationSystem","uri":"Simple_Knowledge_Organization_System"},{"name":"Polymorphicrecursion","uri":"Polymorphic_recursion"},{"name":"WinWrapBasic","uri":"WinWrap_Basic"},{"name":"BuddyScript","uri":"BuddyScript"},{"name":"AcornsoftLogo","uri":"Acornsoft_Logo"},{"name":"OBJ3","uri":"OBJ3"},{"name":"Oaklisp","uri":"Oaklisp"},{"name":"ObjectLOGO","uri":"ObjectLOGO"},{"name":"ObjectLisp","uri":"Object_Lisp"},{"name":"ExtendScript","uri":"ExtendScript"},{"name":"SlaveProgrammingLanguage","uri":"Slave_Programming_Language"}]


        $scope.skillInit();
        $scope.jobInit();
        $scope.schoolInit();

    }


    ]);
