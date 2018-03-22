import * as angular from 'angular';

import {ModalService} from '../../../../bellows/core/modal/modal.service';
import {LexiconUtilityService} from '../../core/lexicon-utility.service';
import {LexExample} from '../../shared/model/lex-example.model';
import {LexSense} from '../../shared/model/lex-sense.model';
import {LexConfigFieldList} from '../../shared/model/lexicon-config.model';
import {FieldControl} from './field-control.model';

export class FieldSenseController implements angular.IController {
  model: LexSense;
  config: LexConfigFieldList;
  control: FieldControl;
  index: number;
  parentContextGuid: string;
  remove: (index: number) => void;

  contextGuid: string;

  static $inject = ['$state', 'modalService'];
  constructor(private $state: angular.ui.IStateService, private modal: ModalService) { }

  $onInit(): void {
    this.contextGuid = this.parentContextGuid + ' sense#' + this.model.guid;

    for (const fieldName in this.config.fields) {
      if (this.config.fields.hasOwnProperty(fieldName)) {
        const field = this.config.fields[fieldName];
        if (field.senseLabel == null) {
          field.senseLabel = [];
          field.senseLabel[-1] = 'Meaning';
        }

        field.senseLabel[this.index] = 'Meaning ' + (this.index + 1);
      }
    }
  }

  isAtEditorEntry(): boolean {
    return LexiconUtilityService.isAtEditorEntry(this.$state);
  }

  addExample = (): void => {
    const newExample: LexExample = new LexExample();
    this.control.makeValidModelRecursive(this.config.fields.examples, newExample);
    this.model.examples.push(newExample);
    this.control.hideRightPanel();
  }

  numExamples = () => this.model.examples.length;

  moveExample = (index: number, distance: number) => {
    const examples = this.model.examples;
    const example = examples[index];
    const newPosition = index + distance;
    if (newPosition < 0 || newPosition >= examples.length) throw new Error();
    examples.splice(index, 1); // remove 1 element starting from index
    examples.splice(newPosition, 0, example); // insert example, overwriting 0 elements
  }

  deleteExample = (index: number): void => {
    const deletemsg = 'Are you sure you want to delete the example <b>\' ' +
      LexiconUtilityService.getExample(this.control.config, this.config.fields.examples as LexConfigFieldList,
        this.model.examples[index], 'sentence')
      + ' \'</b>';
    this.modal.showModalSimple('Delete Example', deletemsg, 'Cancel', 'Delete Example')
      .then(() => {
        this.model.examples.splice(index, 1);
        this.control.hideRightPanel();
      }, () => {});
  }

}

export const FieldSenseComponent: angular.IComponentOptions = {
  bindings: {
    model: '=',
    config: '<',
    control: '<',
    index: '<',
    numSenses: '<',
    move: '<',
    parentContextGuid: '<',
    remove: '&'
  },
  controller: FieldSenseController,
  templateUrl: '/angular-app/languageforge/lexicon/editor/field/dc-sense.component.html'
};
