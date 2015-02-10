<?php

namespace libraries\languageforge\semdomtrans;

use models\languageforge\semdomtrans\SemDomTransTranslatedForm;
use models\languageforge\SemDomTransProjectModel;
use models\languageforge\semdomtrans\SemDomTransItemModel;
use models\languageforge\semdomtrans\SemDomTransQuestion;
use models\mapper\ArrayOf;
class SemDomXMLExporter {
	
	private $_projectModel;
	
	private $_xml;
	
	private $_runForReal;
	
	private $_lang;
	
	/**
	 * 
	 * @param string $xmlfilepath
	 * @param SemDomTransProjectModel $projectModel
	 * @param bool $testMode
	 */
	public function __construct($projectModel, $testMode = true) {

		$this->_xml = simplexml_load_file($projectModel->newXmlFilePath);
		$this->_projectModel = $projectModel;
		$this->_runForReal = ! $testMode;
		$this->_lang = $projectModel->languageIsoCode;
	}
	
	public function run($english=true) {

		$possibilities = $english ? 
			$this->_xml->SemanticDomainList->CmPossibilityList->Possibilities 
			: $this->_xml->xpath("List[@field='SemanticDomainList']")[0]->Possibilities;
		
		foreach($possibilities->children() as $domainNode) {
			$this->_processDomainNode($domainNode);
		}

		$this->_xml->asXml($this->_projectModel->getAssetsFolderPath() . "/" . "copy.xml");
		
	}

	public function _getPathVal($xmlPath) {
		if ($xmlPath) {
			$val = (string) $xmlPath[0];
		} else {
			$val= "";
		}
		return $val;
	}
	
	public function _getNodeOrNull($xmlPath) {
		if ($xmlPath) {
			$val = $xmlPath[0];
		} else {
			$val= null;
		}
		return $val;
	}
	
	private function _processDomainNode($domainNode) {
		

		$guid = (string)$domainNode['guid'];
		
		$s = new SemDomTransItemModel($this->_projectModel);
		$s->readByProperty("xmlGuid", $guid);
		
		$abbreviation = $this->_getPathVal($domainNode->xpath("Abbreviation/AUni[@ws='en']"));
		$name = $domainNode->xpath("Name/AUni[@ws='{$this->_lang}']")[0];
		$description =  $domainNode->xpath("Description/AStr[@ws='{$this->_lang}']")[0]->xpath("Run[@ws='{$this->_lang}']")[0];
		
		$description[0] = $s->description->translation;
		$name[0] = $s->name->translation;
		
		$questions = new ArrayOf(function ($data) {
        	return new SemDomTransQuestion();
        });      
		$searchKeys = new ArrayOf(function ($data) {
        	return new SemDomTransTranslatedForm();
        });      
	

		if (property_exists($domainNode, 'Questions'))
		{
			$questionsXML = $domainNode->Questions->children();
			
			// parse nested questions
			$index = 0;
			foreach($questionsXML as $questionXML) {
				$question = $this->_getNodeOrNull($questionXML->xpath("Question/AUni[@ws='{$this->_lang}']"));
				$terms =  $this->_getNodeOrNull($questionXML->xpath("ExampleWords/AUni[@ws='{$this->_lang}']"));
				
				if($question != null) {
					$question[0] = $s->questions[$index]->question->translation;
				}
				if($terms != null)
					$terms[0] = $s->questions[$index]->terms->translation;
				$index++;
			}
		}				
		
		
		
		print "Processed $abbreviation \n";
		
		// recurse on sub-domains
		if (property_exists($domainNode, 'SubPossibilities')) {
			foreach ($domainNode->SubPossibilities->children() as $subDomainNode) {
				$this->_processDomainNode($subDomainNode);
			}
		}
	}
	
}
?>