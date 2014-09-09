<?php

namespace models\languageforge\lexicon;

use libraries\shared\palaso\CodeGuard;
use models\mapper\MapOf;
use models\mapper\ObjectForEncoding;

class Example extends ObjectForEncoding
{
    use \LazyProperty\LazyPropertiesTrait;
    
    public function __construct($liftId = '')
    {
        $this->setPrivateProp('liftId');
        $this->setReadOnlyProp('authorInfo');
        $this->liftId = $liftId;
        
        $this->initLazyProperties([
            'authorInfo',
            'sentence',
            'translation',
            'reference',
            'customFields',
            'examplePublishIn'
        ], false);
        
        $this->id = uniqid();
    }

    protected function createProperty($name) {
        switch ($name) {
            case 'authorInfo':
                return new AuthorInfo();
            case 'sentence':
            case 'translation':
            case 'reference':
                return new MultiText();
            case 'examplePublishIn':
                return new LexiconMultiValueField(); 
            case 'customFields':
                return new MapOf('\models\languageforge\lexicon\_createCustomField');
        }
    }
    
    /**
     * The id of the example as specified in the LIFT file
     * @var string
     */
    public $liftId;

    /**
     * @var MultiText
     */
    public $sentence;

    /**
     * @var MultiText
     */
    public $translation;

    /**
     * @var MapOf <>
     */
    public $customFields;

    /**
     * @var AuthorInfo
     */
    public $authorInfo;

    /**
     *
     * @var string
     */
    public $id;

    // less common fields used in FLEx

    /**
     * @var MultiText
     */
    public $reference;

    /**
     * @var LexiconMultiValueField
     */
    public $examplePublishIn;

}
