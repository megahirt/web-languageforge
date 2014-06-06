<?php

namespace models\scriptureforge\dto;

use models\scriptureforge\SfchecksProjectModel;
use libraries\shared\Website;

use models\mapper\JsonEncoder;
use models\shared\dto\RightsHelper;
use models\UserModel;
use models\ProjectModel;

class ProjectSettingsDto
{
	/**
	 * @param string $projectId
	 * @param string $userId
	 * @returns array - the DTO array
	 */
	public static function encode($projectId, $userId) {
		$userModel = new UserModel($userId);
		$projectModel = new SfchecksProjectModel($projectId);

		$list = $projectModel->listUsers();
		$data = array();
		$data['themeNames'] = Website::getProjectThemeNamesForSite(Website::SCRIPTUREFORGE);
		$data['count'] = $list->count;
		$data['entries'] = $list->entries;
		$data['project'] = JsonEncoder::encode($projectModel);
		unset($data['project']['users']);
		$data['rights'] = RightsHelper::encode($userModel, $projectModel);
		$data['bcs'] = BreadCrumbHelper::encode('settings', $projectModel, null, null);
		return $data;
	}
}

?>
