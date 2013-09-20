<?php 

require_once 'base.php';

class Pages extends Base {
	
	public function view($page = 'unknown') {
		$data = array();
		$data['title'] = "Scripture Forge";
		$data['is_static_page'] = true;
		if ( ! file_exists('views/projects/'.$page.'.html.php'))
		{
			show_404();
		} else {
			$this->_render_page("projects/$page", $data);
		}
	}
}


?>